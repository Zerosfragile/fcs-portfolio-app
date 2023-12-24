"use client";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

const QuoteInitializing = ({
  setInit,
  quote = "Amor Fati, Agnostos Theos",
}: {
  setInit: Dispatch<SetStateAction<boolean>>;
  quote?: string;
}) => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 100, y: 0 }}
        transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
        onClick={() => setInit(true)} //! REMOVE When Finished
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
          {quote}
        </motion.p>
      </div>
    </div>
  );
};

export default QuoteInitializing;
