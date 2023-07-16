"use client";
import HudNav from "@/components/hud-ui/hudnav";
import Image from "next/image";
import { useState } from "react";
import HudEmail from "@/components/hud-ui/hudemail";
import HudPosts from "@/components/hud-ui/hudposts";

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
      <div className="bg-black hud-border ease relative h-[calc(100vh-129px)] overflow-x-hidden text-center duration-500 ease-cubic max-md:h-[calc(100vh-130px-2em)]">
        <div className="flex w-full flex-col items-center justify-center">
          <Image
            src="/images/FCS-Text-Logo-White.png"
            alt=""
            width={1700}
            height={650}
            className="opacity-50 max-sm:hidden"
            style={{ objectFit: "contain" }}
          />
          <div className="ease flex w-[90%] justify-between font-[CygnitoMono-011] font-light text-OffWhite/[.33] duration-500 ease-cubic max-sm:mt-8">
            <p>CODE</p>
            <p>PROJECTS</p>
            <p>DESIGN</p>
          </div>
          <Image
            src="/images/001-Down_Hands.png"
            alt=""
            className="ease opacity-25 invert duration-500 ease-cubic
             hover:opacity-75 max-sm:m-4 max-sm:w-[80px]"
            width={150}
            height={150}
            style={{ objectFit: "contain" }}
          />
        </div>

        <HudPosts posts={"projects"} limit={5} />
      </div>
      <div className="hud-border max-md:align-center bottom-0 flex h-[75px] items-center justify-between text-center max-md:h-[calc(calc(75px+2em))] max-md:flex-wrap max-md:justify-center max-md:overflow-hidden max-md:p-4">
        <HudNav eventHandlers={eventHandlers} />
      </div>
      <HudEmail open={{ state: openEmail, set: setOpenEmail }} />
    </>
  );
}
