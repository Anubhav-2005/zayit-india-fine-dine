import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import { InteriorFilm } from "@/components/gallery/interior-film";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { assetPath } from "@/lib/paths";

const chapters = [
  {
    number: "01",
    eyebrow: "The room",
    title: "Ivory architecture.",
    copy: "Carved details, soft blue seating and daylight give the dining room its calm, unmistakable character.",
    src: "/images/owner/zayit-room-wide.jpg",
    alt: "Wide view of Zayit India Fine Dine's bright ivory dining room",
    position: "50% 50%",
  },
  {
    number: "02",
    eyebrow: "The table",
    title: "Made for gathering.",
    copy: "The long table sits at the heart of Zayit—laid for generous plates, easy conversation and an unhurried evening.",
    src: "/images/owner/zayit-table-window.avif",
    alt: "Zayit's long dining table laid beside tall windows",
    position: "50% 58%",
  },
  {
    number: "03",
    eyebrow: "The setting",
    title: "The fort, close enough to feel.",
    copy: "Step outside and Jaisalmer Fort becomes part of the evening: golden by day, luminous after sunset.",
    src: "/images/owner/zayit-fort-official-daylight-mobile.webp",
    alt: "Jaisalmer Fort seen from the restaurant's bright outdoor setting",
    position: "50% 45%",
  },
] as const;

export function HomeInteriorSequence() {
  return (
    <section
      className="interior-sequence zayit-section"
      aria-labelledby="interior-sequence-title"
      data-interior-sequence
    >
      <div className="zayit-shell">
        <div className="interior-sequence__intro">
          <SectionHeading
            index="02"
            eyebrow="Inside Zayit"
            title="Three moments."
            accent="One memorable table."
            description="Move through the light, the table and the fort-facing setting using photographs supplied by the restaurant."
            className="max-w-4xl"
          />
          <p className="interior-sequence__intro-note">
            A bright, composed room that feels special without ever feeling
            formal.
          </p>
        </div>

        <div className="interior-sequence__stage">
          <div className="interior-sequence__visual-wrap">
            <figure
              className="interior-sequence__visual"
              data-sequence-visual
            >
              {chapters.map((chapter, index) => (
                <Image
                  key={chapter.src}
                  src={assetPath(chapter.src)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 58vw, 1px"
                  className="interior-sequence__image"
                  style={{ objectPosition: chapter.position }}
                  aria-hidden="true"
                  data-sequence-image
                  data-active={index === 0 ? "true" : "false"}
                />
              ))}
              <figcaption className="interior-sequence__visual-caption">
                <span>Owner-supplied photography</span>
                <span>Jaisalmer · Rajasthan</span>
              </figcaption>
            </figure>
          </div>

          <ol className="interior-sequence__steps">
            {chapters.map((chapter) => (
              <li
                key={chapter.number}
                className="interior-sequence__step"
                data-sequence-step
              >
                <div className="interior-sequence__mobile-image" data-reveal="image">
                  <Image
                    src={assetPath(chapter.src)}
                    alt={chapter.alt}
                    fill
                    sizes="(max-width: 1023px) 92vw, 1px"
                    className="object-cover"
                    style={{ objectPosition: chapter.position }}
                  />
                </div>
                <div className="interior-sequence__step-copy" data-reveal="heading">
                  <div className="interior-sequence__step-meta">
                    <span>{chapter.number}</span>
                    <span aria-hidden="true" />
                    <p>{chapter.eyebrow}</p>
                  </div>
                  <h3>{chapter.title}</h3>
                  <p>{chapter.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="interior-sequence__film-grid">
          <div className="interior-sequence__film-copy" data-reveal="heading">
            <p className="interior-sequence__film-kicker">
              <Play aria-hidden="true" className="size-3.5" />
              A quiet look inside
            </p>
            <h3>
              Let the room
              <br />
              <em>move for a moment.</em>
            </h3>
            <p>
              This short, owner-supplied film plays only when you choose. No
              soundtrack and no autoplay—just the room as it is.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/gallery">
                  Explore the gallery
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/reservations">Plan a visit</Link>
              </Button>
            </div>
          </div>
          <div data-reveal="image">
            <InteriorFilm />
          </div>
        </div>
      </div>
    </section>
  );
}
