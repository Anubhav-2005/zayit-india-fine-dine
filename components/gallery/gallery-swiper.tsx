"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { A11y, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import type { MediaAsset } from "@/lib/content";

export function GallerySwiper({ assets }: { assets: MediaAsset[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const selectedAsset =
    selectedIndex === null ? undefined : assets[selectedIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedIndex === null || !dialog) return;

    if (!dialog.open) dialog.showModal();
    const frame = window.requestAnimationFrame(() =>
      closeButtonRef.current?.focus(),
    );
    return () => window.cancelAnimationFrame(frame);
  }, [selectedIndex]);

  const closeLightbox = () => {
    dialogRef.current?.close();
    setSelectedIndex(null);
  };

  const move = (direction: -1 | 1) => {
    if (selectedIndex === null) return;
    setSelectedIndex(
      (selectedIndex + direction + assets.length) % assets.length,
    );
  };

  return (
    <>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Zayit private-preview image gallery"
        className="overflow-hidden pb-12"
      >
        <Swiper
          modules={[A11y, Keyboard, Navigation, Pagination]}
          slidesPerView={1.08}
          spaceBetween={16}
          navigation
          pagination={{ clickable: true }}
          keyboard={{ enabled: true, onlyInViewport: true }}
          a11y={{
            enabled: true,
            prevSlideMessage: "Previous gallery image",
            nextSlideMessage: "Next gallery image",
            firstSlideMessage: "This is the first gallery image",
            lastSlideMessage: "This is the last gallery image",
            paginationBulletMessage: "Go to gallery image {{index}}",
          }}
          breakpoints={{
            768: {
              slidesPerView: 1.65,
              spaceBetween: 24,
            },
            1200: {
              slidesPerView: 2.2,
              spaceBetween: 32,
            },
          }}
        >
          {assets.map((asset, index) => (
            <SwiperSlide key={`${asset.src}-${index}`}>
              <figure className="group">
                <button
                  type="button"
                  className="relative block h-[62svh] min-h-[32rem] w-full cursor-zoom-in overflow-hidden bg-olive text-left focus-visible:ring-2 focus-visible:ring-gold"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Open ${asset.label} in image lightbox`}
                >
                  <Image
                    src={asset.src}
                    alt={asset.alt}
                    fill
                    sizes="(max-width: 767px) 92vw, (max-width: 1199px) 60vw, 44vw"
                    className="image-wash object-cover object-center"
                  />
                  <span className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full border border-white/35 bg-olive/75 text-gold-light backdrop-blur-md">
                    <Expand aria-hidden="true" className="size-4" />
                  </span>
                </button>
                <figcaption className="mt-4 flex items-center justify-between border-b border-foreground/20 pb-3 text-[0.6rem] font-semibold uppercase tracking-[0.15em]">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{asset.label}</span>
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox-dialog"
        aria-label={
          selectedAsset ? `${selectedAsset.label} image lightbox` : "Image lightbox"
        }
        onClose={() => setSelectedIndex(null)}
        onCancel={(event) => {
          event.preventDefault();
          closeLightbox();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeLightbox();
        }}
      >
        {selectedAsset && selectedIndex !== null ? (
          <div className="relative flex min-h-[100dvh] flex-col p-4 text-ivory md:p-7">
            <div className="flex items-center justify-between gap-5 border-b border-white/16 pb-4">
              <div>
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-gold-light">
                  {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                  {String(assets.length).padStart(2, "0")}
                </p>
                <p className="mt-1 font-serif text-2xl">{selectedAsset.label}</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                className="grid size-11 place-items-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-olive"
                aria-label="Close image lightbox"
                onClick={closeLightbox}
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            <div className="relative my-4 min-h-0 grow">
              <Image
                src={selectedAsset.src}
                alt={selectedAsset.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-white/16 pt-4">
              <button
                type="button"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-white hover:text-olive"
                onClick={() => move(-1)}
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
                Previous
              </button>
              <p className="hidden max-w-xl text-center text-xs text-ivory/54 md:block">
                Private-preview crop · owner-original file required before
                public launch
              </p>
              <button
                type="button"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-white hover:text-olive"
                onClick={() => move(1)}
              >
                Next
                <ChevronRight aria-hidden="true" className="size-4" />
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
