"use server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostData {
  title: string;
  subtitle: string;
  route: string;
  date: string;
  tags: string[];
  draft: boolean;
  slug: string;
  preview: string;
}

export interface BlogData {
  [key: string]: PostData[];
}

export const getBlogData = (key?: string, numPosts?: number): BlogData => {
  const blogData: BlogData = {};

  const postsDirectory = path.join(process.cwd(), "_posts");
  const postFolders = fs.readdirSync(postsDirectory);

  postFolders.forEach((folder) => {
    const currentDirectory = path.join(postsDirectory, folder);
    const files = fs.readdirSync(currentDirectory);

    const posts = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const slug = file.replace(".md", "");
        const filePath = path.join(currentDirectory, file);
        const markdownFile = fs.readFileSync(filePath, "utf8");
        const { data } = matter(markdownFile);

        // Skip post if draft is true
        if (data.draft === true) {
          return null;
        }

        const previewImagePath = path.join(
          "public",
          "posts",
          folder,
          `preview-${slug}.png`
        );
        const previewImage = fs.existsSync(previewImagePath)
          ? `/posts/${folder}/preview-${slug}.png`
          : "/posts/missing.png";

        return { ...data, slug: slug, preview: previewImage } as PostData;
      })
      .filter((post) => post !== null) as PostData[];

    // Sort posts by date
    posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    blogData[folder] = posts;
  });

  return blogData;
};
