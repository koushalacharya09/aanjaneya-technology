"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

/** Light / dark only — no atmosphere toys on marketing chrome */
export function ThemeControls({ className }: { className?: string }) {
  const { mode, toggleMode } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleMode}
      className={cn(
        "tap-target inline-flex size-10 items-center justify-center rounded-md border border-white/15 text-white/80 transition-colors hover:border-saffron/50 hover:text-saffron light:border-ink/15 light:text-ink/70 light:hover:text-ink",
        className,
      )}
      aria-label={mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {mode === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
