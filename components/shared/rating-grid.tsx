import { ArrowUpRight } from "lucide-react";

import { StarRating } from "@/components/shared/star-rating";
import { ratings } from "@/lib/content";

export function RatingGrid() {
  return (
    <div className="grid gap-3 border-y border-foreground/20 py-3 md:grid-cols-3 md:gap-0 md:py-0">
      {ratings.map((rating) => (
        <a
          key={rating.platform}
          href={rating.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative min-h-44 border border-foreground/20 bg-ivory p-6 transition-colors hover:bg-sand focus-visible:bg-sand md:min-h-72 md:border-y-0 md:border-l-0 md:border-r md:p-9 md:last:border-r-0"
        >
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.17em]">
            {rating.platform}
          </span>
          <strong className="mt-7 block font-serif text-5xl font-normal leading-[0.9] tracking-[-0.05em] md:mt-12 md:text-7xl md:leading-[0.82] md:tracking-[-0.06em]">
            {rating.rating}
          </strong>
          <StarRating
            value={Number(rating.rating)}
            size="sm"
            className="mt-5"
          />
          <p className="mt-3 text-[0.62rem] uppercase tracking-[0.12em] text-muted">
            {rating.detail}
          </p>
          <ArrowUpRight
            aria-hidden="true"
            className="absolute bottom-6 right-6 size-5 text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none md:bottom-8 md:right-8"
          />
        </a>
      ))}
    </div>
  );
}
