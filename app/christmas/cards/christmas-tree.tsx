import { motion } from "framer-motion";

const ChristmasTree = () => {
  return (
    <div className="blur-sm md:blur-lg absolute bottom-0 left-0 md:right-0 mx-10 -z-10 opacity-50">
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: "20vw", opacity: 1 }}
        transition={{ delay: 5, duration: 1 }}
        className="w-0 h-0 border-x-[15vw] border-x-transparent border-b-[20vw] border-b-christmas-tree"
      />
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: "10vw", opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="w-0 h-0 border-x-[15vw] border-x-transparent border-b-[20vw] border-b-christmas-tree"
      />
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="w-0 h-0 border-x-[15vw] border-x-transparent border-b-[20vw] border-b-christmas-tree"
      />
    </div>
  );
};

export default ChristmasTree;
