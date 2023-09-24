"use client";
import Image from "next/image";
import { TypingLabel } from "@/components/hud-nav-system";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { HudEmail, HudNav } from "@/components/hud-ui";
import useScrollDirection from "@/components/hud-ui/hooks/useScrollDirection";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  InstagramLogoIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function Contact() {
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
    <>
      <div
        className={cn(
          "bg-black hud-border ease relative flex justify-center overflow-x-hidden text-center duration-500 ease-cubic",
          showNav ? "h-[calc(100vh-129px)]" : "h-[calc(100vh-39px)]"
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
                <ContactContent setOpenEmail={setOpenEmail} />
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
            <HudNav eventHandlers={eventHandlers} />
          </motion.div>
        )}
      </AnimatePresence>
      <HudEmail open={{ state: openEmail, set: setOpenEmail }} />
    </>
  );
}

const ContactContent = ({
  setOpenEmail,
}: {
  setOpenEmail: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const tags = ["React", "NextJS", "TailwindCSS", "Typescript", "NodeJS"];
  const socials = [
    {
      name: "Github",
      icon: GitHubLogoIcon,
      link: "https://github.com/zerofcs",
    },
    {
      name: "LinkedIn",
      icon: LinkedInLogoIcon,
      link: "https://www.linkedin.com/in/marcus-lim-b6a721260/",
    },
    {
      name: "Instagram",
      icon: InstagramLogoIcon,
      link: "https://www.instagram.com/1.m.0s/",
    },
  ];
  return (
    <div className="w-full flex justify-center ">
      <div className="max-w-[800px] md:min-w-[400px] h-full flex flex-wrap justify-center my-10 mx-10">
        <div className="w-full">
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none text-left">
              Marcus Lim
            </h4>
            <p className="text-sm text-muted-foreground text-left">
              Fullstack Developer
            </p>
            <div className="py-2 flex flex-wrap justify-start gap-x-4 gap-y-1">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-[5px] border border-OffWhite/[.33] px-[1.5em] py-[0.25em] text-center font-[CygnitoMono-011] text-[10px] font-bold uppercase leading-[1em] text-LunarGrey-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-wrap gap-6">
            {socials.map((social) => (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push(social.link)}
                key={social.name}
              >
                <social.icon className="mr-2 h-4 w-4" />
                {social.name}
              </Button>
            ))}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setOpenEmail(true)}
            >
              <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
              Email
            </Button>
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
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 100, y: 0 }}
        transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
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
      <div className="font-[CygnitoMono-011] text-[11.25px] font-normal uppercase text-OffWhite/[.33] transition-all duration-500 ease-linear group-hover:text-OffWhite/[.66] text-center min-w-[90vw]">
        <motion.p
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 100, y: 0 }}
          transition={{ duration: 2.5 }}
        >
          Amor Fati, Agnostos Theos
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
