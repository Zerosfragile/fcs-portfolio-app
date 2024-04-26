import { AnimatedLinesInfo } from "./src/animated-lines";
import { MinimalistItemSocialCardInfo } from "./src/minimalist-item-social-card";

export type ComponentDependencyInformation = {
  name: string;
  installCommands?: { [key: string]: string };
  version?: string;
  description?: string;
  links?: {
    documentation?: string;
    npm?: string;
    github?: string;
  };
};

export type ComponentTypeInformation = {
  name: string;
  description?: string;
  code: string;
};

export type ComponentCredit = {
  name: string;
  role: string;
  info?: string;
  link: string;
};

export type InspirationUtilFunctionInfo = {
  name: string;
  description: string;
  code: string;
  category: string[];
  dependencies?: ComponentDependencyInformation[];
  credits?: ComponentCredit[];
  createdAt?: string; // ISO 8601 format date string
};

export type InspirationComponentResource = {
  type: "components";
  title: string;
  display: React.ReactNode;
  description: string;
  category: string[];
  credits?: ComponentCredit[];
  createdAt: string; // ISO 8601 format date string
  dependencies?: ComponentDependencyInformation[];
  code?: string;
  types?: ComponentTypeInformation[];
  props?: ComponentTypeInformation[];
  utilDependencies?: InspirationUtilFunctionInfo[];
  componentDependencies?: InspirationComponentResource[];
};

export const components = [MinimalistItemSocialCardInfo, AnimatedLinesInfo];
