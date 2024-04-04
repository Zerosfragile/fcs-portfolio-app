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
export const nonCompiledInspiration: InspirationResource[] = [
  {
    description:
      "Creative studio & Production representing talents that supports brands in the production of content, artistic direction and with the representation of talented artists.",
    context: "Unique design and smooth animations",
    category: ["agency", "curated"],
    title: "Denise Agency",
    url: "https://denise-agency.com/projects/",
    external_links: [
      {
        url: "https://denise-agency.com/who-is/",
        description:
          "About page for Denise Agency, a creative studio & production.",
        category: ["artist", "photographer", "portfolio"],
        title: "Who is Denise Agency",
        context: "Layout and use of subtle color in the 3d layering is nice",
      },
      {
        url: "https://denise-agency.com/artist/ben-fourmi/",
        description:
          "Denis Agency - Ben Fourmi Profile | photographer and art director based in Paris.",
        category: ["artist", "photographer", "portfolio"],
        title: "Ben Fourmi",
        context: "Gallery animation and interactions :3",
      },
    ],
  },
];
