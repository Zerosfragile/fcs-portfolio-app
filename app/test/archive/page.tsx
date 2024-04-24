import {
  MinimalistItemSocialCardPreviewDisplay,
  MinimalistItemSocialCardProps,
} from "@/lib/vault/components/minimalist-item-social-card";

// /**
//  * Archive page - Displays all vault components, to ensure the tailwind css is generated on build
//  */
// export default function Archive({}: Props) {
//   return (
//     <div className="grid place-items-center min-h-screen bg-OffWhite">
//       <MinimalistItemSocialCardPreviewDisplay />
//     </div>
//   );
// }

import TranslateWrapper from "@/components/hud-ui/translatewrapper";
import { CircleIcon, DotFilledIcon } from "@radix-ui/react-icons";
import { ar } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

type Props = {};

type Card = {
  image: {
    src: string;
    alt: string;
  };
  insights: {
    views: number;
    likes: number;
    comments?: number;
    shares?: number;
    saves?: number;
  };
  credit: {
    name: string;
    tag?: string;
    link: string;
  };
  title: string;
  description: string;
  details: { [key: string]: string | number };
  tags: string[];
};

export const CARD_TEST_001: Card = {
  image: {
    src: "/images/test-preview-001.jpg",
    alt: "Test preview 001",
  },
  insights: {
    views: 159258,
    likes: 63123,
    comments: 15273,
    shares: 53890,
    saves: 9385,
  },
  credit: {
    name: "Vinne",
    tag: "@vinne.art",
    link: "https://www.instagram.com/vinne.art",
  },
  title: "Untitled Artwork",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et sapien nec nunc.",
  details: {
    artist: "Vinne",
    caption: "tell her you like her eyes",
    creation_date: "2024-04-18",
    instagram_id: "Cu2lm3HLfuJ",
  },
  tags: ["illustration", "digital art"],
};

export default function page({}: Props) {
  return (
    <div className="grid place-items-center min-h-screen bg-OffWhite">
      <MinimalistItemSocialCardPreviewDisplay />
    </div>
  );
}

export function MinimalistItemSocialCard({
  card,
}: {
  card: MinimalistItemSocialCardProps;
}) {
  return (
    <div className="max-w-[550px] max-h-[1000px] border-LunarGrey-light/25 bg-[#ffffff] flex flex-col items-center box-border border rounded-sm p-3 gap-3 invert hover:invert-0 transition-all duration-1000 ease-cubic shadow-xl">
      <div className="relative rounded-sm overflow-hidden border border-LunarGrey-light/25 box-border shadow-sm">
        <Image
          src={card.image.src}
          alt={card.image.alt}
          width={535}
          height={535}
          className="max-h-[535px] object-cover"
        />
        <TranslateWrapper
          wrapperClassName="absolute bottom-0 w-full bg-VoidBlack"
          className="py-2 gap-y-1 gap-x-4 w-full items-center"
          repeat={3}
          duration={20}
        >
          {Object.entries(card.insights).map(([key, value], index) => (
            <Fragment key={index}>
              <div className="grid place-items-center pt-0.5">
                <span className="text-center font-[CygnitoMono-011] text-xs font-bold uppercase text-OffWhite text-balance whitespace-nowrap">
                  {formatNumber(value)} {key}
                </span>
              </div>
              <DotFilledIcon className="text-OffWhite" />
            </Fragment>
          ))}
        </TranslateWrapper>
      </div>
      <div className="flex-1 font-[CygnitoMono-011] font-semibold  uppercase text-VoidBlack w-full tracking-[-0.075em] flex flex-col gap-3">
        {/* Credit / Title Section */}
        <div className="grid grid-cols-[auto_1fr_auto] w-full gap-2">
          <span className="flex items-center border-b border-transparent hover:border-LunarGrey-light/50">
            {card.credit.name} <DotFilledIcon />{" "}
            <Link href={card.credit.link}>{card.credit.tag}</Link>
          </span>
          <div className="border-t border-LunarGrey-light/25" />
          <span className="whitespace-nowrap">{card.title}</span>
        </div>
        {/* Description Section */}
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-[auto_1fr] w-full gap-2">
            <span>Description</span>
            <div className="h-full grid grid-rows-2 grid-cols-1">
              <div />
              <div className="border-t border-LunarGrey-light/25" />
            </div>
          </div>
          <p className="text-sm font-light font-mono text-LunarGrey-light tracking-normal normal-case">
            {card.description}
          </p>
        </div>
        {/* Details Section */}
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-[auto_1fr] w-full gap-2">
            <span>Details</span>
            <div className="h-full grid grid-rows-2 grid-cols-1">
              <div />
              <div className="border-t border-LunarGrey-light/25" />
            </div>
          </div>
          {Object.entries(card.details).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between w-full gap-2 text-sm font-light font-mono text-LunarGrey-light tracking-normal normal-case"
            >
              <span>{capitalizeFirstLetter(key)}</span>
              <span className="text-VoidBlack font-medium whitespace-nowrap">
                {value}
              </span>
            </div>
          ))}
        </div>
        {/* Tags Section */}
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-[auto_1fr] w-full gap-2">
            <span>Tags</span>
            <div className="h-full grid grid-rows-2 grid-cols-1">
              <div />
              <div className="border-t border-LunarGrey-light/25" />
            </div>
          </div>
          <div className="flex w-full gap-2">
            {card.tags.map((tag) => (
              <div
                key={tag}
                className="bg-LunarGrey-light/50 rounded-sm px-4 py-0.5 text-xs font-light text-VoidBlack tracking-normal uppercase cursor-pointer hover:bg-LunarGrey-light transition-colors duration-200 ease-in-out"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Design Credit */}
      <Link
        href={"https://twitter.com/raphaelsalaja/status/1772210566297199098"}
        className="text-xs text-center font-light font-mono text-LunarGrey-light tracking-normal normal-case flex items-center border-b border-transparent hover:border-LunarGrey-light/50 mt-3"
      >
        Design Credit - @raphaelsalaja
      </Link>
    </div>
  );
}

function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + "B";
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "K";
  } else {
    return num.toString();
  }
}

/**
 * Capitalizes the first letter of a given string.
 *
 * @param str - The string to be capitalized.
 * @returns The string with the first letter capitalized. If the input string is empty,
 *          it returns the original string.
 */
function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
