import type { MenuCategory } from "@/lib/content";
import { cn } from "@/lib/utils";

type MenuCategoryCardProps = {
  category: MenuCategory;
  index: number;
  compact?: boolean;
  headingLevel?: 2 | 3;
  className?: string;
};

export function MenuCategoryCard({
  category,
  index,
  compact = false,
  headingLevel = 3,
  className,
}: MenuCategoryCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article
      id={category.id}
      className={cn(
        "scroll-mt-28 border-t border-foreground/20 py-7 md:py-9",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-muted">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>{category.eyebrow}</span>
      </div>
      <Heading className="mt-8 font-serif text-4xl font-normal leading-[0.9] tracking-[-0.045em] md:text-5xl">
        {category.title}
      </Heading>
      <p className="mt-4 max-w-sm text-xs leading-6 text-muted">
        {category.description}
      </p>
      <ul className="mt-7">
        {category.items.slice(0, compact ? 5 : undefined).map((item) => (
          <li
            key={item}
            className="border-t border-foreground/12 py-3 text-sm text-foreground/86"
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
