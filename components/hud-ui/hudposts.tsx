"use client";
import React, { useRef, useState, useEffect } from "react";
import { PostMetaData, BlogData } from "@/lib/posts";
import { getBlogData } from "@/lib/posts.ts";
import { TypingLabel } from "../hud-nav-system";
import { HudPostsCard, handleCardMouseMove } from "./hudpostscard";
import { cn } from "@/lib/utils";

interface Props {
  posts: string;
  limit?: number;
  className?: string;
}

async function getPostData() {
  const postData: BlogData = await getBlogData();
  return postData;
}

const HudPosts = ({ posts, className }: Props) => {
  const [postData, setPostData] = useState<BlogData | null>(null);
  const cardParentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostData();
      setPostData(data);
    };

    fetchData();
  }, []);

  if (!postData) {
    return (
      <div className="flex w-full items-center justify-center">
        <div
          className={cn(
            className,
            "hud-border group m-[18px] flex min-w-[calc(100%-36px)] flex-wrap justify-center gap-4 p-[25px]"
          )}
        >
          <p className="text-center font-[CygnitoMono-011] text-sm font-light leading-5 text-OffWhite/[0.66]">
            <TypingLabel text={" Initializing Data Link..."} />
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full items-center justify-center">
      <div
        className={cn(
          className,
          "hud-border group m-[18px] flex min-w-[calc(100%-36px)] flex-wrap justify-center gap-4 p-[25px]"
        )}
        ref={cardParentRef}
        onMouseMove={(e) => handleCardMouseMove(e, cardParentRef)}
      >
        {postData[posts] &&
          postData[posts].map((projectsData: PostMetaData, index: number) => (
            <HudPostsCard key={index} data={projectsData} />
          ))}
      </div>
    </div>
  );
};

export default HudPosts;

// add limit
