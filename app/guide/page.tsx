import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, MoonStar, Sun } from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { NearbyList } from "@/components/shared/nearby-list";
import { OwnerNotice } from "@/components/shared/owner-notice";
import { SectionHeading } from "@/components/shared/section-heading";
import { SourceStamp } from "@/components/shared/source-stamp";
import { Button } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/metadata";
import { assetPath } from "@/lib/paths";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Jaisalmer Travel Guide",
  description:
    "A source-backed Jaisalmer evening guide connecting the fort, Jain Temples, Patwon Ki Haveli and Gadisar Lake with dinner near Fort Parking Road.",
  path: "/guide",
});

const eveningChapters = [
  {
    time: "Late afternoon",
    title: "Begin around the fort precinct.",
    copy: "Jaisalmer Fort and the Jain Temples sit closest to Zayit by the public map routes used on this website. Allow time for lanes, entrances and unplanned pauses.",
    icon: Sun,
  },
  {
    time: "Golden hour",
    title: "Let the city set the pace.",
    copy: "Patwon Ki Haveli can extend the old-city circuit. Route conditions, heat and opening times vary, so use live directions rather than treating this as a fixed itinerary.",
    icon: Compass,
  },
  {
    time: "After dark",
    title: "Return toward Fort Parking Road.",
    copy: "Zayit is on the first floor above the Jaisalmer Art Museum. Call before setting out to confirm today’s hours and your table.",
    icon: MoonStar,
  },
] as const;

export default function JaisalmerGuidePage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Jaisalmer travel guide"
        title="The city before"
        accent="the table."
        description="A calm, source-backed route through nearby Golden City landmarks—designed as inspiration, not a claim of firsthand travel."
        meta="Live directions · approximate public-route distances"
      />

      <section className="px-5 py-16 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading
            index="01"
            eyebrow="An unhurried sequence"
            title="Three chapters."
            accent="No rushed checklist."
            description="Use this structure loosely. Weather, traffic, opening hours and old-city access can change the shape of an afternoon."
          />

          <figure className="mt-12 md:mt-16">
            <div className="relative h-[30rem] overflow-hidden bg-sand-deep md:h-[38rem]">
              <Image
                src={assetPath(
                  "/images/owner/zayit-fort-daylight-portrait.avif",
                )}
                alt="Jaisalmer Fort in daylight above plants near Zayit"
                fill
                sizes="(max-width: 767px) 92vw, 88vw"
                className="image-wash object-cover object-[center_38%]"
              />
            </div>
            <figcaption className="mt-4 flex items-center justify-between border-b border-foreground/18 pb-3 text-[0.58rem] font-semibold uppercase tracking-[0.15em] text-muted">
              <span>The Golden City</span>
              <span>Owner-supplied photograph</span>
            </figcaption>
          </figure>

          <div className="mt-16 grid lg:grid-cols-3">
            {eveningChapters.map((chapter, index) => {
              const Icon = chapter.icon;
              return (
                <article
                  key={chapter.time}
                  className="border-b border-foreground/20 py-8 lg:min-h-[31rem] lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
                >
                  <div className="flex items-center justify-between">
                    <Icon aria-hidden="true" className="size-5 text-accent" />
                    <span className="text-[0.56rem] tracking-[0.15em] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-20 text-[0.59rem] font-semibold uppercase tracking-[0.16em] text-accent">
                    {chapter.time}
                  </p>
                  <h2 className="mt-5 font-serif text-[1.9rem] font-normal leading-[1.02] tracking-[-0.035em] md:text-4xl md:leading-[0.94] md:tracking-[-0.045em]">
                    {chapter.title}
                  </h2>
                  <p className="pretty-copy mt-5 text-sm leading-7 text-muted">
                    {chapter.copy}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-sand px-5 py-16 text-foreground sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.6fr] lg:items-end">
            <SectionHeading
              index="02"
              eyebrow="Near the restaurant"
              title="Four landmarks."
              accent="One live map."
            />
            <p className="pretty-copy max-w-md text-sm leading-7 text-muted lg:justify-self-end">
              Distances are approximate public-route snapshots. Each row opens
              a live Google Maps search so you can check the route that day.
            </p>
          </div>
          <div className="mt-16">
            <NearbyList />
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild>
              <a
                href={siteConfig.directions}
                target="_blank"
                rel="noreferrer"
              >
                Directions to Zayit
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
            >
              <Link href="/reservations">Plan the table</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-background px-5 py-16 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-accent">
              Travel-note standard
            </p>
            <h2 className="mt-5 font-serif text-[2.2rem] font-normal leading-none tracking-[-0.04em] md:mt-6 md:text-6xl md:leading-[0.9] md:tracking-[-0.05em]">
              Check what changes.
            </h2>
          </div>
          <div>
            <OwnerNotice title="Live attraction details stay outside this static guide.">
              Entry fees, access rules, attraction hours, road conditions and
              seasonal closures are not reproduced here because they can
              change. Check Rajasthan Tourism and each attraction’s current
              listing before travel.
            </OwnerNotice>
            <Link
              href="/blog/an-evening-near-jaisalmer-fort"
              className="rule-link mt-8"
            >
              Read the longer city note
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <SourceStamp />
    </main>
  );
}
