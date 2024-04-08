import { HUDBTN_Playground_Info } from "./hud-btn";
import { Separator_Playground_Info } from "./separator";
import { CLIInput_Playground_Info } from "./cli-input";

export type PlaygroundComponent = {
  component: React.ElementType;
  title: string;
  description: string;
  dependencies: string[];
  type: "component";
};

type PlaygroundList = PlaygroundComponent[];

export const playground: PlaygroundList = [
  HUDBTN_Playground_Info,
  Separator_Playground_Info,
  CLIInput_Playground_Info,
];
