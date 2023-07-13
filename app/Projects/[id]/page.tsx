import { getBlogData, getPost } from "@/lib/posts";
import React from "react";
import { notFound } from "next/navigation";
import MarkdownPost from "@/components/hud-ui/markdown";
import remarkHtml from "remark-html";
import { unified } from "unified";
import remarkParse from "remark-parse";
import HudDotNav, { DotNavItem } from "@/components/hud-ui/huddotnav";
import { JSDOM } from "jsdom";

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

async function extractHeaders(content: string): Promise<DotNavItem[]> {
  const dom = new JSDOM(content);
  let navItems: DotNavItem[] = [];
  const h2Elements = dom.window.document.getElementsByTagName("h2");
  for (let i = 0; i < h2Elements.length; i++) {
    let navItem: DotNavItem = {
      label: h2Elements[i].textContent || "",
      id: h2Elements[i].id,
    };
    let sibling = h2Elements[i].nextElementSibling;
    let subitems: DotNavItem[] = [];
    while (sibling) {
      if (sibling.tagName.toLowerCase() === "h3") {
        subitems.push({
          label: sibling.textContent || "",
          id: sibling.id,
        });
      } else if (sibling.tagName.toLowerCase() === "h2") {
        break;
      }
      sibling = sibling.nextElementSibling;
    }
    if (subitems.length > 0) {
      navItem.subitems = subitems;
    }
    navItems.push(navItem);
  }
  return navItems;
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

  const htmlMarkdown = String(vMarkdown); //extract from here, will be html
  const navItems = await extractHeaders(htmlMarkdown);
  console.log(navItems);

  return (
    <div className="hud-border relative flex h-full justify-end">
      <nav className="cubic fixed left-0 top-[20%] m-0 ml-16 flex w-[300px] flex-col">
        <p className="font-[CygnitoMono-011] text-[15px] font-bold uppercase text-LunarGrey">
          <span className="opacity-75">Project: </span> {post.data.title}
        </p>
        <p className="font-[CygnitoMono-011] text-[15px] font-bold uppercase text-LunarGrey">
          <span className="opacity-75">DATE: </span> {post.data.date}
        </p>
        <div className="my-[20px] flex max-w-[80%] flex-wrap justify-start gap-x-4 gap-y-1">
          {post.data.tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-[5px] border border-OffWhite/[.33] px-[1.5em] py-[0.25em] text-center font-[CygnitoMono-011] text-[10px] font-bold uppercase leading-[1em] text-LunarGrey-light"
            >
              {tag}
            </span>
          ))}
        </div>
        <HudDotNav data={navItems} />
        <a
          href={post.data.route}
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
        className="hud-border prose prose-offwhite my-6 max-w-[calc(100%-350px)] overflow-x-hidden p-11 max-lg:border-hidden xl:mx-[25%]"
        dangerouslySetInnerHTML={{ __html: htmlMarkdown }}
      ></article>
    </div>
  );
}
