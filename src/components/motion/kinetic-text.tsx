"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/** Animated headline: one clean sr-only sentence; visual words stay spaced. */
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
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag className={cn("text-display", className)}>
      <span className="sr-only">{text}</span>
      <span
        aria-hidden="true"
        className="flex flex-wrap gap-x-[0.3em] gap-y-[0.12em] [perspective:900px]"
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            aria-hidden="true"
            className="inline-block overflow-hidden align-bottom"
          >
            <motion.span
              aria-hidden="true"
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
