import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  theme?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  description,
  theme = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-5xl", className)}>
      <div
        className={cn(
          "flex items-center gap-4 text-[0.62rem] font-semibold uppercase tracking-[0.19em]",
          theme === "dark" ? "text-gold-light" : "text-accent",
        )}
      >
        {index ? <span aria-hidden="true">{index}</span> : null}
        <span className="h-px w-8 bg-current" aria-hidden="true" />
        <p>{eyebrow}</p>
      </div>
      <h2
        className={cn(
          "display-balance mt-6 font-serif text-[clamp(2.35rem,10vw,3rem)] font-normal leading-none tracking-[-0.045em] md:mt-8 md:text-[clamp(4.2rem,6.2vw,6.75rem)] md:leading-[0.9] md:tracking-[-0.055em]",
          theme === "dark" ? "text-ivory" : "text-foreground",
        )}
      >
        {title}
        {accent ? (
          <>
            <br />
            <em
              className={cn(
                "font-normal",
                theme === "dark" ? "text-gold-light" : "text-accent",
              )}
            >
              {accent}
            </em>
          </>
        ) : null}
      </h2>
      {description ? (
        <p
          className={cn(
            "pretty-copy mt-7 max-w-xl text-sm leading-7 md:text-base md:leading-8",
            theme === "dark" ? "text-ivory/68" : "text-muted",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
