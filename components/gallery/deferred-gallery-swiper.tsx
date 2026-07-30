"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Expand } from "lucide-react";

import type { MediaAsset } from "@/lib/content";

const GallerySwiper = dynamic(
  () =>
    import("@/components/gallery/gallery-swiper").then(
      (module) => module.GallerySwiper,
    ),
  { ssr: false },
);

export function DeferredGallerySwiper({ assets }: { assets: MediaAsset[] }) {
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
      { rootMargin: "80px 0px", threshold: 0.01 },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [ready]);

  const firstAsset = assets[0];

  return (
    <div ref={frameRef}>
      {ready ? (
        <GallerySwiper assets={assets} />
      ) : (
        <figure className="group overflow-hidden pb-12">
          <div className="relative h-[54svh] min-h-[26rem] overflow-hidden bg-olive md:h-[62svh] md:min-h-[32rem]">
            <Image
              src={firstAsset.src}
              alt={firstAsset.alt}
              fill
              sizes="92vw"
              style={{ objectPosition: firstAsset.objectPosition }}
              className="image-wash object-cover object-center"
            />
            <span className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full border border-white/35 bg-olive/75 text-gold-light backdrop-blur-md">
              <Expand aria-hidden="true" className="size-4" />
            </span>
          </div>
          <figcaption className="mt-4 flex items-center justify-between border-b border-foreground/20 pb-3 text-[0.6rem] font-semibold uppercase tracking-[0.15em]">
            <span>01</span>
            <span>Scroll to enter the full gallery</span>
          </figcaption>
        </figure>
      )}
    </div>
  );
}
