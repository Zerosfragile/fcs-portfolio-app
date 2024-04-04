"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function QuoteInitializing() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 100, y: 0 }}
        transition={{ duration: 1, delay: 3.5, ease: "easeInOut" }}
        className="flex flex-col items-center justify-center p-6 w-full"
      >
        <Image
          src={"/images/056-Modern_Icons.png"}
          alt={""}
          width={75}
          height={75}
          className="opacity-10 invert transition-all duration-500 ease-linear group-hover:opacity-50"
        />
      </motion.button>
      <div className="font-[CygnitoMono-011] text-[11.25px] font-normal uppercase text-OffWhite/[.33] transition-all duration-500 ease-linear group-hover:text-OffWhite/[.66] text-center min-w-[90vw]">
        <motion.p
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 100, y: 0 }}
          transition={{ duration: 2.5 }}
        >
          Everything is an Eternal Circle,
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 100, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
        >
          and it repeats and repeats itself.
        </motion.p>
      </div>
    </div>
  );
}
