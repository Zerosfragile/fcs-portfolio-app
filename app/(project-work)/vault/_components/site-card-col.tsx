"use client";

import { InspirationResource } from "@/lib/vault/insperation";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import SiteCard from "./site-card";

type Props = { resources: InspirationResource[]; delayInSeconds: number };
export default function SiteCardCol({ resources, delayInSeconds }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence>
        {resources.map((resource, i) => (
          <motion.div
            key={resource.url}
            initial={{
              opacity: 0,
              y: -50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -50,
            }}
            transition={{
              delay: i * delayInSeconds,
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            <SiteCard {...resource} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
