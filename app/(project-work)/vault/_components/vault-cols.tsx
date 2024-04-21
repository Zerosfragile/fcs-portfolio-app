"use client";
import { InspirationSiteResource } from "@/lib/vault/sites/inspiration";
import React from "react";
import { InspirationResource } from "../page";
import SiteCardCol from "./vault-card-col";
import { useSearchParams } from "next/navigation";

function splitArrayAlphabetically(
  items: InspirationResource[],
  columns: number
): InspirationResource[][] {
  // Sort items alphabetically based on the title
  const sortedItems = items.sort((a, b) => {
    if (a.title && b.title) {
      return a.title.localeCompare(b.title);
    } else if (a.type == "site" && b.type == "site" && a.url && b.url) {
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

export default function VaultCols({
  resources,
}: {
  resources: InspirationResource[];
}) {
  const searchParams = useSearchParams();
  const search = searchParams.get("type");

  const filteredResources = resources.filter((resource) =>
    search ? resource.type === search : true
  );

  const ThreeColumns = splitArrayAlphabetically(filteredResources, 3);
  const TwoColumns = splitArrayAlphabetically(filteredResources, 2);
  return (
    <section>
      {/* Small Screens - 1 Column */}
      <section className="md:hidden">
        <SiteCardCol resources={filteredResources} delayInSeconds={0.1} />
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
    </section>
  );
}
