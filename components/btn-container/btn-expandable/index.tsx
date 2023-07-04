"use client";
import React from "react";
import { useDynamicLabel } from "../hooks";
import TypingLabel from "../typing-label";

export type Props = {
  children?: React.ReactNode;
  prefix?: {
    breakpoint: number;
    text: string;
  };
  labels?: {
    breakpoint: number;
    text: string;
  }[];
  defaultLabel: string;
};

const BtnExpandable = (props: Props) => {
  const {
    prefix = { breakpoint: 1100, text: "" },
    children,
    defaultLabel,
  } = props;

  const labels = [
    { breakpoint: 480, text: "Mobile" },
    { breakpoint: 768, text: "Tablet" },
    { breakpoint: 1024, text: "Desktop" },
  ];

  const dynamicLabel = useDynamicLabel({ labels, prefix, defaultLabel });

  return (
    <button className="text-size-auto max-h-45 mx-[11.25px] my-0 min-h-[33.25px] rounded-[6px] border border-solid border-OffWhite/[0] bg-LunarGrey-darkest/[.9] px-[18px] pb-[7.5px] pt-[9.75px] font-[CygnitoMono-011] text-[11.25px] font-normal uppercase leading-extra-tight text-OffWhite transition-all duration-500 hover:text-OffWhite-light hover:shadow-glow">
      <TypingLabel text={dynamicLabel} />
    </button>
  );
};

export default BtnExpandable;
