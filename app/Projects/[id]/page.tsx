import { getBlogData, getPost } from "@/lib/posts";
import React from "react";
import { notFound } from "next/navigation";
import { HudDotNav, HudMarkdown } from "@/components/hud-ui";
import { basehub } from "basehub";
import LoggedNavigationBTN from "@/components/hud-ui/loggednavigationbutton";
import Link from "next/link";
import Image from "next/image";
import ProjectArticle from "./article";

export default async function projectPost({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const data = await basehub({ next: { revalidate: 30 } }).query({
    posts: {
      projects: {
        __args: {
          filter: {
            _sys_slug: {
              matches: { pattern: id },
            },
            isPublished: true,
          },
        },
        _title: true,
        items: {
          _slug: true,
          _title: true,
          subtitle: true,
          route: true,
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
          author: {
            _slug: true,
            _title: true,
            avatar: {
              rawUrl: true,
            },
            name: true,
            role: true,
          },
          body: {
            html: {
              __args: {
                slugs: true,
              },
            },
            readingTime: true,
          },
        },
      },
    },
  });
  const post = data.posts.projects.items[0];
  if (!post || !post.body?.html) return notFound();

  const { _title: title, date, tags, route, body } = post;

  return (
    <ProjectArticle
      html={body.html}
      title={title}
      date={date}
      tags={tags.items.map((tag) => tag._title)}
      route={route || "/"}
    />
  );
}
