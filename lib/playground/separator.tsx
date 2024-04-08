import React from "react";
import { PlaygroundComponent } from ".";
import { Separator as FCSeparator } from "./fcs-ui/fcs-separator";

export function Separator() {
  return (
    <div className="w-full h-10">
      <FCSeparator text="Separate" />
    </div>
  );
}

export const Separator_Playground_Info: PlaygroundComponent = {
  component: Separator as React.ElementType,
  title: "FCS Separator",
  description:
    "Simple separator component with title for use in FCS UI components.",
  dependencies: ["shadcn/separator"],
  type: "component",
};
