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
        "relative isolate overflow-hidden bg-sand px-5 py-16 text-foreground sm:px-8 md:py-28 lg:px-12",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 -z-10 size-[34rem] rounded-full border border-accent/14"
      />
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 -z-10 size-[22rem] rounded-full border border-accent/10"
      />

      <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-[0.72fr_1fr] lg:items-center">
        <div>
          <p className="flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.19em] text-accent">
            <Box aria-hidden="true" className="size-4" />
            A closer look
          </p>
          <h2
            id="virtual-tour-title"
            className="display-balance mt-6 font-serif text-[clamp(2.35rem,10vw,2.8rem)] font-normal leading-none tracking-[-0.045em] md:mt-8 md:text-[clamp(4rem,5.4vw,6rem)] md:leading-[0.9] md:tracking-[-0.055em]"
          >
            Step inside,
            <br />
            <em className="font-normal text-accent">from wherever you are.</em>
          </h2>
          <p className="pretty-copy mt-8 max-w-xl text-sm leading-7 text-muted md:text-base md:leading-8">
            Zayit’s official 360° tour will appear here once it has been
            photographed and approved by the restaurant.
          </p>
          <Link
            href="/contact"
            className="rule-link mt-9"
          >
            Ask about the dining room
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="relative border border-foreground/16 bg-ivory/75 p-3 shadow-[0_2.5rem_7rem_rgba(73,51,23,0.12)] md:p-5">
          <div className="relative grid min-h-[24rem] place-items-center overflow-hidden border border-foreground/12 bg-sand-deep/35 px-6 py-14 text-center md:min-h-[38rem]">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(155,79,46,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(155,79,46,0.12)_1px,transparent_1px)] [background-size:3rem_3rem]"
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/18 md:size-96"
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/14 md:size-64"
            />

            <div className="relative z-10 max-w-lg">
              <span className="mx-auto grid size-20 place-items-center rounded-full border border-gold/45 bg-olive text-gold-light">
                <ScanLine aria-hidden="true" className="size-8" />
              </span>
              <p className="mt-7 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-accent">
                Virtual tour coming soon
              </p>
              <p className="mt-5 font-serif text-[1.8rem] font-normal leading-[1.02] tracking-[-0.035em] md:text-5xl md:leading-[0.95] md:tracking-[-0.04em]">
                The room, in every direction.
              </p>
              <p className="pretty-copy mx-auto mt-5 max-w-md text-sm leading-7 text-muted">
                Until the official tour is ready, explore the gallery for
                owner-supplied photographs of the dining room, long table and
                fort view.
              </p>
            </div>

            <div className="absolute inset-x-5 bottom-5 flex items-center justify-between border-t border-foreground/14 pt-4 text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-muted md:inset-x-8 md:bottom-8">
              <span>Official imagery only</span>
              <span>Coming soon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
