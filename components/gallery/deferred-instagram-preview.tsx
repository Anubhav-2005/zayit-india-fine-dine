"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Camera } from "lucide-react";

import { cn } from "@/lib/utils";

const InstagramPreview = dynamic(
  () =>
    import("@/components/gallery/instagram-preview").then(
      (module) => module.InstagramPreview,
    ),
  { ssr: false },
);

export function DeferredInstagramPreview({
  className,
}: {
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
      { rootMargin: "120px 0px", threshold: 0.01 },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [ready]);

  return (
    <div ref={frameRef}>
      {ready ? (
        <InstagramPreview className={className} />
      ) : (
        <section
          className={cn(
            "grid min-h-[38rem] place-items-center bg-background px-5 py-16 text-center sm:px-8 md:min-h-[48rem] md:py-28 lg:px-12",
            className,
          )}
          aria-labelledby="instagram-preview-loader-title"
        >
          <div className="max-w-2xl">
            <Camera
              aria-hidden="true"
              className="mx-auto size-6 text-accent"
            />
            <p className="mt-8 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-accent">
              Inside Zayit · owner supplied
            </p>
            <h2
              id="instagram-preview-loader-title"
              className="mt-5 font-serif text-[2.1rem] font-normal leading-none tracking-[-0.04em] md:mt-6 md:text-6xl md:leading-[0.9] md:tracking-[-0.05em]"
            >
              The visual journal waits just below.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-muted">
              Owner-supplied restaurant photography loads only when this
              chapter enters view. It is an editorial gallery, never a
              simulated live Instagram feed.
            </p>
            <button
              type="button"
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-foreground px-5 text-[0.62rem] font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-foreground hover:text-background"
              onClick={() => setReady(true)}
            >
              Load the visual journal
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
