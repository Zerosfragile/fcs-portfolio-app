import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface TypingLabelProps {
  text: string;
  speed?: number;
  className?: string;
}

const TypingLabel = ({ className, text, speed = 100 }: TypingLabelProps) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let currentIndex = 0;

    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayedText((prevText) => {
          const correctSlice = text.slice(0, currentIndex);
          const nextChar = text[currentIndex] ?? "";

          return prevText !== correctSlice
            ? correctSlice + nextChar
            : prevText + nextChar;
        });
        currentIndex++;
        timeoutId = setTimeout(typeNextCharacter, speed);
      }
    };

    const deletePrevCharacter = () => {
      if (currentIndex >= 0) {
        setDisplayedText((prevText) => prevText.slice(0, -1));
        currentIndex--;
        timeoutId = setTimeout(deletePrevCharacter, speed);
      } else if (text) {
        currentIndex = 0;
        typeNextCharacter();
      }
    };

    const clearText = () => {
      currentIndex = displayedText.length - 1;
      deletePrevCharacter();
    };

    clearText();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [text, speed]);

  return <label className={cn(className)}>{displayedText}</label>;
};

export default TypingLabel;
