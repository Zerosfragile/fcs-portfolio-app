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
      <div className="bg-black hud-border relative h-[calc(100vh-129px)] overflow-x-hidden text-center"></div>
      <div className="hud-border bottom-0 flex h-[75px] items-center justify-between text-center">
        <HudNav eventHandlers={eventHandlers} />
      </div>
      <HudEmail open={{ state: openEmail, set: setOpenEmail }} />
    </>
  );
}
