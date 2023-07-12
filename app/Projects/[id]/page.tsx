import { getBlogData, getPost } from "@/lib/posts";
import React from "react";
import { notFound } from "next/navigation";
import MarkdownPost from "@/components/hud-ui/markdown";
import remarkHtml from "remark-html";
import { unified } from "unified";
import remarkParse from "remark-parse";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const posts = getBlogData();
  const { id } = params;
  // const post = posts.find((post) => post.id === id);

  // if (!post) {
  //   return {
  //     title: "Post Not Found",
  //   };
  // }

  // return {
  //   title: post.title,
  // };
}

export default async function projectPost({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const posts = getBlogData()["projects"];
  if (!posts.find((post) => post.id === id)) {
    return notFound();
  }
  const post = getPost(id);

  if (!post.data) {
    return notFound();
  }

  const vMarkdown = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(post.data.content);

  const htmlMarkdown = String(vMarkdown);

  // return <MarkdownPost data={post.data} />;
  return (
    <>
      <article
        className="prose prose-stone"
        dangerouslySetInnerHTML={{ __html: htmlMarkdown }}
      ></article>
    </>
  );
}
