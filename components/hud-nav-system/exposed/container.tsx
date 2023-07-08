"use client";
import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  selectedID: string;
  setSelectedID: Dispatch<SetStateAction<string>>;
  container: RefObject<HTMLElement>;
};

export const HNContext = createContext<HNContextType | null>(null);

const Container = (props: Props) => {
  const { children } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [selectedID, setSelectedID] = useState("null");

  const indexedChildren = useIndexPrefix(children);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <HNContext.Provider
      value={{
        isVisible,
        setIsVisible,
        selectedID,
        setSelectedID,
        container: containerRef,
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
