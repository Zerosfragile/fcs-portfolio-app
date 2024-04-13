import HUDN from "@/components/hud-nav-system";
import { HUDButtonProps } from "@/components/hud-nav-system/exposed/btn";
import React from "react";
import { PlaygroundComponent } from ".";

export function HUDBTN() {
  const eventHandlers = {
    nothing: () => {
      console.log("Nothing Happened!");
    },
  };

  const AboutMeButton: HUDButtonProps = {
    labels: [{ breakpoint: 850, text: "About" }],
    defaultLabel: "About Me",
    event: "nothing",
    sites: [
      {
        title: "Github",
        event: "nothing",
      },
      {
        title: "More",
        event: "nothing",
      },
    ],
  };

  const ProjectsButton: HUDButtonProps = {
    defaultLabel: "Projects",
    event: "nothing",
    sites: [
      {
        title: "Playground",
        event: "nothing",
      },
      {
        title: "See Project Archives",
        event: "nothing",
      },
    ],
  };

  return (
    <HUDN.container eventHandlers={eventHandlers}>
      <HUDN.btn {...AboutMeButton} />
      <HUDN.btn {...ProjectsButton} />
    </HUDN.container>
  );
}

export const HUDBTN_Playground_Info: PlaygroundComponent = {
  component: HUDBTN as React.ElementType,
  title: "HUD Button",
  description:
    "An expanding container for navigation buttons with dropdowns using a composable composite component system.",
  dependencies: ["framer-motion", "react", "clsx", "tailwind-merge"],
  type: "component",
};
