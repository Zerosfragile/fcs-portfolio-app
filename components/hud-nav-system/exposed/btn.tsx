"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDynamicLabel } from "../internal/hooks";
import TypingLabel from "../internal/hn-btnlabel";
import { HNContext } from "./container";
import { motion, useAnimationControls } from "framer-motion";

export type Props = {
  prefix?: {
    breakpoint: number;
    text: string;
  };
  labels?: {
    breakpoint: number;
    text: string;
  }[];
  sites?: {
    title: string;
    route: string;
  }[];
  route: string;
  defaultLabel: string;
};

const Btn = (props: Props) => {
  const {
    prefix = { breakpoint: 1100, text: "" },
    sites = [],
    labels,
    defaultLabel,
  } = props;

  const dynamicLabel = useDynamicLabel({ labels, prefix, defaultLabel });
  const ref = useRef<HTMLButtonElement | null>(null);

  const context = useContext(HNContext);

  if (!context) {
    throw new Error("Component must be used within a HNContext.Provider");
  }

  const { selectedID, setSelectedID, container } = context;

  const animationSequence = {
    initial: {},
    animate: {
      width: ref?.current?.parentElement
        ? ref.current.parentElement.offsetWidth
        : "100%",
      height: "300%",
      left: ref?.current ? ref.current.offsetLeft * -1 : 0,
      bottom: ref?.current?.parentElement
        ? ref.current.parentElement.offsetHeight * -0.25
        : 0,
    },
    transition: {
      scale: { type: "spring", bounce: 0.25, duration: 0.5 },
      width: { delay: 0.5, duration: 0.5 },
      left: { delay: 0.5, duration: 0.5 },
      height: { delay: 1, duration: 0.5 },
      bottom: { delay: 1, duration: 0.5 },
    },
  };

  return (
    <>
      <button
        ref={ref}
        key={defaultLabel}
        onMouseEnter={() => setSelectedID(defaultLabel)}
        className="relative"
      >
        <div
          className="
          text-size-auto max-h-45 z-10 mx-[11.25px] my-0 min-h-[33.25px] rounded-[6px] 
          border border-solid border-OffWhite/[0] bg-LunarGrey-darkest/[.9] px-[18px] pb-[7.5px] 
          pt-[9.75px] font-[CygnitoMono-011] text-[11.25px] font-normal uppercase leading-extra-tight 
          text-OffWhite transition-all duration-500 hover:text-OffWhite-light hover:shadow-glow
        "
        >
          <TypingLabel text={dynamicLabel} />
        </div>
        {defaultLabel === selectedID && (
          <motion.div
            layoutId="HN-BACK"
            className="
              absolute left-0 top-[-25%] -z-10 flex h-[150%] w-full 
              flex-col rounded-[6px] bg-VoidBlack-light opacity-100
            "
            initial={animationSequence.initial}
            animate={animationSequence.animate}
            transition={animationSequence.transition}
            onMouseLeave={() => setSelectedID("null")}
          ></motion.div>
        )}
      </button>
    </>
  );
};

export default Btn;
