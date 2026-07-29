import { InquiryForm } from "@/components/forms/inquiry-form";
import { CtaBand } from "@/components/shared/cta-band";
import { OwnerNotice } from "@/components/shared/owner-notice";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { createPageMetadata } from "@/lib/metadata";

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
        description="This page starts a conversation without claiming a private room, fixed capacity, exclusive terrace or package that has not been publicly verified."
        meta="Availability and terms require owner confirmation"
      />

      <section className="px-5 py-24 sm:px-8 md:py-32 lg:px-12">
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
                <h2 className="mt-10 font-serif text-4xl font-normal tracking-[-0.045em]">
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
            title="Private dining is an enquiry, not a published guarantee."
          >
            The owner must confirm capacity, room or terrace exclusivity,
            minimum spend, deposits, cancellation terms, accessibility,
            parking, AV facilities, group menus and service hours before these
            can appear as promises.
          </OwnerNotice>
        </div>
      </section>

      <section className="bg-sand px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <SectionHeading
            index="02"
            eyebrow="Begin the conversation"
            title="Describe the"
            accent="gathering."
            description="The form prepares an email request. Nothing is booked until the restaurant confirms directly."
          />
          <InquiryForm kind="private-dining" />
        </div>
      </section>

      <CtaBand
        eyebrow="Prefer to speak"
        title="Some evenings are easier to plan by phone."
      />
    </main>
  );
}
