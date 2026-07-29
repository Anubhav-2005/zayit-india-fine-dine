"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { navigation, siteConfig } from "@/lib/site";

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
        className="grid size-11 place-items-center rounded-full border border-white/25 text-ivory transition-colors hover:bg-ivory hover:text-olive focus-visible:border-gold-light xl:hidden"
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
        <div className="flex min-h-full flex-col p-7 text-ivory">
          <button
            type="button"
            className="absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-olive focus-visible:ring-2 focus-visible:ring-gold-light"
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
            className="mt-2 max-w-64 text-sm leading-6 text-ivory/65"
          >
            India Fine Dine · Jaisalmer
          </p>
          <nav aria-label="Mobile navigation" className="mt-10">
            <ul className="border-t border-white/20">
              {navigation.map((item, index) => (
                <li key={item.href} className="border-b border-white/20">
                  <Link
                    href={item.href}
                    aria-current={
                      pathname === item.href ||
                      (item.href !== "/" && pathname.startsWith(`${item.href}/`))
                        ? "page"
                        : undefined
                    }
                    className="group flex min-h-14 items-center justify-between py-3 focus-visible:ring-2 focus-visible:ring-gold-light"
                    onClick={closeDialog}
                  >
                    <span className="font-serif text-2xl tracking-[-0.03em]">
                      {item.label}
                    </span>
                    <span className="text-[0.62rem] tracking-[0.14em] text-gold-light">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto border-t border-white/20 pt-6">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex min-h-11 items-center text-xs font-semibold uppercase tracking-[0.16em] text-gold-light"
            >
              Call {siteConfig.phoneDisplay}
            </a>
            <p className="mt-3 text-xs leading-6 text-ivory/60">
              {siteConfig.hours.display}
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
