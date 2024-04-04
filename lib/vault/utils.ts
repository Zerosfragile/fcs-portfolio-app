import puppeteer from "puppeteer";
import fs from "fs-extra";
import path from "path";
import sharp from "sharp";
import { InspirationResource } from "./insperation";

const shouldRefetch = (resource: InspirationResource): boolean => {
  if (!resource.lastEdited) return true; // No timestamp, needs fetch
  const lastEditedDate = new Date(resource.lastEdited);
  const hoursSinceLastEdit =
    (new Date().getTime() - lastEditedDate.getTime()) / (1000 * 60 * 60);
  return hoursSinceLastEdit > 24 * 100; // Refetch if older than 100 days
};

export const saveFile = async (
  content: Buffer | string,
  folder: string,
  fileName: string
): Promise<string> => {
  const filePath = path.join("public", "vault", folder, fileName);
  await fs.ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, content);
  return filePath.replace(path.join("public"), "");
};

const fetchResourceData = async (
  resource: InspirationResource,
  titlePrefix: string = ""
) => {
  if (
    resource.title &&
    resource.icon &&
    resource.preview &&
    !shouldRefetch(resource)
  ) {
    console.log(`Skipping fetch for ${resource.url}, data is up to date.`);
    return resource; // Return as is if it doesn't need refetching
  }

  // Verify URL format
  if (
    !resource.url.startsWith("http://") &&
    !resource.url.startsWith("https://")
  ) {
    console.error(
      `Invalid URL format for ${resource.url}. Please ensure the URL starts with http:// or https://`
    );
    return null; // Or handle this case as you see fit
  }

  try {
    console.log(`Fetching data for ${resource.url}...`);
    //? 1. Puppeteer Setup
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });
    await page.goto(resource.url);
    await setTimeout(() => {}, 10000); // Wait for page and potential animations to load

    //? 2. Title and Folder Setup
    // This regex matches any character not allowed in a folder name
    const forbiddenChars: RegExp = /[\\/:*?"<>|]/g;
    const title = resource.title
      ? resource.title
      : (await page.title()).replace(forbiddenChars, " ");
    console.log(`Title: ${title}`);
    const folderName = titlePrefix + "/" + title;

    //? 3. Screenshot Preview
    let screenshotPath = "";

    if (!resource.preview) {
      const screenshot = await page.screenshot({ encoding: "binary" });
      screenshotPath = await saveFile(screenshot, folderName, "preview.png");
      console.log(`Screenshot: ${screenshot ? "success" : "failed"}`);
    } else {
      screenshotPath = resource.preview;
    }

    //? 4. Icon Setup

    let iconPath = "";

    if (!resource.icon) {
      let faviconUrl = await page.evaluate(() => {
        return (
          document
            .querySelector('link[rel="shortcut icon"]')
            ?.getAttribute("href") ||
          document.querySelector('link[rel="icon"]')?.getAttribute("href") ||
          resource.url + "/favicon.ico"
        );
      });

      if (!faviconUrl.startsWith("http")) {
        faviconUrl = resource.url + faviconUrl;
      }

      console.log(`Favicon: ${faviconUrl}`);

      const response = await page.goto(faviconUrl);
      if (response) {
        const buffer = await response.buffer();
        iconPath = await saveFile(buffer, folderName, "icon.png");
      }
      console.log(`Icon: ${response ? "success" : "failed"}`);
    } else {
      iconPath = resource.icon;
    }

    await browser.close();

    return {
      ...resource,
      title: title,
      icon: iconPath.replace(/\\/g, "/"),
      preview: screenshotPath.replace(/\\/g, "/"),
      lastEdited: new Date().toISOString(), // Update last edited time
    };
  } catch (error) {
    console.error(`Error processing resource ${resource.url}:`, error);
    return resource;
  }
};

export const iterateResources = async (
  resources: InspirationResource[],
  titlePrefix: string = ""
) => {
  for (let i = 0; i < resources.length; i++) {
    try {
      if (!resources[i]) {
        throw new Error("Resource is null or undefined");
      }
      resources[i] = (await fetchResourceData(
        resources[i],
        titlePrefix
      )) as InspirationResource;

      if (resources[i].external_links) {
        await iterateResources(
          resources[i].external_links || [],
          resources[i].title + "/"
        );
      }
    } catch (error) {
      console.error(`Error processing resource ${resources[i].url}:`, error);
    }
  }
};

export async function saveSVGAsPNG({
  svgContent,
  dimensions = { w: 100, h: 100 },
}: {
  svgContent: string;
  dimensions?: { w: number; h: number };
}) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>SVG Center</title>
<style>
  body, html {
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
  }
  svg {
    display: block; /* Removes extra space below SVG */
  }
</style>
</head>
<body>
  ${svgContent}
</body>
</html>
`;

  // Load SVG content into the page
  await page.setContent(svgContent);

  await page.setContent(htmlContent, {
    waitUntil: "networkidle0",
  });

  // Optional: Set the viewport if you want a specific window size
  await page.setViewport({
    width: dimensions.w,
    height: dimensions.h,
  });

  // Take a screenshot of the SVG content
  const buffer = await page.screenshot({
    encoding: "binary",
    omitBackground: true,
  });

  // Use Sharp to convert the screenshot (buffer) to PNG (if needed)
  sharp(buffer)
    .png()
    .toFile("icon.png", (err, info) => {
      if (err) throw err;
      console.log("SVG has been converted to PNG.");
    });

  await browser.close();
}
