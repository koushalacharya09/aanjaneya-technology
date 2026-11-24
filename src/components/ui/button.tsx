import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold tracking-tight transition-all duration-[var(--duration-fast)] ease-[var(--ease-out)] tap-target disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-saffron text-ink hover:bg-saffron-deep",
        secondary:
          "border border-border-strong bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-white",
        ghost: "text-ink hover:bg-surface-elevated",
        whatsapp:
          "bg-[#25D366] text-white hover:bg-[#1ebe57]",
        saffron:
          "bg-saffron text-ink hover:bg-saffron-deep",
        outlineDark:
          "border border-white/20 bg-transparent text-white hover:border-white hover:bg-white hover:text-ink",
        linkArrow:
          "rounded-none px-0 text-ink underline-offset-4 hover:underline",
      },
      size: {
        default: "px-5 py-2.5",
        sm: "px-3.5 py-2 text-xs",
        lg: "px-7 py-3.5 text-[0.9375rem]",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { buttonVariants };
