import Image from "next/image";

import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
  meta?: string;
};

export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  image,
  meta,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "page-hero relative isolate min-h-[60svh] overflow-hidden bg-sand px-5 pb-14 pt-28 text-foreground sm:px-8 sm:pt-32 lg:px-12 lg:pb-20 lg:pt-40",
        image && "min-h-[72svh]",
      )}
      data-page-hero
    >
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload
            fetchPriority="high"
            sizes="100vw"
            className="page-hero__media -z-20 object-cover object-center"
          />
          <div className="hero-scrim absolute inset-0 -z-10" aria-hidden="true" />
        </>
      ) : (
        <>
          <div
            className="absolute -right-[12vw] top-[12%] -z-10 size-[min(58vw,48rem)] rounded-full border border-accent/14"
            aria-hidden="true"
          />
          <div
            className="absolute -right-[2vw] top-[28%] -z-10 size-[min(32vw,26rem)] rounded-full border border-accent/12"
            aria-hidden="true"
          />
        </>
      )}
      <div className="page-hero__content mx-auto flex min-h-[calc(60svh-9rem)] max-w-[1500px] flex-col justify-end">
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-accent">
            {eyebrow}
          </p>
          <h1 className="hero-display display-balance mt-5 max-w-6xl text-[clamp(2.65rem,11vw,3rem)] font-normal leading-none tracking-[-0.045em] md:mt-6 md:text-[clamp(4.25rem,5.8vw,7rem)] md:leading-[0.9] md:tracking-[-0.055em]">
            {title}
            <br />
            <em className="font-normal text-accent">{accent}</em>
          </h1>
        </div>
        <div className="mt-10 grid gap-5 border-t border-foreground/18 pt-5 md:grid-cols-[1fr_1fr] md:items-start">
          <p className="pretty-copy max-w-xl text-sm leading-7 text-muted md:text-base md:leading-8">
            {description}
          </p>
          {meta ? (
            <p className="text-[0.61rem] uppercase tracking-[0.15em] text-muted md:justify-self-end">
              {meta}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
