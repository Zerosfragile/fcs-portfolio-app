import { useState } from "react";
import NameInput from "./name-form";
import cards from "./cards";
import { AnimatePresence, motion } from "framer-motion";
import Card from "./cards";

const ChristmasContent = () => {
  const [name, setName] = useState<string | undefined>();

  return (
    <div className="w-full h-full grid place-items-center bg-gradient-to-b from-christmas-red/10 via-christmas-green/5 to-transparent">
      <AnimatePresence mode="popLayout">
        {name ? (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 100,
              y: 0,
            }}
            exit={{ opacity: 0, y: -500 }}
            transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
            key="card"
            className="w-full h-full"
          >
            <Card name={name} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 100,
              y: 0,
            }}
            exit={{ opacity: 0, y: -500 }}
            transition={{ duration: 1, delay: 0, ease: "easeInOut" }}
            key="input"
          >
            <NameInput setName={setName} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChristmasContent;
