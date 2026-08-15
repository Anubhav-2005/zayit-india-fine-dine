"use client";

import type { ComponentProps } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUp,
  CalendarDays,
  MessageCircleMore,
  Phone,
} from "lucide-react";

import { cn } from "@/lib/utils";

type FloatingActionDockProps = {
  className?: string;
  reserveHref?: ComponentProps<typeof Link>["href"];
  phoneHref: string;
  whatsappHref?: string;
  backToTopThreshold?: number;
};

const actionClassName =
  "grid size-11 shrink-0 place-items-center rounded-full text-ivory outline-none transition-[background-color,color,transform] hover:-translate-y-0.5 hover:bg-gold-light hover:text-olive focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-olive motion-reduce:transition-none";

export function FloatingActionDock({
  className,
  reserveHref = "/reservations",
  phoneHref,
  whatsappHref,
  backToTopThreshold = 560,
}: FloatingActionDockProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [footerIsVisible, setFooterIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreference = () => setReduceMotion(media.matches);
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > backToTopThreshold);
      setShowQuickActions(
        window.scrollY >
          Math.min(
            backToTopThreshold,
            Math.max(240, window.innerHeight * 0.55),
          ),
      );
    };

    handleMotionPreference();
    handleScroll();
    media.addEventListener("change", handleMotionPreference);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      media.removeEventListener("change", handleMotionPreference);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [backToTopThreshold]);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterIsVisible(entry.isIntersecting),
      { rootMargin: "0px 0px 72px 0px" },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <nav
      aria-label="Quick actions"
      className={cn(
        "fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom))] left-3 right-3 z-[100] flex items-center justify-center gap-1 rounded-full border border-white/15 bg-olive/96 p-1.5 shadow-2xl backdrop-blur-md transition-[opacity,transform] duration-300 sm:bottom-5 sm:left-auto sm:right-5",
        showQuickActions && !footerIsVisible
          ? "visible translate-y-0 opacity-100"
          : "invisible pointer-events-none translate-y-4 opacity-0",
        className,
      )}
    >
      <Link
        href={reserveHref}
        prefetch={false}
        className="inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-gold px-4 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-olive outline-none transition-colors hover:bg-gold-light focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-olive sm:flex-none"
        aria-label="Reserve a table"
        title="Reserve a table"
      >
        <CalendarDays aria-hidden="true" className="size-4" />
        <span>Reserve</span>
      </Link>
      <a
        href={phoneHref}
        className={actionClassName}
        aria-label="Call the restaurant"
        title="Call the restaurant"
      >
        <Phone aria-hidden="true" className="size-4" />
      </a>
      {whatsappHref ? (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={actionClassName}
          aria-label="Message the restaurant on WhatsApp"
          title="WhatsApp"
        >
          <MessageCircleMore aria-hidden="true" className="size-4" />
        </a>
      ) : null}
      {showBackToTop ? (
        <button
          type="button"
          className={`${actionClassName} hidden sm:grid`}
          aria-label="Back to top"
          title="Back to top"
          onClick={backToTop}
        >
          <ArrowUp aria-hidden="true" className="size-4" />
        </button>
      ) : null}
    </nav>
  );
}
