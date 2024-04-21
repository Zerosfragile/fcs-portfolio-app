"use client"; // Error components must be Client Components

import posthog from "posthog-js";
import Image from "next/image";
import { useEffect } from "react";
import { TypingLabel } from "@/components/hud-nav-system";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    posthog.capture("error", {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    });
    console.error(error);
  }, [error]);

  return (
    <div
      className="
          bg-black hud-border ease relative flex h-[calc(100svh-39px)] justify-center overflow-x-hidden
          text-center duration-500 ease-cubic
        "
    >
      <div className="ease m-8 flex h-fit w-full cursor-default justify-between font-[CygnitoMono-011] font-light text-OffWhite/[.05] duration-500 ease-cubic hover:text-OffWhite/[.15]">
        <p>CODE</p>
        <p>PROJECTS</p>
        <p>DESIGN</p>
      </div>
      <div className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center">
        <Link className="grid place-items-center" href={"/"}>
          <Image
            src={"/images/056-Modern_Icons.png"}
            alt={""}
            width={75}
            height={75}
            className="opacity-10 invert transition-all duration-500 ease-linear group-hover:opacity-50"
            priority
          />
        </Link>

        <div
          className="m-6 grid place-items-center
          font-[CygnitoMono-011] text-[11.25px] font-normal uppercase text-OffWhite/[.33] transition-all duration-500 ease-linear group-hover:text-OffWhite/[.66] gap-4"
        >
          <TypingLabel text={`${error.name} | Data Link Destroyed...`} />
          <Button variant={"outline"} onClick={() => reset()}>
            Retry Connection
          </Button>
        </div>
      </div>
    </div>
  );
}
