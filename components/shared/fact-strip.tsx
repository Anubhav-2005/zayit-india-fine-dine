import { siteConfig } from "@/lib/site";

const facts = [
  {
    label: "Google",
    value: "4.8 · 490+ reviews",
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
    <section className="grid border-b border-foreground/15 bg-sand sm:grid-cols-2 xl:grid-cols-4">
      {facts.map((fact) => {
        const content = (
          <>
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-muted group-hover:text-ivory/72 group-focus-visible:text-ivory/72">
              {fact.label}
            </span>
            <strong className="font-serif text-lg font-medium tracking-[-0.02em]">
              {fact.value}
            </strong>
          </>
        );

        return fact.href ? (
          <a
            key={fact.label}
            href={fact.href}
            target={fact.href.startsWith("http") ? "_blank" : undefined}
            rel={fact.href.startsWith("http") ? "noreferrer" : undefined}
            className="group flex min-h-28 flex-col justify-center gap-2 border-b border-r border-foreground/15 px-5 transition-colors hover:bg-olive hover:text-ivory focus-visible:bg-olive focus-visible:text-ivory sm:px-8 xl:border-b-0"
          >
            {content}
          </a>
        ) : (
          <div
            key={fact.label}
            className="flex min-h-28 flex-col justify-center gap-2 border-b border-r border-foreground/15 px-5 sm:px-8 xl:border-b-0"
          >
            {content}
          </div>
        );
      })}
    </section>
  );
}
