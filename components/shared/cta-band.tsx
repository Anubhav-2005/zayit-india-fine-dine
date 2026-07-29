import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

type CtaBandProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function CtaBand({
  eyebrow = "Come to the table",
  title = "Save the best part of the day.",
  description = "Calling the restaurant is the only reservation channel currently verified.",
}: CtaBandProps) {
  return (
    <section className="relative overflow-hidden bg-olive px-5 py-20 text-ivory sm:px-8 lg:px-12 lg:py-28">
      <div
        className="absolute -right-20 -top-48 size-[36rem] rounded-full border border-gold/20"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.19em] text-gold-light">
            {eyebrow}
          </p>
          <h2 className="display-balance mt-6 max-w-4xl font-serif text-[clamp(3.8rem,7vw,7.5rem)] font-normal leading-[0.78] tracking-[-0.07em]">
            {title}
          </h2>
        </div>
        <div className="lg:justify-self-end">
          <p className="pretty-copy max-w-md text-sm leading-7 text-ivory/68">
            {description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="lg">
              <a href={siteConfig.phoneHref}>
                Call {siteConfig.phoneDisplay}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-ivory/45 text-ivory hover:bg-ivory hover:text-olive"
            >
              <Link href="/reservations">Reservation details</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
