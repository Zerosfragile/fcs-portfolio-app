"use client";
import HudNav from "@/components/hud-ui/hudnav";
import Image from "next/image";
import { useEffect, useState } from "react";
import HudEmail from "@/components/hud-ui/hudemail";
import HudPosts from "@/components/hud-ui/hudposts";
import { BlogData, PostMetaData, getBlogData } from "@/lib/posts";
import { TypingLabel } from "@/components/hud-nav-system";
import { motion } from "framer-motion";

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
      <div className="bg-black hud-border ease relative h-[calc(100vh-129px)] overflow-x-hidden text-center duration-500 ease-cubic max-md:h-[calc(100vh-130px-2em)]">
        <div className="flex w-full flex-col items-center justify-center"></div>
        <div className="flex w-full items-center justify-center">
          {postData["projects"] && (
            <motion.div animate={{ x: `-${index * 100}%` }} className="flex">
              {postData["projects"].map((project, i) => (
                <img
                  key={project.id}
                  src={project.preview}
                  className="aspect-[3/2] object-cover"
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
      <button onClick={() => setIndex(index - 1)}>back</button>
      <button onClick={() => setIndex(index + 1)}>forward</button>
    </>
  );
}

// return (
//   <>
//     <div className="bg-black hud-border ease relative h-[calc(100vh-129px)] overflow-x-hidden text-center duration-500 ease-cubic max-md:h-[calc(100vh-130px-2em)]">
//       <div className="flex w-full flex-col items-center justify-center">
//         <div className="ease flex w-[90%] justify-between font-[CygnitoMono-011] font-light text-OffWhite/[.33] duration-500 ease-cubic max-sm:mt-8">
//           <p>CODE</p>
//           <p>PROJECTS</p>
//           <p>DESIGN</p>
//         </div>
//         <Image
//           src="/images/001-Down_Hands.png"
//           alt=""
//           className="ease opacity-25 invert duration-500 ease-cubic
//            hover:opacity-75 max-sm:m-4 max-sm:w-[80px]"
//           width={150}
//           height={150}
//           style={{ objectFit: "contain" }}
//           priority
//         />
//       </div>
//       <HudPosts posts={"projects"} />
//     </div>
//     <div className="hud-border max-md:align-center bottom-0 flex h-[75px] items-center justify-between text-center max-md:h-[calc(calc(75px+2em))] max-md:flex-wrap max-md:justify-center max-md:overflow-hidden max-md:p-4">
//       <HudNav eventHandlers={eventHandlers} />
//     </div>
//     <HudEmail open={{ state: openEmail, set: setOpenEmail }} />
//   </>
// );
// }
