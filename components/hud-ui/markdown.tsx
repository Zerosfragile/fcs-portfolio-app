import React from "react";
import MarkdownIt from "markdown-it";
import emoji from "markdown-it-emoji";
import styles from "./markdown.module.css";

type Props = { content: any };

const md = new MarkdownIt();
md.use(emoji);
md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
  const headerClass = `header-${tokens[idx].tag}`;
  return `<${tokens[idx].tag} class="${headerClass}" id="${tokens[idx].content
    .replace(/\s+/g, "-")
    .toLowerCase()}">`;
};

const MarkdownPost = ({ content }: Props) => {
  const headings: any[] = [];

  md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
    const headerClass = `header-${tokens[idx].tag}`;
    const content = tokens[idx + 1].content;
    const slug = content.replace(/\s+/g, "-").toLowerCase();
    headings.push({ level: tokens[idx].tag, content, slug });
    return `<${tokens[idx].tag} class="${headerClass}" id="${slug}">`;
  };

  let html = "";
  if (typeof content === "string") {
    html = md.render(content);
  } else {
    console.error("Content is not a string:", content);
  }
  const filteredHeadings = headings.filter(
    (h) => h.level === "h2" || h.level === "h3"
  );
  return (
    <div
      className={styles.markdown}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownPost;
