"use client";
import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useIndexPrefix } from "../internal/hooks";
import { LayoutGroup, motion, useAnimationControls } from "framer-motion";
import HNBack from "../internal/hn-back";
import { useRouter } from "next/router";
import { Url } from "next/dist/shared/lib/router/router";

type Props = {
  children?: React.ReactNode;
  eventHandlers: any;
};

export type HNSite = {
  title: string;
  route: string;
};

export type HNContextType = {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  selectedID: string;
  setSelectedID: Dispatch<SetStateAction<string>>;
  container: RefObject<HTMLDivElement>;
  handleMouseEnter: any;
};

export const HNContext = createContext<HNContextType | null>(null);

const Container = (props: Props) => {
  const { children, eventHandlers } = props;
  const btnRefs = useRef({});
  // const containerRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedID, setSelectedID] = useState("null");

  const indexedChildren = useIndexPrefix(children);
  const containerRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const [siteLinks, setSiteLinks] = useState<
    { title: string; route: string }[]
  >([]);
  // Declare timeout variables to clear timeouts when component unmounts, to avoid memory leaks.
  let timeout1: NodeJS.Timeout | undefined;
  let timeout2: NodeJS.Timeout | undefined;
  let timeout3: NodeJS.Timeout | undefined;

  const handleMouseLeave = () => {
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    clearTimeout(timeout3);

    // Reset the background div to its initial state
    // const btnBack = backRef.current;
    setIsVisible(false);
    controls.start({ opacity: 0, height: "150%" });
    // btnBack.innerHTML = "";
  };

  // Needs to be applied through context provider to btns
  // ref={(btnRef) => {
  //   if (btnRef) {
  //     // Save a reference to each button for use in handleMouseEnter
  //     btnRefs.current[child.props.id] = btnRef;
  //   }
  // }}
  // onMouseEnter={() =>
  //   handleMouseEnter(btnRefs.current[child.props.id], child.props.sites)
  // }
  // onClick={() => handleClick(child.props.route, child.props.event)}

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleMouseEnter = (
    btn: RefObject<HTMLButtonElement | null>,
    sites:
      | {
          title: string;
          route: string;
        }[]
      | []
  ) => {
    // if (!btn.current) return;

    console.log(btn);
    controls.start({
      opacity: 100,
      width: btn.offsetWidth + 25,
      left: btn.offsetLeft - 25 / 2,
    });
    setSiteLinks(sites);
    clearTimeout(timeout1);
    clearTimeout(timeout2);
    clearTimeout(timeout3);

    timeout1 = setTimeout(() => {
      if (containerRef.current) {
        controls.start({
          width: containerRef.current.offsetWidth,
          left: -0.5,
        });
      }
      timeout2 = setTimeout(() => {
        let backHeight = "150%";
        if (sites.length > 0) {
          backHeight = (sites.length + 1) * 45 + `px`;
        }
        controls.start({
          bottom: containerRef.current
            ? containerRef.current.offsetHeight * -0.25
            : 0,
          height: backHeight,
        });
        timeout3 = setTimeout(() => {
          setIsVisible(true);
        }, 100);
      }, 500);
    }, 500);
  };

  return (
    <HNContext.Provider
      value={{
        isVisible,
        setIsVisible,
        selectedID,
        setSelectedID,
        container: containerRef,
        handleMouseEnter,
      }}
    >
      <LayoutGroup>
        <div
          ref={containerRef}
          className="relative mx-[18px] flex items-center justify-center"
        >
          {indexedChildren}
          <motion.div
            ref={backRef}
            onMouseLeave={handleMouseLeave}
            animate={controls}
            className="absolute left-[-0.5px] z-0 flex h-[150%] flex-col rounded-[6px] bg-VoidBlack-light opacity-100"
          >
            {siteLinks.map(
              (item: { title: string; route: string }, index: number) => (
                <motion.a
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    transition: { duration: 0.1 },
                  }}
                  href={item.route}
                  className="text-decoration-none w-[100% - 15px] m-[7.5px] inline-block truncate rounded-[6px] bg-LunarGrey-darkest/[.5] px-[14.5px] pb-[5.5px] pt-[7px] font-[CygnitoMono-011] text-[11px] font-normal uppercase leading-extra-tight text-OffWhite/[.66] opacity-100 shadow-LunarGrey-light/[.4] transition-all duration-500 ease-cubic hover:bg-LunarGrey-dark/[.40] hover:text-OffWhite-light hover:shadow-glow"
                >
                  {item.title}
                </motion.a>
              )
            )}
          </motion.div>
        </div>
      </LayoutGroup>
    </HNContext.Provider>
  );
};

export default Container;
