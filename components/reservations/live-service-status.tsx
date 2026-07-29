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
    <aside className="relative isolate overflow-hidden bg-olive p-7 text-ivory md:p-10">
      <div
        className="absolute -right-24 -top-24 -z-10 size-72 rounded-full border border-gold/20"
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.17em] text-gold-light">
            Live service status
          </p>
          <h2 className="mt-5 max-w-xl font-serif text-4xl font-normal leading-[0.9] tracking-[-0.045em] md:text-5xl">
            {snapshot
              ? isOpen
                ? "Inside the published service window."
                : "Between published services."
              : "Checking Jaisalmer time…"}
          </h2>
        </div>
        <span
          className="relative mt-1 grid size-11 shrink-0 place-items-center rounded-full border border-gold-light/35"
          aria-hidden="true"
        >
          <Clock3 className="size-4 text-gold-light" />
          {snapshot ? (
            <span
              className={`absolute right-0 top-0 size-2.5 rounded-full ${
                isOpen ? "bg-emerald-400" : "bg-gold"
              }`}
            />
          ) : null}
        </span>
      </div>

      <div className="mt-10 grid gap-5 border-t border-white/18 pt-6 sm:grid-cols-2">
        <div>
          <p className="text-[0.56rem] uppercase tracking-[0.14em] text-ivory/52">
            Jaisalmer now
          </p>
          <p className="mt-2 font-serif text-2xl">
            {snapshot?.time ?? "Asia / Kolkata"}
          </p>
        </div>
        <div>
          <p className="text-[0.56rem] uppercase tracking-[0.14em] text-ivory/52">
            Published first-party hours
          </p>
          <p className="mt-2 font-serif text-2xl">{siteConfig.hours.compact}</p>
        </div>
      </div>

      <p className="pretty-copy mt-6 max-w-2xl text-xs leading-6 text-ivory/62">
        This live clock reflects the published service window, not real-time
        table inventory. A table is available only when the restaurant confirms
        your request.
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        <a
          href={siteConfig.phoneHref}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gold bg-gold px-5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-olive transition-colors hover:bg-gold-light"
        >
          <Phone aria-hidden="true" className="size-4" />
          Check by phone
        </a>
        <a
          href={siteConfig.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-white hover:text-olive"
        >
          <MessageCircle aria-hidden="true" className="size-4" />
          Request on WhatsApp
        </a>
      </div>
    </aside>
  );
}
