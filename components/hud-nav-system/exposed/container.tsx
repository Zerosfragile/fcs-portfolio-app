"use client";
import React, { createContext, useRef } from "react";
import {
  useIndexPrefix,
  useHandleHNA,
  HandleMouseEnter,
  handleRoute,
} from "../internal/hooks";
import { LayoutGroup } from "framer-motion";
import { useRouter } from "next/navigation";
import HNBack from "../internal/hn-back";

export interface EventHandlers {
  [key: string]: () => void;
}

type Props = {
  children?: React.ReactNode;
  eventHandlers?: EventHandlers;
};

export type HNContextType = {
  handleMouseEnter: HandleMouseEnter;
  handleClick: (
    route: string | undefined,
    eventKey: string | undefined
  ) => void;
};

export const HNContext = createContext<HNContextType | null>(null);

const Container = (props: Props) => {
  const { children } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const indexedChildren = useIndexPrefix(children);
  const { handleMouseEnter, handleMouseLeave, HNBControls } =
    useHandleHNA(containerRef);
  const router = useRouter();

  const handleClick = (
    route: string | undefined,
    eventKey: string | undefined
  ) => {
    const eventHandlers: EventHandlers = {
      showEmail: () => {
        console.log("email btn pressed");
      },
      refresh: () => {
        console.log("refresh btn pressed");
      },
    };
    if (route) {
      if (route.startsWith("http://") || route.startsWith("https://")) {
        // External URL: open in a new tab
        window.open(route, "_blank");
      } else {
        // Internal route: handle using Next.js routing
        router.push(route);
      }
    } else if (eventKey && eventHandlers[eventKey]) {
      //Handle Function
      eventHandlers[eventKey]();
    }
  };

  return (
    <HNContext.Provider
      value={{
        handleMouseEnter,
        handleClick,
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
