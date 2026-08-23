"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, MapPinned, Menu, Phone, X } from "lucide-react";

import { footerNavigation, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const primaryHrefs = new Set([
  "/",
  "/menu",
  "/gallery",
  "/reservations",
  "/contact",
]);
const mobileNavigation = footerNavigation;
const primaryNavigation = mobileNavigation.filter((item) =>
  primaryHrefs.has(item.href),
);
const secondaryNavigation = mobileNavigation.filter(
  (item) => !primaryHrefs.has(item.href),
);

export function MobileNavigation({
  triggerClassName,
}: {
  triggerClassName?: string;
}) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closingTimer = useRef<number | undefined>(undefined);

  const finishClose = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;
    dialog.close();
    delete dialog.dataset.closing;
    document.documentElement.style.removeProperty("overflow");
  }, []);

  const closeDialog = () => {
    const dialog = dialogRef.current;
    if (!dialog?.open || dialog.dataset.closing !== undefined) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishClose();
      return;
    }

    dialog.dataset.closing = "";
    closingTimer.current = window.setTimeout(finishClose, 420);
  };

  const openDialog = () => {
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  };

  useEffect(() => {
    finishClose();
  }, [finishClose, pathname]);

  useEffect(
    () => () => {
      if (closingTimer.current !== undefined) {
        window.clearTimeout(closingTimer.current);
      }
      document.documentElement.style.removeProperty("overflow");
    },
    [],
  );

  return (
    <>
      <button
        type="button"
        className={cn(
          "grid size-11 place-items-center rounded-full border border-foreground/20 text-foreground transition-colors hover:bg-sand focus-visible:border-focus",
          triggerClassName,
        )}
        aria-label="Open navigation"
        aria-haspopup="dialog"
        aria-controls="mobile-navigation-dialog"
        onClick={openDialog}
      >
        <Menu aria-hidden="true" className="size-5" />
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-navigation-dialog"
        className="navigation-dialog"
        aria-labelledby="mobile-navigation-title"
        aria-describedby="mobile-navigation-description"
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onKeyDown={(event) => {
          if (event.key !== "Escape") return;
          event.preventDefault();
          closeDialog();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        <div className="flex min-h-full flex-col p-6 text-foreground sm:p-7">
          <button
            type="button"
            className="absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-foreground/20 transition-colors hover:bg-sand focus-visible:ring-2 focus-visible:ring-focus"
            aria-label="Close navigation"
            onClick={closeDialog}
          >
            <X aria-hidden="true" className="size-5" />
          </button>
          <p
            id="mobile-navigation-title"
            className="pr-14 font-serif text-4xl font-normal tracking-[-0.04em]"
          >
            Zayit
          </p>
          <p
            id="mobile-navigation-description"
            className="mt-2 max-w-64 text-sm leading-6 text-muted"
          >
            India Fine Dine · Jaisalmer
          </p>
          <nav aria-label="Mobile navigation" className="mt-8">
            <ul className="border-t border-foreground/16">
              {primaryNavigation.map((item, index) => (
                <li key={item.href} className="border-b border-foreground/16">
                  <Link
                    href={item.href}
                    aria-current={
                      pathname === item.href ||
                      (item.href !== "/" && pathname.startsWith(`${item.href}/`))
                        ? "page"
                        : undefined
                    }
                    className="group flex min-h-14 items-center justify-between py-3 focus-visible:ring-2 focus-visible:ring-focus"
                    onClick={closeDialog}
                  >
                    <span className="font-serif text-2xl tracking-[-0.03em]">
                      {item.label}
                    </span>
                    <span className="text-[0.62rem] tracking-[0.14em] text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-1">
              {secondaryNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={
                      pathname === item.href ||
                      (item.href !== "/" && pathname.startsWith(`${item.href}/`))
                        ? "page"
                        : undefined
                    }
                    className="inline-flex min-h-11 items-center text-[0.69rem] font-semibold uppercase tracking-[0.115em] text-muted hover:text-accent focus-visible:ring-2 focus-visible:ring-focus"
                    onClick={closeDialog}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto border-t border-foreground/16 pt-6">
            <div className="grid grid-cols-3 gap-2" aria-label="Visit shortcuts">
              <Link
                href="/reservations"
                onClick={closeDialog}
                className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl bg-olive px-2 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-ivory focus-visible:ring-2 focus-visible:ring-focus"
              >
                <CalendarDays aria-hidden="true" className="size-4 text-gold-light" />
                Reserve
              </Link>
              <a
                href={siteConfig.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl border border-foreground/18 px-2 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-foreground focus-visible:ring-2 focus-visible:ring-focus"
              >
                <MapPinned aria-hidden="true" className="size-4 text-accent" />
                Directions
              </a>
              <a
                href={siteConfig.phoneHref}
                className="flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl border border-foreground/18 px-2 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-foreground focus-visible:ring-2 focus-visible:ring-focus"
              >
                <Phone aria-hidden="true" className="size-4 text-accent" />
                Call
              </a>
            </div>
            <p className="mt-3 text-center text-[0.68rem] leading-5 text-muted">
              {siteConfig.hours.display} · {siteConfig.phoneDisplay}
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
