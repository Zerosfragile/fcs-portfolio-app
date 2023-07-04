import React from "react";

export type Props = {
  title: string;
  subtitle: string;
  // children?: React.ReactNode;
  // prefix?: {
  //   breakpoint: number;
  //   text: string;
  // };
  // labels?: {
  //   breakpoint: number;
  //   text: string;
  // }[];
  // route: string;
  // defaultLabel: string;
};

const Btn = (props: Props) => {
  const {
    title,
    subtitle,
    // prefix = { breakpoint: 1100, text: "" },
    // children,
    // labels,
    // defaultLabel,
  } = props;

  return (
    <div>
      <div>{title}</div>
      <div>{subtitle}</div>
    </div>
  );
};

export default Btn;
