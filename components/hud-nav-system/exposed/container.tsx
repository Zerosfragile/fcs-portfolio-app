"use client";
import React, { Ref, createContext, useRef } from "react";
import {
  HNBControls,
  useIndexPrefix,
  useHandleHNA,
  HandleMouseEnter,
} from "../internal/hooks";
import { LayoutGroup, motion } from "framer-motion";
import { useRouter } from "next/router";
import { HNSite } from "..";
import HNBack from "../internal/hn-back";

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
  const indexedChildren = useIndexPrefix(children);
  const { handleMouseEnter, handleMouseLeave, HNBControls } =
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
          <HNBack controls={HNBControls} handleMouseLeave={handleMouseLeave} />
        </div>
      </LayoutGroup>
    </HNContext.Provider>
  );
};

export default Container;
