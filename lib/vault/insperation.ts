export const inspirationCategories = [
  "portfolio",
  "design",
  "learning",
  "curated",
  "collection",
  "component library",
  "development library",
  "misc",
] as const;
export type InspirationCategory = (typeof inspirationCategories)[number];

export type InspirationResource = {
  title?: string;
  description: string;
  context?: string;
  category: InspirationCategory[] | string[];
  url: string;
  external_links?: InspirationResource[];
  icon?: string;
  preview?: string;
  lastEdited?: string; // ISO 8601 format date string
};

// Specify (URL) to be compiled into the app.
// Provide a brief (description) of each site, as found on the site itself.
// Explain the reason (context) for including each site in the vault.
// ---
// run `pnpm compile-vault` will compile this into `processed-resources.ts`
// Remove the urls from this file after they have been compiled for cleanliness

// ---
// pnpm `compile-vault` formats into json and iteratively gathers preview and other data from the sites
// You can find the code in `lib/vault/compile.ts` which calls utils in `lib/vault/utils.ts`

// ---
// The compile step will skip over that are already filled out in `processed-resources.ts`, so you can just delete the values you want to update and run `pnpm compile-vault` again if you need to update a resource
export const nonCompiledInspiration: InspirationResource[] = [];
