import Link from "next/link";
import { ArrowRight, Box, ScanLine } from "lucide-react";

import { cn } from "@/lib/utils";

type VirtualTourPlaceholderProps = {
  className?: string;
};

/**
 * An intentionally empty, production-safe home for a future owner-approved
 * 360-degree tour. It never presents a still image as an interactive tour.
 */
export function VirtualTourPlaceholder({
  className,
}: VirtualTourPlaceholderProps) {
  return (
    <section
      aria-labelledby="virtual-tour-title"
      className={cn(
        "relative isolate overflow-hidden bg-olive px-5 py-24 text-ivory sm:px-8 md:py-32 lg:px-12",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 -z-10 size-[34rem] rounded-full border border-gold/20"
      />
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 -z-10 size-[22rem] rounded-full border border-gold/15"
      />

      <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[0.72fr_1fr] lg:items-center">
        <div>
          <p className="flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.19em] text-gold-light">
            <Box aria-hidden="true" className="size-4" />
            Future immersive chapter
          </p>
          <h2
            id="virtual-tour-title"
            className="display-balance mt-8 font-serif text-[clamp(3.5rem,7vw,7.75rem)] font-normal leading-[0.8] tracking-[-0.07em]"
          >
            Enter the room,
            <br />
            <em className="font-normal text-gold-light">when it is real.</em>
          </h2>
          <p className="pretty-copy mt-8 max-w-xl text-sm leading-7 text-ivory/80 md:text-base md:leading-8">
            This space is intentionally not a fabricated virtual tour. It is
            reserved for an owner-approved 360° panorama or an authorised tour
            provider embed.
          </p>
          <Link
            href="/contact"
            className="rule-link dark-rule-link mt-9 text-gold-light"
          >
            Arrange the owner asset handoff
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="relative border border-gold/35 bg-black/20 p-3 shadow-[0_2.5rem_7rem_rgba(0,0,0,0.3)] md:p-5">
          <div className="relative grid min-h-[28rem] place-items-center overflow-hidden border border-ivory/15 bg-olive-soft px-6 py-14 text-center md:min-h-[38rem]">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(234,211,157,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(234,211,157,0.16)_1px,transparent_1px)] [background-size:3rem_3rem]"
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/25 md:size-96"
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20 md:size-64"
            />

            <div className="relative z-10 max-w-lg">
              <span className="mx-auto grid size-20 place-items-center rounded-full border border-gold/45 bg-olive text-gold-light">
                <ScanLine aria-hidden="true" className="size-8" />
              </span>
              <p className="mt-7 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-gold-light">
                Owner integration required
              </p>
              <p className="mt-5 font-serif text-4xl font-normal leading-[0.95] tracking-[-0.04em] md:text-5xl">
                360° tour placeholder
              </p>
              <p className="pretty-copy mx-auto mt-5 max-w-md text-sm leading-7 text-ivory/78">
                Supply an original 8K equirectangular panorama for each
                viewpoint, photographer usage clearance, and—if applicable—the
                approved Matterport, Google Street View or other provider embed
                URL.
              </p>
            </div>

            <div className="absolute inset-x-5 bottom-5 flex items-center justify-between border-t border-ivory/15 pt-4 text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-ivory/70 md:inset-x-8 md:bottom-8">
              <span>No simulated view</span>
              <span>Awaiting owner files</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
