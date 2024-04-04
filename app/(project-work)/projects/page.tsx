"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BlogData, PostMetaData, getBlogData } from "@/lib/posts";
import HUDN, { EventHandlers, TypingLabel } from "@/components/hud-nav-system";
import { AnimatePresence, motion } from "framer-motion";
import {
  HudPostsCard,
  handleCardMouseMove,
  HudEmail,
} from "@/components/hud-ui";
import Link from "next/link";
import { isMobile } from "react-device-detect";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useScrollDirection } from "@/components/hud-ui/hooks";

async function getPostData() {
  const postData: BlogData = await getBlogData();
  return postData;
}

const Loading = () => {
  return (
    <div
      className={cn(
        " bg-black hud-border ease relative flex justify-center overflow-x-hidden text-center duration-500 ease-cubic",
        isMobile ? "h-[calc(100svh-39px)]" : "h-[calc(100vh-39px)]"
      )}
    >
      <div className="ease m-8 flex h-fit w-full cursor-default justify-between font-[CygnitoMono-011] font-light text-OffWhite/[.05] duration-500 ease-cubic hover:text-OffWhite/[.15]">
        <p>CODE</p>
        <p>PROJECTS</p>
        <p>DESIGN</p>
      </div>
      <div className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Link
          href={"/projects"}
          className="  flex flex-col items-center justify-center"
        >
          <Image
            src={"/images/056-Modern_Icons.png"}
            alt={""}
            width={75}
            height={75}
            className="opacity-10 invert transition-all duration-500 ease-linear group-hover:opacity-50"
          />
        </Link>
        <p
          className="m-6
          font-[CygnitoMono-011] text-[11.25px] font-normal uppercase text-OffWhite/[.33] transition-all duration-500 ease-linear group-hover:text-OffWhite/[.66]"
        >
          <TypingLabel text={" Initializing Data Link..."} />
        </p>
      </div>
    </div>
  );
};

export default function Projects() {
  const [postData, setPostData] = useState<PostMetaData[] | null>(null);
  const [showNav, setShowNav] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  useScrollDirection(showNav, setShowNav, 100, true);
  const cardParentRef = useRef<HTMLDivElement>(null);

  const eventHandlers = {
    showEmail: () => {
      console.log(openEmail);
      setOpenEmail((prev) => !prev);
    },
    toggle: () => {
      console.log(showNav);
      setShowNav((prev) => !prev);
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostData();
      setPostData(data["projects"]);
    };
    fetchData();
  }, []);

  if (!postData) {
    return <Loading />;
  }
  return (
    <div
      className={cn(
        "overflow-hidden",
        isMobile
          ? "h-[calc(100svh)] w-[calc(100svw)]"
          : "w-[calc(100vw)] h-[calc(100vh)]"
      )}
    >
      <div
        className={cn(
          "bg-black hud-border ease relative flex justify-center overflow-x-hidden text-center duration-500 ease-cubic",
          showNav
            ? isMobile
              ? "h-[calc(100svh-129px)]"
              : "h-[calc(100vh-129px)]"
            : isMobile
            ? "h-[calc(100svh-39px)]"
            : "h-[calc(100vh-39px)]"
        )}
      >
        <AnimatePresence>
          {postData ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 100 }}
              exit={{ opacity: 0 }}
              className="flex h-full w-full flex-wrap gap-4 p-[25px] justify-center"
              ref={cardParentRef}
              onMouseMove={(e) => handleCardMouseMove(e, cardParentRef)}
            >
              {postData.map((projectsData: PostMetaData, index: number) => (
                <HudPostsCard key={index} data={projectsData} />
              ))}
            </motion.div>
          ) : (
            [1, 2, 3, 4, 5, 6].map((_, index) => (
              <Skeleton
                key={index}
                className="h-[260px] w-[300px] cursor-pointer flex-col rounded-[10px]"
              />
            ))
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {showNav && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 100, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
            className="hud-border max-md:align-center bottom-0 flex h-[75px] items-center justify-between text-center max-md:flex-wrap max-md:justify-center max-md:overflow-hidden max-md:p-4"
          >
            <HudNav eventHandlers={eventHandlers} />
          </motion.div>
        )}
      </AnimatePresence>
      <HudEmail open={{ state: openEmail, set: setOpenEmail }} />
    </div>
  );
}

const HudNav = ({ eventHandlers }: { eventHandlers: EventHandlers }) => {
  return (
    <>
      <HUDN.container eventHandlers={eventHandlers}>
        <HUDN.btn
          labels={[{ breakpoint: 850, text: "About" }]}
          defaultLabel="About Me"
          route="/about"
          sites={[
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
          route="/projects"
          sites={[
            {
              title: "Ascii-Hud",
              route: "https://fragileservices.com",
            },
            {
              title: "Inspiration Vault",
              route: "/vault",
            },
            // {
            //   title: "Playground",
            //   route: "/Projects/playground",
            // },
            {
              title: "More",
              route: "/projects",
            },
          ]}
        />
        <HUDN.btn
          defaultLabel="Resume"
          route="/about/resume"
          sites={[
            {
              title: "PDF View",
              route: "/about/resume/pdf",
            },
            {
              title: "More",
              route: "/about/resume",
            },
          ]}
          className="max-md:hidden"
        />
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
          ]}
          className="md:hidden"
        />
      </HUDN.container>
      <HUDN.container eventHandlers={eventHandlers} className="max-md:hidden">
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
          ]}
          className="max-md:hidden"
        />
        <HUDN.btn
          prefix={{
            breakpoint: 1100,
            text: "05 // ",
          }}
          defaultLabel="Refresh"
          event="refresh"
          sites={[]}
          className="max-md:hidden"
        />
      </HUDN.container>
    </>
  );
};
