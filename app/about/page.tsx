"use client";
import Image from "next/image";
import { TypingLabel } from "@/components/hud-nav-system";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn, formatNumberWithLeadingZeros } from "@/lib/utils";
import {
  TeamMember,
  teamMembers,
  teamMembers as user,
} from "@/lib/extractHeaders/types";

import { useRouter } from "next/navigation";
import { HudEmail, HudNavAbout } from "@/components/hud-ui";
import useScrollDirection from "@/components/hud-ui/hooks/useScrollDirection";
import { isMobile } from "react-device-detect";
import TranslateWrapper from "@/components/hud-ui/translatewrapper";
import { EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";
import router from "next/router";
import { Button } from "@/components/ui/button";
import { tags } from "@/lib/marcus";

export default function About() {
  const [loading, setLoading] = useState(false);
  const [userInit, setUserInit] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  useScrollDirection(showNav, setShowNav, 100, userInit);

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

  if (loading) return <Initializing />;
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
              ? "h-[calc(100svh-129px)] max-md:h-[calc(100svh-130px-2em)]"
              : "h-[calc(100vh-129px)] max-md:h-[calc(100vh-130px-2em)]"
            : isMobile
            ? "h-[calc(100svh-39px)]"
            : "h-[calc(100vh-39px)]"
        )}
      >
        <div className="w-full h-full">
          <AnimatePresence mode="wait">
            {userInit ? (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 100 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
              >
                <AboutContent setShowNav={setShowNav} />
              </motion.div>
            ) : (
              <motion.div
                key="initQuote"
                initial={{ opacity: 0 }}
                animate={{ opacity: 100 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
              >
                <QuoteInitializing setInit={setUserInit} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {showNav && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 100, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
            className="hud-border max-md:align-center bottom-0 flex h-[75px] items-center justify-between text-center max-md:h-[calc(calc(75px+2em))] max-md:flex-wrap max-md:justify-center max-md:overflow-hidden max-md:p-4"
          >
            <HudNavAbout eventHandlers={eventHandlers} />
          </motion.div>
        )}
      </AnimatePresence>
      <HudEmail open={{ state: openEmail, set: setOpenEmail }} />
    </div>
  );
}

const AboutContent = ({
  setShowNav,
}: {
  setShowNav: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="w-full flex justify-center ">
      <div className="max-md:max-w-[800px] md:min-w-[400px] h-full flex flex-wrap justify-center my-10 mx-10 relative">
        <div className="w-full">
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none text-left">
              Marcus Lim
            </h4>
            <p className="text-sm text-muted-foreground text-left">About Me</p>
            <TranslateWrapper
              wrapperClassName="max-w-[500px] w-[80vw]"
              className="py-2 gap-x-4 gap-y-1 w-full "
              repeat={3}
              duration={20}
            >
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-[5px] border border-OffWhite/[.33] px-[1.5em] py-[0.25em] text-center font-[CygnitoMono-011] text-[10px] font-bold uppercase leading-[1em] text-LunarGrey-light text-balance whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </TranslateWrapper>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-wrap max-w-[500px] w-[80vw] text-left text-muted-foreground items-center">
            <p className="flex items-center flex-wrap">I&lsquo;m </p>
            <span className="mx-2 text-foreground uppercase font-[cygnitomono-011]">
              Marcus
            </span>
            , a{" "}
            <span className="mx-2 rounded-[5px] border border-OffWhite/[.33] px-[1.5em] py-[0.25em] text-center font-[CygnitoMono-011] text-[10px] font-bold uppercase leading-[1em] text-LunarGrey-light text-balance whitespace-nowrap">
              Full Stack Developer
            </span>
            , specializing in crafting creative solutions using a modern tech
            stack that includes
            <span className="mx-2 rounded-[5px] border border-OffWhite/[.33] px-[1.5em] py-[0.25em] text-center font-[CygnitoMono-011] text-[10px] font-bold uppercase leading-[1em] text-LunarGrey-light text-balance whitespace-nowrap">
              Next.js
            </span>
            ,{" "}
            <span className="mx-2 rounded-[5px] border border-OffWhite/[.33] px-[1.5em] py-[0.25em] text-center font-[CygnitoMono-011] text-[10px] font-bold uppercase leading-[1em] text-LunarGrey-light text-balance whitespace-nowrap">
              TypeScript
            </span>
            ,{" "}
            <span className="mx-2 rounded-[5px] border border-OffWhite/[.33] px-[1.5em] py-[0.25em] text-center font-[CygnitoMono-011] text-[10px] font-bold uppercase leading-[1em] text-LunarGrey-light text-balance whitespace-nowrap">
              Tailwind
            </span>
            , and
            <span className="mx-2 rounded-[5px] border border-OffWhite/[.33] px-[1.5em] py-[0.25em] text-center font-[CygnitoMono-011] text-[10px] font-bold uppercase leading-[1em] text-LunarGrey-light text-balance whitespace-nowrap">
              Planetscale
            </span>
            , all hosted on{" "}
            <span className="mx-2 rounded-[5px] border border-OffWhite/[.33] px-[1.5em] py-[0.25em] text-center font-[CygnitoMono-011] text-[10px] font-bold uppercase leading-[1em] text-LunarGrey-light text-balance whitespace-nowrap">
              Vercel
            </span>
            .
            <p>
              My expertise isn&lsquo;t just limited to new technologies;
              I&lsquo;ve contributed to products attracting 175K monthly
              impressions and businesses generating over $2 million in sales,
              utilizing stacks like React and Node.js, as well as e-commerce
              platforms like OpenCart.
            </p>
            <p>
              My roles have facilitated interactions with diverse stakeholders,
              including businessmen, engineers, technical leads, content
              creators, creatives, and medical professionals.
            </p>
            <br />
            <p>
              As I advance my academic pursuits, I&lsquo;m eager to expand my
              portfolio and collaborate with talented individuals and teams.
            </p>
            <p>
              I&lsquo;m open to professional and networking opportunities to
              further hone my skills. Outside of tech, I&lsquo;m intrigued by
              philosophy, particularly its connections to the arts and
              historical narratives.
            </p>
            <br />
            <p>
              If you&lsquo;ve read this far, feel free to
              <Link href={"/contact"}>
                <Button
                  variant="outline"
                  className="w-fit mx-2 uppercase font-[cygnitomono-011] text-xs"
                >
                  Get In Touch
                </Button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuoteInitializing = ({
  setInit,
}: {
  setInit: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group">
      <Link href={"/"}>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 100, y: 0 }}
          transition={{ duration: 1, delay: 3.5, ease: "easeInOut" }}
          // onClick={() => setInit(true)} //! REMOVE When Finished
          className="flex flex-col items-center justify-center p-6 w-full"
        >
          <Image
            src={"/images/056-Modern_Icons.png"}
            alt={""}
            width={75}
            height={75}
            className="opacity-10 invert transition-all duration-500 ease-linear group-hover:opacity-50"
          />
        </motion.button>
      </Link>
      <div className="font-[CygnitoMono-011] text-[11.25px] font-normal uppercase text-OffWhite/[.33] transition-all duration-500 ease-linear group-hover:text-OffWhite/[.66] text-center min-w-[90vw]">
        <motion.p
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 100, y: 0 }}
          transition={{ duration: 2.5 }}
        >
          To get something you never had
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 100, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
        >
          You Have to do something you have never done.
        </motion.p>
      </div>
    </div>
  );
};

const Initializing = ({
  route = "/",
  title = " Initializing Data Link...",
}: {
  route?: string;
  title?: string;
}) => {
  return (
    <div
      className="
      bg-black hud-border ease relative flex h-[calc(100vh-39px)] justify-center overflow-x-hidden
      text-center duration-500 ease-cubic
    "
    >
      <div className="ease m-8 flex h-fit w-full cursor-default justify-between font-[CygnitoMono-011] font-light text-OffWhite/[.05] duration-500 ease-cubic hover:text-OffWhite/[.15]">
        <p>CODE</p>
        <p>PROJECTS</p>
        <p>DESIGN</p>
      </div>
      <div className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Link
          href={route}
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
          <TypingLabel text={title} />
        </p>
      </div>
    </div>
  );
};

//About me
