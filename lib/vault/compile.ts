import fs from "fs-extra";
import path from "path";
import { processedResources } from "./processed-resources";
import { iterateResources } from "./utils";
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
  return;
}

iterateResources(resources).then(() => saveProcessedResources(resources));
