import React from "react";

export type Props = {
  children?: React.ReactNode;
  prefix?: string;
  threshold?: number;
  labels?: {
    breakpoint: number;
    text: string;
  }[];
  defaultLabel: string;
  onClick(): void;
};

const BtnExpandable = (props: Props) => {
  const { prefix = "", threshold = 1100, children } = props;
  const labels = [
    { breakpoint: 480, text: "Mobile" },
    { breakpoint: 768, text: "Tablet" },
    { breakpoint: 1024, text: "Desktop" },
  ];
  return (
    <button className="text-OffWhite font-[CygnitoMono-011] leading-extra-tight uppercase font-normal text-size-auto text-[11.25px] hover:shadow-glow hover:text-OffWhite-light transition-all duration-500 bg-LunarGrey-darkest/[.9] rounded-[6px] pt-[9.75px] pb-[7.5px] px-[18px] border border-solid border-OffWhite/[0] my-0 mx-[11.25px] max-h-45">
      {prefix} test
    </button>
  );
};

export default BtnExpandable;
