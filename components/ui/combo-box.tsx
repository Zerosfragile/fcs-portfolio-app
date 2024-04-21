"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowDownIcon, CheckIcon, MinusIcon } from "@radix-ui/react-icons";

type Props = {
  classes?: {
    trigger?: {
      button?: string;
      text?: string;
      icon?: string;
    };
    popOver?: {
      content?: string;
      item?: string;
      clear?: string;
      checkIcon?: string;
    };
  };
  placeholders?: {
    select?: string;
    search?: string;
    empty?: string;
    clear?: string;
  };
  items: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
};

export function Combobox({
  classes,
  placeholders,
  items = [],
  value,
  onChange,
}: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[200px] justify-between ",
            classes?.trigger?.button,
            classes?.trigger?.text
          )}
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : placeholders?.select ?? "Select Resource Type..."}
          <ArrowDownIcon
            className={cn(
              "ml-2 h-4 w-4 shrink-0 opacity-50",
              classes?.trigger?.icon
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-[200px] p-0", classes?.popOver?.content)}
      >
        <Command
          className={cn(classes?.popOver?.content, "m-0 p-0 w-full h-full")}
        >
          <CommandInput placeholder={placeholders?.search ?? "Search..."} />
          <CommandList>
            <CommandEmpty>
              {placeholders?.empty ?? "No resources found."}
            </CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className={classes?.popOver?.item}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      classes?.popOver?.checkIcon,
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
              <CommandItem
                value={"clear"}
                onSelect={(currentValue) => {
                  onChange("");
                  setOpen(false);
                }}
                className={cn("items-center ", classes?.popOver?.clear)}
              >
                <MinusIcon
                  className={cn("mr-2 h-4 w-4", classes?.popOver?.checkIcon)}
                />
                {placeholders?.clear ?? "Clear All"}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
