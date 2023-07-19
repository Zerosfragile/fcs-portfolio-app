"use client";
import Image from "next/image";
import { TypingLabel } from "@/components/hud-nav-system";
import Link from "next/link";

export default function About() {
  return (
    <>
      <div
        className="
          bg-black hud-border ease relative flex h-[calc(100vh-39px)] justify-center overflow-x-hidden
          text-center duration-500 ease-cubic
        "
      >
        <div className="ease m-8 flex h-fit w-full cursor-default justify-between font-[CygnitoMono-011] font-light text-OffWhite/[.05] duration-500 ease-cubic hover:text-OffWhite/[.15]">
          <p>CODE</p>
          <p>PROJECTS</p>
          <p>DESIGN</p>
        </div>
        <div className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link
            href={"/"}
            className="  flex flex-col items-center justify-center"
          >
            <Image
              src={"/images/056-Modern_Icons.png"}
              alt={""}
              width={75}
              height={75}
              className="opacity-10 invert transition-all duration-500 ease-linear group-hover:opacity-50"
            />
          </Link>
          <p
            className="m-6
          font-[CygnitoMono-011] text-[11.25px] font-normal uppercase text-OffWhite/[.33] transition-all duration-500 ease-linear group-hover:text-OffWhite/[.66]"
          >
            <TypingLabel text={" Initializing Data Link..."} />
          </p>
        </div>
      </div>
    </>
  );
}
