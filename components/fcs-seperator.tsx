import React from "react";
import { Separator as ShadSeperator } from "@/components/ui/separator";

type Props = {
  text?: string;
};

export function Separator({ text }: Props) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <ShadSeperator />
      </div>
      {text && (
        <div className="relative flex justify-center text-xs uppercase">
          <span className="rounded-lg bg-VoidBlack border-OffWhite/10 border px-2 text-muted-foreground">
            {text}
          </span>
        </div>
      )}
    </div>
  );
}
