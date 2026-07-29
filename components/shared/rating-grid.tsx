import { ArrowUpRight } from "lucide-react";

import { ratings } from "@/lib/content";

export function RatingGrid() {
  return (
    <div className="grid border-y border-foreground/20 md:grid-cols-3">
      {ratings.map((rating) => (
        <a
          key={rating.platform}
          href={rating.href}
          target="_blank"
          rel="noreferrer"
          className="group relative min-h-64 border-b border-foreground/20 p-7 transition-colors hover:bg-olive hover:text-ivory focus-visible:bg-olive focus-visible:text-ivory md:min-h-80 md:border-b-0 md:border-r md:p-9 md:last:border-r-0"
        >
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.17em]">
            {rating.platform}
          </span>
          <strong className="mt-12 block font-serif text-8xl font-normal leading-[0.72] tracking-[-0.07em] md:text-9xl">
            {rating.rating}
          </strong>
          <p className="mt-4 text-[0.62rem] uppercase tracking-[0.12em] text-muted transition-colors group-hover:text-ivory/72 group-focus-visible:text-ivory/72">
            {rating.detail}
          </p>
          <ArrowUpRight
            aria-hidden="true"
            className="absolute bottom-7 right-7 size-5 text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold-light motion-reduce:transition-none"
          />
        </a>
      ))}
    </div>
  );
}
