"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

export function CursorSpotlight() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(520px circle at ${x}px ${y}px, rgba(232,163,23,0.14), transparent 45%)`;

  useEffect(() => {
    if (reduceMotion === true) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion, x, y]);

  if (reduceMotion === true) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] hidden mix-blend-soft-light md:block"
      style={{ background }}
    />
  );
}
