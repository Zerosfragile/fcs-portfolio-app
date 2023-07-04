"use client";
import { useState, useEffect } from "react";

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};

interface DynamicLabelOptions {
  labels?: { breakpoint: number; text: string }[];
  prefix: { breakpoint: number; text: string };
  defaultLabel: string;
}

export const useDynamicLabel = ({
  labels,
  prefix,
  defaultLabel,
}: DynamicLabelOptions) => {
  const windowWidth = useWindowWidth();

  const getLabelText = () => {
    if (!labels) {
      return defaultLabel;
    }

    for (let i = 0; i < labels.length; i++) {
      if (windowWidth < labels[i].breakpoint) {
        return labels[i].text;
      }
    }
    return defaultLabel;
  };

  const getLabelPrefix = (getLabelText: () => string) => {
    if (prefix && windowWidth >= prefix.breakpoint) {
      return prefix.text + getLabelText();
    }
    return getLabelText();
  };

  return getLabelPrefix(getLabelText);
};
