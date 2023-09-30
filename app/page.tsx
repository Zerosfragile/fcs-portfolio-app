"use client";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { HudEmail, HudPosts, HudNav } from "@/components/hud-ui";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import useScrollDirection from "@/components/hud-ui/hooks/useScrollDirection";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { isMobile } from "react-device-detect";
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from "@radix-ui/react-icons";

export default function Home() {
  const [openEmail, setOpenEmail] = useState(false);
  const [showNav, setShowNav]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false);
  const [logoVisible, setLogoVisible] = useState(true);
  useScrollDirection(showNav, setShowNav, 300, !logoVisible);

  const eventHandlers = {
    showEmail: () => {
      console.log(openEmail);
      setOpenEmail((prev) => !prev);
    },
  };

  useEffect(() => {
    // Set a timeout to change the state after 2 seconds
    const timeoutId = setTimeout(() => {
      setLogoVisible(false);
    }, 2000); // 2000 milliseconds = 2 seconds

    return () => clearTimeout(timeoutId);
  }, []);

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
          "bg-black hud-border ease relative flex justify-center overflow-x-hidden text-center duration-500 ease-cubic flex-wrap",
          showNav
            ? isMobile
              ? "h-[calc(100svh-129px)]"
              : "h-[calc(100vh-129px)]"
            : isMobile
            ? "h-[calc(100svh-39px)]"
            : "h-[calc(100vh-39px)]"
        )}
      >
        <div className="w-full flex flex-col justify-center items-center">
          <AnimatePresence mode="popLayout">
            {logoVisible && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{
                  opacity: 100,
                  y: 0,
                }}
                exit={{ opacity: 0, y: -500 }}
                transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
                key="FCS_Logo"
              >
                <Image
                  src="/images/FCS-Text-Logo-White.png"
                  alt=""
                  width={1700}
                  height={650}
                  className="opacity-50 max-sm:hidden"
                  style={{ objectFit: "contain" }}
                  priority
                />
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0, y: 250, width: "100%" }}
              animate={{
                opacity: 100,
                y: 0,
              }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 1.5, delay: 2, ease: "easeInOut" }}
              className={cn("flex justify-center", isMobile && "mt-10")}
              key="Subtitles"
            >
              <div className="flex w-[90%] justify-between font-[CygnitoMono-011] font-light text-OffWhite/[.33] duration-500 ease-cubic max-sm:mt-8 ease">
                <p>CODE</p>
                <p>PROJECTS</p>
                <p>DESIGN</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, width: "100%" }}
              animate={{ opacity: 100, y: 0, width: "90%" }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 1, delay: 4, ease: "easeInOut" }}
              className="my-20"
              key="cards"
            >
              <HudPosts posts={"projects"} />
            </motion.div>
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
            <HudNav eventHandlers={eventHandlers} />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!logoVisible && (
          <motion.div
            initial={{ opacity: 0, y: 250 }}
            animate={{ opacity: 100, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 2.5, delay: 0, ease: "easeInOut" }}
            className={cn(
              "absolute bottom-0 left-0 w-full justify-center transition-all duration-500 ease flex",
              showNav ? "mb-[100px]" : "mb-[25px]",
              isMobile && "hidden"
            )}
            key="face"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="hover:animate-pulse-slow">
                  <Image
                    src="/images/001-Down_Hands.png"
                    alt=""
                    className="ease opacity-25 invert duration-500 ease-cubic
               hover:opacity-75 max-sm:m-4 max-sm:w-[80px]"
                    width={150}
                    height={150}
                    style={{ objectFit: "contain" }}
                    onClick={() => setShowNav((prev) => !prev)}
                    priority
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="flex gap-2">
                    Scroll{" "}
                    {showNav ? <DoubleArrowDownIcon /> : <DoubleArrowUpIcon />}
                    to Toggle Nav
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        )}
      </AnimatePresence>
      <HudEmail open={{ state: openEmail, set: setOpenEmail }} />
    </div>
  );
}
