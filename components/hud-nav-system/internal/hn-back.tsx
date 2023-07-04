"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BtnExpandableItem from "./hn-item";

type Props = {
  isTriggered: boolean;
  items: Array<{ label: string; route: string }>;
  breakpoint: number;
};

const BtnBack = ({ isTriggered, items, breakpoint }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isTriggered) {
      setIsVisible(true);
      setTimeout(() => setIsExpanded(true), 500);
    } else {
      setIsVisible(false);
      setIsExpanded(false);
    }
  }, [isTriggered]);

  if (typeof window !== "undefined" && window.innerWidth < breakpoint)
    return null;

  return (
    <motion.div
      initial={{ opacity: 100, width: "auto" }}
      animate={{
        opacity: isVisible ? 1 : 0,
        width: isExpanded ? "100%" : "auto",
        transition: { duration: 0.5 },
      }}
      className="absolute z-[-1] flex h-[150%] flex-col rounded-[6px] bg-VoidBlack-light transition-all duration-500 ease-cubic"
    >
      {items.map((item, index) => (
        <BtnExpandableItem key={index} label={item.label} route={item.route} />
      ))}
    </motion.div>
  );
};

export default BtnBack;
