import { RefObject, useState, useEffect } from "react";
import { AnimationControls, useAnimationControls } from "framer-motion";
import { HNSite } from "../../"; // Replace this with the actual path to your HNSite type

export type HandleMouseEnter = (
  btn: RefObject<HTMLButtonElement | null>,
  sites: HNSite[] | []
) => void;

export type HNBack = {
  sites: {
    links: HNSite[] | [];
    state: boolean;
  };
  animation: AnimationControls;
};

export const useHandleHNA = (containerRef: RefObject<HTMLDivElement>) => {
  const settings = {
    INITIAL_HEIGHT: "150%",
    ANIMATION_DELAY: 500, // milliseconds
    LINK_REVEAL_DELAY: 100, // milliseconds
    LINK_HEIGHT: 45, // pixels
    BTN_PADDING: 25, // pixels
  };

  const [siteLinks, setSiteLinks] = useState<HNSite[] | []>([]);
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimationControls();

  // Declare timeout variables to clear timeouts when component unmounts, to avoid memory leaks.
  let timeout1: NodeJS.Timeout | undefined;
  let timeout2: NodeJS.Timeout | undefined;
  let timeout3: NodeJS.Timeout | undefined;

  const resizeToBtn = (
    button: RefObject<HTMLButtonElement | null>,
    controls: AnimationControls,
    padding: number
  ) => {
    if (button.current) {
      controls.start({
        opacity: 100,
        width: button.current.offsetWidth + padding,
        left: button.current.offsetLeft - padding / 2,
      });
    }
  };

  const expandToContainer = (
    containerRef: RefObject<HTMLDivElement>,
    controls: AnimationControls
  ) => {
    if (containerRef.current) {
      controls.start({
        width: "100%",
        left: -0.5,
      });
    }
  };

  const expandToLinks = (
    sites: HNSite[],
    containerRef: RefObject<HTMLDivElement>,
    controls: AnimationControls
  ) => {
    let backHeight = settings.INITIAL_HEIGHT;
    if (sites.length > 0) {
      backHeight = (sites.length + 1) * settings.LINK_HEIGHT + `px`;
    }

    controls.start({
      bottom: containerRef.current
        ? containerRef.current.offsetHeight * -0.25
        : 0,
      height: backHeight,
    });
  };

  const handleMouseEnter = (
    btn: RefObject<HTMLButtonElement | null>,
    sites: HNSite[] | []
  ) => {
    console.log(btn);
    resizeToBtn(btn, controls, settings.BTN_PADDING);
    setSiteLinks(sites);
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    clearTimeout(timeout3);

    timeout1 = setTimeout(() => {
      expandToContainer(containerRef, controls);
      timeout2 = setTimeout(() => {
        expandToLinks(sites, containerRef, controls);
        timeout3 = setTimeout(() => {
          setIsVisible(true);
        }, settings.LINK_REVEAL_DELAY);
      }, settings.ANIMATION_DELAY);
    }, settings.ANIMATION_DELAY);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    clearTimeout(timeout3);

    setIsVisible(false);
    controls.start({ opacity: 0, height: settings.INITIAL_HEIGHT });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const HNBack: HNBack = {
    sites: { links: siteLinks, state: isVisible },
    animation: controls,
  };

  return { handleMouseEnter, handleMouseLeave, HNBack };
};
