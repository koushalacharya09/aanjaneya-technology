import type * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-1 text-caption font-semibold tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-surface-elevated text-navy",
        saffron: "bg-saffron-soft text-navy",
        navy: "bg-navy text-foreground-inverse",
        outline: "border border-border text-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
