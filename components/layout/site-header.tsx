import Image from "next/image";
import Link from "next/link";

import { AmbientSoundToggle } from "@/components/experience";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Button } from "@/components/ui/button";
import { navigation } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-80 border-b border-foreground/10 bg-ivory text-foreground shadow-[0_0.35rem_2rem_rgba(66,47,23,0.05)] sm:bg-ivory/92 sm:backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-[1600px] items-center justify-between px-4 sm:h-20 sm:px-8 lg:px-12">
        <Link
          href="/"
          prefetch={false}
          className="flex min-h-11 items-center gap-3 rounded-full focus-visible:ring-2 focus-visible:ring-focus"
          aria-label="Zayit India Fine Dine, home"
        >
          <Image
            src="/images/zayit-official-logo-112.webp"
            alt=""
            width={52}
            height={52}
            sizes="52px"
            loading="eager"
            className="size-12 rounded-full sm:size-[3.25rem]"
          />
          <span className="hidden sm:block">
            <strong className="block font-serif text-lg font-medium leading-none tracking-[-0.03em]">
              Zayit
            </strong>
            <small className="mt-1 block text-[0.5rem] uppercase tracking-[0.19em] text-muted">
              India Fine Dine
            </small>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden xl:block">
          <ul className="flex items-center gap-5 2xl:gap-7">
            {navigation.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-[0.61rem] font-semibold uppercase tracking-[0.14em] text-foreground/72 transition-colors hover:text-accent focus-visible:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <AmbientSoundToggle className="hidden text-foreground/70 hover:bg-sand sm:inline-flex" />
          <Button
            asChild
            variant="default"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link href="/reservations">Reserve</Link>
          </Button>
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
