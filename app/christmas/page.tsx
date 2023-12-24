"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HudEmail, HudNav } from "@/components/hud-ui";
import useScrollDirection from "@/components/hud-ui/hooks/useScrollDirection";
import { isMobile } from "react-device-detect";
import Initializing from "../initializing-page";
import QuoteInitializing from "../initializing-quote";
import ChristmasContent from "./content";

type Props = {};

const ChristmasPage = (props: Props) => {
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
                className="w-full h-full"
              >
                <Link href="/">
                  <Image
                    id="img001"
                    src="/images/001-Down_Hands.png"
                    alt=""
                    width={250}
                    height={250}
                    className="
            ease absolute top-0 z-20 m-2 w-40 opacity-25 invert duration-500 ease-cubic
            hover:animate-shake-slow hover:opacity-75 max-md:right-0 max-md:w-20
          "
                  />
                </Link>
                <ChristmasContent />
              </motion.div>
            ) : (
              <motion.div
                key="initQuote"
                initial={{ opacity: 0 }}
                animate={{ opacity: 100 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
              >
                <QuoteInitializing
                  setInit={setUserInit}
                  quote={"Merry Christmas"}
                />
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
            <HudNav eventHandlers={eventHandlers} />
          </motion.div>
        )}
      </AnimatePresence>
      <HudEmail open={{ state: openEmail, set: setOpenEmail }} />
    </div>
  );
};

export default ChristmasPage;
