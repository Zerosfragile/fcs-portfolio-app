"use client";
import React, { useEffect, useRef } from "react";
import {
  cubicBezier,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  Variant,
  Variants,
} from "framer-motion";
import Image from "next/image";

type Props = {};

export default function Page({}: Props) {
  const container = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    layoutEffect: true,
    smooth: 1,

    offset: ["start start", "end center"],
  });

  const section1 = 1 / 2;

  const initHeight = 900;
  const initWidth = 576;

  const imageInitHeight = 535;

  const margin = 16;

  const initImgTop = initHeight - imageInitHeight - margin;
  const imgHalfHeight = 390;
  const tophalf = initHeight / 2 - imgHalfHeight + margin;

  console.log("initImgTop", initImgTop);

  const containerWidth = useTransform(
    scrollYProgress,
    [0, section1],
    [576, 551]
  );
  const containerHeight = useTransform(
    scrollYProgress,
    [0, section1],
    [900, 68]
  );

  const imageWidth = useTransform(
    scrollYProgress,
    [0, section1 / 2, section1],
    [544, 544, 48]
  );
  const imageHeight = useTransform(
    scrollYProgress,
    [0, section1 / 2, section1],
    [535, imgHalfHeight, 60]
  );
  const imageTop = useTransform(
    scrollYProgress,
    [0, section1 / 2, section1],
    [initImgTop, tophalf, 4]
  );
  const imageX = useTransform(
    scrollYProgress,
    [0, section1 / 2, section1],
    [0, -2, -16]
  );
  const imageRight = useTransform(scrollYProgress, [0, section1], [16, 0]);

  const textY = useTransform(scrollYProgress, [0, section1 / 2], [0, -150]);
  const textOpacity = useTransform(scrollYProgress, [0, section1 / 2], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("x changed to", latest);
  });

  return (
    <div
      className="flex flex-col bg-gradient-earth h-[400vh] relative"
      ref={container}
    >
      <div className="h-screen flex flex-col items-center fixed top-0 left-1/2 -translate-x-1/2 gap-4 py-4">
        <motion.div
          style={{ width: containerWidth, height: containerHeight }}
          animate={{
            placeItems: "flex-start",
          }}
          transition={{ duration: 1, delay: 1 }}
          className="bg-VoidBlack p-4 rounded-md shadow-lg grid place-items-center relative overflow-hidden"
          layout
          ref={section}
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
                height: imageHeight,
                top: imageTop,
                x: imageX,
                right: imageRight,
              }}
              className="absolute"
            >
              <Image
                src={"/images/test-preview-002.jpg"}
                alt={"art by @vinne.art"}
                layout="fill"
                // width={544}
                // height={535}
                className="max-h-[535px] object-cover rounded-sm"
              />
            </motion.div>
          </section>
        </motion.div>
        <div className="flex-1 bg-VoidBlack w-full p-4 rounded-md shadow-lg grid place-items-center relative overflow-hidden">
          Test
        </div>
      </div>
    </div>
  );
}
