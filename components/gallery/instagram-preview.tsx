import Image from "next/image";
import { ArrowUpRight, Camera } from "lucide-react";

import { galleryAssets } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type InstagramPreviewProps = {
  className?: string;
};

const editorialLayouts = [
  "col-span-2 row-span-2 min-h-[28rem] md:col-span-5 md:min-h-[40rem]",
  "col-span-1 min-h-56 md:col-span-4 md:min-h-0",
  "col-span-1 min-h-56 md:col-span-3 md:min-h-0",
  "col-span-2 min-h-72 md:col-span-3 md:min-h-0",
  "col-span-1 min-h-56 md:col-span-4 md:min-h-0",
  "col-span-1 min-h-56 md:col-span-5 md:min-h-0",
] as const;

/**
 * A curated editorial view of owner-supplied restaurant photography. This is
 * intentionally static: a live Instagram API is not implied.
 */
export function InstagramPreview({ className }: InstagramPreviewProps) {
  const previewAssets = galleryAssets.slice(0, editorialLayouts.length);

  return (
    <section
      aria-labelledby="instagram-preview-title"
      className={cn(
        "overflow-hidden bg-background px-5 py-16 sm:px-8 md:py-28 lg:px-12",
        className,
      )}
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-10 border-t border-foreground/20 pt-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <p className="flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.19em] text-accent">
              <Camera aria-hidden="true" className="size-4" />
              Inside Zayit · Owner supplied
            </p>
            <h2
              id="instagram-preview-title"
              className="display-balance mt-7 max-w-5xl font-serif text-[clamp(3.2rem,7vw,7.5rem)] font-normal leading-[0.82] tracking-[-0.065em] text-foreground"
            >
              The visual
              <br />
              <em className="font-normal text-accent">journal.</em>
            </h2>
          </div>

          <div className="lg:justify-self-end lg:text-right">
            <p className="pretty-copy max-w-lg text-sm leading-7 text-muted md:text-base md:leading-8">
              Authentic restaurant and Jaisalmer photographs supplied for this
              website, with the official profile one tap away.
            </p>
            <a
              className="rule-link mt-7"
              href={siteConfig.instagram}
              target="_blank"
              rel="noreferrer"
            >
              Visit the official profile
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-2 md:h-[48rem] md:grid-cols-12 md:grid-rows-2 md:gap-3">
          {previewAssets.map((asset, index) => (
            <figure
              key={asset.src}
              className={cn(
                "group relative isolate h-full overflow-hidden bg-olive",
                editorialLayouts[index],
              )}
            >
              <Image
                src={asset.src}
                alt={asset.alt}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 767px) 100vw, 42vw"
                    : "(max-width: 767px) 50vw, 34vw"
                }
                className="image-wash object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-black/70 via-black/5 to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 text-ivory md:p-5">
                <span className="text-[0.58rem] font-semibold uppercase tracking-[0.16em]">
                  {asset.label}
                </span>
                <span
                  aria-hidden="true"
                  className="font-serif text-2xl leading-none text-gold-light"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <aside
          aria-label="Owner-supplied photography notice"
          className="mt-5 grid gap-3 border border-foreground/20 bg-sand/55 p-5 text-sm leading-7 text-muted md:grid-cols-[auto_1fr] md:gap-6 md:p-7"
        >
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-accent">
            Photography status
          </p>
          <p className="pretty-copy max-w-5xl">
            These are owner-supplied restaurant files, not traveller or
            AI-generated images. The restaurant should retain photographer
            permissions and uncompressed masters. This editorial grid is not
            presented as a live Instagram API feed.
          </p>
        </aside>
      </div>
    </section>
  );
}
