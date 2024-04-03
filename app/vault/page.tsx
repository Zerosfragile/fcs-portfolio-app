"use server";
import React from "react";
import { processedResources } from "@/lib/vault/processed-resources";
import {
  InspirationResource,
  nonCompiledInspiration,
} from "@/lib/vault/insperation";
import SiteCard from "./_components/site-card";

const resources = processedResources.filter(
  (resource) => resource.title
) as InspirationResource[];

type Props = {};

export default async function VaultPage({}: Props) {
  const columns = 3;

  const [col1, col2, col3] = resources.reduce<
    [InspirationResource[], InspirationResource[], InspirationResource[]]
  >(
    (acc, current, index) => {
      acc[index % 3].push(current);
      return acc;
    },
    [[], [], []]
  );

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 p-4">
      <div>
        {col1.map((resource) => (
          <SiteCard key={resource.url} {...resource} />
        ))}
      </div>
      <div>
        {col2.map((resource) => (
          <SiteCard key={resource.url} {...resource} />
        ))}
      </div>
      <div>
        {col3.map((resource) => (
          <SiteCard key={resource.url} {...resource} />
        ))}
      </div>
    </main>
  );
}
