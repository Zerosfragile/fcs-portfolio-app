"use client";
import HudNav from "@/components/hud-ui/hudnav";
import Image from "next/image";
import { useState } from "react";
import HudEmail from "@/components/hud-ui/hudemail";

export default function Home() {
  const [openEmail, setOpenEmail] = useState(false);

  const eventHandlers = {
    showEmail: () => {
      console.log(openEmail);
      setOpenEmail((prev) => !prev);
    },
  };

  return (
    <>
      <div className="bg-black hud-border relative h-[calc(100vh-129px)] overflow-x-hidden text-center max-md:h-[calc(100vh-128px-2em)]"></div>
      <div className="hud-border max-md:align-center bottom-0 flex h-[75px] items-center justify-between overflow-hidden text-center max-md:h-[calc(calc(75px+2em))] max-md:flex-wrap max-md:justify-center max-md:p-4">
        <HudNav eventHandlers={eventHandlers} />
      </div>
      <HudEmail open={{ state: openEmail, set: setOpenEmail }} />
    </>
  );
}
