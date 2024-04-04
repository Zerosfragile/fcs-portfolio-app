import fs from "fs-extra";
import path from "path";
import { processedResources } from "./processed-resources";
import { iterateResources, saveFile, saveSVGAsPNG } from "./utils";
import { InspirationResource, nonCompiledInspiration } from "./insperation";

let resources = processedResources as InspirationResource[];

function joinUniqueByUrl(
  priorityArray: InspirationResource[],
  mergingArray: InspirationResource[]
): InspirationResource[] {
  // Create a new Set with urls from the first array for quick lookup
  const urlsSet = new Set(priorityArray.map((obj) => obj.url));

  // Filter the second array, keeping only objects with a url not in the Set
  const uniqueResourcesToMerge = mergingArray.filter(
    (obj) => !urlsSet.has(obj.url)
  );

  // Combine the first array with the filtered second array
  return [...priorityArray, ...uniqueResourcesToMerge];
}

resources = joinUniqueByUrl(resources, nonCompiledInspiration);

async function saveProcessedResources(resources: InspirationResource[]) {
  resources = resources.filter((resource) => resource.title);

  const content = `export const processedResources = ${JSON.stringify(
    resources,
    null,
    2
  )};`;

  const scriptPath = __dirname; // Or however you determine your script's directory
  const filePath = path.join(scriptPath, "processed-resources.ts");

  // Using fs.promises to handle this asynchronously
  await fs.promises.writeFile(filePath, content, "utf8");
  console.log(`Processed resources have been saved to ${filePath}`);
}

iterateResources(resources).then(() => saveProcessedResources(resources));

// saveSVGAsPNG({
//   svgContent: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
//   <style>
//     path { fill: black; }
//     @media (prefers-color-scheme: dark) {
//       path { fill: white; }
//     }
//   </style>
//   <path d="M63 51L40.8237 13H35.6991H29.3009H24.1751L2 51H13.5228L32.5 18.4821L51.4759 51H63Z" fill="white"/>
// </svg>
// `,
//   dimensions: { w: 64, h: 64 },
// });
