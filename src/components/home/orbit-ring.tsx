"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect } from "react";

import { media } from "@/content/media";
import { cn } from "@/lib/utils";

export function OrbitRing({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const rotate = useMotionValue(0);
  const springRotate = useSpring(rotate, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (reduceMotion === true) return;
    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame += 0.12;
      rotate.set(frame);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, rotate]);

  const items = media.orbit;

  return (
    <div
      className={cn(
        "pointer-events-none relative mx-auto aspect-square w-full max-w-lg",
        className,
      )}
      aria-hidden
    >
      <div className="absolute inset-[18%] rounded-full border border-white/10 light:border-ink/10" />
      <div className="absolute inset-[32%] rounded-full border border-saffron/25" />
      <motion.div className="absolute inset-0" style={{ rotate: springRotate }}>
        {items.map((item, index) => {
          const angle = (360 / items.length) * index;
          return (
            <div
              key={item.src}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${angle}deg) translateY(-42%) rotate(-${angle}deg)`,
              }}
            >
              <div className="relative size-14 overflow-hidden rounded-md border border-white/20 shadow-lift md:size-16 light:border-ink/15">
                <Image src={item.src} alt="" fill sizes="64px" className="object-cover" />
              </div>
            </div>
          );
        })}
      </motion.div>
      <div className="absolute inset-0 grid place-items-center">
        <div className="rounded-full border border-saffron/40 bg-ink/50 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-saffron backdrop-blur light:bg-white/70">
          Presence
        </div>
      </div>
    </div>
  );
}
