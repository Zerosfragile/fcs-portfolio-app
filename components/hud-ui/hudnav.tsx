import HUDN, { EventHandlers } from "@/components/hud-nav-system";

interface HudNavProps {
  eventHandlers?: EventHandlers;
}

const HudNav = ({
  eventHandlers = {
    showEmail: () => {
      console.log("email btn pressed");
    },
    refresh: () => {
      console.log("refresh btn pressed");
    },
  },
}: HudNavProps) => {
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
              route: "/blog",
            },
            {
              title: "Github",
              route: "https://github.com/Zerosfragile",
            },
            {
              title: "More",
              route: "/about",
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
              route: "/projects/playground",
            },
            {
              title: "More",
              route: "/projects",
            },
          ]}
        />
        <HUDN.btn
          defaultLabel="Resume"
          route="/Resume"
          sites={[
            {
              title: "PDF View",
              route: "/resume/pdf",
            },
            {
              title: "More",
              route: "/resume",
            },
          ]}
        />
      </HUDN.container>
      <HUDN.container>
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
