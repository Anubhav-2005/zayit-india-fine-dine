import { EditorialImage } from "@/components/gallery/editorial-image";
import { DeferredInquiryForm } from "@/components/forms/deferred-inquiry-form";
import { CtaBand } from "@/components/shared/cta-band";
import { OwnerNotice } from "@/components/shared/owner-notice";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { createPageMetadata } from "@/lib/metadata";
import { galleryAssets } from "@/lib/content";
import { assetPath } from "@/lib/paths";

export const metadata = createPageMetadata({
  title: "Private Dining",
  description:
    "Discuss a private gathering with Zayit India Fine Dine. This enquiry page clearly separates planning questions from unverified venue guarantees.",
  path: "/private-dining",
});

const planningQuestions = [
  {
    number: "01",
    title: "The occasion",
    copy: "Share the reason for gathering, preferred date and the pace you want for the meal.",
  },
  {
    number: "02",
    title: "The table",
    copy: "Give an approximate guest count and ask which current space, if any, can suit the group.",
  },
  {
    number: "03",
    title: "The menu",
    copy: "Discuss service style, dietary questions and current dishes directly with the restaurant.",
  },
];

export default function PrivateDiningPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Private dining enquiries"
        title="Gather close."
        accent="Plan clearly."
        description="Begin a conversation about a birthday, family meal or intimate gathering near the fort."
        meta="Availability and arrangements confirmed directly by Zayit"
        image={{
          src: assetPath("/images/owner/zayit-table-window.avif"),
          alt: "The long dining table prepared for a gathering at Zayit",
        }}
      />

      <section className="px-5 py-16 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <SectionHeading
            index="01"
            eyebrow="A useful first conversation"
            title="Three things"
            accent="to bring."
          />
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {planningQuestions.map((item) => (
              <article
                key={item.number}
                className="border-t border-foreground/20 pt-7"
              >
                <span className="text-[0.6rem] font-semibold tracking-[0.15em] text-accent">
                  {item.number}
                </span>
                <h2 className="mt-8 font-serif text-[1.9rem] font-normal leading-[1.02] tracking-[-0.035em] md:mt-10 md:text-4xl md:leading-[0.94] md:tracking-[-0.045em]">
                  {item.title}
                </h2>
                <p className="pretty-copy mt-5 text-sm leading-7 text-muted">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
          <OwnerNotice
            className="mt-16"
            title="A gathering begins with a conversation."
          >
            Ask Zayit to confirm the best available space, guest capacity,
            menus, accessibility, parking, deposits and cancellation terms for
            your date.
          </OwnerNotice>

          <div className="mt-12 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-12 md:gap-7">
            <EditorialImage
              asset={galleryAssets[1]}
              index={1}
              className="col-span-1 [&>div]:min-h-[22rem] md:col-span-5 md:[&>div]:min-h-[38rem]"
              sizes="(max-width: 767px) 46vw, 38vw"
            />
            <EditorialImage
              asset={galleryAssets[3]}
              index={2}
              className="col-span-1 [&>div]:min-h-[22rem] md:col-span-7 md:mt-24 md:[&>div]:min-h-[34rem]"
              sizes="(max-width: 767px) 46vw, 56vw"
            />
          </div>
        </div>
      </section>

      <section className="bg-sand px-5 py-16 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <SectionHeading
            index="02"
            eyebrow="Begin the conversation"
            title="Describe the"
            accent="gathering."
            description="The form prepares an email request. Nothing is booked until the restaurant confirms directly."
          />
          <DeferredInquiryForm kind="private-dining" />
        </div>
      </section>

      <CtaBand
        eyebrow="Prefer to speak"
        title="Some evenings are easier to plan by phone."
      />
    </main>
  );
}
