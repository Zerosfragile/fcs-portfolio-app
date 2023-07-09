"use client";
import { useState, useEffect, RefObject, useContext, useRef } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { HNContext } from "../exposed/container";

type Props = {
  container: RefObject<HTMLDivElement>;
  breakpoint: number;
  ref: RefObject<HTMLDivElement>;
};

const HNBack = ({ container, breakpoint, ref }: Props) => {
  // const [isExpanded, setIsExpanded] = useState(false);
  // const [scope, animate] = useAnimate();
  // const divRef = useRef(null);
  const context = useContext(HNContext);
  if (!context) {
    throw new Error("Component must be used within a HNContext.Provider");
  }

  const {
    selectedBtn,
    setSelectedBtn,
    selectedSites,
    setSelectedSites,
    isVisible,
    setIsVisible,
  } = context;

  const [height, setHeight] = useState(0);

  // const handleMouseMove = (e) => {
  //   if (divRef.current && !divRef.current.contains(e.target)) {
  //     setIsVisible(false);
  //   } else {
  //     setIsVisible(true);
  //   }
  // };

  // useEffect(() => {
  //   if (selectedSites && selectedSites.length > 0) {
  //     setHeight((selectedSites.length + 1) * 45);
  //   }
  // }, [container, selectedBtn, selectedSites]);

  return (
    <motion.div
      ref={ref}
      // onMouseOut={() => setIsVisible(false)}
      // onMouseMove={handleMouseMove}
      // initial={{ opacity: 100, width: "auto" }}
      animate={{ height: isVisible ? height : "150%" }}
      className=" absolute left-[-0.5px] z-0 flex h-[150%] flex-col rounded-[6px] bg-VoidBlack-light opacity-100"
    >
      {selectedSites &&
        selectedSites.map(
          (item: { title: string; route: string }, index: number) => (
            <motion.a
              key={index}
              // initial={{ opacity: 0 }}
              // animate={{
              //   opacity: isExpanded ? 1 : 0,
              //   transition: { duration: 0.5 },
              // }}
              href={item.route}
              className="text-decoration-none w-[100% - 15px] m-[7.5px] inline-block truncate rounded-[6px] bg-LunarGrey-darkest/[.5] px-[14.5px] pb-[5.5px] pt-[7px] font-[CygnitoMono-011] text-[11px] font-normal uppercase leading-extra-tight text-OffWhite/[.66] opacity-100 shadow-LunarGrey-light/[.4] transition-all duration-500 ease-cubic hover:bg-LunarGrey-dark/[.40] hover:text-OffWhite-light hover:shadow-glow"
            >
              {item.title}
            </motion.a>
          )
        )}
    </motion.div>
  );
};

export default HNBack;

// await animate(scope.current, {
//   width: container!.current!.offsetWidth,
//   left: "-0.5px",
// });
// const btnContainerHeight = container!.current!.offsetHeight;
// const btnBackInitialHeight = btnContainerHeight * 1.5;
// const initialBottom = -(btnBackInitialHeight - btnContainerHeight) / 2;
// if (selectedSites && selectedSites.length > 0) {
//   setIsExpanded(true);
//   await animate(scope.current, {
//     height: (selectedSites.length + 1) * 45,
//     bottom: initialBottom,
//   });
// }
