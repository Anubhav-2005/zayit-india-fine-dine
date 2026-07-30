import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { EditorialImage } from "@/components/gallery/editorial-image";
import { InteriorFilm } from "@/components/gallery/interior-film";
import { MenuCategoryCard } from "@/components/menu/menu-category-card";
import { LocalTimeStatus } from "@/components/motion/local-time-status";
import { CtaBand } from "@/components/shared/cta-band";
import { FactStrip } from "@/components/shared/fact-strip";
import { FaqBlock } from "@/components/shared/faq-block";
import { KitchenDesk } from "@/components/shared/kitchen-desk";
import { NearbyList } from "@/components/shared/nearby-list";
import { RatingGrid } from "@/components/shared/rating-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import { SourceStamp } from "@/components/shared/source-stamp";
import { StarRating } from "@/components/shared/star-rating";
import { Button } from "@/components/ui/button";
import {
  galleryAssets,
  menuCategories,
  reviewThemes,
} from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import { assetPath } from "@/lib/paths";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Zayit India Fine Dine | Restaurant in Jaisalmer",
  description:
    "Discover Zayit India Fine Dine near Jaisalmer Fort through owner-supplied photography, verified ratings, the current menu and reservation details.",
  path: "/",
});

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="relative isolate min-h-svh overflow-hidden bg-sand px-4 pb-5 pt-24 text-foreground sm:px-8 sm:pb-8 sm:pt-28 lg:px-12">
        <div
          className="home-hero-lounge-media"
          aria-hidden="true"
          style={{
            backgroundImage: `url("${assetPath(
              "/images/owner/zayit-lounge-original.jpeg",
            )}")`,
          }}
        />
        <picture className="home-hero-fort-media">
          <source
            media="(max-width: 767px)"
            srcSet={assetPath(
              "/images/owner/zayit-fort-official-daylight-mobile.webp",
            )}
          />
          <Image
            src={assetPath(
              "/images/owner/zayit-fort-official-daylight.webp",
            )}
            alt="Jaisalmer Fort seen from Zayit India Fine Dine's bright terrace"
            width={1333}
            height={1420}
            unoptimized
            fetchPriority="high"
            decoding="async"
            className="size-full object-cover object-center"
          />
        </picture>
        <div
          className="home-hero-scrim pointer-events-none absolute inset-0 z-10"
          aria-hidden="true"
        />

        <div className="relative z-20 mx-auto flex min-h-[calc(100svh-7.25rem)] max-w-[1500px] items-end">
          <div className="w-full max-w-[53rem] border border-foreground/12 bg-ivory p-5 shadow-[0_1rem_3rem_rgba(58,42,21,0.1)] sm:p-8 lg:max-w-[48rem] lg:border-white/40 lg:bg-ivory/88 lg:p-10 lg:shadow-[0_2rem_6rem_rgba(58,42,21,0.16)] xl:max-w-[44rem]">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.17em] text-accent sm:text-[0.62rem] sm:tracking-[0.2em]">
                Fine dining · Fort Parking Road
              </p>
              <span className="hidden h-3 w-px bg-foreground/20 sm:block" />
              <StarRating value={4.8} size="sm" showValue />
            </div>

            <h1 className="hero-display display-balance mt-5 text-[clamp(3.45rem,8.4vw,8.5rem)] font-normal leading-[0.78] tracking-[-0.07em]">
              A table lit by
              <br />
              <em className="font-normal text-accent">the Golden City.</em>
            </h1>

            <p className="pretty-copy mt-6 max-w-2xl text-sm leading-7 text-muted sm:text-base sm:leading-8">
              Indian warmth, Mediterranean ease and a bright room close to the
              living walls of Jaisalmer Fort.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/reservations" prefetch={false}>
                  Reserve a table
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/menu" prefetch={false}>
                  Explore the menu
                </Link>
              </Button>
            </div>

            <div className="mt-7 border-t border-foreground/16 pt-5">
              <LocalTimeStatus />
            </div>
          </div>
        </div>
      </section>

      <FactStrip />

      <section
        id="story"
        className="overflow-hidden px-5 py-16 sm:px-8 md:py-28 lg:px-12"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
            <SectionHeading
              index="01"
              eyebrow="A bright room in the Golden City"
              title="Come hungry."
              accent="Stay unhurried."
              description="Zayit means “olive” in Hebrew. Its public story brings an Indian kitchen and Mediterranean spirit together near Jaisalmer Fort."
            />
            <p className="display-balance max-w-3xl font-serif text-[clamp(2.15rem,4.2vw,4.75rem)] leading-[0.98] tracking-[-0.045em] lg:justify-self-end">
              Warm hosting, generous spice and a room made for the whole table.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-12 md:gap-7">
            <EditorialImage
              asset={galleryAssets[2]}
              index={1}
              mobileSrc={assetPath(
                "/images/owner/zayit-lounge-mobile.avif",
              )}
              className="col-span-2 [&>div]:min-h-[26rem] md:col-span-7 md:[&>div]:min-h-[42rem]"
              sizes="(max-width: 767px) 92vw, 56vw"
            />
            <EditorialImage
              asset={galleryAssets[4]}
              index={2}
              mobileSrc={assetPath(
                "/images/owner/zayit-fort-daylight-square-mobile.avif",
              )}
              className="col-span-2 [&>div]:min-h-[23rem] md:col-span-5 md:mt-24 md:[&>div]:min-h-[38rem]"
              sizes="(max-width: 767px) 92vw, 38vw"
            />
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-sand px-5 py-16 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.55fr] lg:items-end">
            <SectionHeading
              index="02"
              eyebrow="The current public menu"
              title="Four ways into"
              accent="the kitchen."
              description="A selected reading of the live delivery menu. Prices and availability stay with the changing source of truth."
            />
            <a
              className="rule-link lg:justify-self-end"
              href={siteConfig.menu}
              target="_blank"
              rel="noreferrer"
            >
              Live menu &amp; prices
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>

          <div className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:-mx-8 sm:px-8 md:grid md:grid-cols-2 md:gap-x-8 md:overflow-visible xl:grid-cols-4">
            {menuCategories.slice(1, 5).map((category, index) => (
              <MenuCategoryCard
                key={category.id}
                category={category}
                index={index}
                compact
                className="w-[84vw] max-w-sm shrink-0 snap-start sm:w-[58vw] md:w-auto md:max-w-none"
              />
            ))}
          </div>
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href="/menu">Read the full menu edit</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.85fr_0.65fr] lg:items-center lg:gap-24">
          <div>
            <SectionHeading
              index="03"
              eyebrow="Inside Zayit"
              title="Ivory walls."
              accent="Golden light."
              description="A quiet look through the restaurant’s owner-supplied interior film. It loads only when you choose to play it."
            />
            <div className="mt-9 border-t border-foreground/18 pt-7">
              <p className="max-w-xl text-sm leading-7 text-muted">
                The long table, carved detailing and soft blue seating shape a
                room that feels polished without feeling distant.
              </p>
            </div>
          </div>
          <InteriorFilm />
        </div>
      </section>

      <KitchenDesk />

      <section className="overflow-hidden px-5 py-16 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading
            index="04"
            eyebrow="Owner-supplied visual journal"
            title="One place."
            accent="Many quiet details."
            description="Real restaurant and Jaisalmer photographs supplied for this website. No AI-generated or traveller imagery."
          />
          <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-12 md:gap-7">
            <EditorialImage
              asset={galleryAssets[0]}
              index={1}
              className="col-span-2 [&>div]:min-h-[20rem] md:col-span-6 md:[&>div]:min-h-[37rem]"
              sizes="(max-width: 767px) 92vw, 48vw"
            />
            <EditorialImage
              asset={galleryAssets[1]}
              index={2}
              className="col-span-1 [&>div]:min-h-[20rem] md:col-span-3 md:mt-20 md:[&>div]:min-h-[32rem]"
              sizes="(max-width: 767px) 46vw, 24vw"
            />
            <EditorialImage
              asset={galleryAssets[5]}
              index={3}
              className="col-span-1 [&>div]:min-h-[20rem] md:col-span-3 md:mt-8 md:[&>div]:min-h-[35rem]"
              sizes="(max-width: 767px) 46vw, 24vw"
            />
          </div>
          <Link href="/gallery" className="rule-link mt-10">
            Enter the full gallery
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      <section className="overflow-hidden bg-sand px-5 py-16 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading
            index="05"
            eyebrow="Public guest signals"
            title="Reputation,"
            accent="with the stars."
            description="Platform snapshots checked July 29, 2026. Counts and scores continue to change."
          />
          <div className="mt-12 md:mt-16">
            <RatingGrid />
          </div>

          <div className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-9 md:overflow-visible md:px-0">
            {reviewThemes.map((theme) => (
              <article
                key={theme.number}
                className="w-[82vw] max-w-sm shrink-0 snap-start border-t border-foreground/18 pt-6 sm:w-[58vw] md:w-auto md:max-w-none"
              >
                <span className="text-[0.62rem] font-semibold tracking-[0.16em] text-accent">
                  {theme.number}
                </span>
                <h3 className="mt-7 font-serif text-4xl font-normal leading-[0.9] tracking-[-0.045em]">
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

      <section className="px-5 py-16 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-9 lg:grid-cols-[1fr_0.55fr] lg:items-end">
            <SectionHeading
              index="06"
              eyebrow="Before or after dinner"
              title="The city,"
              accent="within a walk."
            />
            <p className="pretty-copy max-w-md text-sm leading-7 text-muted lg:justify-self-end">
              Approximate public-route distances. Open each landmark for live
              directions.
            </p>
          </div>
          <div className="mt-12 md:mt-16">
            <NearbyList />
          </div>
        </div>
      </section>

      <section className="grid gap-12 bg-sand px-5 py-16 sm:px-8 md:py-28 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:px-12">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            index="07"
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
