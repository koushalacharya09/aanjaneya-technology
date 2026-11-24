"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/** Full-bleed abstract network — calm, architectural, MNC-grade. */
export function NetworkVisual({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const svg = svgRef.current;
    const pulse = pulseRef.current;
    if (!svg || !pulse) return;

    let frame = 0;
    let raf = 0;
    let active = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = Boolean(entry?.isIntersecting);
      },
      { threshold: 0.05 },
    );
    observer.observe(svg);

    const path = [
      [120, 420],
      [280, 260],
      [460, 340],
      [640, 180],
      [820, 300],
      [980, 220],
      [1120, 380],
    ] as const;

    const tick = () => {
      if (active) {
        frame += 1;
        const t = (frame % 360) / 360;
        const idx = t * (path.length - 1);
        const i = Math.floor(idx);
        const f = idx - i;
        const a = path[i] ?? path[0];
        const b = path[Math.min(i + 1, path.length - 1)] ?? a;
        pulse.setAttribute("cx", String(a[0] + (b[0] - a[0]) * f));
        pulse.setAttribute("cy", String(a[1] + (b[1] - a[1]) * f));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [reduceMotion]);

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox="0 0 1200 640"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="nvGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8A317" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#E8A317" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="nvFade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {/* Fine architectural grid */}
      {Array.from({ length: 13 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={40 + i * 95}
          y1="40"
          x2={40 + i * 95}
          y2="600"
          stroke="#FFFFFF"
          strokeOpacity="0.035"
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1="40"
          y1={60 + i * 75}
          x2="1160"
          y2={60 + i * 75}
          stroke="#FFFFFF"
          strokeOpacity="0.03"
        />
      ))}

      {/* Large geometry */}
      <path
        d="M180 520 L420 120 L660 520 Z"
        stroke="url(#nvFade)"
        strokeWidth="1.25"
        fill="#E8A317"
        fillOpacity="0.03"
      />
      <path
        d="M520 560 L780 160 L1040 560 Z"
        stroke="#FFFFFF"
        strokeOpacity="0.1"
        strokeWidth="1"
        fill="#FFFFFF"
        fillOpacity="0.015"
      />

      <path
        d="M120 420 L280 260 L460 340 L640 180 L820 300 L980 220 L1120 380"
        stroke="#FFFFFF"
        strokeOpacity="0.2"
        strokeWidth="1.25"
      />
      <path
        d="M280 260 L360 480 L460 340 M640 180 L720 460 L820 300"
        stroke="#FFFFFF"
        strokeOpacity="0.08"
        strokeWidth="1"
      />

      {[
        [120, 420],
        [280, 260],
        [460, 340],
        [640, 180],
        [820, 300],
        [980, 220],
        [1120, 380],
        [360, 480],
        [720, 460],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="22" fill="url(#nvGlow)" />
          <circle
            cx={x}
            cy={y}
            r="3.5"
            fill={i === 3 ? "#E8A317" : "#FFFFFF"}
            fillOpacity={i === 3 ? 0.95 : 0.7}
          />
        </g>
      ))}

      <circle ref={pulseRef} cx="120" cy="420" r="4.5" fill="#E8A317" />
    </svg>
  );
}
