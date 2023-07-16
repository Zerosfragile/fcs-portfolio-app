"use client";
import React, {
  createElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import HudDotNav, { DotNavItem } from "@/components/hud-ui/huddotnav";
import { extractHTMLHeaders } from "@/lib/extractHeaders";

// Markdown Parsing Packages
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeReact from "rehype-react";
import { HeadingTagName } from "@/lib/extractHeaders/types";
import useCurrentHeading, {
  flattenDotNavItems,
} from "./hooks/useCurrentHeading";

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

  const [headingElements, setHeadingElements] = useState<DotNavItem[]>([]);
  const currentHeading = useCurrentHeading(flattenDotNavItems(headingElements));
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    <div>
      <Link href="/">
        <Image
          id="img001"
          src="/images/001-Down_Hands.png"
          alt=""
          width={250}
          height={250}
          className="
            ease absolute top-0 z-20 m-2 w-[10%] min-w-[150px] opacity-25 invert duration-500 ease-cubic
            hover:animate-shake-slow hover:opacity-75 max-sm:m-4 max-sm:min-w-[100px]
          "
        />
      </Link>
      <div className="hud-border relative flex h-full min-h-[calc(100vh-38px)] justify-end">
        <nav className="cubic fixed left-0 top-[20%] m-0 ml-16 flex w-[280px] flex-col max-sm:hidden">
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
          <HudDotNav data={headingElements} focusedSection={currentHeading} />
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
          className="hud-border prose prose-offwhite my-6 overflow-x-hidden p-11 max-lg:border-hidden sm:max-w-[calc(100%-350px)] 2xl:ml-[calc(280px+4rem-8px)] 2xl:mr-[15%] 2xl:prose-h1:text-[4em]"
        >
          {htmlMarkdown}
          <a
            href={route}
            className="
            transition-margin ease w-full rounded-xl border border-OffWhite bg-OffWhite px-8 py-2 text-center
            font-[CygnitoMono-011] text-[15px] font-bold uppercase text-VoidBlack-lightest no-underline
            transition-all duration-[250ms] hover:bg-transparent hover:text-OffWhite/[.66] sm:hidden
          "
          >
            Vist Project
          </a>
          <div className="min-h-[50px]" />
        </article>
        <a href="#img001">
          <Image
            src="/images/002-Large_Thumbs_Up.png"
            alt=""
            width={250}
            height={250}
            className="ease absolute bottom-0 right-0 m-2 w-[10%] min-w-[150px] max-w-[10%] opacity-25 invert duration-500 ease-cubic hover:animate-shake-slow hover:opacity-75 max-sm:min-w-[100px]"
          />
        </a>
      </div>
    </div>
  );
};

export default MarkdownPost;
