"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  cubicBezier,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
  Variant,
  Variants,
} from "framer-motion";
import Image from "next/image";
import { trace } from "console";

type Props = {};

export default function Page({}: Props) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    layoutEffect: true,
    smooth: 1,

    offset: ["start start", "end center"],
  });

  const section1 = 1 / 10; // since 1000 vh is the height of the container
  const section2 = section1 * 2;

  const [showHeaderText, setShowHeaderText] = useState<boolean>(true);

  const imageContainer = useRef<HTMLDivElement>(null);
  const [imgContainerHeight, setImgContainerHeight] = useState<number>(0);
  const [imgContainerWidth, setImgContainerWidth] = useState<number>(0);

  const height = useTransform(scrollYProgress, [0, section1], [100, 0]);
  const percentageHeight = useMotionTemplate`${height}%`;

  useLayoutEffect(() => {
    if (imageContainer.current) {
      console.log("updating container size");
      const imageContainerBounds =
        imageContainer.current.getBoundingClientRect();
      setImgContainerHeight(imageContainerBounds.height);
      setImgContainerWidth(imageContainerBounds.width);
    }
  }, []);

  const imageWidth = useTransform(
    scrollYProgress,
    [0, section1 / 3, (section1 / 100) * 90],
    [imgContainerWidth, imgContainerWidth, 48]
  );
  const imageHeight = useTransform(
    scrollYProgress,
    [0, section1 / 3, section1],
    [imgContainerHeight, imgContainerHeight, 60]
  );
  const imageBottom = useTransform(
    scrollYProgress,
    [section1 / 2, section1],
    [16, 4]
  );

  // section 2
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [showS2QuoteText, setShowS2QuoteText] = useState<boolean>(false);

  const s2GroupOpacity = useTransform(
    scrollYProgress,
    [(section1 / 10) * 4, section1],
    [0, 1]
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    latest > section1 / 8 ? setShowHeaderText(false) : setShowHeaderText(true);

    latest > (section1 / 10) * 6 && latest < section1
      ? setShowS2QuoteText(true)
      : setShowS2QuoteText(false);

    latest > (section1 / 10) * 4 && latest < section1
      ? setShowIcon(true)
      : setShowIcon(false);
    console.log(latest, section2, section1);
  });

  return (
    <div
      className="flex flex-col bg-gradient-earth h-[1000vh] relative"
      ref={container}
    >
      <div className="h-screen flex flex-col items-center fixed top-0 left-1/2 -translate-x-1/2 gap-4 py-4 w-full max-w-[90vw] lg:max-w-4xl  ">
        <motion.div
          style={{ height: percentageHeight }}
          animate={{
            placeItems: "flex-start",
          }}
          transition={{ duration: 1, delay: 1 }}
          className="bg-VoidBlack p-4 rounded-md shadow-lg grid place-items-center relative overflow-hidden min-h-[68px] max-h-[calc(100svh-32px)]"
          layout
        >
          <section className=" font-mono text-OffWhite-dark flex flex-col gap-4 h-full">
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
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: -100 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="visible"
                animate={showHeaderText ? "visible" : "hidden"}
                transition={{
                  duration: 1,
                  ease: cubicBezier(0.19, 1, 0.22, 1),
                }}
                className="text-lg text-OffWhite font-[cygnitomono-007] tracking-widest uppercase items-center h-full flex"
                key="news"
              >
                About
              </motion.span>
            </motion.div>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: -100 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="visible"
              animate={showHeaderText ? "visible" : "hidden"}
              transition={{
                duration: 2,
                ease: cubicBezier(0.19, 1, 0.22, 1),
              }}
              key="description"
              className="flex text-xs md:text-sm"
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
                bottom: imageBottom,
              }}
              className="absolute right-4 min-h-[60px] max-h-[calc(100%-32px)] min-w-[48px] max-w-[calc(100%-32px)]"
            >
              <Image
                src={"/images/test-preview-002.jpg"}
                alt={"art by @vinne.art"}
                layout="fill"
                className="object-cover rounded-sm"
              />
            </motion.div>
            <div className="flex-1 w-full flex" ref={imageContainer}></div>
          </section>
        </motion.div>

        <div className="flex-1 bg-VoidBlack w-full p-4 rounded-md shadow-lg grid place-items-center relative overflow-hidden">
          <motion.div style={{ opacity: s2GroupOpacity }}>
            <motion.button
              variants={{
                hidden: { opacity: 0, y: 100 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate={showIcon ? "visible" : "hidden"}
              transition={{
                duration: 3,
                ease: cubicBezier(0.19, 1, 0.22, 1),
              }}
              className="flex flex-col items-center justify-center p-6 mx-auto mb-2"
            >
              <Image
                src={"/images/056-Modern_Icons.png"}
                alt={""}
                width={75}
                height={75}
                className="invert transition-all duration-500 ease-linear"
              />
            </motion.button>
            <div className="font-[CygnitoMono-011] text-[11.25px] font-normal uppercase text-OffWhite transition-all duration-500 ease-linear  text-center">
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 100 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={showS2QuoteText ? "visible" : "hidden"}
                transition={{
                  duration: 2.5,
                  ease: cubicBezier(0.19, 1, 0.22, 1),
                }}
              >
                Amor Fati, Agnostos Theos
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
