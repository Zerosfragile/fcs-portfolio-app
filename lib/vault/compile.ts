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

console.log("New resources:");
nonCompiledInspiration
  .filter((obj2) => !processedResources.some((obj1) => obj1.url === obj2.url))
  .forEach((resource) => console.log(`\t${resource.url}`));

console.log("\n Iterating Resources...\n");

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
//   svgContent: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
// <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
// <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
// <metadata>
// Created by potrace 1.11, written by Peter Selinger 2001-2013
// </metadata>
// <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
// <path d="M2310 5109 c-502 -55 -974 -249 -1355 -556 -129 -104 -340 -321 -433 -445 -265 -354 -434 -758 -498 -1193 -22 -147 -29 -428 -15 -575 42 -433 180 -833 405 -1174 414 -629 1047 -1032 1791 -1142 147 -22 428 -29 575 -15 433 42 833 180 1174 405 629 414 1032 1047 1142 1791 22 147 29 428 15 575 -51 524 -238 988 -558 1385 -104 129 -321 340 -445 433 -354 265 -755 432 -1193 498 -121 18 -487 26 -605 13z m909 -2348 c347 -607 631 -1105 631 -1107 0 -2 -569 -4 -1265 -4 -696 0 -1265 2 -1265 5 0 8 1263 2216 1266 2212 1 -1 287 -499 633 -1106z"/>
// </g>
// </svg>
// `,
//   dimensions: { w: 512, h: 512 },
// });