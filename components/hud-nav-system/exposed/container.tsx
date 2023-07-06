"use client";
import React, { isValidElement, useEffect, useRef, useState } from "react";
import HnBack from "../internal/hn-back";
import { AnimatePresence, motion } from "framer-motion";
import { useIndexPrefix } from "../internal/hooks";

type Props = {
  children?: React.ReactNode;
};

const Container = (props: Props) => {
  const { children } = props;
  const [selectedBtn, setSelectedBtn] = useState<HTMLDivElement | null>(null);
  const [selectedSites, setSelectedSites] = useState<
    | {
        title: string;
        route: string;
      }[]
    | null
  >(null);

  const indexedChildren = useIndexPrefix(children);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(selectedBtn?.innerText);
  }, [selectedBtn]);

  // console.log("render"); // triggers twice on mount then once every time selectedBtn changes,

  return (
    <div
      ref={containerRef}
      className="relative mx-[18px] flex items-center justify-center"
    >
      {React.Children.toArray(indexedChildren)
        .filter(React.isValidElement)
        .map((child, index) => {
          let btnRef: HTMLDivElement | null = null;

          const setRef = (node: HTMLDivElement) => {
            btnRef = node;
          };

          const handleHover = (event: React.MouseEvent<HTMLDivElement>) => {
            event.stopPropagation();
            setSelectedBtn(btnRef); // causes the use effect log to trigger twice
            setSelectedSites(
              (
                child as React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              ).props.sites
            );
          };

          return (
            <div
              key={index}
              ref={setRef}
              onMouseEnter={handleHover}
              className="z-10"
            >
              {child}
            </div>
          );
        })}
      <HnBack
        selected={{ btn: selectedBtn, set: setSelectedBtn }}
        sites={selectedSites}
        container={containerRef}
        breakpoint={0}
      />
    </div>
  );
};

export default Container;
