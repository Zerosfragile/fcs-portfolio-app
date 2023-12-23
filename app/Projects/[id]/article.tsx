"use client";
import { HudDotNav } from "@/components/hud-ui";
import useCurrentHeading, {
  flattenDotNavItems,
} from "@/components/hud-ui/hooks/useCurrentHeading";
import { DotNavItem } from "@/components/hud-ui/huddotnav";
import { extractHTMLHeaders } from "@/lib/extractHeaders";
import { HeadingTagName } from "@/lib/extractHeaders/types";
import Link from "next/link";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

type Props = {
  html: string;
  title: string;
  date: string;
  tags: string[];
  route: string;
};

const ProjectArticle = ({ html, title, tags, date, route }: Props) => {
  const [headingElements, setHeadingElements] = useState<DotNavItem[]>([]);
  const currentHeading = useCurrentHeading(flattenDotNavItems(headingElements));
  const articleRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const headingSelector: HeadingTagName[] = ["h2", "h3"];
  //   if (articleRef.current) {
  //     const headers = Array.from(
  //       articleRef.current.querySelectorAll(headingSelector.join(", "))
  //     ) as HTMLElement[];
  //     setHeadingElements(
  //       extractHTMLHeaders({ elements: headers, headings: headingSelector })
  //     );
  //   }
  // }, [articleRef]);

  useLayoutEffect(() => {
    const headingSelector: HeadingTagName[] = ["h2", "h3"];
    if (articleRef.current) {
      const headers = Array.from(
        articleRef.current.querySelectorAll(headingSelector.join(", "))
      ) as HTMLElement[];
      setHeadingElements(
        extractHTMLHeaders({ elements: headers, headings: headingSelector })
      );
    }
  }, [articleRef]);

  return (
    <>
      <nav className="cubic fixed left-0 top-[20%] m-0 ml-16 flex w-[280px] flex-col max-md:hidden">
        <p className="font-[CygnitoMono-011] text-[15px] font-bold uppercase text-LunarGrey">
          <span className="opacity-75">Project: </span> {title}
        </p>
        <p className="font-[CygnitoMono-011] text-[15px] font-bold uppercase text-LunarGrey">
          <span className="opacity-75">DATE: </span> {date.split("T")[0]}
        </p>
        <div className="my-[20px] flex max-w-[80%] flex-wrap justify-start gap-x-4 gap-y-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-[5px] border border-OffWhite/[.33] px-[1.5em] py-[0.25em] text-center font-[CygnitoMono-011] text-[10px] font-bold uppercase leading-[1em] text-LunarGrey-light"
            >
              {tag}
            </span>
          ))}
        </div>
        <HudDotNav data={headingElements} focusedSection={currentHeading} />
        <Link
          href={route || "/"}
          className="
            transition-margin ease min-w-[50px] max-w-[200px] rounded-xl border border-OffWhite bg-OffWhite px-8 py-1 text-center
            font-[CygnitoMono-011] text-[15px] font-bold uppercase text-VoidBlack-lightest no-underline
            transition-all duration-[250ms] hover:bg-transparent hover:text-OffWhite/[.66]
          "
        >
          Visit Project
        </Link>
      </nav>
      <article
        ref={articleRef}
        className="hud-border prose prose-offwhite my-6 overflow-x-hidden p-11 max-lg:border-hidden md:max-w-[calc(100%-350px)] 2xl:ml-[calc(280px+4rem-8px)] 2xl:mr-[15%] 2xl:prose-h1:text-[4em]"
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <Link
          href={route || "/"}
          className="
            transition-margin ease w-full rounded-xl border border-OffWhite bg-OffWhite px-8 py-2 text-center
            font-[CygnitoMono-011] text-[15px] font-bold uppercase text-VoidBlack-lightest no-underline
            transition-all duration-[250ms] hover:bg-transparent hover:text-OffWhite/[.66] md:hidden
          "
        >
          Visit Project
        </Link>
        <div className="min-h-[50px]" />
      </article>
    </>
  );
};

export default ProjectArticle;
