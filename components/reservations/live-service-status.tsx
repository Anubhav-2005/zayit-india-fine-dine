"use client";

import { useEffect, useState } from "react";
import { Clock3, MessageCircle, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site";

type ServiceSnapshot = {
  open: boolean;
  time: string;
};

function getServiceSnapshot(): ServiceSnapshot {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(
    parts.find((part) => part.type === "minute")?.value ?? 0,
  );
  const minutesAfterMidnight = hour * 60 + minute;

  return {
    open: minutesAfterMidnight >= 11 * 60 || minutesAfterMidnight < 30,
    time: new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "2-digit",
    }).format(now),
  };
}

export function LiveServiceStatus() {
  const [snapshot, setSnapshot] = useState<ServiceSnapshot>();

  useEffect(() => {
    const update = () => setSnapshot(getServiceSnapshot());
    const initial = window.setTimeout(update, 0);
    const interval = window.setInterval(update, 60_000);

    return () => {
      window.clearTimeout(initial);
      window.clearInterval(interval);
    };
  }, []);

  const isOpen = snapshot?.open;

  return (
    <aside className="relative isolate overflow-hidden border border-foreground/16 bg-sand p-7 text-foreground md:p-10">
      <div
        className="absolute -right-24 -top-24 -z-10 size-72 rounded-full border border-accent/15"
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.17em] text-accent">
            Live service status
          </p>
          <h2 className="mt-5 max-w-xl font-serif text-[1.9rem] font-normal leading-[1.02] tracking-[-0.035em] md:text-5xl md:leading-[0.94] md:tracking-[-0.045em]">
            {snapshot
              ? isOpen
                ? "Inside the published service window."
                : "Between published services."
              : "Checking Jaisalmer time…"}
          </h2>
        </div>
        <span
          className="relative mt-1 grid size-11 shrink-0 place-items-center rounded-full border border-accent/25"
          aria-hidden="true"
        >
          <Clock3 className="size-4 text-accent" />
          {snapshot ? (
            <span
              className={`absolute right-0 top-0 size-2.5 rounded-full ${
                isOpen ? "bg-emerald-400" : "bg-gold"
              }`}
            />
          ) : null}
        </span>
      </div>

      <div className="mt-10 grid gap-5 border-t border-foreground/16 pt-6 sm:grid-cols-2">
        <div>
          <p className="text-[0.56rem] uppercase tracking-[0.14em] text-muted">
            Jaisalmer now
          </p>
          <p className="mt-2 font-serif text-2xl">
            {snapshot?.time ?? "Asia / Kolkata"}
          </p>
        </div>
        <div>
          <p className="text-[0.56rem] uppercase tracking-[0.14em] text-muted">
            Published first-party hours
          </p>
          <p className="mt-2 font-serif text-2xl">{siteConfig.hours.compact}</p>
        </div>
      </div>

      <p className="pretty-copy mt-6 max-w-2xl text-xs leading-6 text-muted">
        This live clock reflects the published service window, not real-time
        table inventory. A table is available only when the restaurant confirms
        your request.
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        <a
          href={siteConfig.phoneHref}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-olive bg-olive px-5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-olive-soft"
        >
          <Phone aria-hidden="true" className="size-4" />
          Check by phone
        </a>
        <a
          href={siteConfig.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-foreground/25 px-5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-ivory"
        >
          <MessageCircle aria-hidden="true" className="size-4" />
          Request on WhatsApp
        </a>
      </div>
    </aside>
  );
}
