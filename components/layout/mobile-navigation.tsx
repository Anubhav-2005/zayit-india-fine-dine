"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { footerNavigation, siteConfig } from "@/lib/site";

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

export function MobileNavigation() {
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

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 80rem)");
    const closeOnDesktop = () => {
      if (desktop.matches) finishClose();
    };

    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [finishClose]);

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
        className="grid size-11 place-items-center rounded-full border border-foreground/20 text-foreground transition-colors hover:bg-sand focus-visible:border-focus xl:hidden"
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
                    className="inline-flex min-h-11 items-center text-[0.61rem] font-semibold uppercase tracking-[0.13em] text-muted hover:text-accent focus-visible:ring-2 focus-visible:ring-focus"
                    onClick={closeDialog}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto border-t border-foreground/16 pt-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.16em] text-accent"
                >
                  Call {siteConfig.phoneDisplay}
                </a>
                <p className="text-xs leading-6 text-muted">
                  {siteConfig.hours.display}
                </p>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
