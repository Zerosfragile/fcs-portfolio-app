"use server";
import React from "react";
import { processedResources } from "@/lib/vault/processed-resources";
import { InspirationResource } from "@/lib/vault/insperation";
import SiteCard from "./_components/site-card";
import { useMediaQuery } from "@/lib/hooks";
import { AnimatePresence, motion } from "framer-motion";
import SiteCardCol from "./_components/site-card-col";

function splitArrayAlphabetically(
  items: InspirationResource[],
  columns: number
): InspirationResource[][] {
  // Sort items alphabetically based on the title
  const sortedItems = items.sort((a, b) => {
    if (a.title && b.title) {
      return a.title.localeCompare(b.title);
    } else if (a.url && b.url) {
      return a.url.localeCompare(b.url);
    }
    return 0;
  });

  // Initialize columns
  const distribution: InspirationResource[][] = Array.from(
    { length: columns },
    () => []
  );

  // Distribute items into columns
  sortedItems.forEach((item, index) => {
    const columnIndex = index % columns;
    distribution[columnIndex].push(item);
  });

  return distribution;
}

export default async function VaultPage() {
  const resources = processedResources.sort((a, b) => {
    if (a.title && b.title) {
      return a.title.localeCompare(b.title);
    } else if (a.url && b.url) {
      return a.url.localeCompare(b.url);
    }
    return 0;
  }) as InspirationResource[];

  const ThreeColumns = splitArrayAlphabetically(resources, 3);
  const TwoColumns = splitArrayAlphabetically(resources, 2);

  return (
    <main className="p-4">
      {/* Small Screens - 1 Column */}
      <section className="md:hidden">
        <SiteCardCol resources={resources} delayInSeconds={0.1} />
      </section>

      {/* Medium Screens - 2 Columns */}
      <section className="hidden md:grid xl:hidden grid-cols-2 gap-2">
        {TwoColumns.map((col, index) => (
          <SiteCardCol
            resources={col}
            delayInSeconds={index * 0.1}
            key={index}
          />
        ))}
      </section>
      {/* Xlarge Screens - 3 Columns */}
      <section className="hidden xl:grid grid-cols-3 gap-2">
        {ThreeColumns.map((col, index) => (
          <SiteCardCol
            resources={col}
            delayInSeconds={index * 0.1}
            key={index}
          />
        ))}
      </section>
    </main>
  );
}
