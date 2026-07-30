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
    <section className="relative overflow-hidden bg-sand-deep/55 px-5 py-16 text-foreground sm:px-8 lg:px-12 lg:py-24">
      <div
        className="absolute -right-20 -top-48 size-[36rem] rounded-full border border-accent/15"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.19em] text-accent">
            {eyebrow}
          </p>
          <h2 className="display-balance mt-6 max-w-4xl font-serif text-[clamp(3.1rem,7vw,7.5rem)] font-normal leading-[0.8] tracking-[-0.065em] md:leading-[0.78] md:tracking-[-0.07em]">
            {title}
          </h2>
        </div>
        <div className="lg:justify-self-end">
          <p className="pretty-copy max-w-md text-sm leading-7 text-muted">
            {description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={siteConfig.phoneHref}>
                Call {siteConfig.phoneDisplay}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
            >
              <Link href="/reservations">Reservation details</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
