"use client";

import { useEffect, useState } from "react";

function getJaisalmerTime() {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
}

export function LocalTimeStatus() {
  const [time, setTime] = useState<string>();

  useEffect(() => {
    const initial = window.setTimeout(() => setTime(getJaisalmerTime()), 0);
    const interval = window.setInterval(() => setTime(getJaisalmerTime()), 60000);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 text-ivory">
      <span
        className="relative size-2 rounded-full bg-gold-light before:absolute before:-inset-2 before:rounded-full before:border before:border-gold-light/35"
        aria-hidden="true"
      />
      <p className="m-0 text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
        Daily service
        <span className="mt-1 block text-[0.62rem] font-normal normal-case tracking-[0.05em] text-ivory/70">
          {time ? `Local time ${time}` : "Jaisalmer, India"}
        </span>
      </p>
    </div>
  );
}
