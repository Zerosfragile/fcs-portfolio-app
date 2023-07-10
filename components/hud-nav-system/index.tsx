import Container from "./exposed/container";
import Btn from "./exposed/btn";

const HUDN = {
  container: Container, //Hud Nav Container
  btn: Btn, //nav expandable button
};

export type HNBreakpointText = {
  breakpoint: number;
  text: string;
};

export type HNSite = {
  title: string;
  route: string;
};

export default HUDN;
