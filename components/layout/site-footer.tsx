import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { NewsletterInvitation } from "@/components/shared/newsletter-invitation";
import { assetPath } from "@/lib/paths";
import { footerNavigation, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/12 bg-sand px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-8 text-foreground sm:px-8 lg:px-12 lg:pb-7 lg:pt-10">
      <div className="mx-auto max-w-[1500px]">
        <NewsletterInvitation className="mb-6 lg:mb-8" />

        <div className="border-b border-foreground/16 pb-5 lg:hidden">
          <div className="flex items-center gap-3 pb-5">
            <Image
              src={assetPath("/images/zayit-official-logo-112.webp")}
              alt="Zayit India Fine Dine"
              width={52}
              height={52}
              sizes="52px"
              className="size-[3.25rem] shrink-0 rounded-full"
            />
            <p className="max-w-[17rem] font-serif text-[1.08rem] leading-[1.08] tracking-[-0.025em] text-foreground sm:text-xl">
              An Indian and Mediterranean table near the living walls of
              Jaisalmer Fort.
            </p>
          </div>

          <details className="group border-t border-foreground/14">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-accent [&::-webkit-details-marker]:hidden">
              Explore
              <ChevronDown
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-open:rotate-180"
              />
            </summary>
            <ul className="grid grid-cols-2 gap-x-5 pb-3 text-[0.8rem] text-muted">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    className="inline-flex min-h-11 items-center hover:text-accent"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>

          <details className="group border-t border-foreground/14">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-accent [&::-webkit-details-marker]:hidden">
              Visit
              <ChevronDown
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-open:rotate-180"
              />
            </summary>
            <div className="pb-3">
              <address className="text-[0.8rem] not-italic leading-5 text-muted">
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2}
                <br />
                {siteConfig.address.city}, {siteConfig.address.region}{" "}
                {siteConfig.address.postalCode}
              </address>
              <div className="mt-1 grid grid-cols-2 text-[0.8rem]">
                <a
                  className="col-span-2 inline-flex min-h-11 items-center text-accent"
                  href={siteConfig.phoneHref}
                >
                  {siteConfig.phoneDisplay}
                </a>
                <a
                  className="inline-flex min-h-11 items-center text-muted hover:text-accent"
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram ↗
                </a>
                <a
                  className="inline-flex min-h-11 items-center text-muted hover:text-accent"
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp ↗
                </a>
              </div>
              <p className="mt-1 max-w-sm text-[0.6rem] leading-4 text-muted">
                *WhatsApp uses the public phone number. A message does not
                confirm a table.
              </p>
            </div>
          </details>
        </div>

        <div className="hidden grid-cols-[0.9fr_0.85fr_1fr] gap-10 border-b border-foreground/16 pb-7 lg:grid xl:gap-16">
          <div>
            <Image
              src={assetPath("/images/zayit-official-logo-112.webp")}
              alt="Zayit India Fine Dine"
              width={72}
              height={72}
              sizes="72px"
              className="size-[4.5rem] rounded-full"
            />
            <p className="mt-4 max-w-xs font-serif text-[1.35rem] leading-[1.08] tracking-[-0.03em] text-foreground">
              An Indian and Mediterranean table near the living walls of
              Jaisalmer Fort.
            </p>
          </div>
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-accent">
              Explore
            </p>
            <ul className="mt-2 grid grid-cols-2 gap-x-5 text-[0.78rem] text-muted">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    className="inline-flex min-h-9 items-center hover:text-accent"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-accent">
              Visit
            </p>
            <address className="mt-2 text-[0.78rem] not-italic leading-5 text-muted">
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.line2}
              <br />
              {siteConfig.address.city}, {siteConfig.address.region}{" "}
              {siteConfig.address.postalCode}
            </address>
            <div className="mt-1 grid grid-cols-2 text-[0.78rem]">
              <a
                className="col-span-2 inline-flex min-h-9 items-center text-accent"
                href={siteConfig.phoneHref}
              >
                {siteConfig.phoneDisplay}
              </a>
              <a
                className="inline-flex min-h-9 items-center text-muted hover:text-accent"
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram ↗
              </a>
              <a
                className="inline-flex min-h-9 items-center text-muted hover:text-accent"
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp* ↗
              </a>
            </div>
            <p className="mt-1 max-w-sm text-[0.58rem] leading-4 text-muted">
              *Uses the public phone number. A message does not confirm a
              table.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 pt-4 text-[0.54rem] uppercase tracking-[0.1em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Zayit India Fine Dine</p>
          <p>Owner photography · No AI-generated imagery</p>
        </div>
      </div>
    </footer>
  );
}
