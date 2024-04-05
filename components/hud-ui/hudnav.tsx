"use client";
import HUDN, { EventHandlers } from "@/components/hud-nav-system";
import { HUDButtonProps } from "../hud-nav-system/exposed/btn";

type Props = {
  eventHandlers: EventHandlers;
  config?: HUDButtonProps[][];
};

export const AboutMeButton: HUDButtonProps = {
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

export const ProjectsButton: HUDButtonProps = {
  defaultLabel: "Projects",
  route: "/projects",
  sites: [
    {
      title: "Ascii-Hud",
      route: "https://fragileservices.com",
    },
    {
      title: "Inspiration Vault",
      route: "/vault",
    },
    {
      title: "Playground",
      route: "/playground",
    },
    {
      title: "More",
      route: "/projects",
    },
  ],
};

export const VaultButton: HUDButtonProps = {
  labels: [{ breakpoint: 850, text: "Vault" }],
  defaultLabel: "Inspiration Vault",
  route: "/vault",
};

export const PlaygroundButton: HUDButtonProps = {
  labels: [
    { breakpoint: 350, text: "UI" },
    { breakpoint: 850, text: "Playground" },
  ],
  defaultLabel: "UI Playground",
  route: "/playground",
};

export const ContactButton: HUDButtonProps = {
  defaultLabel: "Contact",
  route: "/contact",
  sites: [
    {
      title: "Email",
      event: "showEmail",
    },
    {
      title: "Github",
      route: "https://github.com/zerofcs",
    },
    {
      title: "Linkedin",
      route: "https://www.linkedin.com/in/marcus-lim-b6a721260/",
    },
    {
      title: "More",
      route: "/contact",
    },
  ],
};

export const ResumeButton: HUDButtonProps = {
  defaultLabel: "Resume",
  route: "/about/resume",
  sites: [
    {
      title: "PDF View",
      route: "/about/resume/pdf",
    },
    {
      title: "More",
      route: "/about/resume",
    },
  ],
};

export const DefaultNavButtons: HUDButtonProps[][] = [
  [
    AboutMeButton,
    ProjectsButton,
    { ...VaultButton, className: "max-md:hidden" },
    {
      ...ContactButton,
      prefix: {
        breakpoint: 1100,
        text: "04 // ",
      },
      className: "md:hidden",
    },
  ],
  [
    {
      ...ContactButton,
      prefix: {
        breakpoint: 1100,
        text: "04 // ",
      },
      className: "max-md:hidden",
    },
    {
      ...ResumeButton,
      prefix: {
        breakpoint: 1100,
        text: "05 // ",
      },
      className: "max-md:hidden",
    },
  ],
];

export const HudNav = ({
  eventHandlers,
  config = DefaultNavButtons,
}: Props) => {
  return (
    <>
      {config.map((containers, index) => (
        <HUDN.container
          key={index}
          eventHandlers={eventHandlers}
          className={index > 0 ? "max-md:hidden" : ""}
        >
          {containers.map((btn) => (
            <HUDN.btn key={btn.route} {...btn} />
          ))}
        </HUDN.container>
      ))}
    </>
  );
};
