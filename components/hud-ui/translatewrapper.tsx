"use client";
import { tags } from "@/lib/marcus";
import { cn, cnInfo } from "@/lib/utils";
import { InspirationComponentResource } from "@/lib/vault/components";
import {
  Clsx,
  FramerMotion,
  TailwindMerge,
} from "@/lib/vault/components/dependencies";
import { motion } from "framer-motion";

export const TranslateWrapperPreviewDisplay = () => {
  return (
    <div className="flex flex-col gap-2">
      <TranslateWrapper
        wrapperClassName="max-w-[500px] w-[80vw]"
        className="py-2 gap-x-4 gap-y-1 w-full "
        repeat={3}
        duration={20}
      >
        {tags.map((tag, index) => (
          <span
            key={index}
            className="rounded-[5px] border border-OffWhite/[.33] px-[1.5em] py-[0.25em] text-center font-[CygnitoMono-011] text-[10px] font-bold uppercase leading-[1em] text-LunarGrey-light text-balance whitespace-nowrap"
          >
            {tag}
          </span>
        ))}
      </TranslateWrapper>
    </div>
  );
};

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
          className={cn("flex gap-4 px-2 flex-shrink-0 min-w-fit", className)}
        >
          {children}
        </motion.div>
      ))}
    </div>
  );
};

export const TranslateWrapperInfo: InspirationComponentResource = {
  type: "components",
  title: "Translate Wrapper",
  display: <TranslateWrapperPreviewDisplay />,
  description:
    "A HOC that wraps children components in a horizontal translate animation.",
  category: ["utility", "higher order component", "scroll"],
  createdAt: "2023-10-03T20:31:00-04:00",
  dependencies: [FramerMotion],
  code: `const TranslateWrapper = ({
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
          className={cn("flex gap-4 px-2 flex-shrink-0 min-w-fit", className)}
        >
          {children}
        </motion.div>
      ))}
    </div>
  );
};`,
  props: [
    {
      name: "Props",
      description: "The props for the wrapper component.",
      code: `type Props = {
  children?: any;
  reverse?: boolean;
  wrapperClassName?: string;
  className?: string;
  duration?: number;
  repeat?: number;
};`,
    },
  ],
  utilDependencies: [cnInfo],
};

export default TranslateWrapper;
