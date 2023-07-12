import { getBlogData, getPost } from "@/lib/posts";
import React from "react";
import { notFound } from "next/navigation";
import MarkdownPost from "@/components/hud-ui/markdown";
import remarkHtml from "remark-html";
import { unified } from "unified";
import remarkParse from "remark-parse";
import HudDotNav, { DotNavItem } from "@/components/hud-ui/huddotnav";

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

  const navItems: DotNavItem[] = [
    {
      label: "Home",
      id: "home",
    },
    {
      label: "Products",
      id: "products",
      subitems: [
        {
          label: "Electronics",
          id: "electronics",
        },
        {
          label: "Clothing",
          id: "clothing",
          subitems: [
            {
              label: "Men",
              id: "men",
            },
            {
              label: "Women",
              id: "women",
            },
          ],
        },
      ],
    },
  ];

  // return <MarkdownPost data={post.data} />;
  return (
    <div className="hud-border relative h-full">
      <HudDotNav data={navItems} />
      <article
        className="hud-border prose prose-stone my-6 w-full p-11"
        dangerouslySetInnerHTML={{ __html: htmlMarkdown }}
      ></article>
    </div>
  );
}
