"use client";
import React, {
  createElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "./markdown.module.css";
import Link from "next/link";
import HudDotNav, { DotNavItem } from "@/components/hud-ui/huddotnav";

// Markdown Parsing Packages
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";

import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import rehypeExtractHeaders from "@/lib/rehypeExtractHeaders";
import useCurrentHeading from "@/components/hud-ui/hooks/useCurrentHeading";
import rehypeReact from "rehype-react";

type Props = {
  data: {
    content: any;
    title: string;
    date: string;
    tags: string[];
    route: string;
  };
};

const normalizeList = (list: number[]) => {
  var min = Math.min(...list);
  var max = Math.max(...list);
  return list.map(function (value) {
    return (value - min) / (max - min);
  });
};

const MarkdownPost = ({
  data: { content, date, tags, route, title },
}: Props) => {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSanitize)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeReact, { createElement });

  const htmlMarkdown = processor.processSync(content).result;

  // const navItems: DotNavItem[] = result.data?.headers
  //   ? (result.data as any).headers
  //   : [];

  const [headingElements, setHeadingElements] = useState<Element[]>([]);
  const [currentHeading, setCurrentHeading] = useState<string | null>(null);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headingSelector = ["h2", "h3"].join(", ");
    if (articleRef.current) {
      const headers = Array.from(
        articleRef.current.querySelectorAll(headingSelector)
      );
      console.log(headers.every((header) => header.isConnected));
      console.log(headers);
      setHeadingElements(headers);
    }
  }, [articleRef]);

  return (
    <div className="hud-border relative flex h-full min-h-[calc(100vh-38px)] justify-end">
      <nav className="cubic fixed left-0 top-[20%] m-0 ml-16 flex w-[300px] flex-col">
        <p className="font-[CygnitoMono-011] text-[15px] font-bold uppercase text-LunarGrey">
          <span className="opacity-75">Project: </span> {title}
        </p>
        <p className="font-[CygnitoMono-011] text-[15px] font-bold uppercase text-LunarGrey">
          <span className="opacity-75">DATE: </span> {date}
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
        {/* <HudDotNav data={navItems} focusedSection={currentHeading} /> */}
        <a
          href={route}
          className="
            transition-margin ease min-w-[50px] max-w-[180px] rounded-xl border border-OffWhite bg-OffWhite px-8 py-1 text-center
            font-[CygnitoMono-011] text-[15px] font-bold uppercase text-VoidBlack-lightest no-underline
            transition-all duration-[250ms] hover:bg-transparent hover:text-OffWhite/[.66]
          "
        >
          Vist Project
        </a>
      </nav>
      <article
        ref={articleRef}
        className="hud-border prose prose-offwhite my-6 max-w-[calc(100%-350px)] overflow-x-hidden p-11 max-lg:border-hidden xl:mx-[25%]"
        // dangerouslySetInnerHTML={{ __html: htmlMarkdown }}
      >
        {htmlMarkdown}
      </article>
    </div>
  );
};

export default MarkdownPost;
