"use client";
import { useState, useEffect, ReactElement, RefObject } from "react";
import { motion, stagger, useAnimate } from "framer-motion";

type Props = {
  selected: {
    btn: HTMLDivElement | null;
    set: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
  };
  sites: { title: string; route: string }[] | null;
  container: RefObject<HTMLDivElement>;
  breakpoint: number;
};

const BtnBack = ({ selected, container, sites, breakpoint }: Props) => {
  // const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    console.log(selected.btn?.innerText);
    console.log(sites);
    const btn = selected.btn;
    if (!btn) {
      return;
    }
    setIsExpanded(false);
    const width = btn.offsetWidth;
    const left = btn.offsetLeft + (btn.offsetWidth - width) / 2 + "px";
    const Slide = async () => {
      await animate(scope.current, {
        opacity: 100,
        width: width,
        left: left,
      });
      await animate(scope.current, {
        width: container!.current!.offsetWidth,
        left: "-0.5px",
      });
      const btnContainerHeight = container!.current!.offsetHeight;
      const btnBackInitialHeight = btnContainerHeight * 1.5;
      const initialBottom = -(btnBackInitialHeight - btnContainerHeight) / 2;
      if (sites && sites.length > 0) {
        setIsExpanded(true);
        await animate(scope.current, {
          height: (sites.length + 1) * 45,
          bottom: initialBottom,
        });
      }
    };
    Slide();
  }, [selected, sites]);

  const handleMouseLeave = async () => {
    setIsExpanded(false);
    await animate(scope.current, { opacity: 0, height: "150%" });
    selected.set(null);
  };

  if (typeof window !== "undefined" && window.innerWidth < breakpoint)
    return null;

  return (
    <motion.div
      ref={scope}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, width: "auto" }}
      animate={{
        transition: { duration: 5, ease: [0.4, 0, 0.2, 1] },
      }}
      className="absolute z-0 flex h-[150%] flex-col rounded-[6px] bg-VoidBlack-light"
    >
      {sites &&
        isExpanded &&
        sites.map((item: { title: string; route: string }, index: number) => (
          <motion.a
            key={index}
            initial={{ opacity: 0 }}
            animate={{
              opacity: isExpanded ? 1 : 0,
              transition: { duration: 0.5 },
            }}
            href={item.route}
            className="text-decoration-none w-[100% - 15px] m-[7.5px] inline-block truncate rounded-[6px] bg-LunarGrey-darkest/[.5] px-[14.5px] pb-[5.5px] pt-[7px] font-[CygnitoMono-011] text-[11px] font-normal uppercase leading-extra-tight text-OffWhite/[.66] opacity-100 shadow-LunarGrey-light/[.4] transition-all duration-500 ease-cubic hover:bg-LunarGrey-dark/[.40] hover:text-OffWhite-light hover:shadow-glow"
          >
            {item.title}
          </motion.a>
        ))}
    </motion.div>
  );
};

export default BtnBack;
