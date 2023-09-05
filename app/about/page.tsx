"use client";
import Image from "next/image";
import { TypingLabel } from "@/components/hud-nav-system";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function About() {
  const [loading, setLoading] = useState(false);
  const [userInit, setUserInit] = useState(false);
  const [showNav, setShowNav] = useState(false);
  if (loading) return <Initializing />;
  return (
    <div
      className={cn(
        "bg-black hud-border ease relative flex justify-center overflow-x-hidden text-center duration-500 ease-cubic",
        showNav ? "h-[calc(100vh-129px)]" : "h-[calc(100vh-39px)]"
      )}
    >
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
  );
}

const UserCard = () => {
  return (
    <div>
      <div>hi</div>
    </div>
  );
};

const AboutContent = ({
  setShowNav,
}: {
  setShowNav: Dispatch<SetStateAction<boolean>>;
}) => {
  const teamMembers = [
    {
      id: 0,
      dateJoined: "2021-09-01",
      firstName: "Marcus",
      lastName: "Lim",
      title: "Founder",
      description:
        "I want to tell a story unheard, with words so inspiring, the very gravity of their pull slows time.",
      image: "/images/001-Down_Hands.png",
    },
  ];
  return <div onClick={() => setShowNav((prev) => !prev)}>hello</div>;
};

const QuoteInitializing = ({
  setInit,
}: {
  setInit: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 100, y: 0 }}
        transition={{ duration: 1, delay: 3.5, ease: "easeInOut" }}
        onClick={() => setInit(true)}
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
      <div className="font-[CygnitoMono-011] text-[11.25px] font-normal uppercase text-OffWhite/[.33] transition-all duration-500 ease-linear group-hover:text-OffWhite/[.66] text-center">
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
