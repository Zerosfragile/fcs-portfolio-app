"use client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import HnBack from "../internal/hn-back";
import { useIndexPrefix } from "../internal/hooks";
import { LayoutGroup } from "framer-motion";

type Props = {
  children?: React.ReactNode;
};

export type HNSite = {
  title: string;
  route: string;
};

export type HNContextType = {
  selectedID: string;
  setSelectedID: Dispatch<SetStateAction<string>>;
};

export const HNContext = createContext<HNContextType | null>(null);

const Container = (props: Props) => {
  const { children } = props;
  const [selectedID, setSelectedID] = useState("null");

  const indexedChildren = useIndexPrefix(children);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <HNContext.Provider
      value={{
        selectedID,
        setSelectedID,
      }}
    >
      <LayoutGroup>
        <div
          ref={containerRef}
          className="relative mx-[18px] flex items-center justify-center"
        >
          {indexedChildren}
        </div>
      </LayoutGroup>
    </HNContext.Provider>
  );
};

export default Container;
