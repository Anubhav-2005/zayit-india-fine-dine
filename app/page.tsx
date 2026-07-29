import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { EditorialImage } from "@/components/gallery/editorial-image";
import { MenuCategoryCard } from "@/components/menu/menu-category-card";
import { LocalTimeStatus } from "@/components/motion/local-time-status";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/shared/cta-band";
import { FactStrip } from "@/components/shared/fact-strip";
import { FaqBlock } from "@/components/shared/faq-block";
import { NearbyList } from "@/components/shared/nearby-list";
import { RatingGrid } from "@/components/shared/rating-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import { SourceStamp } from "@/components/shared/source-stamp";
import { Button } from "@/components/ui/button";
import {
  galleryAssets,
  menuCategories,
  reviewThemes,
} from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Zayit India Fine Dine | Restaurant in Jaisalmer",
  description:
    "A cinematic, source-backed introduction to Zayit India Fine Dine near Jaisalmer Fort. Explore the menu, ratings, gallery and verified visit details.",
  path: "/",
});

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="relative isolate min-h-svh overflow-hidden bg-olive px-5 pb-8 pt-32 text-ivory sm:px-8 lg:px-12">
        <Image
          src="/images/jaisalmer-night-2560.webp"
          alt="Jaisalmer Fort illuminated above the Golden City at night"
          fill
          loading="eager"
          sizes="100vw"
          className="-z-20 object-cover object-[center_54%]"
        />
        <div className="hero-scrim absolute inset-0 -z-10" aria-hidden="true" />
        <div className="mx-auto flex min-h-[calc(100svh-10rem)] max-w-[1500px] flex-col justify-end">
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-gold-light">
              Indian &amp; Mediterranean identity · Fort Road
            </p>
            <h1 className="hero-display display-balance mt-6 max-w-6xl text-[clamp(4rem,10.5vw,10.75rem)] font-normal leading-[0.73] tracking-[-0.075em]">
              The golden hour,
              <br />
              <em className="font-normal text-gold-light">
                served after dark.
              </em>
            </h1>
          </div>

          <div className="mt-12 grid gap-7 border-t border-white/28 pt-6 md:grid-cols-[1fr_auto_1fr] md:items-end">
            <LocalTimeStatus />
            <a
              href="#story"
              aria-label="Continue to the Zayit story"
              className="hidden size-12 place-items-center rounded-full border border-white/42 transition-colors hover:bg-ivory hover:text-olive focus-visible:bg-ivory focus-visible:text-olive md:grid"
            >
              <ArrowDown aria-hidden="true" className="size-4" />
            </a>
            <div className="flex flex-wrap gap-3 md:justify-self-end">
              <Button asChild variant="gold">
                <a href={siteConfig.phoneHref}>Call to reserve</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-ivory/45 text-ivory hover:bg-ivory hover:text-olive"
              >
                <Link href="/menu">Explore the menu</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FactStrip />

      <section
        id="story"
        className="px-5 py-24 sm:px-8 md:py-32 lg:px-12 lg:py-40"
      >
        <div className="mx-auto max-w-[1500px]">
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="A table in the Golden City"
              title="Come hungry."
              accent="Leave a little later."
              description="Zayit means “olive” in Hebrew. Its public story brings an Indian kitchen and Mediterranean spirit together, close to the living walls of Jaisalmer Fort."
            />
          </Reveal>
          <div className="mt-20 grid gap-10 border-t border-foreground/18 pt-8 md:grid-cols-[0.75fr_1.25fr] md:gap-20">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-accent">
              What public guests return to
            </p>
            <p className="display-balance max-w-4xl font-serif text-[clamp(2.5rem,5vw,5.25rem)] leading-[0.95] tracking-[-0.05em]">
              A fort-facing terrace, warm hosting, authentic spice and a
              generous table.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-sand px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.55fr] lg:items-end">
            <SectionHeading
              index="02"
              eyebrow="The current public menu"
              title="Four ways into"
              accent="the kitchen."
              description="A selected reading of the live delivery menu. No prices or availability claims are invented."
            />
            <div className="lg:justify-self-end">
              <a
                className="rule-link"
                href={siteConfig.menu}
                target="_blank"
                rel="noreferrer"
              >
                Live menu &amp; prices
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
          <div className="mt-16 grid gap-x-8 md:grid-cols-2 xl:grid-cols-4">
            {menuCategories.slice(1, 5).map((category, index) => (
              <MenuCategoryCard
                key={category.id}
                category={category}
                index={index}
                compact
              />
            ))}
          </div>
          <div className="mt-10">
            <Button asChild variant="outline">
              <Link href="/menu">Read the full menu edit</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-olive px-5 py-24 text-ivory sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading
            index="03"
            eyebrow="A night at Zayit"
            title="One evening."
            accent="Three chapters."
            theme="dark"
            description="Real restaurant-profile reference crops for private design review. Owner-original exports are required before public launch."
          />
          <div className="mt-16 grid gap-7 md:grid-cols-12 md:items-start">
            <EditorialImage
              asset={galleryAssets[0]}
              index={1}
              className="md:col-span-5"
              imageClassName="object-[50%_48%]"
            />
            <EditorialImage
              asset={galleryAssets[2]}
              index={2}
              className="md:col-span-3 md:mt-28"
              sizes="(max-width: 768px) 92vw, 25vw"
            />
            <EditorialImage
              asset={galleryAssets[3]}
              index={3}
              className="md:col-span-4 md:mt-12"
            />
          </div>
          <Link
            href="/gallery"
            className="rule-link dark-rule-link mt-12 text-ivory"
          >
            Enter the gallery
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading
            index="04"
            eyebrow="Public guest signals"
            title="Reputation,"
            accent="in the open."
            description="Ratings are platform snapshots checked July 29, 2026. Counts and scores continue to change."
          />
          <div className="mt-16">
            <RatingGrid />
          </div>
          <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-9">
            {reviewThemes.map((theme) => (
              <article key={theme.number}>
                <span className="text-[0.62rem] font-semibold tracking-[0.16em] text-accent">
                  {theme.number}
                </span>
                <h3 className="mt-8 font-serif text-4xl font-normal leading-[0.9] tracking-[-0.045em]">
                  {theme.title}
                </h3>
                <p className="pretty-copy mt-5 max-w-sm text-sm leading-7 text-muted">
                  {theme.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-olive px-5 py-24 text-ivory sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.55fr] lg:items-end">
            <SectionHeading
              index="05"
              eyebrow="Before or after dinner"
              title="The city,"
              accent="within a walk."
              theme="dark"
            />
            <p className="pretty-copy max-w-md text-sm leading-7 text-ivory/62 lg:justify-self-end">
              Approximate public-route distances. Open each landmark for live
              directions.
            </p>
          </div>
          <div className="mt-16">
            <NearbyList />
          </div>
        </div>
      </section>

      <section className="grid gap-14 bg-sand px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:px-12">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            index="06"
            eyebrow="Before you arrive"
            title="Good to"
            accent="know."
          />
        </div>
        <FaqBlock />
      </section>

      <SourceStamp />
      <CtaBand />
    </main>
  );
}
