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
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionPreference = () => setReduceMotion(media.matches);
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > backToTopThreshold);
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
        "fixed bottom-5 right-5 z-[100] hidden items-center gap-1 rounded-full border border-white/15 bg-olive/94 p-1.5 shadow-2xl backdrop-blur-md sm:flex",
        className,
      )}
    >
      <Link
        href={reserveHref}
        prefetch={false}
        className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-gold px-4 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-olive outline-none transition-colors hover:bg-gold-light focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-olive"
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
          className={actionClassName}
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
