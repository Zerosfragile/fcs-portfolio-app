"use client";
import HudNav from "@/components/hud-ui/hudnav";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="bg-black hud-border relative h-[calc(100vh-129px)] overflow-x-hidden text-center"></div>
      <div className="hud-border bottom-0 flex h-[75px] items-center justify-between text-center">
        <HudNav />
      </div>
    </>
  );
}
