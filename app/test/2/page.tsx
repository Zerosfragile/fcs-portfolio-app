"use client";
import React, { useEffect, useRef } from "react";
import {
  cubicBezier,
  motion,
  useScroll,
  useTransform,
  Variant,
  Variants,
} from "framer-motion";
import Image from "next/image";

type Props = {};

export default function Page({}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const containerWidth = useTransform(scrollYProgress, [0, 1], [576, 551], {
    ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
  });
  const containerHeight = useTransform(scrollYProgress, [0, 1], [900, 68], {
    ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
  });

  const imageWidth = useTransform(
    scrollYProgress,
    [0, 0.25, 1],
    [544, 100, 48],
    {
      ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
    }
  );
  const imageTop = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [348, 250, 190, 4],
    {
      ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
    }
  );
  const imageX = useTransform(scrollYProgress, [0, 1], [0, -16], {
    ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
  });
  const imageRight = useTransform(scrollYProgress, [0, 1], [16, 0], {
    ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
  });

  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -150], {
    ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
  });
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0], {
    ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
  });

  useEffect(() => {
    console.log(containerWidth, scrollYProgress);
  }, [containerWidth, scrollYProgress]);

  const variants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="flex flex-col bg-gradient-earth h-[200vh]" ref={ref}>
      <div className="flex flex-col items-center justify-center w-full my-4 sticky top-0 translate-y-1/2">
        <motion.div
          style={{ width: containerWidth, height: containerHeight }}
          animate={{
            placeItems: "flex-start",
          }}
          transition={{ duration: 1, delay: 1 }}
          className="bg-VoidBlack p-4 rounded-md shadow-lg grid place-items-center relative"
          layout
        >
          <section className="max-w-xl font-mono text-OffWhite-dark flex flex-col gap-4">
            <motion.div className="flex justify-between items-center">
              <motion.div className="flex flex-col">
                <motion.span className="text-sm" key="tag">
                  @zerofcs
                </motion.span>
                <motion.span
                  className="text-xs text-muted-foreground"
                  key="name"
                >
                  Faustian Services
                </motion.span>
              </motion.div>
              <div className="relative w-10 h-10">
                <motion.span
                  style={{ y: textY, opacity: textOpacity }}
                  className="text-lg text-OffWhite absolute"
                  key="news"
                >
                  News
                </motion.span>
              </div>
            </motion.div>

            <motion.p
              style={{ y: textY, opacity: textOpacity }}
              key="description"
            >
              {`Νὴ τὸν Ἄγνωστον, ἐν τῇ ἐπωνυμίᾳ τοῦ ἀόρατου μονοπατιοῦ, ὁρίζομεν
                τὴν ὕπαρξίν μας. Αἰνιγματώδης ὁ Ἄγνωστος Θεὸς, ὄχι ὡς τὸ ἄκρον
                ἄωτον τῆς γνώσεως, ἀλλ' ὡς ἡ ὑπογραφή τῆς ἐπιστημονικῆς
                ταπεινώσεως: τὸ ὅριο τῆς ἐπιγνώσεώς μας εἶναι τὸ ἀπέραντο
                ἀγνωστικό μας. Προσλαμβάνοντας τὴν ἀγνωσία ὡς τὸν καμβὰ τῆς
                σοφίας, καλούμαστε νὰ περπατήσουμε τὴν ἀβέβαιη ἀλήθεια τῆς
                ἀνθρώπινης φύσεως, ἀναζητώντας τὸ φῶς μέσα ἀπὸ τὴν σκιά.
                Ἐνστερνίζου τὸν Ἄγνωστον, γίνου μάρτυρας τῆς ἀτέλειας, ὑποδέξου
                τὴν ἀληθινὴ σοφία ποὺ κρύβεται μέσα ἀπὸ τὸ μυστήριο. γενέσθω Amor
                Fati, Agnōstos Theos.`}
            </motion.p>
            <motion.div
              layoutId="header"
              key="header-image"
              style={{
                width: imageWidth,

                top: imageTop,
                x: imageX,
                right: imageRight,
              }}
              className="absolute"
            >
              <Image
                src={"/images/test-preview-002.jpg"}
                alt={"art by @vinne.art"}
                width={544}
                height={535}
                className="max-h-[535px] object-cover rounded-sm"
              />
            </motion.div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
