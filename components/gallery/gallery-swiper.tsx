"use client";

import Image from "next/image";
import { A11y, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import type { MediaAsset } from "@/lib/content";

export function GallerySwiper({ assets }: { assets: MediaAsset[] }) {
  return (
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
              <div className="relative h-[62svh] min-h-[32rem] overflow-hidden bg-olive">
                <Image
                  src={asset.src}
                  alt={asset.alt}
                  fill
                  sizes="(max-width: 767px) 92vw, (max-width: 1199px) 60vw, 44vw"
                  className="image-wash object-cover object-center"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between border-b border-foreground/20 pb-3 text-[0.6rem] font-semibold uppercase tracking-[0.15em]">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{asset.label}</span>
              </figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
