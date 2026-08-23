"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Button } from "@/components/ui/button";
import { assetPath } from "@/lib/paths";
import { navigation } from "@/lib/site";
import { cn } from "@/lib/utils";

const desktopNavigationHrefs = new Set([
  "/menu",
  "/about",
  "/gallery",
  "/private-dining",
  "/contact",
]);

export function SiteHeader() {
  const pathname = usePathname();
  const [pastOpening, setPastOpening] = useState(false);

  useEffect(() => {
    let scrollFrame = 0;
    const update = () => {
      scrollFrame = 0;
      const nextPastOpening = window.scrollY > 56;
      setPastOpening((current) =>
        current === nextPastOpening ? current : nextPastOpening,
      );
    };
    const handleScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(scrollFrame);
    };
  }, [pathname]);

  const overlaysHero = pathname === "/" && !pastOpening;

  return (
    <header
      className={cn(
        "site-header fixed inset-x-0 top-0 z-80 border-b backdrop-blur-xl",
        overlaysHero ? "site-header--overlay" : "site-header--solid",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[1600px] items-center justify-between px-4 sm:h-20 sm:px-8 lg:px-12">
        <Link
          href="/"
          prefetch={false}
          className="flex min-h-11 items-center gap-3 rounded-full focus-visible:ring-2 focus-visible:ring-focus"
          aria-label="Zayit India Fine Dine, home"
        >
          <Image
            src={assetPath("/images/zayit-official-logo-112.webp")}
            alt=""
            width={52}
            height={52}
            sizes="52px"
            loading="eager"
            className="size-12 rounded-full sm:size-[3.25rem]"
          />
          <span className="site-header__wordmark hidden sm:block">
            <strong className="block font-serif text-lg font-medium leading-none tracking-[-0.03em]">
              Zayit
            </strong>
            <small className="mt-1 block text-[0.5rem] uppercase tracking-[0.19em] opacity-65">
              India Fine Dine
            </small>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden xl:block">
          <ul className="flex items-center gap-6 2xl:gap-8">
            {navigation
              .filter((item) => desktopNavigationHrefs.has(item.href))
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="site-header__nav-link inline-flex min-h-11 items-center text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="default"
            size="sm"
            className="site-header__reserve hidden sm:inline-flex"
          >
            <Link href="/reservations">Reserve</Link>
          </Button>
          <MobileNavigation triggerClassName="site-header__menu-trigger" />
        </div>
      </div>
    </header>
  );
}
