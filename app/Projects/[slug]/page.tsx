import { getBlogData } from "@/lib/posts";
import React from "react";
import { notFound } from "next/navigation";

export async function genertateMetadata({
  params,
}: {
  params: { id: string };
}) {
  const posts = getBlogData();
  const { id } = params;
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
  };
}

export default async function projectPost({
  params,
}: {
  params: { id: string };
}) {
  const posts = getBlogData()["projects"];
  const { id } = params;
  if (!posts.find((post) => post.id === id)) {
    return notFound();
  }
  return <div>page</div>;
}
