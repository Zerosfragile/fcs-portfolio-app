"use client";
import React, {
  RefObject,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useIndexPrefix } from "../internal/hooks";
import {
  AnimationControls,
  LayoutGroup,
  motion,
  useAnimationControls,
} from "framer-motion";
import { useRouter } from "next/router";
import { useHandleHNA } from "../internal/hooks/animationHandler";
type Props = {
  children?: React.ReactNode;
  eventHandlers: any;
};

export type HNSite = {
  title: string;
  route: string;
};

export type HNContextType = {
  // isVisible: boolean;
  // setIsVisible: Dispatch<SetStateAction<boolean>>;
  // selectedID: string;
  // setSelectedID: Dispatch<SetStateAction<string>>;
  // container: RefObject<HTMLDivElement>;
  handleMouseEnter: any;
};

const INITIAL_HEIGHT = "150%";
const ANIMATION_DELAY = 500; // milliseconds
const LINK_REVEAL_DELAY = 100; // milliseconds
const LINK_HEIGHT = 45; // pixels
const BTN_PADDING = 25; // pixels

export const HNContext = createContext<HNContextType | null>(null);

const Container = (props: Props) => {
  const { children, eventHandlers } = props;
  const indexedChildren = useIndexPrefix(children);
  const containerRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

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
            {HNBack.sites.links.map(
              (item: { title: string; route: string }, index: number) => (
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
              )
            )}
          </motion.div>
        </div>
      </LayoutGroup>
    </HNContext.Provider>
  );
};

export default Container;
