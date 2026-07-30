import Link from "next/link";
import { ArrowUpRight, BadgeCheck, ChefHat, Sparkles } from "lucide-react";

import { guestMentionedDishes } from "@/lib/content";
import { siteConfig } from "@/lib/site";

const deskCards = [
  {
    eyebrow: "Today’s special",
    title: "Ask what the kitchen is serving tonight.",
    copy: "The day’s special changes with the kitchen. Call or message before you arrive for tonight’s recommendation.",
    icon: Sparkles,
    href: siteConfig.phoneHref,
    action: "Call for today’s special",
    external: false,
  },
  {
    eyebrow: "Chef recommendations",
    title: "Let the table guide the order.",
    copy: "Tell the team what you enjoy—vegetarian or non-vegetarian, mild or fiery—and ask them to shape a spread for the table.",
    icon: ChefHat,
    href: "/about",
    action: "Meet the restaurant",
    external: false,
  },
  {
    eyebrow: "Guest favourites",
    title: "A few names guests return to.",
    copy: `${guestMentionedDishes.slice(1, 4).join(", ")} are among the dishes mentioned in public guest reviews. Availability can change, so call if you have one in mind.`,
    icon: BadgeCheck,
    href: "/menu",
    action: "Explore the public menu",
    external: false,
  },
] as const;

export function KitchenDesk() {
  return (
    <section className="overflow-hidden bg-sand px-5 py-16 text-foreground sm:px-8 md:py-28 lg:px-12">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 border-b border-foreground/18 pb-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:pb-12">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-accent">
            The kitchen desk
          </p>
          <h2 className="display-balance max-w-5xl font-serif text-[clamp(2.3rem,9.5vw,2.7rem)] font-normal leading-none tracking-[-0.04em] md:text-[clamp(3.75rem,4.8vw,5.5rem)] md:leading-[0.9] md:tracking-[-0.05em]">
            Begin with curiosity.
            <br />
            <em className="font-normal text-accent">
              Let the table unfold.
            </em>
          </h2>
        </div>

        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pt-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-0 lg:overflow-visible lg:px-0 lg:pt-0">
          {deskCards.map((card, index) => {
            const Icon = card.icon;
            const content = (
              <>
                <div className="flex items-center justify-between">
                  <Icon aria-hidden="true" className="size-5 text-accent" />
                  <span className="text-[0.56rem] tracking-[0.15em] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-14 lg:mt-20">
                  <p className="text-[0.59rem] font-semibold uppercase tracking-[0.16em] text-accent">
                    {card.eyebrow}
                  </p>
                  <h3 className="mt-5 font-serif text-[1.75rem] font-normal leading-[1.02] tracking-[-0.035em] md:text-4xl md:leading-[0.94] md:tracking-[-0.045em]">
                    {card.title}
                  </h3>
                  <p className="pretty-copy mt-5 text-sm leading-7 text-muted">
                    {card.copy}
                  </p>
                  <span className="rule-link mt-7">
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
                className="group min-h-[25rem] w-full shrink-0 snap-start border border-foreground/16 bg-ivory p-6 transition-colors hover:bg-ivory focus-visible:bg-ivory sm:w-[58vw] lg:min-h-[31rem] lg:w-auto lg:max-w-none lg:border-y-0 lg:border-l-0 lg:border-r lg:bg-transparent lg:px-8 lg:py-9 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                {content}
              </Link>
            ) : (
              <a
                key={card.eyebrow}
                href={card.href}
                className="group min-h-[25rem] w-full shrink-0 snap-start border border-foreground/16 bg-ivory p-6 transition-colors hover:bg-ivory focus-visible:bg-ivory sm:w-[58vw] lg:min-h-[31rem] lg:w-auto lg:max-w-none lg:border-y-0 lg:border-l-0 lg:border-r lg:bg-transparent lg:px-8 lg:py-9 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
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
