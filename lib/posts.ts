"use server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMetaData {
  title: string;
  subtitle: string;
  route: string;
  date: string;
  tags: string[];
  draft: boolean;
  id: string;
  preview: string;
}

export interface BlogData {
  [key: string]: PostMetaData[];
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
        const id = file.replace(".md", "");
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
          `preview-${id}.png`
        );
        const previewImage = fs.existsSync(previewImagePath)
          ? `/posts/${folder}/preview-${id}.png`
          : "/posts/missing.png";

        return { ...data, id: id, preview: previewImage } as PostMetaData;
      })
      .filter((post) => post !== null) as PostMetaData[];

    // Sort posts by date
    posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    blogData[folder] = posts;
  });

  return blogData;
};

interface PostData {
  content: string;
  title: string;
  route: string;
  tags: string[];
  date: string;
}

interface Post {
  data: PostData | null;
  revalidate: number;
}

export const getPost = (id: string): Post => {
  const postsDirectory = path.join(process.cwd(), "_posts");
  const postFolders = fs.readdirSync(postsDirectory);
  let postData = null;

  postFolders.some((folder) => {
    const filePath = path.join(postsDirectory, folder, id + ".md");
    if (fs.existsSync(filePath)) {
      const markdownFile = fs.readFileSync(filePath, "utf8");
      const { content, data } = matter(markdownFile);

      postData = {
        content,
        title: data.title,
        route: data.route,
        tags: data.tags,
        date: data.date,
      };

      return true; // Stops the iteration once the file is found
    }

    return false;
  });

  return {
    data: postData,
    revalidate: 10,
  };
};
