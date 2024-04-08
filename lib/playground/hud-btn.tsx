import HUDN from "@/components/hud-nav-system";
import { HUDButtonProps } from "@/components/hud-nav-system/exposed/btn";
import React from "react";
import { PlaygroundComponent } from ".";

export function HUDBTN() {
  const AboutMeButton: HUDButtonProps = {
    labels: [{ breakpoint: 850, text: "About" }],
    defaultLabel: "About Me",
    route: "/about",
    sites: [
      {
        title: "Github",
        route: "https://github.com/Zerosfragile",
      },
      {
        title: "More",
        route: "/about",
      },
    ],
  };

  const ProjectsButton: HUDButtonProps = {
    defaultLabel: "Projects",
    route: "/projects",
    sites: [
      {
        title: "Playground",
        route: "/playground",
      },
      {
        title: "See Project Archives",
        route: "/projects",
      },
    ],
  };

  return (
    <HUDN.container>
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
