"use client";
import { PlaygroundComponent } from "@/lib/playground";
import React from "react";

export default function ComponentCard(item: PlaygroundComponent) {
  const Component = item.component;
  return (
    <div className="hud-border grid md:grid-cols-2 min-h-[400px] border border-LunarGrey-dark relative overflow-hidden rounded-xl bg-VoidBlack-light p-1">
      <div className="flex flex-col justify-between font-mono p-4 min-h-[200px]">
        <div className="flex flex-col text-left  gap-2">
          <h2 className="font-bold text-2xl">{item.title}</h2>
          <p className="text-sm text-OffWhite/75">{item.description}</p>
        </div>
        <div className="flex w-full rounded-sm shadow-sm text-xs font-mono resize-none min-h-9 border border-OffWhite/25  p-2 scroll-p-1 transition-colors duration-500 text-OffWhite/75 hover:text-OffWhite bg-OffWhite/10">
          [ {item.dependencies.join(", ") || ""} ]
        </div>
      </div>
      <div className="h-full grid place-items-center bg-VoidBlack rounded-xl p-4 min-h-[300px] relative">
        <Component />
      </div>
    </div>
  );
}
