"use client";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export type Props = {
  children?: React.ReactNode;
  prefix?: {
    breakpoint?: number;
    text: string;
  };
  labels?: {
    breakpoint: number;
    text: string;
  }[];
  defaultLabel: string;
  // onClick(): void;
};

const BtnExpandable = (props: Props) => {
  const {
    prefix = { breakpoint: 1100, text: "" },
    children,
    defaultLabel,
  } = props;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const labels = [
    { breakpoint: 480, text: "Mobile" },
    { breakpoint: 768, text: "Tablet" },
    { breakpoint: 1024, text: "Desktop" },
  ];

  const getLabelText = () => {
    for (let i = 0; i < labels.length; i++) {
      if (windowWidth < labels[i].breakpoint) {
        return labels[i].text;
      }
    }
    return defaultLabel;
  };

  const dynamicLabel = prefix.text + getLabelText();

  return (
    <button className="text-size-auto max-h-45 mx-[11.25px] my-0 rounded-[6px] border border-solid border-OffWhite/[0] bg-LunarGrey-darkest/[.9] px-[18px] pb-[7.5px] pt-[9.75px] font-[CygnitoMono-011] text-[11.25px] font-normal uppercase leading-extra-tight text-OffWhite transition-all duration-500 hover:text-OffWhite-light hover:shadow-glow">
      {dynamicLabel}
    </button>
  );
};

export default BtnExpandable;
