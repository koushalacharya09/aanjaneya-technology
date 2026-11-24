"use client";

import Image from "next/image";

import { media } from "@/content/media";
import { cn } from "@/lib/utils";

export function PhotoMarquee({ className }: { className?: string }) {
  const items = [...media.strip, ...media.strip];

  return (
    <div className={cn("overflow-hidden", className)} aria-hidden>
      <div className="marquee-track flex w-max gap-3">
        {items.map((item, i) => (
          <div
            key={`${item.src}-${i}`}
            className="relative h-36 w-56 shrink-0 overflow-hidden md:h-48 md:w-80"
          >
            <Image
              src={item.src}
              alt=""
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
