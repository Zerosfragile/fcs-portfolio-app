import { ReactElement } from "react";
import { StackItem, HeadingTagName, DotNavItem } from "./types";
import { Node } from "hast";
import { selectAll } from "hast-util-select";
import { toString } from "hast-util-to-string";

interface ExtractHeadersOptions {
  headings: HeadingTagName[];
}

interface ExtractReactHeadersOptions extends ExtractHeadersOptions {
  node: ReactElement;
}

interface ExtractHTMLHeadersOptions extends ExtractHeadersOptions {
  elements: HTMLElement[];
}

export function extractHASTHeaders({
  headings = ["h2", "h3"],
}: ExtractHeadersOptions) {
  return (tree: Node) => {
    const headers: DotNavItem[] = [];
    const headerStack: StackItem[] = [];

    const nodes = getNodes(headings, tree);
    nodes.forEach((node) => processNode(node, headerStack, headers, headings));

    (tree as any).data = (tree as any).data || {};
    (tree as any).data.headers = headers;
  };
}

function getNodes(headings: HeadingTagName[], tree: Node): Node[] {
  const nodes: Node[] = [];
  headings.forEach((heading) => {
    const selectedNodes = selectAll(heading, tree as unknown as Node) as Node[];
    nodes.push(...selectedNodes);
  });
  return nodes.sort(
    (a, b) => (a.position?.start.offset || 0) - (b.position?.start.offset || 0)
  );
}

function processNode(
  node: Node,
  headerStack: StackItem[],
  headers: DotNavItem[],
  headings: HeadingTagName[]
) {
  if (node.tagName && node.position?.start.offset !== undefined) {
    const level = headings.indexOf(node.tagName as HeadingTagName);
    const item: DotNavItem = {
      label: toString(node),
      id: (node.properties?.id as string) || "",
    };

    while (
      headerStack.length > 0 &&
      headerStack[headerStack.length - 1].level >= level
    ) {
      headerStack.pop();
    }

    if (headerStack.length > 0) {
      const parentHeader = headerStack[headerStack.length - 1].header;
      if (!parentHeader.subitems) {
        parentHeader.subitems = [];
      }
      parentHeader.subitems.push(item);
    } else {
      headers.push(item);
    }

    headerStack.push({
      level,
      header: item,
      position: node.position.start.offset,
    });
  }
}

export function extractHTMLHeaders({
  elements,
  headings = ["h2", "h3"],
}: ExtractHTMLHeadersOptions) {
  const extractedHeaders: DotNavItem[] = [];
  const lowerCaseHeadings = headings.map((heading) => heading.toLowerCase());

  let lastParentItems = Array(lowerCaseHeadings.length).fill(null);

  elements.forEach((element) => {
    if (!(element instanceof HTMLElement)) {
      return;
    }

    const newItem = {
      label: element.innerText,
      id: element.id,
      offsetTop: element.offsetTop,
    };

    const index = lowerCaseHeadings.indexOf(element.tagName.toLowerCase());
    if (index === -1) {
      return;
    }

    if (index === 0) {
      extractedHeaders.push(newItem);
    } else {
      const parentItem = lastParentItems[index - 1];
      if (!parentItem) {
        return;
      }
      if (!parentItem.subitems) {
        parentItem.subitems = [];
      }
      parentItem.subitems.push(newItem);
    }

    lastParentItems[index] = newItem;
    for (let i = index + 1; i < lastParentItems.length; i++) {
      lastParentItems[i] = null;
    }
  });

  return extractedHeaders;
}
