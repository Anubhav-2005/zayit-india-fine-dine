import { StarRating } from "@/components/shared/star-rating";
import { siteConfig } from "@/lib/site";

const facts = [
  {
    label: "Google",
    value: "4.8 · 490+ reviews",
    rating: 4.8,
    href: siteConfig.maps,
  },
  {
    label: "Service",
    value: "Daily · 11 AM–12:30 AM*",
  },
  {
    label: "Reservations",
    value: siteConfig.phoneDisplay,
    href: siteConfig.phoneHref,
  },
  {
    label: "Find us",
    value: "First floor · Fort Parking Road",
    href: siteConfig.directions,
  },
];

export function FactStrip() {
  return (
    <section className="grid grid-cols-2 border-b border-foreground/15 bg-sand xl:grid-cols-4">
      {facts.map((fact) => {
        const content = (
          <>
            <span className="text-[0.55rem] font-semibold uppercase tracking-[0.15em] text-muted sm:text-[0.58rem] sm:tracking-[0.18em]">
              {fact.label}
            </span>
            <strong className="font-serif text-base font-medium tracking-[-0.02em] sm:text-lg">
              {fact.value}
            </strong>
            {"rating" in fact && fact.rating ? (
              <StarRating value={fact.rating} size="sm" />
            ) : null}
          </>
        );

        return fact.href ? (
          <a
            key={fact.label}
            href={fact.href}
            target={fact.href.startsWith("http") ? "_blank" : undefined}
            rel={fact.href.startsWith("http") ? "noreferrer" : undefined}
            className="group flex min-h-32 flex-col justify-center gap-2 border-b border-r border-foreground/15 px-4 transition-colors hover:bg-ivory focus-visible:bg-ivory sm:px-8 xl:border-b-0"
          >
            {content}
          </a>
        ) : (
          <div
            key={fact.label}
            className="flex min-h-32 flex-col justify-center gap-2 border-b border-r border-foreground/15 px-4 sm:px-8 xl:border-b-0"
          >
            {content}
          </div>
        );
      })}
    </section>
  );
}
