"use client";
import React, { useContext, useRef } from "react";
import { useDynamicLabel } from "../internal/hooks";
import TypingLabel from "../internal/hn-btnlabel";
import { HNContext } from "./container";

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

  const { handleMouseEnter } = context;

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
