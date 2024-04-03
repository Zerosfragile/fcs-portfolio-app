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
  category: InspirationCategory[];
  url: string;
  external_links?: InspirationResource[];
  icon?: string;
  preview?: string;
  lastEdited?: string; // ISO 8601 format date string
};

export const nonCompiledInspiration: InspirationResource[] = [
  {
    description: "Web design awards",
    context: "Large collection of industry-leading websites.",
    category: [inspirationCategories[4]],
    url: "https://www.cssdesignawards.com",
  },
  {
    description: "Portfolio of Emil Kowalski Design Engineer & Developer",
    context:
      "Simple and clean example of what a professional portfolio should consist of.",
    category: [inspirationCategories[0]],
    url: "https://emilkowal.ski",
    external_links: [
      {
        description:
          "Vault - A selection of useful links, tools, engineers and designers to inspire, learn, and create.",
        context:
          "Valut of resources curated by Emil Kowalski for his animations and web interaction design course.",
        category: [inspirationCategories[2], inspirationCategories[3]],
        url: "https://animations.dev/vault",
      },
    ],
  },
  {
    description: "Portfolio of Paco Coursey Design Engineer & Developer",
    context:
      "Simple and clean example of what a professional portfolio should consist of.",
    category: [inspirationCategories[0]],
    url: "https://paco.me",
    external_links: [
      {
        description:
          "Curation of interfaces and interactions made by Paco Coursey.",
        category: [inspirationCategories[2], inspirationCategories[3]],
        url: "https://paco.me/craft",
      },
      {
        description: "⌘K - Fast, composable, unstyled command menu for React.",
        context: "Command Menu react component library made by Paco Coursey.",
        category: [inspirationCategories[5]],
        url: "https://cmdk.paco.me",
      },
    ],
  },
  {
    description: "Collection of cutting edge user interfaces and interactions",
    context: "Large collection of industry-leading interface design.",
    category: [inspirationCategories[4]],
    url: "https://www.interfacefutures.com",
  },
  {
    description: `Experimental laboratory of user interface patterns and interactions that make you think "what the fuck?" in a thought-provoking way.`,
    context: "Small curation of ui interactions.",
    category: [inspirationCategories[3]],
    url: "https://uiw.tf",
  },
  {
    description:
      "Small laboratory of fine UI Website and components designed and built by Mariana Castilho",
    context: "Small curation of react components",
    category: [inspirationCategories[3]],
    url: "https://www.uilabs.dev",
  },
  {
    description: "Web design catalog with inspiration from across the web",
    context: "Large collection of cutting edge web design",
    category: [inspirationCategories[4]],
    url: "https://www.curated.design",
  },
  {
    description: "Portfolio of designer and developer Sang Jin Lee",
    context: "Super minimalist unfinished portfolio",
    category: [inspirationCategories[0]],
    url: "https://www.sang.design",
  },
  {
    description: "Portfolio of product engineer Alexandru Ţurcanu",
    context:
      "Her open-source experiments and projects sections showcase high quality work with context",
    category: [inspirationCategories[0]],
    url: "https://alexandru.so",
    external_links: [
      {
        description: "Projects of Alexandru Ţurcanu",
        context:
          "Hover animations that reveal project previews and historical progression turn early projects into a narrative journey, fitting a professional portfolio. This is particularly beneficial for new developers, highlighting growth when lacking extensive professional experience and polished projects.",
        category: [inspirationCategories[2]],
        url: "https://alexandru.so/projects",
      },
      {
        description: "Playground of small experiments by Alexandru Ţurcanu",
        context: "Experiments are simple, clean and open-source.",
        category: [inspirationCategories[2]],
        url: "https://alexandru.so/experiments",
      },
    ],
  },
  {
    description: "Portfolio of design and development studio Reboot",
    context: "Simple layout with interesting interactions.",
    category: [inspirationCategories[0], inspirationCategories[1]],
    url: "https://reboot.studio",
  },
  {
    description: "Portfolio of product designer Jamie Gray",
    context:
      "Simple portfolio filled with informative and well documented interaction design documents.",
    category: [inspirationCategories[0], inspirationCategories[2]],
    url: "https://www.jamiegray.net",
    external_links: [
      {
        description: "Inline photos interaction design document by Jamie Gray",
        context:
          "Simple and informative interaction design documents that are well documented and easy to understand.",
        category: [inspirationCategories[2]],
        url: "https://www.jamiegray.net/blog/inline-photos",
      },
      {
        description:
          "Reducing Clutter on the Map design document by Jamie Gray",
        context:
          "Design document showcasing the process of reducing clutter on a map. The document is well documented and easy to understand. Shows that quality of work is more important than quantity of work.",
        category: [inspirationCategories[2]],
        url: "https://www.jamiegray.net/blog/saturday-map-clutter",
      },
    ],
  },
  {
    description:
      "programmatic MP4 videos using React with server-side rendering and parametrization.",
    context:
      "Open-source library for creating mp4 videos with react, used by vercel for ui and code showcase videos.",
    category: [inspirationCategories[6]],
    url: "https://www.remotion.dev",
    external_links: [
      {
        description: "Next.js Filesystem Routing with Remotion",
        category: [inspirationCategories[2]],
        url: "https://twitter.com/delba_oliveira/status/1707439537054535867",
      },
    ],
  },
  {
    description:
      "Functional graphics with rich interactivity and animation using state machines and html canvas, used by cutting edge web companies.",
    category: [inspirationCategories[6]],
    url: "https://rive.app",
    external_links: [
      {
        description: "Interactive Demo Playing Cards with Rive",
        context: "Created with rive by Senior Motion Designer",
        category: [inspirationCategories[2]],
        url: "https://x.com/drawsgood/status/1774045914568540649?s=20",
      },
      {
        description: "How Duolingo rebuilt all their characters with Rive",
        context:
          "Rive made Duolingo's files smaller and more performant, while also making lip-syncing possible at scale.",
        category: [inspirationCategories[2]],
        url: "https://blog.duolingo.com/world-character-visemes/",
      },
      {
        description: "Figma's new homepage is full of Rive animations",
        context: "Rive animations used in figma's new homepage",
        category: [inspirationCategories[2]],
        url: "https://rive.app/blog/figma-s-new-homepage-is-full-of-rive-animations",
      },
    ],
  },
  {
    description: "Geist Design System and component library for React",
    context:
      "Vercel's design system and component library, industry leading and filled with good design patterns.",
    category: [inspirationCategories[2], inspirationCategories[5]],
    url: "https://vercel.com/geist/introduction",
    external_links: [
      {
        description: "Geist UI Documentation",
        context:
          "Documentation for Geist UI, Vercel's design system filled with extra components and developer react hooks.",
        category: [inspirationCategories[2]],
        url: "https://geist-ui.dev/",
      },
    ],
  },
  {
    description: "Portfolio of designer and developer Rauno Freiberg",
    context:
      "Filled with interesting interactions and animations used by vercel and other cutting edge web companies.",
    category: [
      inspirationCategories[0],
      inspirationCategories[1],
      inspirationCategories[2],
    ],
    url: "https://rauno.me",
    external_links: [
      {
        description: "Craft - A collection of interfaces and interactions",
        context:
          "Collection of interfaces and interactions made by Rauno Freiberg.",
        category: [inspirationCategories[2], inspirationCategories[3]],
        url: "https://rauno.me/craft",
      },
    ],
  },
  {
    description: "Copy paste component library for React by Manu Arora",
    context:
      "Open source component library of complex animations and interactions",
    category: [inspirationCategories[5]],
    url: "https://ui.aceternity.com",
    external_links: [
      {
        description: "X - @mannupaaji",
        context: "Creator of Aceternity",
        category: [inspirationCategories[0]],
        url: "https://twitter.com/mannupaaji",
      },
    ],
  },
  {
    description:
      "Best-in-class Design Systems with components and foundations references from top-tier tech companies and leading UI teams",
    context: "Large collection of industry-leading design systems.",
    category: [inspirationCategories[4], inspirationCategories[2]],
    url: "https://designsystems.surf",
  },
  {
    description: "Portfolio of interface designer Ethan Chng",
    context: "Filled with professional data driven design documents.",
    category: [inspirationCategories[0], inspirationCategories[2]],
    url: "https://www.ethanchng.com",
  },
  {
    description: "Collection of website footer design",
    context: "Large collection of industry-leading website footers.",
    category: [inspirationCategories[4]],
    url: "https://www.footer.design",
  },
  {
    description: "Collection of darkmode website design",
    context: "Large collection of industry-leading darkmode websites.",
    category: [inspirationCategories[4]],
    url: "https://www.darkmodedesign.com",
  },
  {
    description: "Collection of website design details that feel like magic",
    context:
      "Personal Favorite curation of small ux/ui interactions which feel special.",
    category: [inspirationCategories[3], inspirationCategories[1]],
    url: "https://www.designspells.com",
  },
  {
    description: "Collection of minimalist website design",
    context: "Large collection of industry-leading minimalist websites.",
    category: [inspirationCategories[4]],
    url: "https://minimal.gallery",
  },
  {
    description: "Sapiens - Anthropology Magazine",
    context:
      "I like the simple but personal design of this website, the articles feel curated and well written.",
    category: [
      inspirationCategories[1],
      inspirationCategories[2],
      inspirationCategories[7],
    ],
    url: "https://www.sapiens.org",
  },
  {
    description: "Portfolio of design studio OMSE",
    context: "Smooth interactions and animations.",
    category: [inspirationCategories[7]],
    url: "https://www.omse.co",
  },
  {
    description: "Portfolio of web3 company Avara",
    context: "Super minimalist with smooth interactions and animations.",
    category: [inspirationCategories[7]],
    url: "https://avara.xyz",
  },
];
