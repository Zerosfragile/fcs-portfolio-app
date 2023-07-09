"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDynamicLabel } from "../internal/hooks";
import TypingLabel from "../internal/hn-btnlabel";
import { HNContext } from "./container";
import { motion } from "framer-motion";
import { useComponentSize } from "../internal/hooks/clientside";

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

  const { selectedID, setSelectedID, container, handleMouseEnter } = context;

  const componentSize = useComponentSize(ref);
  const containerSize = useComponentSize(container);
  // const [animationSequence, setAnimationSequence] = useState({
  //   initial: { top: "-25%", height: "150%" },
  //   animate: {},
  //   transition: {
  //     scale: { type: "spring", bounce: 0.25, duration: 0.5 },
  //     width: { delay: 0, times: [0, 0.5, 1], duration: 1 },
  //     left: { delay: 0, times: [0, 0.5, 1], duration: 1 },
  //     // height: { delay: 1, times: [0, 0.5, 1], duration: 0.5 },
  //     // bottom: { delay: 1, times: [0, 0.5, 1], duration: 0.5 },
  //     // top: { delay: 1, duration: 0.5 },
  //   },
  // });

  // useEffect(() => {
  //   // console.log("container: ");
  //   // console.log(containerSize);
  //   console.log("component " + defaultLabel + " : ");
  //   // console.log(componentSize);
  //   if (componentSize && containerSize) {
  //     const offsetLeft =
  //       componentSize.left && containerSize.width
  //         ? componentSize.left * -1
  //         : null;
  //     console.log(offsetLeft);
  //     // const bottom = containerSize.height
  //     //   ? -(containerSize.height * 0.5) / 2
  //     //   : 0;
  //     setAnimationSequence((prev) => ({
  //       ...prev,
  //       animate: {
  //         width: [
  //           componentSize.width,
  //           componentSize.width,
  //           containerSize.width,
  //         ],
  //         left: [0, 0, offsetLeft],
  //         // height: "300%",
  //         // bottom: bottom,
  //         // top: null,
  //       },
  //     }));
  //   }
  // }, [containerSize, componentSize, defaultLabel]);

  // /* {defaultLabel === selectedID && (
  //     <motion.div
  //       layoutId="HN-BACK"
  //       className="
  //         top-[-25%], absolute -z-10 flex
  //         h-[150%] w-full flex-col rounded-[6px] bg-VoidBlack-light opacity-100
  //       "
  //       onMouseLeave={() => setSelectedID("null")}
  //     ></motion.div>
  //   )} */

  return (
    <button
      ref={ref}
      key={defaultLabel}
      className="
          text-size-auto max-h-45 relative z-20 mx-[11.25px] my-0 min-h-[33.25px] rounded-[6px] 
          border border-solid border-OffWhite/[0] bg-LunarGrey-darkest/[.9] px-[18px] pb-[7.5px] 
          pt-[9.75px] font-[CygnitoMono-011] text-[11.25px] font-normal uppercase leading-extra-tight 
          text-OffWhite transition-all duration-500 hover:text-OffWhite-light hover:shadow-glow
        "
      onMouseEnter={() => handleMouseEnter(ref.current, sites)}
    >
      <TypingLabel text={dynamicLabel} />
    </button>
  );
};

export default Btn;
