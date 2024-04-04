"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const TranslateWrapper = ({
  children,
  reverse,
  wrapperClassName,
  className,
  duration = 50,
  repeat = 1,
}: {
  children?: any;
  reverse?: boolean;
  wrapperClassName?: string;
  className?: string;
  duration?: number;
  repeat?: number;
}) => {
  return (
    <div className={cn(wrapperClassName, "flex overflow-hidden")}>
      {Array.from({ length: repeat }, (_, index) => (
        <motion.div
          key={index}
          initial={{ translateX: reverse ? "-100%" : "0%" }}
          animate={{ translateX: reverse ? "0%" : "-100%" }}
          transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
          className={cn(className, "flex gap-4 px-2 flex-shrink-0 min-w-fit")}
        >
          {children}
        </motion.div>
      ))}
    </div>
  );
};

export default TranslateWrapper;
