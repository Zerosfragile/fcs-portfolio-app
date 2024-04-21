"use server";
import React from "react";
import VaultFilterBar from "./_components/vault-filiter-bar";
import VaultCols from "./_components/vault-cols";
import { InspirationResource, InspirationResources } from "@/lib/vault";

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
      <VaultFilterBar items={uniqueResourceTypes} />
      <VaultCols resources={resources} />
    </main>
  );
}
