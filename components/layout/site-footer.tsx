import Image from "next/image";
import Link from "next/link";

import { NewsletterInvitation } from "@/components/shared/newsletter-invitation";
import { footerNavigation, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/12 bg-sand px-5 pb-24 pt-16 text-foreground sm:px-8 sm:pb-8 lg:px-12 lg:pt-24">
      <div className="mx-auto max-w-[1500px]">
        <NewsletterInvitation className="mb-14 md:mb-20" />
        <div className="grid gap-12 border-b border-foreground/16 pb-14 md:grid-cols-[1.1fr_0.7fr_0.7fr] lg:gap-20">
          <div>
            <Image
              src="/images/zayit-official-logo-112.webp"
              alt="Zayit India Fine Dine"
              width={120}
              height={120}
              sizes="120px"
              className="size-28 rounded-full"
            />
            <p className="mt-7 max-w-md font-serif text-3xl leading-[1.02] tracking-[-0.04em] text-foreground">
              An Indian and Mediterranean table near the living walls of
              Jaisalmer Fort.
            </p>
          </div>
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-accent">
              Explore
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-muted">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link className="hover:text-accent" href={item.href}>
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
            <address className="mt-5 text-sm not-italic leading-7 text-muted">
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.line2}
              <br />
              {siteConfig.address.city}, {siteConfig.address.region}{" "}
              {siteConfig.address.postalCode}
            </address>
            <div className="mt-5 flex flex-col gap-2 text-sm">
              <a className="text-accent" href={siteConfig.phoneHref}>
                {siteConfig.phoneDisplay}
              </a>
              <a
                className="text-muted hover:text-accent"
                href={siteConfig.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Official Instagram ↗
              </a>
              <a
                className="text-muted hover:text-accent"
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp enquiry* ↗
              </a>
            </div>
            <p className="mt-4 text-[0.65rem] leading-5 text-muted">
              *Uses the public phone number. Monitoring awaits owner
              confirmation; a message does not confirm a table.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-6 text-[0.58rem] uppercase tracking-[0.12em] text-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Zayit India Fine Dine</p>
          <p>Owner-supplied restaurant photography · No AI-generated imagery</p>
        </div>
      </div>
    </footer>
  );
}
