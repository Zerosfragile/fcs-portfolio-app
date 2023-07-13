import { Node } from "unist";

/**
 * The `tagName` property of HTML heading nodes
 */
export type HeadingTagName = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * An HTML element node
 */
export interface HtmlElementNode extends Node {
  type: "element";
  tagName: string;
  properties: {
    [prop: string]: string | undefined;
  };
  children?: Node[];
}

/**
 * Simple node that is turns into a text literal
 */
export interface TextNode extends Node {
  type: "text";
  value: string;
}

/**
 * An HTML heading node (i.e. <h1>, <h2>, etc.)
 */
export interface HeadingNode extends HtmlElementNode {
  tagName: HeadingTagName;
}

export type DotNavItem = {
  label: string; // label name as a string
  id: string; // used to navigate to header
  subitems?: DotNavItem[]; // array of subitems, each of type DotNavItem
};
