"use client";
import { motion } from "framer-motion";
import { HNSite } from "..";
import { useContext } from "react";
import { HNContext } from "../exposed/container";

type Props = {
  controls: {
    animation: any;
    sites: {
      links: HNSite[];
      state: boolean;
    };
  };
  handleMouseLeave: () => void;
};

const HNBack = ({ controls, handleMouseLeave }: Props) => {
  const context = useContext(HNContext);
  if (!context) {
    throw new Error("Component must be used within a HNContext.Provider");
  }
  const { handleClick } = context;

  return (
    <motion.div
      onMouseLeave={handleMouseLeave}
      animate={controls.animation}
      className="absolute left-[-0.5px] z-40 flex h-[150%] flex-col rounded-[6px] bg-VoidBlack-light opacity-100"
    >
      {controls.sites.links.map((item: HNSite, index: number) => (
        <motion.a
          key={index}
          initial={{ opacity: 0 }}
          animate={{
            opacity: controls.sites.state ? 1 : 0,
            transition: { duration: 0.1 },
          }}
          onClick={() => handleClick(item.route, item.event)}
          className="
            text-decoration-none w-[100% - 15px] z-30 m-[7.5px] inline-block cursor-pointer truncate rounded-[6px] bg-LunarGrey-darkest/[.5]
            px-[14.5px] pb-[5.5px] pt-[7px] font-[CygnitoMono-011] text-[11px] font-normal uppercase leading-extra-tight text-OffWhite/[.66]
            opacity-100 shadow-LunarGrey-light/[.4] transition-all duration-500 ease-cubic hover:bg-LunarGrey-dark/[.40] hover:text-OffWhite-light hover:shadow-glow
          "
        >
          {item.title}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default HNBack;
