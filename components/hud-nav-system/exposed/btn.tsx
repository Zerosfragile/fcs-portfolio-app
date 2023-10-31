"use client";
import React, { useContext, useRef } from "react";
import { useDynamicLabel } from "../internal/hooks";
import TypingLabel from "../internal/hn-btnlabel";
import { HNContext } from "./container";
import { HNBreakpointText, HNSite } from "..";
import { cn } from "@/lib/utils";

export type Props = {
  prefix?: HNBreakpointText;
  labels?: HNBreakpointText[];
  sites?: HNSite[];
  event?: string;
  route?: string;
  defaultLabel: string;
  className?: string;
} & ({ event: string } | { route: string });

const Btn = (props: Props) => {
  const {
    prefix = { breakpoint: 1100, text: "" },
    sites = [],
    labels,
    defaultLabel,
    route,
    event,
    className,
  } = props;

  const dynamicLabel = useDynamicLabel({ labels, prefix, defaultLabel });
  const ref = useRef<HTMLButtonElement | null>(null);

  const context = useContext(HNContext);
  if (!context) {
    throw new Error("Component must be used within a HNContext.Provider");
  }
  const { handleMouseEnter, handleClick } = context;

  return (
    <button
      ref={ref}
      key={defaultLabel}
      className={cn(
        className,
        "text-size-auto max-h-45 relative z-50 mx-[11.25px] my-0 min-h-[33.25px] rounded-[6px] border border-solid border-OffWhite/[0] bg-LunarGrey-darkest/[.9] px-[18px] pb-[7.5px] pt-[9.75px] font-[CygnitoMono-011] text-[11.25px] font-normal uppercase leading-extra-tight  text-OffWhite transition-all duration-500 hover:text-OffWhite-light hover:shadow-glow"
      )}
      onMouseEnter={() => {
        const breakpoint = 1100; // Set your desired breakpoint value
        const screenWidth = window.innerWidth;
        handleMouseEnter(ref, screenWidth > breakpoint ? sites : []);
      }}
      onClick={() => handleClick(route, event)}
    >
      <TypingLabel text={dynamicLabel} />
    </button>
  );
};

export default Btn;
