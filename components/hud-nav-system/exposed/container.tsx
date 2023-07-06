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

type Props = {
  children?: React.ReactNode;
};

export type HNSite = {
  title: string;
  route: string;
};
export type HNContextType = {
  selectedBtn: any | null;
  setSelectedBtn: Dispatch<SetStateAction<any | null>>;
  selectedSites: HNSite[] | null;
  setSelectedSites: Dispatch<SetStateAction<HNSite[] | null>>;
};

export const HNContext = createContext<HNContextType | null>(null);

const Container = (props: Props) => {
  const { children } = props;
  const [selectedBtn, setSelectedBtn] = useState<HTMLButtonElement | null>(
    null
  );
  const [selectedSites, setSelectedSites] = useState<HNSite[] | null>(null);

  const indexedChildren = useIndexPrefix(children);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(selectedBtn);
  }, [selectedBtn]);

  console.log("render");

  return (
    <HNContext.Provider
      value={{ selectedBtn, setSelectedBtn, selectedSites, setSelectedSites }}
    >
      <div
        ref={containerRef}
        className="relative mx-[18px] flex items-center justify-center"
      >
        {indexedChildren}
        <HnBack container={containerRef} breakpoint={0} />
      </div>
    </HNContext.Provider>
  );
};

export default Container;
