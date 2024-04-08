import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: "string", required: true },
    subtitle: { type: "string", required: true },
    route: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    draft: { type: "boolean", required: true },
    date: { type: "date", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({ contentDirPath: "posts", documentTypes: [Post] });
