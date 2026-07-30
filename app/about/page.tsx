import Link from "next/link";

import { EditorialImage } from "@/components/gallery/editorial-image";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/shared/cta-band";
import { OwnerNotice } from "@/components/shared/owner-notice";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { SourceStamp } from "@/components/shared/source-stamp";
import { Button } from "@/components/ui/button";
import { galleryAssets, reviewThemes } from "@/lib/content";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "The verified public story behind Zayit India Fine Dine: an Indian and Mediterranean identity near Jaisalmer Fort, grounded in warm hospitality and a generous table.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="About Zayit"
        title="An olive"
        accent="in the desert."
        description="“Zayit” means olive in Hebrew. The restaurant’s public identity joins an Indian kitchen with Mediterranean ease in the Golden City."
        meta="Jaisalmer · Rajasthan · India"
      />

      <section className="px-5 py-16 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="editorial-grid gap-y-12">
            <Reveal className="col-span-12 lg:col-span-8">
              <SectionHeading
                index="01"
                eyebrow="The public story"
                title="Rooted here."
                accent="Open to elsewhere."
              />
            </Reveal>
            <div className="col-span-12 space-y-6 text-sm leading-8 text-muted md:text-base lg:col-span-4 lg:pt-24">
              <p>
                The brand’s archived first-party story described an
                Indian–Mediterranean meeting point. Its current public menu is
                broad, but the clearest through-line remains Indian: tandoor
                starters, paneer, lentils, curries, breads and biryani.
              </p>
              <p>
                Rather than invent a founding legend, this website stays with
                what can be verified: the meaning of the name, the cuisine
                identity, the Fort Road setting and the hospitality themes
                guests repeatedly describe.
              </p>
            </div>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-12 md:gap-7">
            <EditorialImage
              asset={galleryAssets[2]}
              index={1}
              className="col-span-2 [&>div]:min-h-[25rem] md:col-span-7 md:[&>div]:min-h-[40rem]"
              sizes="(max-width: 767px) 92vw, 56vw"
            />
            <EditorialImage
              asset={galleryAssets[0]}
              index={2}
              className="col-span-2 [&>div]:min-h-[19rem] md:col-span-5 md:mt-20 md:[&>div]:min-h-[32rem]"
              sizes="(max-width: 767px) 92vw, 38vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-sand px-5 py-16 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading
            index="02"
            eyebrow="What guests consistently describe"
            title="Hospitality,"
            accent="without invention."
          />
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {reviewThemes.map((theme) => (
              <article
                key={theme.number}
                className="border-t border-foreground/20 pt-7"
              >
                <span className="text-[0.6rem] font-semibold tracking-[0.15em] text-accent">
                  {theme.number}
                </span>
                <h2 className="mt-10 font-serif text-4xl font-normal leading-[0.9] tracking-[-0.045em]">
                  {theme.title}
                </h2>
                <p className="pretty-copy mt-5 text-sm leading-7 text-muted">
                  {theme.copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-2">
          <OwnerNotice title="The founder story needs the owner’s voice.">
            Supply the founder or owner’s approved name, a concise origin story,
            an original portrait and evidence for any milestones or awards.
            Until then, no biography is presented as fact.
          </OwnerNotice>
          <OwnerNotice title="The chef story is waiting for its signature.">
            No current chef name or biography could be verified from a
            first-party source. Supply the chef’s full name, exact title, an
            80–120 word biography, career highlights and an original portrait.
          </OwnerNotice>
        </div>
        <div className="mx-auto mt-12 flex max-w-[1500px] flex-wrap gap-3">
          <Button asChild>
            <Link href="/menu">Explore the current menu</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/gallery">See the owner-supplied gallery</Link>
          </Button>
        </div>
      </section>

      <SourceStamp />
      <CtaBand />
    </main>
  );
}
