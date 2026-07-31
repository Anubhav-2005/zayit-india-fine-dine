"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import type { InquiryKind } from "@/components/forms/inquiry-form";
import { cn } from "@/lib/utils";

const InquiryForm = dynamic(
  () =>
    import("@/components/forms/inquiry-form").then(
      (module) => module.InquiryForm,
    ),
  { ssr: false },
);

export function DeferredInquiryForm({
  kind,
  className,
}: {
  kind: InquiryKind;
  className?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || ready) return;

    const Observer = (
      window as Window & {
        IntersectionObserver?: typeof IntersectionObserver;
      }
    ).IntersectionObserver;

    if (!Observer) {
      const frameId = window.requestAnimationFrame(() => setReady(true));
      return () => window.cancelAnimationFrame(frameId);
    }

    const observer = new Observer(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setReady(true);
        observer.disconnect();
      },
      { rootMargin: "180px 0px", threshold: 0.01 },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [ready]);

  return (
    <div ref={frameRef} className={className}>
      {ready ? (
        <InquiryForm kind={kind} />
      ) : (
        <div
          role="status"
          aria-live="polite"
          className="min-h-[38rem] border border-foreground/16 p-6 md:p-9"
        >
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-accent">
            Online request form
          </p>
          <p className="mt-5 max-w-lg font-serif text-[1.75rem] leading-[1.04] tracking-[-0.035em] md:text-3xl md:leading-none md:tracking-[-0.04em]">
            Ready as you reach this chapter.
          </p>
          <p className="mt-5 max-w-lg text-sm leading-7 text-muted">
            The validated form loads just before it enters view. It prepares an
            email in your own app and never confirms a booking automatically.
          </p>
          <button
            type="button"
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full border border-foreground px-5 text-[0.62rem] font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-foreground hover:text-background"
            onClick={() => setReady(true)}
          >
            Load online request form
          </button>
          <div className="mt-12 grid gap-9" aria-hidden="true">
            {[1, 2, 3, 4].map((line) => (
              <span
                key={line}
                className={cn(
                  "block h-12 animate-pulse border-b border-foreground/20 motion-reduce:animate-none",
                  line === 4 && "h-24",
                )}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
