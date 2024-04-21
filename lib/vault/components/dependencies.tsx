import { ComponentDependencyInformation } from ".";

export const NextJS: ComponentDependencyInformation = {
  name: "Next.js",
  installCommands: {
    pnpm: "pnpm create next-app",
    npm: "npx create-next-app@latest",
    yarn: "yarn create next-app",
    bun: "bunx create-next-app",
  },
  version: "14.1.4",
  description: "A React framework for building full-stack web applications. ",
  links: {
    documentation: "https://nextjs.org/docs",
    npm: "https://www.npmjs.com/package/next",
    github: "https://nextjs.org/docs",
  },
};

export const RadixUIIcons: ComponentDependencyInformation = {
  name: "Radix UI Icons",
  installCommands: {
    pnpm: "pnpm add @radix-ui/react-icons",
    npm: "npm install @radix-ui/react-icons",
    yarn: "yarn add @radix-ui/react-icons",
    bun: "bunx add @radix-ui/react-icons",
  },
  version: "1.3.0",
  description: "A crisp set of 15x15 icons designed by the WorkOS team.",
  links: {
    documentation: "https://icons.radix-ui.com/",
    npm: "https://www.npmjs.com/package/@radix-ui/react-icons",
    github: "https://github.com/radix-ui/icons",
  },
};

export const FramerMotion: ComponentDependencyInformation = {
  name: "Framer Motion",
  installCommands: {
    pnpm: "pnpm add framer-motion",
    npm: "npm install framer-motion",
    yarn: "yarn add framer-motion",
    bun: "bunx add framer-motion",
  },
  version: "11.1.7",
  description: "An open source motion library for React, made by Framer.",
  links: {
    documentation: "https://www.framer.com/api/motion/",
    npm: "https://www.npmjs.com/package/framer-motion",
    github: "https://github.com/framer/motion",
  },
};

export const Clsx: ComponentDependencyInformation = {
  name: "clsx",
  installCommands: {
    pnpm: "pnpm add clsx",
    npm: "npm install clsx",
    yarn: "yarn add clsx",
    bun: "bunx add clsx",
  },
  version: "2.1.0",
  description:
    "A tiny utility for constructing className strings conditionally.",
  links: {
    documentation: "https://www.npmjs.com/package/clsx",
    npm: "https://www.npmjs.com/package/clsx",
    github: "https://github.com/lukeed/clsx#readme",
  },
};

export const TailwindMerge: ComponentDependencyInformation = {
  name: "tailwind-merge",
  installCommands: {
    pnpm: "pnpm add tailwind-merge",
    npm: "npm install tailwind-merge",
    yarn: "yarn add tailwind-merge",
    bun: "bunx add tailwind-merge",
  },
  version: "2.3.0",
  description:
    "Utility function to efficiently merge Tailwind CSS classes in JS without style conflicts.",
  links: {
    documentation: "https://www.npmjs.com/package/tailwind-merge",
    npm: "https://www.npmjs.com/package/tailwind-merge",
    github: "https://github.com/dcastil/tailwind-merge",
  },
};
