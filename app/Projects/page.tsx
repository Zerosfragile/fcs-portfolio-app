"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BlogData, PostMetaData, getBlogData } from "@/lib/posts";
import HUDN, { TypingLabel } from "@/components/hud-nav-system";
import { motion, useAnimationControls } from "framer-motion";
import Infolay from "@/components/hud-ui/hudinfolay";
import { Card, handleCardMouseMove } from "@/components/hud-ui/hudposts";

async function getPostData() {
  const postData: BlogData = await getBlogData();
  return postData;
}

export default function Projects() {
  const [allProjects, setAllProjects] = useState(false);
  const [postData, setPostData] = useState<BlogData | null>(null);
  const [index, setIndex] = useState(0);
  const cardParentRef = useRef<HTMLDivElement>(null);
  const infoLayControls = useAnimationControls();

  const eventHandlers = {
    prevProject: () => {
      const newIndex =
        postData && postData["projects"] && index - 1 < 0
          ? postData["projects"].length - 1
          : index - 1;
      setIndex(newIndex);
    },
    nextProject: () => {
      const newIndex =
        postData &&
        postData["projects"] &&
        index + 1 == postData["projects"].length
          ? 0
          : index + 1;
      setIndex(newIndex);
    },
    toggleAllProjects: () => {
      setAllProjects(!allProjects);
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostData();
      setPostData(data);
    };

    fetchData();
    infoLayControls.start({
      height: "100%",
      left: `${index * 100}%`,
      opacity: 100,
      transition: {
        type: "spring",
        stiffness: 100,
        left: { duration: 0 },
        height: { duration: 1 },
        opacity: { duration: 0.75 },
      },
    });
  }, []);

  useEffect(() => {
    infoLayControls.set({
      opacity: 0,
      height: 0,
      left: `${index * 100}%`,
      transition: { duration: 0 },
    });
    infoLayControls.start({
      height: "100%",
      opacity: 100,
      transition: {
        type: "spring",
        stiffness: 100,
        height: { duration: 1 },
        opacity: { duration: 0.75 },
      },
    });
  }, [index, infoLayControls]);

  console.log(postData);

  if (!postData) {
    return (
      <div className="flex w-full items-center justify-center">
        <div className="hud-border group m-[18px] flex min-w-[calc(100%-36px)] flex-wrap justify-center gap-4 p-[25px]">
          <p className="text-center font-[CygnitoMono-011] text-sm font-light leading-5 text-OffWhite/[0.66]">
            <TypingLabel text={" Initializing Data Link..."} />
          </p>
        </div>
      </div>
    );
  }
  return (
    <>
      <div
        className="
          bg-black hud-border ease relative h-[calc(100vh-129px)] overflow-x-hidden text-center duration-500 ease-cubic
          max-md:h-[calc(100vh-130px-2em)]
        "
      >
        {!allProjects && postData["projects"] && (
          <>
            <motion.div
              animate={{ x: `-${index * 100}%` }}
              className="flex h-full"
              transition={{
                ease: "linear",
                duration: 1,
                x: { duration: 0.5 },
              }}
            >
              {postData["projects"].map((project, i) => (
                <Image
                  key={project.id}
                  src={project.preview}
                  className="object-cover blur-md transition-all duration-500 ease-linear hover:blur-none"
                  alt={""}
                  width={3000}
                  height={1500}
                />
              ))}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={infoLayControls}
                className="absolute left-0 top-1/2 z-0 flex w-6/12 -translate-y-1/2 flex-col overflow-hidden border-r border-dashed border-OffWhite/[.15]"
              >
                {postData["projects"][index] && (
                  <Infolay
                    route={`/projects/${postData["projects"][index].id}`}
                    title={postData["projects"][index].title}
                    subtitle={postData["projects"][index].subtitle}
                  />
                )}
              </motion.div>
            </motion.div>
          </>
        )}
        {allProjects && postData["projects"] && (
          <div
            className="flex h-full w-full flex-wrap gap-4 p-[25px]"
            ref={cardParentRef}
            onMouseMove={(e) => handleCardMouseMove(e, cardParentRef)}
          >
            {postData["projects"].map(
              (projectsData: PostMetaData, index: number) => (
                <Card key={index} data={projectsData} />
              )
            )}
          </div>
        )}
      </div>
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
    </>
  );
}
