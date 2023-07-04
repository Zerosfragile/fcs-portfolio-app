import React from 'react'
import BtnExpandable, { Props as BtnExpandableProps } from "./btn-expandable";
import { useIndexPrefix }from "./hooks";

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
    <div className="flex justify-center items-center my-0 mx-[18px] relative">
      {indexedChildren}
      <BtnBack />
    </div>
  );
}

export default BtnContainer;