"use server";
import React, { Suspense } from "react";
import { VaultFilterBar } from "./_components/vault-filiter-bar";
import VaultCols from "./_components/vault-cols";
import { InspirationResource, InspirationResources } from "@/lib/vault";
import { Button } from "@/components/ui/button";
import { InputIcon } from "@radix-ui/react-icons";

export default async function VaultPage() {
  const resources = InspirationResources.sort((a, b) => {
    if (a.title && b.title) {
      return a.title.localeCompare(b.title);
    }
    return 0;
  }) as InspirationResource[];

  const uniqueResourceTypes = resources
    .filter((r) => r.type !== undefined) // First, filter out undefined types
    .map((r) => ({ value: r.type, label: r.type })) // Map to the desired format
    .filter(
      (r, index, array) =>
        index ===
        array.findIndex((t) => t.label === r.label && t.value === r.value)
    ) as { value: string; label: string }[];

  // console.log(resources);
  return (
    <main className="p-4 relative">
      <Suspense
        fallback={
          <Button
            variant={"default"}
            disabled={true}
            className=" cursor-disabled z-20 fixed top-0 left-1/2 -translate-x-1/2 translate-y-1/4 p-0 h-fit rounded-3xl duration-500 bg-VoidBlack border-OffWhite/[.33] border group transition-all focus:border-OffWhite"
          >
            <div className="text-xs px-3 pr-4 py-0 h-[26px] inline-flex items-center justify-center">
              <InputIcon className="mr-1 mb-0.5 text-OffWhite group-hover:text-VoidBlack transition-all duration-500" />
              <span className="text-md font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-OffWhite to-LunarGrey-light cursor-pointer p-1 duration-500 group-hover:invert transition-all">
                Filter Vault
              </span>
            </div>
          </Button>
        }
      >
        <VaultFilterBar items={uniqueResourceTypes} />
      </Suspense>
      <VaultCols resources={resources} />
    </main>
  );
}
