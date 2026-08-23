import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { EditorialImage } from "@/components/gallery/editorial-image";
import { MenuCategoryCard } from "@/components/menu/menu-category-card";
import { CtaBand } from "@/components/shared/cta-band";
import { FactStrip } from "@/components/shared/fact-strip";
import { HomeInteriorSequence } from "@/components/shared/home-interior-sequence";
import { NearbyList } from "@/components/shared/nearby-list";
import { RatingGrid } from "@/components/shared/rating-grid";
import { SectionHeading } from "@/components/shared/section-heading";
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
      <section className="home-hero" aria-labelledby="home-hero-title">
        <picture className="home-hero__media">
          <source
            media="(max-width: 767px)"
            srcSet={assetPath(
              "/images/owner/zayit-fort-official-daylight.webp",
            )}
          />
          <Image
            src={assetPath(
              "/images/owner/zayit-fort-official-daylight-mobile.webp",
            )}
            alt="Jaisalmer Fort seen from Zayit India Fine Dine's bright terrace"
            width={1333}
            height={1100}
            unoptimized
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="size-full object-cover"
          />
        </picture>
        <div
          className="home-hero__scrim"
          aria-hidden="true"
        />
        <div className="home-hero__halo" aria-hidden="true" />

        <div className="home-hero__inner zayit-shell">
          <div className="home-hero__copy">
            <div className="home-hero__kicker">
              <p>
                Fine dining · Fort Parking Road
              </p>
              <span aria-hidden="true" />
              <StarRating
                value={4.8}
                size="sm"
                showValue
                className="home-hero__rating"
              />
            </div>

            <h1 id="home-hero-title" className="home-hero__title">
              <span className="home-hero__line">
                <span>A table lit by</span>
              </span>
              <span className="home-hero__line">
                <span>
                  <em>the Golden City.</em>
                </span>
              </span>
            </h1>

            <p className="home-hero__description">
              Indian warmth, Mediterranean ease and a light-filled dining room
              beside the living walls of Jaisalmer Fort.
            </p>

            <div className="home-hero__actions">
              <Button
                asChild
                size="lg"
                variant="gold"
                className="w-full sm:w-auto"
              >
                <Link href="/reservations" prefetch={false}>
                  Reserve a table
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full border-ivory/70 text-ivory hover:bg-ivory hover:text-olive sm:w-auto"
              >
                <Link href="/menu" prefetch={false}>
                  Explore the menu
                </Link>
              </Button>
            </div>

            <div className="home-hero__details" aria-label="Visit details">
              <p>
                <span aria-hidden="true" />
                Daily · {siteConfig.hours.compact}
              </p>
              <p>First floor · Fort Parking Road</p>
            </div>
          </div>

          <p className="home-hero__caption">
            Jaisalmer Fort
            <span>Seen from Zayit</span>
          </p>

          <a className="home-hero__scroll" href="#story">
            <span>Enter Zayit</span>
            <ArrowDown aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </section>

      <FactStrip />

      <section
        id="story"
        className="zayit-section"
      >
        <div className="zayit-shell">
          <div className="zayit-story-intro">
            <SectionHeading
              index="01"
              eyebrow="A bright room in the Golden City"
              title="Come hungry."
              accent="Stay unhurried."
              description="Zayit means “olive” in Hebrew. Its public story brings an Indian kitchen and Mediterranean spirit together near Jaisalmer Fort."
            />
            <p
              className="display-balance max-w-3xl font-serif text-[clamp(1.7rem,7.5vw,2rem)] leading-[1.05] tracking-[-0.035em] md:text-[clamp(2.5rem,3.5vw,3.75rem)] md:leading-[1.02] md:tracking-[-0.04em] lg:justify-self-end"
              data-reveal="heading"
            >
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
              className="col-span-2 hidden [&>div]:min-h-[23rem] md:col-span-5 md:mt-24 md:block md:[&>div]:min-h-[38rem]"
              sizes="(max-width: 767px) 92vw, 38vw"
            />
          </div>
        </div>
      </section>

      <section className="zayit-section zayit-section--sand">
        <div className="zayit-shell">
          <div className="zayit-menu-intro">
            <SectionHeading
              eyebrow="From the kitchen"
              title="Four ways into"
              accent="the kitchen."
              description="Tandoor smoke, slow-cooked curries and generous plates made for sharing. The live menu carries today’s selection and prices."
            />
            <a
              className="rule-link lg:justify-self-end"
              href={siteConfig.menu}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live menu &amp; prices
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-x-8 xl:grid-cols-4">
            {menuCategories.slice(1, 5).map((category, index) => (
              <MenuCategoryCard
                key={category.id}
                category={category}
                index={index}
                compact
                className={index > 1 ? "hidden md:block" : undefined}
              />
            ))}
          </div>
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link href="/menu">View the complete menu</Link>
            </Button>
          </div>
        </div>
      </section>

      <HomeInteriorSequence />

      <section className="zayit-section zayit-section--sand">
        <div className="zayit-shell">
          <SectionHeading
            eyebrow="What guests say"
            title="Reputation,"
            accent="with the stars."
            description="Current ratings across Google, Tripadvisor and Zomato, with direct links to each platform."
          />
          <div className="mt-12 md:mt-16">
            <RatingGrid />
          </div>

          <div className="zayit-review-themes">
            {reviewThemes.map((theme, index) => (
              <article
                key={theme.number}
                data-reveal="card"
                className={
                  index === 0
                    ? "border-t border-foreground/18 pt-6"
                    : "hidden border-t border-foreground/18 pt-6 md:block"
                }
              >
                <span className="text-[0.62rem] font-semibold tracking-[0.16em] text-accent">
                  {theme.number}
                </span>
                <h3 className="mt-6 font-serif text-[1.75rem] font-normal leading-[1.02] tracking-[-0.035em] md:mt-7 md:text-4xl md:leading-[0.94] md:tracking-[-0.045em]">
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

      <section className="zayit-section">
        <div className="zayit-shell">
          <div className="zayit-nearby-intro">
            <SectionHeading
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
            <NearbyList limit={3} />
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
