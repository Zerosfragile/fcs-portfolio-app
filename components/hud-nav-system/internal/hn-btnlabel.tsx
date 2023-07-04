import React, { useEffect, useState } from "react";

interface TypingLabelProps {
  text: string;
  speed?: number;
}

const TypingLabel: React.FC<TypingLabelProps> = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let currentIndex = 0;

    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        const nextCharacter = text[currentIndex];
        setDisplayedText((prevText) => prevText + nextCharacter);
        currentIndex++;
        timeoutId = setTimeout(typeNextCharacter, speed); // Adjust typing speed here
      }
    };

    const deletePrevCharacter = () => {
      if (currentIndex >= 0) {
        setDisplayedText((prevText) => prevText.slice(0, -1));
        currentIndex--;
        timeoutId = setTimeout(deletePrevCharacter, speed); // Adjust typing speed here
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

  return <label>{displayedText}</label>;
};

export default TypingLabel;
