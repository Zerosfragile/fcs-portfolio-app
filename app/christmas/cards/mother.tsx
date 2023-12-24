import { Separator } from "@/components/fcs-seperator";
import React from "react";
import ChristmasTree from "./christmas-tree";

type Props = {};

export default function Mother({}: Props) {
  return (
    <div className="grid place-items-center w-full h-full">
      <div className="w-full p-4">
        <div>
          <h1 className="font-[arthemys] text-xl bg-clip-text text-transparent bg-gradient-to-r from-christmas-red to-christmas-green mb-4">
            聖誕 Merry Christmas
          </h1>
          <Separator text="To Cathy" />
        </div>
        <div className="text-left my-4 text-sm font-[arthemys] text-muted-foreground flex flex-col gap-4">
          <p>
            In 2023, I've spent a lot of time thinking about time. Time in the
            past, time in the future, and time in the present. I've noticed your
            attempts to reach out and communicate with me, and for my part in
            not responding as I should, I apologize.
          </p>
          <p>
            Part of my reluctance to share is because I feel you hold a strong
            standard of excellence. That's something I admire, but also
            something I'm afraid of disappointing, as I known I'm not yet there.
          </p>
          <p>
            As 2024 approaches, I hope to push myself harder, to create more, to
            experience more, and to achieve excellence which I'll be able to
            share with you. Until, then I hope you'll continue to support me as
            I keep my head down and work.
          </p>
          <div className="text-xs">
            <p className="bg-clip-text text-transparent bg-gradient-to-r from-christmas-red/75 to-christmas-green/75">
              Merry Christmas Mom,
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
