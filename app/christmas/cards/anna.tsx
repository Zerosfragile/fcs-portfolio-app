import { Separator } from "@/components/fcs-seperator";
import React from "react";
import ChristmasTree from "./christmas-tree";

type Props = {};

export default function Anna({}: Props) {
  return (
    <div className="grid place-items-center w-full h-full ">
      <div className="w-full p-4 max-w-sm">
        <div>
          <h1 className="font-[arthemys] text-xl bg-clip-text text-transparent bg-gradient-to-r from-christmas-red to-christmas-green mb-4">
            聖誕 Merry Christmas
          </h1>
          <Separator text="To Anna" />
        </div>
        <div className="text-left my-4 text-sm font-[arthemys] text-muted-foreground flex flex-col gap-4">
          <p>
            Hope you are doing well. I know we haven&apos;t talked much this
            year, but I&apos;m always here if you need anything. I wish you
            success in your studies and with your friends. Remember that the
            process of learning is more important than a grades.
          </p>
          <div className="text-xs">
            <p className="bg-clip-text text-transparent bg-gradient-to-r from-christmas-red/75 to-christmas-green/75">
              Merry Christmas Anna,
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
