import { useEffect, useRef, useState } from "react";

export function useHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleWheelScroll = (e: WheelEvent) => {
      const container = containerRef.current;
      if (container) {
        if (e.deltaY !== 0) {
          e.preventDefault(); // Prevent page scrolling
          container.scrollLeft += e.deltaY;
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheelScroll, {
        passive: false,
      });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheelScroll);
      }
    };
  }, []);

  return containerRef;
}

export function useHorizontalScroll2() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleWheelScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (container) {
      if (e.deltaY > 0) {
        container.scrollLeft += 100;
      } else {
        container.scrollLeft -= 100;
      }
    }
  };

  return {
    containerRef,
    handleWheelScroll,
  };
}

export function useRotatingString(
  listOfStrings: string[],
  intervalDuration: number
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentString, setCurrentString] = useState(listOfStrings[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % listOfStrings.length;
        setCurrentString(listOfStrings[nextIndex]);
        return nextIndex;
      });
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [listOfStrings, intervalDuration]);

  return currentString;
}

export default useRotatingString;
