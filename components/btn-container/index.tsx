import React from "react";
import BtnExpandable, { Props as BtnExpandableProps } from "./btn-expandable";
import { useIndexPrefix } from "./hooks";

type Props = {
  children?: React.ReactNode;
  direction?: "horizontal" | "vertical";
};

const BtnBack = () => {
  return <div></div>;
};

const BtnContainer = (props: Props) => {
  const { direction = "horizontal", children } = props;
  const indexedChildren = useIndexPrefix(children);
  return (
    <div className="relative mx-[18px] my-0 flex items-center justify-center">
      {indexedChildren}
      <BtnBack />
    </div>
  );
};

export default BtnContainer;
