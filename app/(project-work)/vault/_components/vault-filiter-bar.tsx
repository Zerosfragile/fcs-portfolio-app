"use client";

import React, { useCallback } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Combobox } from "@/components/ui/combo-box";
import { Button } from "@/components/ui/button";
import { InputIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  items: { value: string; label: string }[];
};

export default function VaultFilterBar({ items }: Props) {
  const [value, setValue] = React.useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"default"}
          className="z-20 fixed top-0 left-1/2 -translate-x-1/2 translate-y-1/4 p-0 h-fit rounded-3xl duration-500 bg-VoidBlack border-OffWhite/[.33] border group transition-all focus:border-OffWhite"
        >
          <div className="text-xs px-3 pr-4 py-0 h-[26px] inline-flex items-center justify-center">
            <InputIcon className="mr-1 mb-0.5 text-OffWhite group-hover:text-VoidBlack transition-all duration-500" />
            <span className="text-md font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-OffWhite to-LunarGrey-light cursor-pointer p-1 duration-500 group-hover:invert transition-all">
              Filter Vault
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="items-center flex bg-VoidBlack border-OffWhite/[.33] border w-[500px] max-w-[90vw] h-fit rounded-3xl p-1">
        <Combobox
          placeholders={{
            select: "Type",
            search: "Search...",
            empty: "No Resources Found.",
          }}
          classes={{
            trigger: {
              button:
                "h-fit w-fit px-3 pl-4 py-1 rounded-[28px] duration-500 bg-VoidBlack border-OffWhite/[.33] border group transition-all focus:border-OffWhite hover:invert",
              text: "font-light transition-all font-mono tracking-[0.15em] text-xs uppercase text-OffWhite text-balance whitespace-nowrap",
              icon: "text-OffWhite transition-all duration-500",
            },
            popOver: {
              content: "rounded-xl box-border mt-2 ",
              item: "uppercase font-mono transition-colors duration-200 ease-linear rounded-lg",
              clear:
                "uppercase font-mono bg-[#fc0100]/10 aria-selected:bg-[#fc0100]/30 transition-colors duration-200 ease-linear text-OffWhite rounded-lg",
            },
          }}
          items={items}
          value={value}
          onChange={function (v: string): void {
            setValue(v);
            const newQueryString = createQueryString("type", v);
            router.push(
              pathname + (newQueryString ? "?" + newQueryString : "")
            );
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
