import { components, InspirationComponentResource } from "./components";
import { InspirationSiteResource } from "./sites/inspiration";
import { processedResources as sites } from "./sites/processed-resources";

export type InspirationResource =
  | InspirationSiteResource
  | InspirationComponentResource;

export const InspirationResources = [
  ...sites.map((r) => ({ ...r, type: "sites" })),
  ...components,
] as InspirationResource[];
