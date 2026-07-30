import { ArrowUpRight, CalendarX2 } from "lucide-react";

import { DeferredInquiryForm } from "@/components/forms/deferred-inquiry-form";
import { OwnerNotice } from "@/components/shared/owner-notice";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Events",
  description:
    "Check the current public events status for Zayit India Fine Dine and contact the restaurant about a future gathering.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Events"
        title="What is on,"
        accent="honestly."
        description="No current public events calendar, ticketing page or dated programme could be verified. Contact the restaurant directly for current plans."
        meta="Public programme status · checked July 29, 2026"
      />

      <section className="px-5 py-16 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="relative overflow-hidden border border-foreground/16 bg-sand p-7 text-foreground md:p-14 lg:p-20">
            <div
              className="absolute -right-24 -top-28 size-96 rounded-full border border-accent/14"
              aria-hidden="true"
            />
            <CalendarX2
              aria-hidden="true"
              className="size-7 text-accent"
            />
            <p className="mt-12 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-accent">
              Current public status
            </p>
            <h2 className="display-balance mt-5 max-w-5xl font-serif text-[clamp(2.35rem,10vw,2.8rem)] font-normal leading-none tracking-[-0.045em] md:mt-6 md:text-[clamp(4rem,5.4vw,6rem)] md:leading-[0.9] md:tracking-[-0.055em]">
              No dated programme is currently verified.
            </h2>
            <p className="pretty-copy mt-7 max-w-2xl text-sm leading-7 text-muted">
              For the newest announcements, use the official Instagram profile
              or call the restaurant directly. A future owner-supplied calendar
              can replace this state without changing the page architecture.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  Official Instagram
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
              >
                <a href={siteConfig.phoneHref}>Call the restaurant</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand px-5 py-16 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <SectionHeading
              index="01"
              eyebrow="Event enquiry"
              title="Ask about"
              accent="your date."
              description="Submitting this form prepares an email enquiry; it does not promise a programme, space or booking."
            />
            <OwnerNotice className="mt-10" title="Capabilities are not assumed.">
              Venue availability, capacity, timings, entertainment, menus,
              ticketing, deposits and technical requirements all need direct
              owner confirmation.
            </OwnerNotice>
          </div>
          <DeferredInquiryForm kind="event" />
        </div>
      </section>
    </main>
  );
}
