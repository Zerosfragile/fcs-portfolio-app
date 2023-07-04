"use client";
import React from "react";
// import BtnExpandable, { Props as BtnExpandableProps } from "./btn-expandable";
import { useIndexPrefix } from "../internal/hooks";
import HnBack from "../internal/hn-back";

type Props = {
  children?: React.ReactNode;
};

const Container = (props: Props) => {
  const { children } = props;

  const indexedChildren = useIndexPrefix(children);
  return (
    <div className="relative mx-[18px] my-0 flex items-center justify-center">
      {indexedChildren}
      <HnBack isTriggered={false} breakpoint={0} items={[]} />
    </div>
  );
};

export default Container;
