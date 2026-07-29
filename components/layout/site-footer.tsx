import Image from "next/image";
import Link from "next/link";

import { navigation, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-olive px-5 pb-8 pt-20 text-ivory sm:px-8 lg:px-12 lg:pt-28">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-14 border-b border-white/18 pb-16 md:grid-cols-[1.1fr_0.7fr_0.7fr] lg:gap-20">
          <div>
            <Image
              src="/images/zayit-official-logo-112.webp"
              alt="Zayit India Fine Dine"
              width={120}
              height={120}
              sizes="120px"
              className="size-28 rounded-full"
            />
            <p className="mt-7 max-w-md font-serif text-3xl leading-[1.02] tracking-[-0.04em] text-ivory">
              An Indian and Mediterranean table near the living walls of
              Jaisalmer Fort.
            </p>
          </div>
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-light">
              Explore
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-sm text-ivory/72">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link className="hover:text-gold-light" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-light">
              Visit
            </p>
            <address className="mt-5 text-sm not-italic leading-7 text-ivory/72">
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.line2}
              <br />
              {siteConfig.address.city}, {siteConfig.address.region}{" "}
              {siteConfig.address.postalCode}
            </address>
            <div className="mt-5 flex flex-col gap-2 text-sm">
              <a className="text-gold-light" href={siteConfig.phoneHref}>
                {siteConfig.phoneDisplay}
              </a>
              <a
                className="text-ivory/72 hover:text-gold-light"
                href={siteConfig.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Official Instagram ↗
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-6 text-[0.58rem] uppercase tracking-[0.12em] text-ivory/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Zayit India Fine Dine</p>
          <p>
            Hero:{" "}
            <a
              className="underline"
              href="https://commons.wikimedia.org/wiki/File:Jaisalmer_Night.jpg"
              target="_blank"
              rel="noreferrer"
            >
              Jitendra Parande / Wikimedia Commons · CC BY-SA
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
