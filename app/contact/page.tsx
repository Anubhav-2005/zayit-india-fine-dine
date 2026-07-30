import Image from "next/image";
import {
  ArrowUpRight,
  Camera,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { DeferredInquiryForm } from "@/components/forms/deferred-inquiry-form";
import { NearbyList } from "@/components/shared/nearby-list";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { SourceStamp } from "@/components/shared/source-stamp";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Contact & Directions",
  description:
    "Call Zayit India Fine Dine, get exact Fort Parking Road directions, review current public hours and contact the restaurant from one source-backed page.",
  path: "/contact",
});

const contacts = [
  {
    label: "Telephone",
    value: siteConfig.phoneDisplay,
    href: siteConfig.phoneHref,
    icon: Phone,
  },
  {
    label: "Publicly listed email*",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
  {
    label: "Official Instagram",
    value: "@zayitindiafinedine",
    href: siteConfig.instagram,
    icon: Camera,
  },
  {
    label: "WhatsApp enquiry*",
    value: "Prepare a message",
    href: siteConfig.whatsapp,
    icon: MessageCircle,
  },
  {
    label: "Public first-party hours",
    value: siteConfig.hours.compact,
    icon: Clock3,
  },
];

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Contact & directions"
        title="Follow the"
        accent="fort road."
        description={`${siteConfig.address.line1}, ${siteConfig.address.line2}, Jaisalmer, Rajasthan ${siteConfig.address.postalCode}.`}
        meta={`Plus code ${siteConfig.address.plusCode}`}
      />

      <section className="px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-5">
          {contacts.map((contact) => {
            const Icon = contact.icon;
            const content = (
              <>
                <Icon aria-hidden="true" className="size-5 text-accent" />
                <span className="mt-10">
                  <small className="block text-[0.54rem] uppercase tracking-[0.12em] text-muted sm:text-[0.58rem] sm:tracking-[0.15em]">
                    {contact.label}
                  </small>
                  <strong className="mt-2 block break-words font-serif text-lg font-normal tracking-[-0.03em] sm:text-2xl">
                    {contact.value}
                  </strong>
                </span>
              </>
            );

            return contact.href ? (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  contact.href.startsWith("http") ? "noreferrer" : undefined
                }
                className="group flex min-h-40 flex-col justify-between border border-foreground/20 p-4 transition-colors hover:bg-sand focus-visible:bg-sand sm:min-h-48 sm:p-6 [&:last-child]:col-span-2 xl:[&:last-child]:col-span-1"
              >
                {content}
              </a>
            ) : (
              <div
                key={contact.label}
                className="flex min-h-40 flex-col justify-between border border-foreground/20 p-4 sm:min-h-48 sm:p-6 [&:last-child]:col-span-2 xl:[&:last-child]:col-span-1"
              >
                {content}
              </div>
            );
          })}
        </div>
        <p className="mx-auto mt-5 max-w-[1500px] text-xs leading-6 text-muted">
          *The email is publicly listed but awaits owner confirmation. The
          WhatsApp shortcut uses the public phone number, but monitoring still
          needs owner confirmation; a message never confirms a booking. No
          verifiable official Facebook page was found.{" "}
          {siteConfig.hours.disclosure}
        </p>
      </section>

      <section className="bg-sand px-5 py-16 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <figure className="lg:col-span-2">
            <div className="relative h-[24rem] overflow-hidden bg-olive md:h-[34rem]">
              <Image
                src="/images/owner/zayit-fort-sign.avif"
                alt="Zayit India sign below the illuminated walls of Jaisalmer Fort"
                fill
                sizes="(max-width: 767px) 92vw, 88vw"
                className="image-wash object-cover object-[center_58%]"
              />
            </div>
            <figcaption className="mt-4 flex items-center justify-between border-b border-foreground/18 pb-3 text-[0.58rem] font-semibold uppercase tracking-[0.15em] text-muted">
              <span>Arriving beneath the fort</span>
              <span>Owner-supplied photograph</span>
            </figcaption>
          </figure>
          <div className="flex min-h-[34rem] flex-col overflow-hidden border border-foreground/16 bg-ivory text-foreground">
            <div className="p-7 md:p-10">
              <div className="flex items-center justify-between gap-5">
                <p className="flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-accent">
                  <MapPin aria-hidden="true" className="size-5" />
                  Google Maps
                </p>
                <a
                  className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-muted underline underline-offset-4 hover:text-accent"
                  href={siteConfig.maps}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open full map
                </a>
              </div>
              <h2 className="mt-5 font-serif text-4xl font-normal leading-[0.88] tracking-[-0.05em]">
                {siteConfig.address.line1}
              </h2>
            </div>
            <iframe
              title="Google Map showing Zayit India Fine Dine in Jaisalmer"
              src={siteConfig.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[25rem] w-full grow border-0"
              allowFullScreen
            />
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-foreground/14 px-7 py-5 md:px-10">
              <address className="text-xs not-italic leading-6 text-muted">
                {siteConfig.address.line2}, {siteConfig.address.city} ·{" "}
                {siteConfig.address.plusCode}
              </address>
              <a
                className="rule-link"
                href={siteConfig.directions}
                target="_blank"
                rel="noreferrer"
              >
                Live directions
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
          <div className="border border-foreground/20 bg-background p-7 md:p-12">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-accent">
              Contact enquiry
            </p>
            <h2 className="mt-5 font-serif text-5xl font-normal leading-[0.86] tracking-[-0.05em]">
              Write a clear note.
            </h2>
            <DeferredInquiryForm kind="contact" className="mt-10" />
          </div>
        </div>
      </section>

      <section className="bg-background px-5 py-16 text-foreground sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading
            index="01"
            eyebrow="Nearby"
            title="The city,"
            accent="within a walk."
          />
          <div className="mt-14">
            <NearbyList />
          </div>
        </div>
      </section>

      <SourceStamp />
    </main>
  );
}
