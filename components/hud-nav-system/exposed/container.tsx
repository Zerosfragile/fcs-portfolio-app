"use client";
import React, { createContext, useRef } from "react";
import { useIndexPrefix } from "../internal/hooks";
import { LayoutGroup, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useHandleHNA, HandleMouseEnter } from "../internal/hooks";
import { HNSite } from "..";

type Props = {
  children?: React.ReactNode;
  eventHandlers: any;
};

export type HNContextType = {
  handleMouseEnter: HandleMouseEnter;
};

export const HNContext = createContext<HNContextType | null>(null);

const Container = (props: Props) => {
  const { children, eventHandlers } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const indexedChildren = useIndexPrefix(children);
  const { handleMouseEnter, handleMouseLeave, HNBack } =
    useHandleHNA(containerRef);

  return (
    <HNContext.Provider
      value={{
        handleMouseEnter,
      }}
    >
      <LayoutGroup>
        <div
          ref={containerRef}
          className="relative mx-[18px] flex items-center justify-center"
        >
          {indexedChildren}
          <motion.div
            ref={backRef}
            onMouseLeave={handleMouseLeave}
            animate={HNBack.animation}
            className="absolute left-[-0.5px] z-0 flex h-[150%] flex-col rounded-[6px] bg-VoidBlack-light opacity-100"
          >
            {HNBack.sites.links.map((item: HNSite, index: number) => (
              <motion.a
                key={index}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: HNBack.sites.state ? 1 : 0,
                  transition: { duration: 0.1 },
                }}
                href={item.route}
                className="text-decoration-none w-[100% - 15px] m-[7.5px] inline-block truncate rounded-[6px] bg-LunarGrey-darkest/[.5] px-[14.5px] pb-[5.5px] pt-[7px] font-[CygnitoMono-011] text-[11px] font-normal uppercase leading-extra-tight text-OffWhite/[.66] opacity-100 shadow-LunarGrey-light/[.4] transition-all duration-500 ease-cubic hover:bg-LunarGrey-dark/[.40] hover:text-OffWhite-light hover:shadow-glow"
              >
                {item.title}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </LayoutGroup>
    </HNContext.Provider>
  );
};

export default Container;
