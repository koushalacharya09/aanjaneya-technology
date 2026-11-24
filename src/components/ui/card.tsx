import * as React from "react";

import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-white p-6 shadow-soft transition-all duration-[var(--duration-base)] hover:-translate-y-1 hover:border-saffron/40 hover:shadow-lift",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return <h3 className={cn("text-h4 text-ink", className)} {...props} />;
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return <p className={cn("mt-2 text-sm text-muted", className)} {...props} />;
}
