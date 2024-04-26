import React from "react";
import { InspirationComponentResource } from "..";
import { ReactInfo } from "../dependencies";
import Link from "next/link";

type MinMax = {
  min: number;
  max: number;
};

type AnimatedLinesProps = {
  length?: number;
  delay?: number;
  dashWidth?: MinMax;
  gapWidth?: MinMax;
};

export function AnimatedLines({
  length = 49,
  delay = 1,
  dashWidth = { min: 1, max: 100 },
  gapWidth = { min: 25, max: 200 },
}: AnimatedLinesProps) {
  return (
    <div className="flex">
      {Array.from({ length }, (_, i) => {
        // This formula calculates the normalized distance of i from the midpoint of the array
        const midpoint = Math.floor(length / 2);
        const distanceFromMidpoint = Math.abs(i - midpoint);
        const normalizedDistance = distanceFromMidpoint / length;

        // This formula works by scaling the normalized value by the range size (max - min) and then shifting it up by the min.
        const scaleNormalizedToRange = ({
          value,
          min,
          max,
        }: {
          value: number;
          min: number;
          max: number;
        }) => {
          return value * (max - min) + min;
        };

        const dashWidthValue = scaleNormalizedToRange({
          value: normalizedDistance,
          min: dashWidth.min,
          max: dashWidth.max,
        });
        const gapWidthValue = scaleNormalizedToRange({
          value: normalizedDistance,
          min: gapWidth.min,
          max: gapWidth.max,
        });

        return (
          <svg
            key={i}
            viewBox="0 0 11 100"
            xmlns="http://www.w3.org/2000/svg"
            className="w-auto h-24 line"
          >
            <line x1="6" y1="0" x2="6" y2="100" stroke="#222" strokeWidth="1" />
            <line
              x1="6"
              y1="0"
              x2="6"
              y2="100"
              stroke="#fff"
              strokeWidth="1"
              className="animated-line line"
              style={
                {
                  "--delay": `${delay - normalizedDistance}s`,
                  "--dash-width": dashWidthValue,
                  "--gap-width": gapWidthValue,
                } as React.CSSProperties
              }
            />
          </svg>
        );
      })}
    </div>
  );
}

export function AnimatedLinesPreviewDisplay() {
  return (
    <div className="w-full grid place-items-center my-10 gap-2">
      <AnimatedLines length={49} />
      <Link
        href={"https://x.com/verse_/status/1783536836976992608"}
        className="text-xs text-center font-light font-mono text-LunarGrey-light/50 tracking-normal normal-case flex items-center border-b border-transparent hover:border-LunarGrey-light/50 mt-3"
      >
        Design Credit - @verse_
      </Link>
    </div>
  );
}

export const AnimatedLinesInfo: InspirationComponentResource = {
  type: "components",
  title: "Animated Lines",
  display: <AnimatedLinesPreviewDisplay />,
  description: "SVG + CSS based animated lines.",
  category: ["minimalist", "animation"],
  createdAt: "2024-04-25",
  credits: [
    {
      name: "@verse_",
      role: "Developer",
      info: "Creator of the original svelte component, I just converted it to React.",
      link: "https://x.com/verse_/status/1783536836976992608",
    },
  ],
  dependencies: [ReactInfo],
  code: `export function AnimatedLines({
  length = 49,
  delay = 1,
  dashWidth = { min: 1, max: 100 },
  gapWidth = { min: 25, max: 200 },
}: AnimatedLinesProps) {
  return (
    <div className="flex">
      <style> 
        \`.animated-line {
            stroke-dasharray: var(--dash-width) var(--gap-width);
            animation: pulse-line 2s cubic-bezier(0.65, 0, 0.35, 1) infinite
              alternate-reverse;
            animation-delay: var(--delay);
          }

        @keyframes pulse-line {
          0% {
            stroke-dashoffset: var(--dash-width);
          }
          50% {
            stroke: aquamarine;
          }
          100% {
            stroke-dashoffset: calc(var(--gap-width) * -8px + 40px);
          }
        }\` 
      </style>
      {Array.from({ length }, (_, i) => {
        // This formula calculates the normalized distance of i from the midpoint of the array
        const midpoint = Math.floor(length / 2);
        const distanceFromMidpoint = Math.abs(i - midpoint);
        const normalizedDistance = distanceFromMidpoint / length;

        // This formula works by scaling the normalized value by the range size (max - min) and then shifting it up by the min.
        const scaleNormalizedToRange = ({
          value,
          min,
          max,
        }: {
          value: number;
          min: number;
          max: number;
        }) => {
          return value * (max - min) + min;
        };

        const dashWidthValue = scaleNormalizedToRange({
          value: normalizedDistance,
          min: dashWidth.min,
          max: dashWidth.max,
        });
        const gapWidthValue = scaleNormalizedToRange({
          value: normalizedDistance,
          min: gapWidth.min,
          max: gapWidth.max,
        });

        return (
          <svg
            key={i}
            viewBox="0 0 11 100"
            xmlns="http://www.w3.org/2000/svg"
            className="w-auto h-24"
          >
            <line x1="6" y1="0" x2="6" y2="100" stroke="#222" strokeWidth="1" />
            <line
              x1="6"
              y1="0"
              x2="6"
              y2="100"
              stroke="#fff"
              strokeWidth="1"
              className="animated-line"
              style={
                {
                  "--delay": \`\${delay - normalizedDistance}s\`,
                  "--dash-width": dashWidthValue,
                  "--gap-width": gapWidthValue,
                } as React.CSSProperties
              }
            />
          </svg>
        );
      })}
    </div>
  );
}`,
  props: [
    {
      name: "AnimatedLinesProps",
      description: "The props for the AnimatedLines component.",
      code: `type AnimatedLinesProps = {
  length?: number;
  delay?: number;
  dashWidth?: MinMax;
  gapWidth?: MinMax;
};`,
    },
    {
      name: "MinMax",
      description: "Simple type for min and max values.",
      code: `type MinMax = {
  min: number;
  max: number;
};`,
    },
  ],
};
