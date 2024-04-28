"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import SiteCard from "./site-card";
import ComponentCard from "./component-card";
import { InspirationResource } from "@/lib/vault";

type Props = { resources: InspirationResource[]; delayInSeconds: number };

export default function SiteCardCol({ resources, delayInSeconds }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence>
        {resources.map((resource, i) => (
          <motion.div
            key={resource.title}
            exit={"hidden"}
            transition={{
              delay: 0,
              duration: 0.5,
              ease: "easeOut",
            }}
            layoutId={resource.title}
            initial="hidden"
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                delay: i * delayInSeconds,
                duration: 0.5,
                ease: "easeOut",
              },
            }}
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: -50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {resource.type == "sites" ? (
              <SiteCard {...resource} />
            ) : resource.type == "components" ? (
              <ComponentCard {...resource} />
            ) : null}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
