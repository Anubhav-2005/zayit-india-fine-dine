import Image from "next/image";

import type { MediaAsset } from "@/lib/content";
import { cn } from "@/lib/utils";

type EditorialImageProps = {
  asset: MediaAsset;
  index?: number;
  className?: string;
  imageClassName?: string;
  sizes?: string;
};

export function EditorialImage({
  asset,
  index,
  className,
  imageClassName,
  sizes = "(max-width: 768px) 92vw, 40vw",
}: EditorialImageProps) {
  return (
    <figure className={cn("group", className)}>
      <div
        className="relative min-h-96 overflow-hidden bg-olive"
        data-parallax
      >
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes={sizes}
          className={cn(
            "image-wash h-[108%] object-cover object-center",
            imageClassName,
          )}
        />
      </div>
      <figcaption className="mt-4 flex items-center justify-between border-b border-current/20 pb-3 text-[0.58rem] font-semibold uppercase tracking-[0.15em]">
        <span>{index ? String(index).padStart(2, "0") : asset.label}</span>
        <span>{asset.label}</span>
      </figcaption>
    </figure>
  );
}
