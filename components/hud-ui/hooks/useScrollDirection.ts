import { useEffect, useRef, Dispatch, SetStateAction } from "react";

const debounce = (func: Function, delay: number) => {
  let debounceTimer: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(...args), delay);
  };
};

const useScrollDirection = (
  state: boolean,
  setState: Dispatch<SetStateAction<boolean>>,
  debounceTime: number = 300,
  enabled: boolean = true
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const lastTouchY = useRef(0); // Use useRef to preserve last Y-position for touch

  useEffect(() => {
    if (!enabled) return;
    const handleWheel = debounce((e: WheelEvent) => {
      if (e.deltaY > 0) {
        // Scrolling down
        setState(false);
      } else if (e.deltaY < 0) {
        // Scrolling up
        setState(true);
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
  }, [setState, debounceTime, enabled]);

  return [state, setState];
};

export default useScrollDirection;
