"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { site } from "@/content/site";

/** Horizontal brand lockup — Celebal-style header: icon + wordmark in one asset */
const LOGO_SRC = "/brand/logo.jpg";

/** Intrinsic ratio of the official horizontal logo (1024×341) */
const LOGO_W = 1024;
const LOGO_H = 341;

type LogoProps = {
  className?: string;
  href?: string;
  variant?: "full" | "mark";
  /** Kept for API compatibility */
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
};

const heights = {
  sm: 40,
  md: 48,
  lg: 58,
} as const;

function widthFor(height: number) {
  return Math.round((height * LOGO_W) / LOGO_H);
}

/** Mark = compact height; still the official horizontal asset */
export function LogoMark({
  size = 36,
  className,
}: {
  tone?: "light" | "dark";
  size?: number;
  className?: string;
  animated?: boolean;
}) {
  const h = size;
  const w = widthFor(h);
  return (
    <Image
      src={LOGO_SRC}
      alt=""
      width={w}
      height={h}
      className={cn("h-auto w-auto object-contain object-left", className)}
      style={{ height: h, width: "auto" }}
      aria-hidden
    />
  );
}

export function Logo({
  className,
  href = "/",
  variant = "full",
  size = "md",
}: LogoProps) {
  /** Mark uses slightly shorter height for tight spaces */
  const height = variant === "mark" ? Math.round(heights[size] * 0.9) : heights[size];
  const width = widthFor(height);

  const inner = (
    <span
      className={cn(
        "inline-flex min-h-11 max-w-[min(100%,16rem)] items-center focus-visible:outline-none sm:max-w-none",
        className,
      )}
    >
      <Image
        src={LOGO_SRC}
        alt={site.name}
        width={width}
        height={height}
        priority
        className="h-auto w-auto max-h-[var(--logo-h)] object-contain object-left"
        style={
          {
            "--logo-h": `${height}px`,
            height,
            width: "auto",
          } as React.CSSProperties
        }
      />
    </span>
  );

  if (!href) {
    return inner;
  }

  return (
    <Link href={href} aria-label={`${site.name} home`} className="shrink-0">
      {inner}
    </Link>
  );
}
