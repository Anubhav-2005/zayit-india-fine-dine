import {
  ArrowUpRight,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { DeferredInquiryForm } from "@/components/forms/deferred-inquiry-form";
import { LiveServiceStatus } from "@/components/reservations/live-service-status";
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
    question: "Is WhatsApp reservation verified?",
    answer:
      "Not yet. This website can open a pre-filled enquiry to the publicly listed phone number, but the owner still needs to confirm that the number is monitored on WhatsApp. Opening or sending a message never confirms a table; wait for a restaurant reply.",
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
        accent="begins with a request."
        description="Call the verified restaurant number, try a clearly disclosed WhatsApp enquiry, or prepare an online email request. The table is held only after Zayit replies."
        meta="No request is an automatic confirmation"
      />

      <section className="bg-sand px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
          <a
            href={siteConfig.phoneHref}
            className="group flex min-h-36 flex-col justify-between border border-foreground/20 bg-background p-4 transition-colors hover:bg-ivory focus-visible:bg-ivory sm:min-h-40 sm:p-6"
          >
            <Phone aria-hidden="true" className="size-5 text-accent" />
            <span>
              <small className="block text-[0.55rem] uppercase tracking-[0.13em] text-muted sm:text-[0.58rem] sm:tracking-[0.15em]">
                Call to reserve
              </small>
              <strong className="mt-2 block break-words font-serif text-xl font-normal tracking-[-0.035em] sm:text-3xl">
                {siteConfig.phoneDisplay}
              </strong>
            </span>
          </a>
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="group flex min-h-36 flex-col justify-between border border-foreground/20 bg-background p-4 transition-colors hover:bg-ivory focus-visible:bg-ivory sm:min-h-40 sm:p-6"
          >
            <MessageCircle aria-hidden="true" className="size-5 text-accent" />
            <span>
              <small className="block text-[0.55rem] uppercase tracking-[0.13em] text-muted sm:text-[0.58rem] sm:tracking-[0.15em]">
                WhatsApp enquiry · unverified
              </small>
              <strong className="mt-2 block font-serif text-xl font-normal tracking-[-0.035em] sm:text-3xl">
                Prepare a message
              </strong>
            </span>
          </a>
          <div className="flex min-h-36 flex-col justify-between border border-foreground/20 bg-background p-4 sm:min-h-40 sm:p-6">
            <Clock3 aria-hidden="true" className="size-5 text-accent" />
            <span>
              <small className="block text-[0.55rem] uppercase tracking-[0.13em] text-muted sm:text-[0.58rem] sm:tracking-[0.15em]">
                Public first-party hours
              </small>
              <strong className="mt-2 block font-serif text-xl font-normal tracking-[-0.035em] sm:text-3xl">
                {siteConfig.hours.compact}
              </strong>
            </span>
          </div>
          <a
            href={siteConfig.directions}
            target="_blank"
            rel="noreferrer"
            className="group flex min-h-36 flex-col justify-between border border-foreground/20 bg-background p-4 transition-colors hover:bg-ivory focus-visible:bg-ivory sm:min-h-40 sm:p-6"
          >
            <MapPin aria-hidden="true" className="size-5 text-accent" />
            <span>
              <small className="block text-[0.55rem] uppercase tracking-[0.13em] text-muted sm:text-[0.58rem] sm:tracking-[0.15em]">
                Live directions
              </small>
              <strong className="mt-2 flex items-center gap-2 font-serif text-xl font-normal tracking-[-0.035em] sm:text-3xl">
                Fort Parking Road
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </strong>
            </span>
          </a>
        </div>
        <p className="mx-auto mt-5 max-w-[1500px] text-xs leading-6 text-muted">
          {siteConfig.hours.disclosure} The WhatsApp link uses the same public
          phone number, but WhatsApp monitoring awaits owner confirmation.
        </p>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-28 lg:px-12">
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
            <div className="mt-5">
              <LiveServiceStatus />
            </div>
          </div>
          <DeferredInquiryForm kind="reservation" />
        </div>
      </section>

      <section className="grid gap-12 bg-sand px-5 py-16 sm:px-8 md:py-28 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24 lg:px-12">
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
