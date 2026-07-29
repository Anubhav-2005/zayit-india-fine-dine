import Link from "next/link";
import { ArrowUpRight, BadgeCheck, ChefHat, Sparkles } from "lucide-react";

import { guestMentionedDishes } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const deskCards = [
  {
    eyebrow: "Today’s special",
    title: "Ask what arrived in the kitchen today.",
    copy: "Zayit does not currently publish a dependable same-day special online. Call or message for tonight’s kitchen update.",
    icon: Sparkles,
    href: siteConfig.phoneHref,
    action: "Call for today’s special",
    external: false,
  },
  {
    eyebrow: "Chef recommendations",
    title: "The chef’s edit awaits an owner-approved selection.",
    copy: "The current chef identity and personal recommendations are not verified in public first-party information. This card is ready for the owner’s original profile and choices.",
    icon: ChefHat,
    href: "/about",
    action: "See the chef asset brief",
    external: false,
  },
  {
    eyebrow: "Signature dishes",
    title: "Guest favourites, clearly separated from sales claims.",
    copy: `${guestMentionedDishes.slice(1, 4).join(", ")} recur in public guest feedback. They are not presented as signatures or best sellers without owner or POS confirmation.`,
    icon: BadgeCheck,
    href: "/menu",
    action: "Explore the public menu",
    external: false,
  },
] as const;

export function KitchenDesk() {
  return (
    <section className="bg-olive px-5 py-24 text-ivory sm:px-8 md:py-32 lg:px-12">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-10 border-b border-white/18 pb-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-gold-light">
            The kitchen desk
          </p>
          <h2 className="display-balance max-w-5xl font-serif text-[clamp(3rem,6vw,6.8rem)] font-normal leading-[0.86] tracking-[-0.06em]">
            What is known.
            <br />
            <em className="font-normal text-gold-light">
              What still needs the chef.
            </em>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3">
          {deskCards.map((card, index) => {
            const Icon = card.icon;
            const content = (
              <>
                <div className="flex items-center justify-between">
                  <Icon aria-hidden="true" className="size-5 text-gold-light" />
                  <span className="text-[0.56rem] tracking-[0.15em] text-ivory/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-20">
                  <p className="text-[0.59rem] font-semibold uppercase tracking-[0.16em] text-gold-light">
                    {card.eyebrow}
                  </p>
                  <h3 className="mt-5 font-serif text-4xl font-normal leading-[0.9] tracking-[-0.045em]">
                    {card.title}
                  </h3>
                  <p className="pretty-copy mt-5 text-sm leading-7 text-ivory/62">
                    {card.copy}
                  </p>
                  <span className="rule-link dark-rule-link mt-7">
                    {card.action}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </span>
                </div>
              </>
            );

            return card.href.startsWith("/") ? (
              <Link
                key={card.eyebrow}
                href={card.href}
                className="group min-h-[33rem] border-b border-white/18 py-9 transition-colors hover:bg-white/4 focus-visible:bg-white/4 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                {content}
              </Link>
            ) : (
              <a
                key={card.eyebrow}
                href={card.href}
                className="group min-h-[33rem] border-b border-white/18 py-9 transition-colors hover:bg-white/4 focus-visible:bg-white/4 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
