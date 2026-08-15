import { ArrowUpRight } from "lucide-react";

import { nearbyPlaces } from "@/lib/content";

type NearbyListProps = {
  limit?: number;
};

export function NearbyList({ limit }: NearbyListProps) {
  const visiblePlaces = limit ? nearbyPlaces.slice(0, limit) : nearbyPlaces;

  return (
    <div className="border-t border-foreground/18">
      {visiblePlaces.map((place, index) => (
        <a
          key={place.name}
          href={place.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group grid min-h-20 grid-cols-[2.25rem_1fr_auto] items-center gap-3 border-b border-foreground/18 py-3 text-foreground transition-[padding,background-color] hover:bg-sand/70 hover:px-3 focus-visible:bg-sand/70 md:min-h-28 md:grid-cols-[0.2fr_1fr_0.8fr_0.4fr_auto] md:gap-6"
        >
          <span className="text-[0.58rem] tracking-[0.15em] text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <strong className="font-serif text-2xl font-normal tracking-[-0.03em] md:text-4xl">
            {place.name}
          </strong>
          <p className="hidden text-xs text-muted md:block">{place.note}</p>
          <b className="hidden text-[0.58rem] font-medium uppercase tracking-[0.12em] text-muted md:block">
            {place.distance} approx.
          </b>
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </a>
      ))}
    </div>
  );
}
