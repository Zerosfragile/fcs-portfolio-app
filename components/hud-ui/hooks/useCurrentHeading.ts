import { DotNavItem } from "@/lib/extractHeaders/types";
import { SetStateAction, useEffect, useState } from "react";

export type HeadingTagName = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export const normalizeList = (list: number[]) => {
  var min = Math.min(...list);
  var max = Math.max(...list);
  return list.map(function (value) {
    return (value - min) / (max - min);
  });
};

export const handleScroll = (headingElements: DotNavItem[]) => {
  const scrollTop = window.scrollY;

  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const maxScrollableHeight = documentHeight - windowHeight;

  // Calculate the top positions of each heading section
  const sectionTops = headingElements.map((element: DotNavItem) => {
    return element.offsetTop ? element.offsetTop + scrollTop : 0;
  });

  // Normalize values to ensure focusability and smooth transitions between sections
  const normalizedScrollTop = parseFloat(
    (scrollTop / maxScrollableHeight).toFixed(4)
  );
  const normalizedSectionTops = normalizeList(sectionTops).map(function (
    value: number
  ) {
    return Number(value.toFixed(2));
  });

  let heading = null;
  for (let i = normalizedSectionTops.length - 1; i >= 0; i--) {
    if (normalizedScrollTop >= normalizedSectionTops[i]) {
      heading = headingElements[i]?.id;
      break;
    }
  }
  return heading;
};

const useCurrentHeading = (headingElements: DotNavItem[]) => {
  const [currentHeading, setCurrentHeading] = useState<string | null>(null);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setCurrentHeading(handleScroll(headingElements));
    });
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", () => {
        setCurrentHeading(handleScroll(headingElements));
      });
    };
  }, [headingElements]);

  return currentHeading;
};

export default useCurrentHeading;
