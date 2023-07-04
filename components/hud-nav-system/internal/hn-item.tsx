import React from "react";

type Props = {
  label: string;
  // event?: () => void;
  route?: string;
};

const BtnExpandableItem: React.FC<Props> = ({ label, event, link }) => {
  const handleClick = () => {
    if (event) {
      event();
    } else if (link) {
      window.location.href = link;
    }
  };

  return <button>{label}</button>;
};

export default BtnExpandableItem;
