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
        eyebrow="Menu · Current public listing"
        title="A generous"
        accent="table."
        description="Indian and Mediterranean in identity; North Indian, Chinese, biryani, breads, café plates, desserts and beverages in the current public delivery menu."
        meta="141 public listings · 11 sections · checked July 29, 2026"
      />

      <section className="px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <MenuExplorer />

          <div className="mt-20 grid gap-10 border-y border-foreground/20 py-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-accent">
                Most mentioned in public reviews
              </p>
              <h2 className="mt-5 font-serif text-5xl font-normal leading-[0.84] tracking-[-0.055em] md:text-6xl">
                Guest favourites,
                <br />
                <em className="font-normal text-accent">not sales claims.</em>
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
                No public POS data exists, so this website does not call any
                dish a best seller. Review-mentioned dishes may not be on the
                current delivery menu; call to confirm.
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
            Prices are intentionally not copied because the live ordering
            platform is the changing source of truth.
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
