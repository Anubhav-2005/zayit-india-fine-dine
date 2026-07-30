import { ArrowUpRight } from "lucide-react";

import { StarRating } from "@/components/shared/star-rating";
import { ratings } from "@/lib/content";

export function RatingGrid() {
  return (
    <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto border-y border-foreground/20 px-5 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-0 md:overflow-visible md:px-0">
      {ratings.map((rating) => (
        <a
          key={rating.platform}
          href={rating.href}
          target="_blank"
          rel="noreferrer"
          className="group relative min-h-48 w-[78vw] max-w-sm shrink-0 snap-start border-r border-foreground/20 bg-ivory/55 p-6 transition-colors hover:bg-sand focus-visible:bg-sand sm:w-[58vw] md:min-h-72 md:w-auto md:max-w-none md:p-9 md:last:border-r-0"
        >
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.17em]">
            {rating.platform}
          </span>
          <strong className="mt-8 block font-serif text-6xl font-normal leading-[0.72] tracking-[-0.07em] md:mt-12 md:text-8xl">
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
