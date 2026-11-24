"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

type SiteImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  parallax?: boolean;
  kenBurns?: boolean;
  overlay?: "none" | "ink" | "ink-soft" | "ink-left" | "saffron-glow";
};

export function SiteImage({
  src,
  alt,
  className,
  imageClassName,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
  fill = true,
  parallax = false,
  kenBurns = false,
  overlay = "none",
}: SiteImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion === true || !parallax ? [0, 0] : [-40, 40],
  );
  const scale: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion === true || !kenBurns ? [1, 1] : [1.12, 1],
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className={cn(
          "absolute inset-0",
          parallax || kenBurns ? "h-[120%] w-full -top-[10%]" : "inset-0",
        )}
        style={{
          y: parallax ? y : 0,
          scale: kenBurns ? scale : 1,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          priority={priority}
          sizes={sizes}
          unoptimized={src.endsWith(".svg")}
          className={cn("object-cover", imageClassName)}
        />
      </motion.div>

      {overlay === "ink" ? (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25"
          aria-hidden
        />
      ) : null}
      {overlay === "ink-soft" ? (
        <div className="pointer-events-none absolute inset-0 bg-ink/45" aria-hidden />
      ) : null}
      {overlay === "ink-left" ? (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20"
          aria-hidden
        />
      ) : null}
      {overlay === "saffron-glow" ? (
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/70 via-transparent to-saffron/10"
          aria-hidden
        />
      ) : null}
    </div>
  );
}
