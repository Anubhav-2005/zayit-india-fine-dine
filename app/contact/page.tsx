import {
  ArrowUpRight,
  Camera,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { InquiryForm } from "@/components/forms/inquiry-form";
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

      <section className="px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {contacts.map((contact) => {
            const Icon = contact.icon;
            const content = (
              <>
                <Icon aria-hidden="true" className="size-5 text-accent" />
                <span className="mt-10">
                  <small className="block text-[0.58rem] uppercase tracking-[0.15em] text-muted group-hover:text-ivory/72 group-focus-visible:text-ivory/72">
                    {contact.label}
                  </small>
                  <strong className="mt-2 block break-words font-serif text-2xl font-normal tracking-[-0.03em]">
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
                className="group flex min-h-48 flex-col justify-between border border-foreground/20 p-6 transition-colors hover:bg-olive hover:text-ivory focus-visible:bg-olive focus-visible:text-ivory"
              >
                {content}
              </a>
            ) : (
              <div
                key={contact.label}
                className="flex min-h-48 flex-col justify-between border border-foreground/20 p-6"
              >
                {content}
              </div>
            );
          })}
        </div>
        <p className="mx-auto mt-5 max-w-[1500px] text-xs leading-6 text-muted">
          *The email is publicly listed but awaits owner confirmation. No
          verifiable official Facebook page was found. {siteConfig.hours.disclosure}
        </p>
      </section>

      <section className="bg-sand px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="relative min-h-[32rem] overflow-hidden bg-olive p-8 text-ivory md:p-12">
            <div
              className="absolute -right-20 -top-20 size-96 rounded-full border border-gold/25"
              aria-hidden="true"
            />
            <MapPin aria-hidden="true" className="size-6 text-gold-light" />
            <p className="mt-20 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-light">
              Exact location
            </p>
            <h2 className="mt-6 font-serif text-5xl font-normal leading-[0.84] tracking-[-0.055em] md:text-6xl">
              {siteConfig.address.line1}
            </h2>
            <address className="mt-7 text-sm not-italic leading-7 text-ivory/66">
              {siteConfig.address.line2}
              <br />
              {siteConfig.address.city}, {siteConfig.address.region}{" "}
              {siteConfig.address.postalCode}
              <br />
              Coordinates {siteConfig.address.latitude},{" "}
              {siteConfig.address.longitude}
            </address>
            <a
              className="rule-link dark-rule-link mt-8"
              href={siteConfig.directions}
              target="_blank"
              rel="noreferrer"
            >
              Get live directions
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
          <div className="border border-foreground/20 bg-ivory p-7 md:p-12">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.17em] text-accent">
              Contact enquiry
            </p>
            <h2 className="mt-5 font-serif text-5xl font-normal leading-[0.86] tracking-[-0.05em]">
              Write a clear note.
            </h2>
            <InquiryForm kind="contact" className="mt-10" />
          </div>
        </div>
      </section>

      <section className="bg-olive px-5 py-24 text-ivory sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading
            index="01"
            eyebrow="Nearby"
            title="The city,"
            accent="within a walk."
            theme="dark"
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
