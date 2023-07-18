"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BlogData, PostMetaData, getBlogData } from "@/lib/posts";
import HUDN, { EventHandlers, TypingLabel } from "@/components/hud-nav-system";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import Infolay from "@/components/hud-ui/hudinfolay";
import { Card, handleCardMouseMove } from "@/components/hud-ui/hudposts";
import Link from "next/link";

async function getPostData() {
  const postData: BlogData = await getBlogData();
  return postData;
}

const ProjectCarousel = ({
  index,
  data,
}: {
  index: number;
  data: PostMetaData[];
}) => {
  const infoLayControls = useAnimationControls();
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
        height: { duration: 1, delay: 0.5 },
        opacity: { duration: 0.75 },
      },
    });
  }, [index, infoLayControls]);
  return (
    <motion.div
      animate={{ x: `-${index * 100}%` }}
      className="group flex h-full"
      exit={{ opacity: 0 }}
      transition={{
        ease: "linear",
        duration: 1,
        x: { duration: 0.5 },
      }}
    >
      {data.map((project, i) => (
        <Image
          key={project.id}
          src={project.preview}
          className="object-cover blur-xl transition-all duration-500 ease-linear group-hover:blur-none"
          alt={""}
          width={3000}
          height={1500}
        />
      ))}
      <motion.div
        initial={{ height: "100%", opacity: 100 }}
        animate={infoLayControls}
        exit={{ opacity: 0 }}
        className="absolute left-0 top-1/2 z-0 flex w-6/12 -translate-y-1/2 flex-col overflow-hidden border-r border-dashed border-OffWhite/[.15]"
      >
        {data[index] && (
          <Infolay
            route={`/projects/${data[index].id}`}
            title={data[index].title}
            subtitle={data[index].subtitle}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

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
  const [postData, setPostData] = useState<BlogData | null>(null);
  const [allProjects, setAllProjects] = useState(false);
  const [index, setIndex] = useState(0);
  const cardParentRef = useRef<HTMLDivElement>(null);

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
      setIndex(0);
    };

    fetchData();
  }, []);

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
          {!allProjects && postData["projects"] && (
            <ProjectCarousel index={index} data={postData["projects"]} />
          )}
          {allProjects && postData["projects"] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 100 }}
              exit={{ opacity: 0 }}
              className="flex h-full w-full flex-wrap gap-4 p-[25px]"
              ref={cardParentRef}
              onMouseMove={(e) => handleCardMouseMove(e, cardParentRef)}
            >
              {postData["projects"].map(
                (projectsData: PostMetaData, index: number) => (
                  <Card key={index} data={projectsData} />
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <BtnContainer eventHandlers={eventHandlers} />
    </>
  );
}
