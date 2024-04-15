"use server";

// import fs from "fs";
import path from "path";
import matter from "gray-matter";
import fs from "fs/promises";

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

export const getBlogData = async (
  key?: string,
  numPosts?: number
): Promise<BlogData> => {
  const blogData: BlogData = {};
  const postsDirectory = path.join(process.cwd(), "_posts");

  try {
    const postFolders = await fs.readdir(postsDirectory);

    if (OUTPUTLOG) console.log(postFolders);

    for (const folder of postFolders) {
      if (folder !== ".DS_Store") {
        if (folder == "refactor" || folder == ".obsidian") {
          continue;
        }
        const currentDirectory = path.join(postsDirectory, folder);

        try {
          const directoryFiles = await fs.readdir(currentDirectory);
          if (OUTPUTLOG) console.log(directoryFiles);

          const files = (
            await Promise.all(
              directoryFiles
                .filter((file) => file !== ".DS_Store" && file.endsWith(".md"))
                .map(async (file) => {
                  const id = file.replace(".md", "");
                  const filePath = path.join(currentDirectory, file);
                  const markdownFile = await fs.readFile(filePath, "utf8");
                  const { data } = matter(markdownFile);

                  if (data.draft === true) {
                    return null;
                  }

                  const previewImage = `/posts/${folder}/preview-${id}.png`;
                  return { ...data, id, preview: previewImage } as PostMetaData;
                })
            )
          ).filter((post) => post !== null) as PostMetaData[];

          files.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          blogData[folder] = files;
        } catch (error) {
          console.error(
            `Error reading directory ${currentDirectory}: ${
              error instanceof Error
                ? error.message
                : "An unknown error occurred."
            }`
          );
        }
      }
    }
  } catch (error) {
    console.error(
      `Error reading posts directory: ${
        error instanceof Error ? error.message : "An unknown error occurred."
      }`
    );
  }

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

export const getPost = async (
  id: string
): Promise<{ data: null | PostData; revalidate: number }> => {
  const postsDirectory = path.join(process.cwd(), "_posts");
  let postData: null | PostData = null;

  try {
    const postFolders = await fs.readdir(postsDirectory);

    for (const folder of postFolders) {
      const filePath = path.join(postsDirectory, folder, `${id}.md`);
      try {
        // Check if the file exists
        await fs.access(filePath);
        // Read the file if it exists
        const markdownFile = await fs.readFile(filePath, "utf8");
        const { content, data } = matter(markdownFile);

        if (data.route.startsWith("www.")) {
          console.error(`Invalid Route Format: The provided route "${data.route}" starts with "www.", which is treated as an internal route. 
          Internal routes should be in the format "/route". External routes should start with "https://" or "http://".`);
          break; // Exit the loop early
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

        break; // Exit the loop once the file is found and processed
      } catch (error) {
        // File does not exist or other error, continue to the next iteration
        continue;
      }
    }
  } catch (error) {
    console.error(
      `Error accessing posts directory: ${
        error instanceof Error ? error.message : "An unknown error occurred."
      }`
    );
  }

  return {
    data: postData,
    revalidate: 86400,
  };
};
