"use client";
import { useEffect, useRef, Dispatch, SetStateAction } from "react";

export const debounce = <T extends Function>(func: T, delay: number): T => {
  let debounceTimer: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(...args), delay);
  }) as unknown as T;
};

export const useScrollDirection = (
  state: boolean,
  setState: Dispatch<SetStateAction<boolean>> | ((value: boolean) => void),
  debounceTime: number = 300,
  enabled: boolean = true,
  trackpadSensitivity: number = 1,
  eventTarget: EventTarget | undefined = typeof window !== "undefined"
    ? window
    : undefined
): [
  boolean,
  Dispatch<SetStateAction<boolean>> | ((value: boolean) => void)
] => {
  const lastTouchY = useRef(0); // Use useRef to preserve last Y-position for touch
  const accumulatedDeltaY = useRef(0); // New ref to accumulate deltaY for trackpad

  useEffect(() => {
    if (typeof window === "undefined" || !eventTarget) {
      // Exit early if we're rendering on the server or if no eventTarget is provided
      return;
    }
    if (!enabled) return;

    const handleWheel = debounce((e: WheelEvent) => {
      accumulatedDeltaY.current += e.deltaY; // Accumulate deltaY

      // Check if accumulatedDeltaY crosses the sensitivity threshold
      if (Math.abs(accumulatedDeltaY.current) >= trackpadSensitivity) {
        if (accumulatedDeltaY.current > 0) {
          // Scrolling down
          setState(false);
        } else if (accumulatedDeltaY.current < 0) {
          // Scrolling up
          setState(true);
        }
        accumulatedDeltaY.current = 0; // Reset accumulated deltaY
      }
    }, debounceTime);

    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY.current = e.touches[0].clientY;
    };

    const handleTouchMove = debounce((e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      if (touchY > lastTouchY.current) {
        // Scrolling up
        setState(true);
      } else if (touchY < lastTouchY.current) {
        // Scrolling down
        setState(false);
      }
      lastTouchY.current = touchY;
    }, debounceTime);

    window.addEventListener("wheel", handleWheel as EventListener);
    window.addEventListener("touchstart", handleTouchStart as EventListener);
    window.addEventListener("touchmove", handleTouchMove as EventListener);

    return () => {
      // Cleanup
      window.removeEventListener("wheel", handleWheel as EventListener);
      window.removeEventListener(
        "touchstart",
        handleTouchStart as EventListener
      );
      window.removeEventListener("touchmove", handleTouchMove as EventListener);
    };
  }, [setState, debounceTime, enabled, eventTarget, trackpadSensitivity]);

  return [state, setState];
};
