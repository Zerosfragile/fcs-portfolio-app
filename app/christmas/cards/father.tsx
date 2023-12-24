import { Separator } from "@/components/fcs-seperator";
import { motion } from "framer-motion";
import React from "react";
import ChristmasTree from "./christmas-tree";

type Props = {};

export default function Father({}: Props) {
  return (
    <div className="grid place-items-center w-full h-full">
      <div className="w-full p-4">
        <div>
          <h1 className="font-[arthemys] text-xl bg-clip-text text-transparent bg-gradient-to-r from-christmas-red to-christmas-green mb-4">
            聖誕 Merry Christmas
          </h1>
          <Separator text="To Rodrick" />
        </div>
        <div className="text-left my-4 text-sm font-[arthemys] text-muted-foreground flex flex-col gap-4">
          <p>
            This year, more than ever, I'd like to thank you for your continued
            support and belief in me. I'm always disappointed in myself for not
            being able to express my gratitude and being unable to support you
            in the same way you've supported me.
          </p>
          <p>
            I hope that during 2024 year I can work towards making up for that.
            I've always been inspired by your work ethic, ambition and patience.
            Looking ahead to the new year, I am filled with determination.
          </p>
          <p>
            Inspired by you, I aim to work harder and create something truly
            excellent. My goal is not just to achieve for myself, but to inspire
            others as you have inspired me.
          </p>
          <p>Thank you, Dad, for everything.</p>
          <div className="text-xs">
            <p className="bg-clip-text text-transparent bg-gradient-to-r from-christmas-red/75 to-christmas-green/75">
              Merry Christmas,
            </p>
            <p className="bg-clip-text text-transparent bg-gradient-to-r from-christmas-tree to-christmas-green">
              Marcus
            </p>
          </div>
        </div>
      </div>
      <ChristmasTree />
    </div>
  );
}
