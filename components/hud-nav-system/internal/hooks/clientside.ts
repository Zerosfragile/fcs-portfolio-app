"use client";
import { useState, useEffect, RefObject } from "react";

export const useWindowWidth = () => {
  const isClient = typeof window === "object";

  const [windowWidth, setWindowWidth] = useState(
    isClient ? window.innerWidth : 0
  );

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

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

interface Size {
  width: number | null;
  height: number | null;
  left: number | null;
}

export const useComponentSize = (ref: RefObject<HTMLElement>): Size => {
  const [componentSize, setComponentSize] = useState<Size>({
    width: null,
    height: null,
    left: null,
  });

  useEffect(() => {
    const updateSize = () => {
      const component = ref.current;
      if (component) {
        setComponentSize({
          width: component.offsetWidth,
          height: component.offsetHeight,
          left: component.offsetLeft,
        });
      }
    };

    updateSize(); // Initial update

    const observer = new MutationObserver(updateSize);
    const config = { attributes: true, childList: true, subtree: true };

    const component = ref.current;
    if (component) {
      observer.observe(component, config);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return componentSize;
};
