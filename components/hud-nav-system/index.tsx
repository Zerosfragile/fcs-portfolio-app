import Container from "./exposed/container";
import Btn from "./exposed/btn";
import TypingLabel from "./internal/hn-btnlabel";

const HUDN = {
  container: Container, //Hud Nav Container
  btn: Btn, //nav expandable button
};

export { TypingLabel };

export type HNBreakpointText = {
  breakpoint: number;
  text: string;
};

export type HNSite = {
  title: string;
  route?: string;
  event?: string;
} & ({ event: string } | { route: string });

export type { EventHandlers } from "./exposed/container";

export default HUDN;
