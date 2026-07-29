import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";

import { InquiryForm } from "@/components/forms/inquiry-form";
import { CtaBand } from "@/components/shared/cta-band";
import { FaqBlock } from "@/components/shared/faq-block";
import { OwnerNotice } from "@/components/shared/owner-notice";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Reservations",
  description:
    "Reserve a table at Zayit India Fine Dine in Jaisalmer. Call the verified restaurant number, review current hours and prepare an email enquiry.",
  path: "/reservations",
});

const reservationFaqs = [
  {
    question: "Does this form confirm a reservation?",
    answer:
      "No. It prepares an email request in your own mail app. A reservation is confirmed only when the restaurant responds. Calling +91 70730 96695 is the verified route.",
  },
  {
    question: "How far ahead should I call?",
    answer:
      "No current booking-window policy is publicly verified. Call as early as practical for a specific date, time or group size.",
  },
  {
    question: "Can I request the terrace?",
    answer:
      "Public reviews mention a fort-facing terrace, but table location and availability are not guaranteed. Add the request when you call.",
  },
  {
    question: "Are dietary requirements guaranteed?",
    answer:
      "No current first-party guarantee was found for Jain, vegan, gluten-free or allergen-separated preparation. Discuss requirements directly with the restaurant before ordering.",
  },
];

export default function ReservationsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Reservations"
        title="Your table,"
        accent="held by a call."
        description="Reservations are publicly listed as accepted. A telephone call is the only current booking channel we could verify."
        meta="Call-first reservations · no verified WhatsApp booking flow"
        image={{
          src: "/images/jaisalmer-night-2560.webp",
          alt: "Jaisalmer Fort illuminated at night",
        }}
      />

      <section className="bg-sand px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[1500px] gap-4 md:grid-cols-3">
          <a
            href={siteConfig.phoneHref}
            className="group flex min-h-40 flex-col justify-between border border-foreground/20 bg-ivory p-6 transition-colors hover:bg-olive hover:text-ivory focus-visible:bg-olive focus-visible:text-ivory"
          >
            <Phone aria-hidden="true" className="size-5 text-accent" />
            <span>
              <small className="block text-[0.58rem] uppercase tracking-[0.15em] text-muted group-hover:text-ivory/72 group-focus-visible:text-ivory/72">
                Call to reserve
              </small>
              <strong className="mt-2 block font-serif text-3xl font-normal tracking-[-0.035em]">
                {siteConfig.phoneDisplay}
              </strong>
            </span>
          </a>
          <div className="flex min-h-40 flex-col justify-between border border-foreground/20 bg-ivory p-6">
            <Clock3 aria-hidden="true" className="size-5 text-accent" />
            <span>
              <small className="block text-[0.58rem] uppercase tracking-[0.15em] text-muted">
                Public first-party hours
              </small>
              <strong className="mt-2 block font-serif text-3xl font-normal tracking-[-0.035em]">
                {siteConfig.hours.compact}
              </strong>
            </span>
          </div>
          <a
            href={siteConfig.directions}
            target="_blank"
            rel="noreferrer"
            className="group flex min-h-40 flex-col justify-between border border-foreground/20 bg-ivory p-6 transition-colors hover:bg-olive hover:text-ivory focus-visible:bg-olive focus-visible:text-ivory"
          >
            <MapPin aria-hidden="true" className="size-5 text-accent" />
            <span>
              <small className="block text-[0.58rem] uppercase tracking-[0.15em] text-muted group-hover:text-ivory/72 group-focus-visible:text-ivory/72">
                Live directions
              </small>
              <strong className="mt-2 flex items-center gap-2 font-serif text-3xl font-normal tracking-[-0.035em]">
                Fort Parking Road
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </strong>
            </span>
          </a>
        </div>
        <p className="mx-auto mt-5 max-w-[1500px] text-xs leading-6 text-muted">
          {siteConfig.hours.disclosure}
        </p>
      </section>

      <section className="px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <SectionHeading
              index="01"
              eyebrow="Prepare a request"
              title="A note for"
              accent="the restaurant."
              description="Share the details once, review the prepared message in your own email app, and send it when you are ready."
            />
            <OwnerNotice
              className="mt-10"
              title="Email delivery is not yet owner-confirmed."
            >
              The address zayitindia@gmail.com is publicly listed but still
              requires owner confirmation. For a time-sensitive reservation,
              call the verified number.
            </OwnerNotice>
          </div>
          <InquiryForm kind="reservation" />
        </div>
      </section>

      <section className="grid gap-14 bg-sand px-5 py-24 sm:px-8 md:py-28 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:px-12">
        <SectionHeading
          index="02"
          eyebrow="Reservation notes"
          title="Before you"
          accent="request."
        />
        <FaqBlock entries={reservationFaqs} />
      </section>

      <CtaBand />
    </main>
  );
}
