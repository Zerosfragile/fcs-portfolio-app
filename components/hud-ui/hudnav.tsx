import HUDN, { EventHandlers } from "@/components/hud-nav-system";

type Props = {
  eventHandlers: EventHandlers;
};

const HudNav = ({ eventHandlers }: Props) => {
  return (
    <>
      <HUDN.container eventHandlers={eventHandlers}>
        <HUDN.btn
          labels={[{ breakpoint: 850, text: "About" }]}
          defaultLabel="About Me"
          route="/About"
          sites={[
            {
              title: "Blog Posts",
              route: "/Blog",
            },
            {
              title: "Github",
              route: "https://github.com/Zerosfragile",
            },
            {
              title: "More",
              route: "/About",
            },
          ]}
        />
        <HUDN.btn
          defaultLabel="Projects"
          route="/Projects"
          sites={[
            {
              title: "Ascii-Hud",
              route: "https://fragileservices.com",
            },
            {
              title: "Playground",
              route: "/Projects/playground",
            },
            {
              title: "More",
              route: "/Projects",
            },
          ]}
        />
        <HUDN.btn
          defaultLabel="Resume"
          route="/Resume"
          sites={[
            {
              title: "PDF View",
              route: "/Resume/pdf",
            },
            {
              title: "More",
              route: "/Resume",
            },
          ]}
        />
      </HUDN.container>
      <HUDN.container eventHandlers={eventHandlers}>
        <HUDN.btn
          prefix={{
            breakpoint: 1100,
            text: "04 // ",
          }}
          defaultLabel="Contact"
          route="/contact"
          sites={[
            {
              title: "Email",
              event: "showEmail",
            },
            {
              title: "Github",
              route: "https://github.com/Zerosfragile",
            },
            {
              title: "Linkedin",
              route: "https://www.linkedin.com/in/marcus-lim-b6a721260/",
            },
            {
              title: "More",
              route: "/contact",
            },
          ]}
        />
        <HUDN.btn
          prefix={{
            breakpoint: 1100,
            text: "05 // ",
          }}
          defaultLabel="Refresh"
          event="refresh"
          sites={[]}
        />
      </HUDN.container>
    </>
  );
};

export default HudNav;
