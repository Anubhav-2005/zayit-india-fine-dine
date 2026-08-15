import { ArrowUpRight } from "lucide-react";

import { DeferredGallerySwiper } from "@/components/gallery/deferred-gallery-swiper";
import { DeferredInstagramPreview } from "@/components/gallery/deferred-instagram-preview";
import { VirtualTourPlaceholder } from "@/components/gallery/virtual-tour-placeholder";
import { AssetRightsNotice } from "@/components/shared/asset-rights-notice";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { galleryAssets } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import { assetPath } from "@/lib/paths";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Gallery",
  description:
    "Explore owner-supplied photographs of Zayit India Fine Dine’s bright interiors, long table and Jaisalmer setting. No AI-generated or traveller imagery.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Gallery · Owner-supplied photography"
        title="The room,"
        accent="frame by frame."
        description="Bright interiors, the long table, architectural details and the Golden Fort—shown through real restaurant files supplied for this website."
        meta="No AI-generated or traveller photography"
        image={{
          src: assetPath("/images/owner/zayit-room-wide.jpg"),
          alt: "Zayit India Fine Dine's bright dining room and long table",
        }}
      />

      <section className="overflow-hidden px-5 py-16 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.55fr] lg:items-end">
            <SectionHeading
              index="01"
              eyebrow="The visual chapters"
              title="Move through"
              accent="the evening."
              description="Use the arrow controls, keyboard keys or swipe gesture. The gallery does not autoplay."
            />
            <a
              className="rule-link lg:justify-self-end"
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              View official Instagram
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
          <div className="mt-16">
            <DeferredGallerySwiper assets={galleryAssets} />
          </div>
          <div className="mt-8">
            <AssetRightsNotice />
          </div>
        </div>
      </section>

      <DeferredInstagramPreview className="bg-sand" />
      <VirtualTourPlaceholder />

      <CtaBand
        eyebrow="See it in person"
        title="The best frame is the table itself."
      />
    </main>
  );
}
