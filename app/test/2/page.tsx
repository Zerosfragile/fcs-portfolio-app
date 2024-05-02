"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  cubicBezier,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
  Variant,
  Variants,
} from "framer-motion";
import Image from "next/image";
import { trace } from "console";
import { TypingLabel } from "@/components/hud-nav-system";

type Props = {};

export default function Page({}: Props) {
  return (
    <div className="flex flex-col bg-gradient-earth h-[200vh] relative">
      <main className="h-screen flex flex-col items-center fixed top-0 left-1/2 -translate-x-1/2 gap-4 py-4 w-full max-w-[90vw] lg:max-w-4xl  ">
        <section className="bg-VoidBlack p-4 rounded-md shadow-lg font-mono text-OffWhite-dark flex flex-col gap-4  relative overflow-hidden h-[68px] w-full">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-sm" key="tag">
                @zerofcs
              </span>
              <span className="text-xs text-muted-foreground" key="name">
                Faustian Services
              </span>
            </div>
          </div>
          <div className="absolute right-4 bottom-1 min-h-[60px] max-h-[calc(100%-32px)] min-w-[48px] max-w-[calc(100%-32px)]">
            <Image
              src={"/images/test-preview-002.jpg"}
              alt={"art by @vinne.art"}
              layout="fill"
              className="object-cover rounded-sm"
            />
          </div>
        </section>

        <section className="flex-1 bg-VoidBlack w-full p-4 rounded-md shadow-lg grid place-items-center relative overflow-hidden">
          <div className="flex flex-col p-2 w-full h-full">
            <div>
              <h2 className="text-OffWhite font-mono font-black text-2xl uppercase tracking-widest">
                Featured Projects
              </h2>
              <span></span>
            </div>
            <div className="flex flex-col gap-2 py-4">
              <AnimatePresence>
                <CardTest
                  img="/posts/projects/preview-musou.png"
                  title="Musou"
                  tags={["Game", "Unity"]}
                  description="A game project"
                  date="2021"
                />
                <CardTest
                  img="/posts/projects/preview-ascii-hud.png"
                  title="Ascii Hud"
                  tags={["Game", "Unity"]}
                  description="A game project"
                  date="2021"
                />
                <CardTest
                  img="/posts/projects/preview-ascii-hud.png"
                  title="Ascii Hud"
                  tags={["Game", "Unity"]}
                  description="A game project"
                  date="2021"
                />
                <CardTest
                  img="/posts/projects/preview-ascii-hud.png"
                  title="Ascii Hud"
                  tags={["Game", "Unity"]}
                  description="A game project"
                  date="2021"
                />
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function CardTest({
  img,
  title,
  tags,
  description,
  date,
}: {
  img: string;
  title: string;
  tags: string[];
  description: string;
  date: string;
}) {
  return (
    <motion.div
      key={title}
      exit={"hidden"}
      transition={{
        delay: 0,
        duration: 0.5,
        ease: "easeOut",
      }}
      layoutId={title}
      initial="hidden"
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          delay: 1,
          duration: 0.5,
          ease: "easeOut",
        },
      }}
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
      }}
      className="flex flex-col p-2 gap-2 rounded-lg font-mono border border-dashed border-[#d4ed31]/25"
    >
      <span>{title}</span>
      <div className="grid grid-cols-2 gap-2 text-xs text-OffWhite/90  border-t border-dashed border-[#d4ed31]/25 py-2">
        <div className="flex flex-col">
          <span className="font-light">Year</span>
          <span className="text-OffWhite/75">{date}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-light">Tags</span>
          <span className="text-OffWhite/75">{tags.join(", ")}</span>
        </div>

        <p className="col-span-2 font-light text-OffWhite">{description}</p>
      </div>
      <div className="w-full min-h-[500px] h-full flex-1 flex rounded-lg overflow-hidden border relative">
        <Image
          src={img}
          alt={title + " preview"}
          layout="fill"
          className="object-fit rounded-sm"
        />
      </div>
    </motion.div>
  );
}
