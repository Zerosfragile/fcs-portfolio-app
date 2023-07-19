import { AnimatePresence, motion, wrap } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const HudCarousel = ({
  control,
  images,
}: {
  control: {
    page: number;
    direction: number;
    set: Dispatch<SetStateAction<[number, number]>>;
  };
  images: string[];
}) => {
  const { page, direction } = control;
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };
  const paginate = (newDirection: number) => {
    control.set([page + newDirection, newDirection]);
  };

  const imageIndex = wrap(0, images.length, page);

  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.img
        key={page}
        src={images[imageIndex]}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        className="h-full w-full object-cover blur-xl transition-all duration-500 ease-linear hover:blur-none"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={(e, { offset, velocity }) => {
          const swipe = swipePower(offset.x, velocity.x);

          if (swipe < -swipeConfidenceThreshold) {
            paginate(1);
          } else if (swipe > swipeConfidenceThreshold) {
            paginate(-1);
          }
        }}
      />
    </AnimatePresence>
  );
};

export default HudCarousel;
