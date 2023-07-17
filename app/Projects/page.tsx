"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BlogData, getBlogData } from "@/lib/posts";
import { TypingLabel } from "@/components/hud-nav-system";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Infolay from "@/components/hud-ui/hudinfolay";

async function getPostData() {
  const postData: BlogData = await getBlogData();
  return postData;
}

export default function Projects() {
  const [openEmail, setOpenEmail] = useState(false);

  const eventHandlers = {
    showEmail: () => {
      console.log(openEmail);
      setOpenEmail((prev) => !prev);
    },
  };

  const [postData, setPostData] = useState<BlogData | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPostData();
      setPostData(data);
    };

    fetchData();
  }, []);

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
        {postData["projects"] && (
          <>
            <motion.div
              animate={{ x: `-${index * 100}%` }}
              className="flex h-full"
            >
              {postData["projects"].map((project, i) => (
                <img
                  key={project.id}
                  src={project.preview}
                  className=" cursor-crosshair object-cover blur-md transition-all duration-500 ease-linear hover:blur-none"
                />
              ))}
              <motion.div
                initial={{ height: `0px` }}
                animate={{ height: `100%`, left: `${index * 100}%` }}
                className="
                      absolute left-0 top-1/2 z-0 flex w-6/12 -translate-y-1/2 
                      flex-col overflow-hidden border-r border-dashed border-OffWhite/[.15]
                    "
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
      </div>
      <button onClick={() => setIndex(index - 1)}>back</button>
      <button onClick={() => setIndex(index + 1)}>forward</button>
    </>
  );
}
