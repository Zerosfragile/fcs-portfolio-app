"use server";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { basehub } from "basehub";
const OUTPUTLOG = false;
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
class DirectoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DirectoryError";
  }
}
export interface BlogData {
  [key: string]: PostMetaData[];
}

export const getBlogData = (key?: string, numPosts?: number): BlogData => {
  const blogData: BlogData = {};

  const postsDirectory = path.join(process.cwd(), "_posts");

  const postFolders = fs.readdirSync(postsDirectory);

  if (OUTPUTLOG) console.log(postFolders);

  postFolders.forEach((folder) => {
    if (folder !== ".DS_Store") {
      const currentDirectory = path.join(postsDirectory, folder);

      try {
        if (OUTPUTLOG) console.log(fs.readdirSync(currentDirectory));

        const files = fs
          .readdirSync(currentDirectory)
          .filter((file) => file !== ".DS_Store" && file.endsWith(".md"))
          .map((file) => {
            const id = file.replace(".md", "");
            const filePath = path.join(currentDirectory, file);
            const markdownFile = fs.readFileSync(filePath, "utf8");
            const { data } = matter(markdownFile);

            if (data.draft === true) {
              return null;
            }

            const previewImage = `/posts/${folder}/preview-${id}.png`;

            return { ...data, id: id, preview: previewImage } as PostMetaData;
          })
          .filter((post) => post !== null) as PostMetaData[];

        files.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        blogData[folder] = files;
      } catch (error) {
        if (error instanceof DirectoryError) {
          console.error(
            `Error reading directory ${currentDirectory}: ${error.message}`
          );
        } else if (error instanceof Error) {
          console.error(
            `Error reading directory ${currentDirectory}: An unknown error occurred: ${error.message}`
          );
        } else {
          console.error(
            `Error reading directory ${currentDirectory}: An unknown error occurred.`
          );
        }
      }
    }
  });

  if (OUTPUTLOG) console.log(blogData);

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
  let postData: null | PostData = null;

  postFolders.some((folder) => {
    const filePath = path.join(postsDirectory, folder, id + ".md");
    if (fs.existsSync(filePath)) {
      const markdownFile = fs.readFileSync(filePath, "utf8");
      const { content, data } = matter(markdownFile);

      if (data.route.startsWith("www.")) {
        // Log the error message
        console.error(`Invalid Route Format: The provided route "${data.route}" starts with "www.", which is treated as an internal route. 
        Internal routes should be in the format "/route". External routes should start with "https://" or "http://".`);

        return true; // Stops the iteration once the file is found
      }

      postData = {
        content,
        title: data.title,
        route: data.route,
        tags: data.tags,
        date: data.date,
      };

      if (OUTPUTLOG) {
        console.log(postData);
      }

      return true; // Stops the iteration once the file is found
    }

    return false;
  });

  return {
    data: postData,
    revalidate: 86400,
  };
};

export const getProjects = async (): Promise<PostMetaData[]> => {
  const data = await basehub({ next: { revalidate: 30 } }).query({
    posts: {
      projects: {
        __args: {
          filter: {
            isPublished: true,
          },
        },
        _title: true,
        items: {
          _slug: true,
          _title: true,
          route: true,
          subtitle: true,
          coverImage: {
            rawUrl: true,
          },
          date: true,
          isPublished: true,
          tags: {
            items: {
              _title: true,
            },
          },
        },
      },
    },
  });

  const projects: PostMetaData[] = data.posts.projects.items.map((item) => ({
    title: item._title,
    subtitle: item.subtitle || "",
    route: item.route || "",
    date: item.date,
    tags: item.tags.items.map((tag) => tag._title), // Extract tag titles
    draft: !item.isPublished,
    id: item._slug, // Assuming the slug is a unique identifier
    preview: item.coverImage?.rawUrl || "/posts/missing.png",
  }));

  return projects;
};
