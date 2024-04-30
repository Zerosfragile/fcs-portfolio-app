"use client";
import { Separator } from "@/components/fcs-seperator";
import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

type Props = {};

export default function Page({}: Props) {
  const [state, setState] = useState<string>("combined");

  return (
    <div className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:grid md:place-items-center">
      <div className="max-md:max-w-[800px] md:min-w-[400px] h-full flex flex-wrap justify-center my-10 mx-10 relative">
        <div className="w-full h-full grid place-content-center">
          <div className="space-y-1">
            <Badge
              variant={"outline"}
              className="rounded-full py-1 px-4"
              onClick={() => setState("combined")}
            >
              Combined
            </Badge>
            <Badge
              variant={"outline"}
              className="rounded-full py-1 px-4"
              onClick={() => setState("text")}
            >
              Text
            </Badge>
            <Badge
              variant={"outline"}
              className="rounded-full py-1 px-4"
              onClick={() => setState("image")}
            >
              Image
            </Badge>
          </div>
          <Separator className="my-4" />
          <AnimatePresence>
            {state === "combined" ? (
              <CombinedAbout />
            ) : state === "text" ? (
              <TextAbout />
            ) : state === "image" ? (
              <ImageAbout />
            ) : null}
          </AnimatePresence>
          <Separator className="my-4" />
          <div className="space-y-1" />
        </div>
      </div>
    </div>
  );
}

function CombinedAbout() {
  return (
    <motion.div
      className="max-w-[500px] w-[80vw] text-left text-muted-foreground items-center max-md:pb-10 flex flex-col"
      layoutId="container"
    >
      <motion.span layoutId="1">
        <motion.b className="mr-2 text-OffWhite/75" layoutId="2">
          Full Stack Developer, specializing in crafting creative solutions.
        </motion.b>
        <motion.div
          className="inline-grid place-items-center px-2"
          layoutId="musou"
        >
          <Image
            src={"/posts/projects/preview-musou.png"}
            alt={""}
            width={30}
            height={30}
            className="rounded-sm"
          />
        </motion.div>
        Currently, I&lsquo;m using a modern tech stack that includes Next.js{" "}
        <motion.div
          className="inline-grid place-items-center px-2"
          layoutId="001"
        >
          <Image
            src={"/images/test-preview-001.jpg"}
            alt={""}
            width={30}
            height={30}
            className="rounded-sm"
          />
        </motion.div>
        , TypeScript{" "}
        <motion.div
          className="inline-grid place-items-center px-2"
          layoutId="002"
        >
          <Image
            src={"/images/test-preview-002.jpg"}
            alt={""}
            width={30}
            height={30}
            className="rounded-sm"
          />
        </motion.div>
        and Tailwind{" "}
        <motion.div
          className="inline-grid place-items-center px-2"
          layoutId="003"
        >
          <Image
            src={"/images/test-preview-003.jpg"}
            alt={""}
            width={30}
            height={30}
            className="rounded-sm"
          />
        </motion.div>
        .
      </motion.span>
      <br />
      <motion.span layoutId="3">
        I&lsquo;ve contributed to products attracting
        <motion.span className="mx-1 text-OffWhite-dark/75 italic" layoutId="4">
          175K monthly
        </motion.span>
        impressions{" "}
        <motion.div
          className="inline-grid place-items-center px-2"
          layoutId="004"
        >
          <Image
            src={"/images/test-preview-004.jpg"}
            alt={""}
            width={30}
            height={30}
            className="rounded-sm"
          />
        </motion.div>
        and businesses generating over
        <motion.span className="mx-1 text-OffWhite-dark/75 italic" layoutId="5">
          $2 million in sales,
        </motion.span>
        <motion.div
          className="inline-grid place-items-center px-2"
          layoutId="005"
        >
          <Image
            src={"/images/test-preview-005.jpg"}
            alt={""}
            width={30}
            height={30}
            className="rounded-sm"
          />
        </motion.div>
        utilizing stacks like React and Node.js{" "}
        <motion.div
          className="inline-grid place-items-center px-2"
          layoutId="006"
        >
          <Image
            src={"/images/test-preview-006.jpg"}
            alt={""}
            width={30}
            height={30}
            className="rounded-sm"
          />
        </motion.div>
        , as well as e-commerce platforms like OpenCart{" "}
        <motion.div
          className="inline-grid place-items-center px-2"
          layoutId="007"
        >
          <Image
            src={"/images/test-preview-007.jpg"}
            alt={""}
            width={30}
            height={30}
            className="rounded-sm"
          />
        </motion.div>
        .
      </motion.span>
      <br />
      <motion.span layoutId="6">
        My roles have facilitated interactions with diverse stakeholders,
        including businessmen, engineers, technical leads, content creators,
        creatives, and medical professionals.{" "}
        <motion.div
          className="inline-grid place-items-center px-2"
          layoutId="008"
        >
          <Image
            src={"/images/test-preview-008.jpg"}
            alt={""}
            width={30}
            height={30}
            className="rounded-sm"
          />
        </motion.div>
      </motion.span>
      <br />
      <motion.span layoutId="7">
        As I advance my academic pursuits, I&lsquo;m eager to expand my
        portfolio and collaborate with talented individuals and teams.{" "}
        <motion.div
          className="inline-grid place-items-center px-2"
          layoutId="009"
        >
          <Image
            src={"/images/test-preview-009.jpg"}
            alt={""}
            width={30}
            height={30}
            className="rounded-sm"
          />
        </motion.div>
      </motion.span>
      <motion.span layoutId="8">
        I&lsquo;m
        <motion.b
          className="mx-1 text-OffWhite-dark/60 font-semibold"
          layoutId="9"
        >
          open to professional and networking opportunities
        </motion.b>
        to further hone my skills.
      </motion.span>
      <br />
      <motion.span layoutId="10">
        If you&lsquo;ve read this far, feel free to
        <Link
          href={"/contact"}
          className="font-[cygnitomono-011] underline underline-offset-2 font-thin text-OffWhite-dark/75 hover:text-OffWhite/90 transition-color duration-500 ease mx-2"
        >
          contact
        </Link>
        me.
      </motion.span>
      <br />
      <motion.span layoutId="11">- Marcus Lim</motion.span>
    </motion.div>
  );
}

function TextAbout() {
  return (
    <motion.div
      className="max-w-[500px] w-[80vw] text-left text-muted-foreground items-center max-md:pb-10"
      layoutId="container"
    >
      <motion.span layoutId="1">
        <motion.b className="mr-2 text-OffWhite/75" layoutId="2">
          Full Stack Developer, specializing in crafting creative solutions.
        </motion.b>
        Currently, I&lsquo;m using a modern tech stack that includes Next.js,
        TypeScript and Tailwind.
      </motion.span>
      <br />
      <motion.span layoutId="3">
        I&lsquo;ve contributed to products attracting
        <motion.span className="mx-1 text-OffWhite-dark/75 italic" layoutId="4">
          175K monthly
        </motion.span>
        impressions and businesses generating over
        <motion.span className="mx-1 text-OffWhite-dark/75 italic" layoutId="5">
          $2 million in sales,
        </motion.span>
        utilizing stacks like React and Node.js, as well as e-commerce platforms
        like OpenCart.
      </motion.span>
      <br />
      <motion.span layoutId="6">
        My roles have facilitated interactions with diverse stakeholders,
        including businessmen, engineers, technical leads, content creators,
        creatives, and medical professionals.
      </motion.span>
      <br />
      <motion.span layoutId="7">
        As I advance my academic pursuits, I&lsquo;m eager to expand my
        portfolio and collaborate with talented individuals and teams.
      </motion.span>
      <motion.span layoutId="8">
        I&lsquo;m
        <motion.b
          className="mx-1 text-OffWhite-dark/60 font-semibold"
          layoutId="9"
        >
          open to professional and networking opportunities
        </motion.b>
        to further hone my skills.
      </motion.span>
      <br />
      <motion.span layoutId="10">
        If you&lsquo;ve read this far, feel free to
        <Link
          href={"/contact"}
          className="font-[cygnitomono-011] underline underline-offset-2 font-thin text-OffWhite-dark/75 hover:text-OffWhite/90 transition-color duration-500 ease mx-2"
        >
          contact
        </Link>
        me.
      </motion.span>
      <br />
      <motion.span layoutId="11">- Marcus Lim</motion.span>
    </motion.div>
  );
}

function ImageAbout() {
  return (
    <motion.div
      className="max-w-[500px] w-[80vw] text-left text-muted-foreground items-center max-md:pb-10"
      layoutId="container"
    >
      <motion.div
        className="inline-grid place-items-center px-2"
        layoutId="musou"
      >
        <Image
          src={"/posts/projects/preview-musou.png"}
          alt={""}
          width={30}
          height={30}
          className="rounded-sm"
        />
      </motion.div>

      <motion.div
        className="inline-grid place-items-center px-2"
        layoutId="001"
      >
        <Image
          src={"/images/test-preview-001.jpg"}
          alt={""}
          width={30}
          height={30}
          className="rounded-sm"
        />
      </motion.div>

      <motion.div
        className="inline-grid place-items-center px-2"
        layoutId="002"
      >
        <Image
          src={"/images/test-preview-002.jpg"}
          alt={""}
          width={30}
          height={30}
          className="rounded-sm"
        />
      </motion.div>

      <motion.div
        className="inline-grid place-items-center px-2"
        layoutId="003"
      >
        <Image
          src={"/images/test-preview-003.jpg"}
          alt={""}
          width={30}
          height={30}
          className="rounded-sm"
        />
      </motion.div>

      <motion.div
        className="inline-grid place-items-center px-2"
        layoutId="004"
      >
        <Image
          src={"/images/test-preview-004.jpg"}
          alt={""}
          width={30}
          height={30}
          className="rounded-sm"
        />
      </motion.div>

      <motion.div
        className="inline-grid place-items-center px-2"
        layoutId="005"
      >
        <Image
          src={"/images/test-preview-005.jpg"}
          alt={""}
          width={30}
          height={30}
          className="rounded-sm"
        />
      </motion.div>

      <motion.div
        className="inline-grid place-items-center px-2"
        layoutId="006"
      >
        <Image
          src={"/images/test-preview-006.jpg"}
          alt={""}
          width={30}
          height={30}
          className="rounded-sm"
        />
      </motion.div>

      <motion.div
        className="inline-grid place-items-center px-2"
        layoutId="007"
      >
        <Image
          src={"/images/test-preview-007.jpg"}
          alt={""}
          width={30}
          height={30}
          className="rounded-sm"
        />
      </motion.div>

      <motion.div
        className="inline-grid place-items-center px-2"
        layoutId="008"
      >
        <Image
          src={"/images/test-preview-008.jpg"}
          alt={""}
          width={30}
          height={30}
          className="rounded-sm"
        />
      </motion.div>

      <motion.div
        className="inline-grid place-items-center px-2"
        layoutId="009"
      >
        <Image
          src={"/images/test-preview-009.jpg"}
          alt={""}
          width={30}
          height={30}
          className="rounded-sm"
        />
      </motion.div>
    </motion.div>
  );
}
