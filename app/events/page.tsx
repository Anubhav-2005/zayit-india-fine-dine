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
        title="An evening,"
        accent="worth gathering for."
        description="Zayit has not published a dated events calendar. Follow the restaurant or call directly for the latest plans."
        meta="For current announcements · Instagram or phone"
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
              At the moment
            </p>
            <h2 className="display-balance mt-5 max-w-5xl font-serif text-[clamp(2.35rem,10vw,2.8rem)] font-normal leading-none tracking-[-0.045em] md:mt-6 md:text-[clamp(4rem,5.4vw,6rem)] md:leading-[0.9] md:tracking-[-0.055em]">
              No event dates are currently listed.
            </h2>
            <p className="pretty-copy mt-7 max-w-2xl text-sm leading-7 text-muted">
              For the newest announcements, follow the official Instagram
              profile or call the restaurant directly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
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
              description="Tell Zayit the date and kind of evening you have in mind. The restaurant will confirm what is possible."
            />
            <OwnerNotice className="mt-10" title="Every gathering is different.">
              Ask the restaurant about current availability, capacity, timings,
              menus, deposits and any technical requirements for your date.
            </OwnerNotice>
          </div>
          <DeferredInquiryForm kind="event" />
        </div>
      </section>
    </main>
  );
}
