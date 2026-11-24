"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/** Visual word rise with full sentence exposed to assistive tech */
export function KineticHeadline({
  text,
  className,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <Tag className={cn("text-display", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="[perspective:900px]">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="mr-[0.28em] inline-block overflow-hidden align-bottom"
          >
            <motion.span
              className="inline-block"
              initial={
                reduceMotion === true
                  ? false
                  : { y: "110%", rotateX: -55, opacity: 0 }
              }
              animate={{ y: "0%", rotateX: 0, opacity: 1 }}
              transition={{
                duration: 0.75,
                delay: 0.06 + i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: "bottom center", transformStyle: "preserve-3d" }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
