import { ArrowUpRight } from "lucide-react";

import { GallerySwiper } from "@/components/gallery/gallery-swiper";
import { AssetRightsNotice } from "@/components/shared/asset-rights-notice";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { galleryAssets } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Gallery",
  description:
    "A cinematic private-preview gallery of Zayit India Fine Dine’s spaces, tables, kitchen and dishes, using real public-profile reference crops and no AI-generated images.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Gallery · Private design preview"
        title="A night,"
        accent="frame by frame."
        description="Dining spaces, the table, live fire and plates—shown through real public-profile reference crops while owner-original exports are prepared."
        meta="No AI-generated or traveller photography"
      />

      <section className="overflow-hidden px-5 py-24 sm:px-8 md:py-32 lg:px-12">
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
              rel="noreferrer"
            >
              View official Instagram
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
          <div className="mt-16">
            <GallerySwiper assets={galleryAssets} />
          </div>
          <div className="mt-8">
            <AssetRightsNotice />
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="See it in person"
        title="The best frame is the table itself."
      />
    </main>
  );
}
