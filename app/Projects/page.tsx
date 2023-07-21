"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BlogData, PostMetaData, getBlogData } from "@/lib/posts";
import HUDN, { EventHandlers, TypingLabel } from "@/components/hud-nav-system";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  wrap,
} from "framer-motion";
import {
  HudPostsCard,
  handleCardMouseMove,
  HudCarousel,
  HudInfolay,
} from "@/components/hud-ui";
import Link from "next/link";

async function getPostData() {
  const postData: BlogData = await getBlogData();
  return postData;
}

const BtnContainer = ({ eventHandlers }: { eventHandlers: EventHandlers }) => {
  return (
    <div className="hud-border max-md:align-center bottom-0 flex h-[75px] items-center justify-between text-center max-md:h-[calc(calc(75px+2em))] max-md:flex-wrap max-md:justify-center max-md:overflow-hidden max-md:p-4">
      <HUDN.container eventHandlers={eventHandlers}>
        <HUDN.btn
          labels={[{ breakpoint: 850, text: "PREV" }]}
          defaultLabel="Previous Project"
          event="prevProject"
        />
        <HUDN.btn defaultLabel="Next" event="nextProject" />
      </HUDN.container>
      <HUDN.container eventHandlers={eventHandlers}>
        <HUDN.btn
          prefix={{
            breakpoint: 1100,
            text: "03 // ",
          }}
          labels={[{ breakpoint: 850, text: "View All" }]}
          defaultLabel="Toggle View"
          event="toggleAllProjects"
        />
        <HUDN.btn
          prefix={{
            breakpoint: 1100,
            text: "04 // ",
          }}
          defaultLabel="Home"
          route="/"
        />
      </HUDN.container>
    </div>
  );
};

const Loading = () => {
  return (
    <div
      className="
          bg-black hud-border ease relative flex h-[calc(100vh-39px)] justify-center overflow-x-hidden
          text-center duration-500 ease-cubic
        "
    >
      <div className="ease m-8 flex h-fit w-full cursor-default justify-between font-[CygnitoMono-011] font-light text-OffWhite/[.05] duration-500 ease-cubic hover:text-OffWhite/[.15]">
        <p>CODE</p>
        <p>PROJECTS</p>
        <p>DESIGN</p>
      </div>
      <div className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Link
          href={"/projects"}
          className="  flex flex-col items-center justify-center"
        >
          <Image
            src={"/images/056-Modern_Icons.png"}
            alt={""}
            width={75}
            height={75}
            className="opacity-10 invert transition-all duration-500 ease-linear group-hover:opacity-50"
          />
        </Link>
        <p
          className="m-6
          font-[CygnitoMono-011] text-[11.25px] font-normal uppercase text-OffWhite/[.33] transition-all duration-500 ease-linear group-hover:text-OffWhite/[.66]"
        >
          <TypingLabel text={" Initializing Data Link..."} />
        </p>
      </div>
    </div>
  );
};

export default function Projects() {
  const [postData, setPostData] = useState<PostMetaData[] | null>(null);
  const [allProjects, setAllProjects] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);
  const cardParentRef = useRef<HTMLDivElement>(null);
  const infoLayControls = useAnimationControls();

  const eventHandlers = {
    prevProject: () => {
      paginate(-1);
    },
    nextProject: () => {
      paginate(1);
    },
    toggleAllProjects: () => {
      setAllProjects(!allProjects);
    },
  };

  useEffect(() => {
    infoLayControls.set({
      opacity: 0,
      height: 0,
      transition: { duration: 0 },
    });
    infoLayControls.start({
      height: "100%",
      opacity: 100,
      transition: {
        type: "spring",
        stiffness: 100,
        height: { duration: 1, delay: 0.5 },
        opacity: { duration: 0.75 },
      },
    });
  }, [page, infoLayControls]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostData();
      setPostData(data["projects"]);
    };
    fetchData();
  }, []);

  const imageIndex = postData ? wrap(0, postData.length, page) : 0;

  if (!postData) {
    return <Loading />;
  }
  return (
    <>
      <div
        className="
          bg-black hud-border ease relative h-[calc(100vh-129px)] overflow-x-hidden text-center duration-500 ease-cubic
          max-md:h-[calc(100vh-130px-2em)]
        "
      >
        <AnimatePresence>
          {!allProjects && postData ? (
            <>
              <HudCarousel
                control={{ page: page, direction: direction, set: setPage }}
                images={postData.map((project) => project.preview)}
              />
              <motion.div
                initial={{ height: "100%", opacity: 100 }}
                animate={infoLayControls}
                exit={{ opacity: 0 }}
                className="absolute left-0 top-1/2 z-0 flex w-6/12 -translate-y-1/2 flex-col overflow-hidden border-r border-dashed border-OffWhite/[.15]"
              >
                {postData[imageIndex] && (
                  <HudInfolay
                    route={`/projects/${postData[imageIndex].id}`}
                    title={postData[imageIndex].title}
                    subtitle={postData[imageIndex].subtitle}
                  />
                )}
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 100 }}
              exit={{ opacity: 0 }}
              className="flex h-full w-full flex-wrap gap-4 p-[25px] justify-center"
              ref={cardParentRef}
              onMouseMove={(e) => handleCardMouseMove(e, cardParentRef)}
            >
              {postData.map((projectsData: PostMetaData, index: number) => (
                <HudPostsCard key={index} data={projectsData} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <BtnContainer eventHandlers={eventHandlers} />
    </>
  );
}
