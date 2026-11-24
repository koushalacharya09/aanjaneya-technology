"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

export function MagneticTilt({
  children,
  className,
  intensity = 14,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 180, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 180, damping: 18, mass: 0.4 });
  const transform = useMotionTemplate`perspective(900px) rotateX(${y}deg) rotateY(${x}deg)`;

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion === true || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rawX.set((px - 0.5) * intensity);
    rawY.set((0.5 - py) * intensity);
  }

  function onLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{ transform: reduceMotion === true ? undefined : transform }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}
