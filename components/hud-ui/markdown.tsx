"use client";
import React, { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import emoji from "markdown-it-emoji";
import styles from "./markdown.module.css";
import Link from "next/link";

type Props = {
  data: {
    content: any;
    title: string;
    date: string;
    tags: string[];
    route: string;
  };
};

const md = new MarkdownIt();
md.use(emoji);
md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
  const headerClass = `header-${tokens[idx].tag}`;
  return `<${tokens[idx].tag} class="${headerClass}" id="${tokens[idx].content
    .replace(/\s+/g, "-")
    .toLowerCase()}">`;
};

const toRomanNumeral = (num) => {
  const romanNumerals = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];
  let result = "";
  romanNumerals.forEach(([letter, value]) => {
    while (num >= value) {
      result += letter;
      num -= value;
    }
  });
  return result;
};

const normalizeList = (list) => {
  var min = Math.min(...list);
  var max = Math.max(...list);
  return list.map(function (value) {
    return (value - min) / (max - min);
  });
};

const MarkdownPost = ({
  data: { content, date, tags, route, title },
}: Props) => {
  const headings: any[] = [];
  const [focusedSection, setFocusedSection] = useState(null);

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

  const handleScroll = () => {
    // Get the current scroll position
    const scrollTop = window.pageYOffset;

    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const maxScrollableHeight = documentHeight - windowHeight;

    // Calculate the top positions of each heading section
    const sectionTops = filteredHeadings.map((h) => {
      const element = document.getElementById(h.slug);
      return element ? element.getBoundingClientRect().top + scrollTop : 0;
    });

    // Normalize values to ensure focusability and smooth transitions between sections
    const normalizedScrollTop = (scrollTop / maxScrollableHeight).toFixed(4);
    const normalizedSectionTops = normalizeList(sectionTops).map(function (
      value
    ) {
      return Number(value.toFixed(2));
    });

    // Find the focusedIndex based on the closest normalizedSectionTop value
    let focusedIndex = 0;
    for (let i = normalizedSectionTops.length - 1; i >= 0; i--) {
      if (normalizedScrollTop >= normalizedSectionTops[i]) {
        focusedIndex = i;
        break;
      }
    }

    // Update the focusedSection state
    setFocusedSection(focusedIndex);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let secIndex = 1;
  let itemIndex = 1;
  const dotNavItems = filteredHeadings.map((h, i) => {
    const focusedStyle =
      i === focusedSection ? { opacity: "0.9", color: "var(--Grey)" } : {};
    let dotNavItem;
    if (h.level === "h2") {
      const matches = h.content.match(/^([IVXLCDM]+)\.\s+(.*)/i);
      const romanNumeral = matches ? toRomanNumeral(matches[1]) + ". " : "";
      dotNavItem = (
        <li key={h.slug} className={styles.header}>
          SEC.{toRomanNumeral(secIndex)}.{" "}
          <a href={`#${h.slug}`} style={focusedStyle}>
            {h.content.replace(/^([IVXLCDM]+)?\.\s+/i, "")}
          </a>
        </li>
      );
      secIndex++;
      itemIndex = 1;
    } else if (h.level === "h3") {
      dotNavItem = (
        <li key={h.slug}>
          {toRomanNumeral(secIndex - 1)}.{toRomanNumeral(itemIndex)}{" "}
          <a href={`#${h.slug}`} style={focusedStyle}>
            {h.content}
          </a>
        </li>
      );
      itemIndex++;
    }
    return dotNavItem;
  });

  return (
    <div className="hud-border relative w-auto overflow-x-hidden bg-VoidBlack">
      <Link href="/">
        <img
          id="img001"
          src="/images/001-Down_Hands.png"
          alt=""
          className={styles.IMG001}
        />
      </Link>
      <div className={styles.spacer}></div>
      <div className={styles.nav}>
        <div>
          <div className={styles.info}>
            <span>Project: </span>
            {title}
          </div>
          <div className={styles.info}>
            <span>DATE: </span>
            {date}
          </div>
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <nav className={styles.DotNav}>
          <ul>{dotNavItems}</ul>
        </nav>
        <a href={route} className={styles.vistBtn}>
          Vist Project
        </a>
      </div>
      <div
        className={styles.markdown}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <a href="#img001">
        <img
          src="/images/002-Large_Thumbs_Up.png"
          alt=""
          className={styles.IMG002}
        />
      </a>
    </div>
  );
};

export default MarkdownPost;
