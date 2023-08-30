import { getBlogData, getPost } from "@/lib/posts";
import React from "react";
import { notFound } from "next/navigation";
import { HudMarkdown } from "@/components/hud-ui";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const posts = getBlogData();
  const { id } = params;
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

  return <HudMarkdown data={post.data} />;
}
