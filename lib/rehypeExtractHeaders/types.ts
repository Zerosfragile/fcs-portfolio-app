export type HeadingTagName = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type DotNavItem = {
  label: string; // label name as a string
  id: string; // used to navigate to header
  subitems?: DotNavItem[]; // array of subitems, each of type DotNavItem
};
export interface StackItem {
  level: number;
  header: DotNavItem;
  position: number;
}
