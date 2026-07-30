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
    <header
      className={cn("section-heading", className)}
      data-theme={theme}
    >
      <div className="section-heading__kicker">
        {index ? <span aria-hidden="true">{index}</span> : null}
        <span className="h-px w-8 bg-current" aria-hidden="true" />
        <p>{eyebrow}</p>
      </div>
      <h2 className="section-heading__title">
        {title}
        {accent ? (
          <>
            <br />
            <em>{accent}</em>
          </>
        ) : null}
      </h2>
      {description ? (
        <p className="section-heading__description">{description}</p>
      ) : null}
    </header>
  );
}
