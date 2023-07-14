"use client";
import { SetStateAction, useEffect, useState } from "react";

export type HeadingTagName = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const useCurrentHeading = (headings: HeadingTagName[]) => {
  const [currentHeading, setCurrentHeading] = useState(null);

  useEffect(() => {
    const headingSelector = headings.join(", ");
    const headingElements = Array.from(
      document.querySelectorAll(headingSelector)
    );

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust this threshold as needed
    };

    const callback = (entries: any[]) => {
      entries.forEach(
        (entry: {
          isIntersecting: any;
          target: { id: SetStateAction<null> };
        }) => {
          if (entry.isIntersecting) {
            setCurrentHeading(entry.target.id);
          }
        }
      );
    };

    const observer = new IntersectionObserver(callback, options);

    headingElements.forEach((heading) => {
      observer.observe(heading);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return currentHeading;
};

export default useCurrentHeading;
