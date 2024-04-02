"use client";
import Image from "next/image";
import { TypingLabel } from "@/components/hud-nav-system";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HudEmail, HudNavAbout } from "@/components/hud-ui";
import useScrollDirection from "@/components/hud-ui/hooks/useScrollDirection";
import { isMobile } from "react-device-detect";
import { Separator } from "@radix-ui/react-separator";
import { Badge } from "@/components/ui/badge";

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
              ? "h-[calc(100svh-129px)]"
              : "h-[calc(100vh-129px)]"
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
                className="h-full"
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
            className="hud-border max-md:align-center bottom-0 flex h-[75px] items-center justify-between text-center max-md:flex-wrap max-md:justify-center max-md:overflow-hidden max-md:p-4"
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
    <div className="w-full h-fit flex justify-center ">
      <div className="max-md:max-w-[800px] md:min-w-[400px] h-full flex flex-wrap justify-center my-10 mx-10 relative">
        <div className="w-full h-full grid place-content-center">
          <div className="space-y-1">
            <Badge variant={"outline"} className="rounded-full py-1 px-4">
              About Me
            </Badge>
          </div>
          <Separator className="my-4" />
          <div className="max-w-[500px] w-[80vw] text-left text-muted-foreground items-center max-md:pb-10">
            <p>
              <b className="mr-2 text-OffWhite/75">
                Full Stack Developer, specializing in crafting creative
                solutions.
              </b>
              Currently, I&lsquo;m using a modern tech stack that includes
              Next.js, TypeScript and Tailwind.
            </p>
            <br />
            <p>
              I&lsquo;ve contributed to products attracting
              <span className="mx-1 text-OffWhite-dark/75 italic">
                175K monthly
              </span>
              impressions and businesses generating over
              <span className="mx-1 text-OffWhite-dark/75 italic">
                $2 million in sales,
              </span>
              utilizing stacks like React and Node.js, as well as e-commerce
              platforms like OpenCart.
            </p>
            <br />
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
              I&lsquo;m
              <b className="mx-1 text-OffWhite-dark/60">
                open to professional and networking opportunities
              </b>
              to further hone my skills.
            </p>
            <br />
            <p>
              If you&lsquo;ve read this far, feel free to
              <Link href={"/contact"}>
                <span className="font-[cygnitomono-011] underline underline-offset-2 font-thin text-OffWhite-dark/75 hover:text-OffWhite/90 transition-color duration-500 ease mx-2">
                  contact
                </span>
              </Link>
              me.
            </p>
            <br />
            <p>- Marcus Lim</p>
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
      {/* <Link href={"/"}> */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 100, y: 0 }}
        transition={{ duration: 1, delay: 3.5, ease: "easeInOut" }}
        onClick={() => setInit(true)} //! REMOVE When Finished
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
      {/* </Link> */}
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
