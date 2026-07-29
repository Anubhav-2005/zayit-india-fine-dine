import { sources } from "@/lib/content";

export function SourceStamp() {
  return (
    <section
      aria-labelledby="source-heading"
      className="border-t border-foreground/15 bg-ivory px-5 py-16 sm:px-8 lg:px-12"
    >
      <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.17em] text-accent">
            Source transparency
          </p>
          <h2
            id="source-heading"
            className="mt-5 font-serif text-4xl font-normal leading-[0.9] tracking-[-0.045em] md:text-5xl"
          >
            Facts checked
            <br />
            July 29, 2026.
          </h2>
        </div>
        <div>
          <p className="pretty-copy max-w-2xl text-sm leading-7 text-muted">
            Business details are cross-checked against live public sources.
            Conflicts are disclosed, changing ratings are date-stamped, and
            owner-only information is never invented.
          </p>
          <ul className="mt-7 grid gap-x-7 border-t border-foreground/20 sm:grid-cols-2">
            {sources.slice(0, 4).map((source) => (
              <li key={source.id} className="border-b border-foreground/20">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-12 items-center justify-between text-[0.62rem] font-semibold uppercase tracking-[0.12em] hover:text-accent"
                >
                  {source.label}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
