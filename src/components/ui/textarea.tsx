import * as React from "react";

import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-28 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink shadow-soft transition-colors placeholder:text-muted focus-visible:border-saffron focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/30 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
