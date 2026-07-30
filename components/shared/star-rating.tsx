import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

type StarRatingProps = {
  value: number;
  className?: string;
  size?: "sm" | "md";
  showValue?: boolean;
};

const starSizes = {
  sm: "size-3.5",
  md: "size-5",
} as const;

export function StarRating({
  value,
  className,
  size = "md",
  showValue = false,
}: StarRatingProps) {
  const safeValue = Math.max(0, Math.min(5, value));
  const percentage = `${(safeValue / 5) * 100}%`;
  const stars = Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      aria-hidden="true"
      className={cn(starSizes[size], "shrink-0")}
    />
  ));

  return (
    <span
      className={cn("inline-flex items-center gap-2", className)}
      aria-label={`${safeValue.toFixed(1)} out of 5 stars`}
    >
      <span className="relative inline-flex text-gold/35" aria-hidden="true">
        <span className="flex gap-1">{stars}</span>
        <span
          className="absolute inset-y-0 left-0 overflow-hidden text-gold"
          style={{ width: percentage }}
        >
          <span className="flex w-max gap-1">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                className={cn(starSizes[size], "shrink-0 fill-current")}
              />
            ))}
          </span>
        </span>
      </span>
      {showValue ? (
        <span className="font-semibold tabular-nums">{safeValue.toFixed(1)}</span>
      ) : null}
    </span>
  );
}
