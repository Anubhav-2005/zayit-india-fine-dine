import { ArrowUpRight } from "lucide-react";

import { nearbyPlaces } from "@/lib/content";

export function NearbyList() {
  return (
    <div className="border-t border-white/20">
      {nearbyPlaces.map((place, index) => (
        <a
          key={place.name}
          href={place.href}
          target="_blank"
          rel="noreferrer"
          className="group grid min-h-24 grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-white/20 py-4 text-ivory transition-[padding,background-color] hover:bg-white/4 hover:px-3 focus-visible:bg-white/4 md:min-h-28 md:grid-cols-[0.2fr_1fr_0.8fr_0.4fr_auto] md:gap-6"
        >
          <span className="text-[0.58rem] tracking-[0.15em] text-ivory/50">
            {String(index + 1).padStart(2, "0")}
          </span>
          <strong className="font-serif text-2xl font-normal tracking-[-0.03em] md:text-4xl">
            {place.name}
          </strong>
          <p className="hidden text-xs text-ivory/55 md:block">{place.note}</p>
          <b className="hidden text-[0.58rem] font-medium uppercase tracking-[0.12em] text-ivory/55 md:block">
            {place.distance} approx.
          </b>
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 text-gold-light transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </a>
      ))}
    </div>
  );
}
