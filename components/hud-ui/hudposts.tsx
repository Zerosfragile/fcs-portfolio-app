// ProjectContainer.jsx
"use client";
import React, { useRef, RefObject, useState, useEffect } from "react";
import Image from "next/image";
import { PostData, BlogData } from "@/lib/posts";
import { getBlogData } from "@/lib/posts.ts";

const Card = ({ data }) => {
  const { title, subtitle, preview, route, slug } = data;

  return (
    <a
      href={`/projects/${slug}`}
      className="
        card-hover-glow relative flex h-[260px] w-[300px] cursor-pointer flex-col rounded-[10px] 
        bg-OffWhite/[.33]
      "
    >
      <div className="absolute inset-[1px] z-[2] flex grow flex-col rounded-[10px] bg-VoidBlack p-[10px]">
        <div className="flex h-[140px] items-center justify-center overflow-hidden">
          <Image
            src={preview}
            alt={`${title} preview`}
            height={140}
            width={265}
          />
        </div>
        <div className="flex grow flex-col items-center justify-start overflow-hidden rounded-md px-[5px] py-0">
          <h3 className="text-center font-[CygnitoMono-011] text-[1.1em] font-light leading-5 text-OffWhite/[0.66]">
            {title}
          </h3>
          <h4 className="mt-2 text-center font-[CygnitoMono-011] text-[0.75em] font-light text-OffWhite/50">
            {subtitle}
          </h4>
        </div>
      </div>
    </a>
  );
};

interface Props {
  posts: string;
  limit?: number;
}

async function getPostData() {
  const postData: BlogData = await getBlogData();
  return postData;
}

const HudPosts = ({ posts }: Props) => {
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
    return <div>Loading...</div>;
  }
  return (
    <div className="flex w-full items-center justify-center">
      <div
        className="hud-border group m-[18px] flex min-w-[calc(100%-36px)] flex-wrap justify-center gap-4 p-[25px]"
        ref={cardParentRef}
        onMouseMove={(e) => handleMouseMove(e, cardParentRef)}
      >
        {postData[posts] &&
          postData[posts].map((projectsData: PostData, index: number) => (
            <Card key={index} data={projectsData} />
          ))}
      </div>
    </div>
  );
};

const handleMouseMove = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ref: RefObject<HTMLDivElement>
) => {
  if (!ref.current) {
    return;
  }
  const cards = Array.from(ref.current.children) as HTMLDivElement[];

  for (const card of cards) {
    const rect = card.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
};

export default HudPosts;

// add limit
