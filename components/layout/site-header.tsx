import Image from "next/image";
import Link from "next/link";

import { AmbientSoundToggle, ThemeToggle } from "@/components/experience";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { Button } from "@/components/ui/button";
import { navigation } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-80 border-b border-white/12 bg-olive/92 text-ivory backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          prefetch={false}
          className="flex min-h-11 items-center gap-3 rounded-full focus-visible:ring-2 focus-visible:ring-gold-light"
          aria-label="Zayit India Fine Dine, home"
        >
          <Image
            src="/images/zayit-official-logo-112.webp"
            alt=""
            width={58}
            height={58}
            sizes="58px"
            loading="eager"
            className="size-14 rounded-full"
          />
          <span className="hidden sm:block">
            <strong className="block font-serif text-lg font-medium leading-none tracking-[-0.03em]">
              Zayit
            </strong>
            <small className="mt-1 block text-[0.5rem] uppercase tracking-[0.19em] text-ivory/62">
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
                  className="inline-flex min-h-11 items-center text-[0.61rem] font-semibold uppercase tracking-[0.14em] text-ivory/78 transition-colors hover:text-gold-light focus-visible:text-gold-light"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <AmbientSoundToggle className="text-ivory hover:bg-white/10" />
            <ThemeToggle className="text-ivory hover:bg-white/10" />
          </div>
          <Button
            asChild
            variant="gold"
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
