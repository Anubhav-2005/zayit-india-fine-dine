import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { MenuExplorer } from "@/components/menu/menu-explorer";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { SourceStamp } from "@/components/shared/source-stamp";
import { Button } from "@/components/ui/button";
import { guestMentionedDishes } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Menu",
  description:
    "Explore a source-backed edit of Zayit India Fine Dine’s current public menu: soups, tandoor dishes, vegetarian and non-vegetarian mains, breads, biryani, café plates and drinks.",
  path: "/menu",
});

export default function MenuPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="From the kitchen"
        title="A generous"
        accent="table."
        description="Indian and Mediterranean in identity; North Indian, Chinese, biryani, breads, café plates, desserts and beverages in the current public delivery menu."
        meta="141 dishes · 11 sections · live prices linked below"
      />

      <section className="px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <MenuExplorer />

          <div className="mt-20 grid gap-10 border-y border-foreground/20 py-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-accent">
                Names guests remember
              </p>
              <h2 className="mt-5 font-serif text-[2.2rem] font-normal leading-none tracking-[-0.04em] md:text-6xl md:leading-[0.9] md:tracking-[-0.05em]">
                Guest favourites,
                <br />
                <em className="font-normal text-accent">in their own words.</em>
              </h2>
            </div>
            <div>
              <ol className="grid gap-x-7 md:grid-cols-2">
                {guestMentionedDishes.map((dish, index) => (
                  <li
                    key={dish}
                    className="flex min-h-14 items-center gap-4 border-t border-foreground/18 text-sm"
                  >
                    <span className="text-[0.58rem] tracking-[0.14em] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {dish}
                  </li>
                ))}
              </ol>
              <p className="pretty-copy mt-6 text-xs leading-6 text-muted">
                These dishes recur in public guest reviews. Availability can
                change, so call the restaurant if you have one in mind.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Button asChild>
              <a href={siteConfig.menu} target="_blank" rel="noreferrer">
                Open live menu and prices
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/reservations">Plan a visit</Link>
            </Button>
          </div>
          <p className="mt-5 max-w-2xl text-xs leading-6 text-muted">
            Follow the live menu link for current prices and availability.
          </p>
        </div>
      </section>

      <SourceStamp />
      <CtaBand
        eyebrow="Dine in"
        title="Ask what the kitchen is serving tonight."
        description="Call for dine-in specials, current availability and dietary questions."
      />
    </main>
  );
}
