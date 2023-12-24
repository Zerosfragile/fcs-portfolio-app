import React from "react";
import ChristmasTree from "./christmas-tree";
import { Separator } from "@/components/fcs-seperator";

type Props = {};

export default function Emma({}: Props) {
  return (
    <div className="grid place-items-center w-full h-full">
      <div className="w-full p-4">
        <div>
          <h1 className="font-[arthemys] text-xl bg-clip-text text-transparent bg-gradient-to-r from-christmas-red to-christmas-green mb-4">
            聖誕 Merry Christmas
          </h1>
          <Separator text="To Emma" />
        </div>
        <div className="text-left my-4 text-sm font-[arthemys] text-muted-foreground flex flex-col gap-4">
          <p>
            I wanted to take a moment to congratulate you on your academic
            excellence. I'm happy one of us decided to pursue a career in
            medicine, so we can use dad's sweet sweet connections :p
          </p>
          <p>
            May your 2024 be a year filled with achievements, learning, and
            success. Remember, every challenge is a stepping stone towards your
            dreams. Keep going strong, and best wishes for a successful year.
          </p>
          <div className="text-xs">
            <p className="bg-clip-text text-transparent bg-gradient-to-r from-christmas-red/75 to-christmas-green/75">
              Merry Christmas Emma,
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
