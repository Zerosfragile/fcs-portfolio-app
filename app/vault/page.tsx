"use server";
import React from "react";
import { processedResources } from "@/lib/vault/processed-resources";
import { InspirationResource } from "@/lib/vault/insperation";
import SiteCard from "./_components/site-card";
import { useMediaQuery } from "@/lib/hooks";

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
      <section className="grid md:hidden grid-cols-1 gap-2">
        {resources.map((resource) => (
          <SiteCard key={resource.url} {...resource} />
        ))}
      </section>

      {/* Medium Screens - 2 Columns */}
      <section className="hidden md:grid xl:hidden grid-cols-2 gap-2">
        {TwoColumns.map((col, index) => (
          <div key={index} className="flex flex-col gap-2">
            {col.map((resource) => (
              <SiteCard key={resource.url} {...resource} />
            ))}
          </div>
        ))}
      </section>
      {/* Xlarge Screens - 3 Columns */}
      <section className="hidden xl:grid grid-cols-3 gap-2">
        {ThreeColumns.map((col, index) => (
          <div key={index} className="flex flex-col gap-2">
            {col.map((resource) => (
              <SiteCard key={resource.url} {...resource} />
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}
