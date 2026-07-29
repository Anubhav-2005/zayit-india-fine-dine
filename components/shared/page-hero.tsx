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
        "relative isolate min-h-[72svh] overflow-hidden bg-olive px-5 pb-16 pt-36 text-ivory sm:px-8 lg:px-12 lg:pb-24 lg:pt-44",
        image && "min-h-[82svh]",
      )}
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
            className="-z-20 object-cover object-center"
          />
          <div className="hero-scrim absolute inset-0 -z-10" aria-hidden="true" />
        </>
      ) : (
        <>
          <div
            className="absolute -right-[12vw] top-[12%] -z-10 size-[min(58vw,48rem)] rounded-full border border-gold/20"
            aria-hidden="true"
          />
          <div
            className="absolute -right-[2vw] top-[28%] -z-10 size-[min(32vw,26rem)] rounded-full border border-gold/16"
            aria-hidden="true"
          />
        </>
      )}
      <div className="mx-auto flex min-h-[calc(72svh-12rem)] max-w-[1500px] flex-col justify-end">
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-gold-light">
            {eyebrow}
          </p>
          <h1 className="hero-display display-balance mt-6 max-w-6xl text-[clamp(4.2rem,10vw,10.5rem)] font-normal leading-[0.74] tracking-[-0.075em]">
            {title}
            <br />
            <em className="font-normal text-gold-light">{accent}</em>
          </h1>
        </div>
        <div className="mt-12 grid gap-6 border-t border-white/25 pt-6 md:grid-cols-[1fr_1fr] md:items-start">
          <p className="pretty-copy max-w-xl text-sm leading-7 text-ivory/76 md:text-base md:leading-8">
            {description}
          </p>
          {meta ? (
            <p className="text-[0.61rem] uppercase tracking-[0.15em] text-ivory/58 md:justify-self-end">
              {meta}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
