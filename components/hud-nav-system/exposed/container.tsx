"use client";
import React, { isValidElement, useState } from "react";
import HnBack from "../internal/hn-back";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  children?: React.ReactNode;
};

const Container = (props: Props) => {
  const { children } = props;
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const items = React.Children.toArray(children)
    .filter(React.isValidElement)
    .map((child, index) => {
      // child.props.children is now an array of two elements
      const [title, subtitle] = child.props.children;
      return { id: index, title, subtitle };
    });

  // const indexedChildren = useIndexPrefix(children);
  return (
    <div>
      <AnimatePresence>
        {selectedId !== null && (
          <motion.div layoutId={String(selectedId)}>
            <motion.h5>{items[selectedId].subtitle}</motion.h5>
            <motion.h2>{items[selectedId].title}</motion.h2>
            <motion.button onClick={() => setSelectedId(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mx-[18px] my-0 flex items-center justify-center">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layoutId={String(item.id)}
            onMouseEnter={() => setSelectedId(item.id)}
          >
            <motion.h5>{item.subtitle}</motion.h5>
            <motion.h2>{item.title}</motion.h2>
          </motion.div>
        ))}
        {/* {indexedChildren} */}
        <HnBack isTriggered={false} breakpoint={0} items={[]} />
      </div>
    </div>
  );
};

export default Container;
