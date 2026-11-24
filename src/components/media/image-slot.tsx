import { cn } from "@/lib/utils";

type ImageSlotProps = {
  label: string;
  className?: string;
  aspect?: "video" | "square" | "wide";
};

/** Marked media placeholder until real photography/assets arrive. */
export function ImageSlot({
  label,
  className,
  aspect = "video",
}: ImageSlotProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-lg border border-dashed border-border-strong bg-surface-elevated",
        aspect === "video" && "aspect-video",
        aspect === "square" && "aspect-square",
        aspect === "wide" && "aspect-[21/9]",
        className,
      )}
    >
      <p className="max-w-[20rem] px-4 text-center text-caption text-muted">
        {label}
      </p>
    </div>
  );
}
