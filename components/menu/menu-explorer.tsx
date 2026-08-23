"use client";

import { useId, useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import { menuCategories, type MenuCategory } from "@/lib/content";
import { cn } from "@/lib/utils";

type MenuExplorerProps = {
  categories?: readonly MenuCategory[];
  className?: string;
  heading?: string;
  description?: string;
};

function normaliseSearchValue(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en-IN")
    .trim();
}

export function MenuExplorer({
  categories = menuCategories,
                  className,
  heading = "Find your way through the table.",
  description = "Search the current public menu, or settle into one chapter at a time.",
}: MenuExplorerProps) {
  const id = useId();
  const resultsId = `${id}-results`;
  const statusId = `${id}-status`;
  const [query, setQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState("all");

  const totalItemCount = useMemo(
    () => categories.reduce((total, category) => total + category.items.length, 0),
    [categories],
  );

  const categoryNumbers = useMemo(
    () =>
      new Map(
        categories.map((category, index) => [
          category.id,
          String(index + 1).padStart(2, "0"),
        ]),
      ),
    [categories],
  );

  const filteredCategories = useMemo(() => {
    const searchValue = normaliseSearchValue(query);

    return categories
      .filter(
        (category) =>
          activeCategoryId === "all" || category.id === activeCategoryId,
      )
      .map((category) => {
        if (!searchValue) return category;

        const categoryCopy = normaliseSearchValue(
          `${category.eyebrow} ${category.title} ${category.description}`,
        );
        const categoryMatches = categoryCopy.includes(searchValue);
        const items = categoryMatches
          ? category.items
          : category.items.filter((item) =>
              normaliseSearchValue(item).includes(searchValue),
            );

        return { ...category, items };
      })
      .filter((category) => category.items.length > 0);
  }, [activeCategoryId, categories, query]);

  const visibleItemCount = filteredCategories.reduce(
    (total, category) => total + category.items.length,
    0,
  );

  const statusCopy =
    visibleItemCount === 0
      ? "No dishes match these filters."
      : `Showing ${visibleItemCount} ${
          visibleItemCount === 1 ? "dish" : "dishes"
        } across ${filteredCategories.length} ${
          filteredCategories.length === 1 ? "collection" : "collections"
        }.`;

  const resetExplorer = () => {
    setQuery("");
    setActiveCategoryId("all");
  };

  return (
    <section
      className={cn("w-full", className)}
      aria-labelledby={`${id}-heading`}
    >
      <div className="relative isolate overflow-hidden bg-sand px-5 py-10 text-foreground sm:px-8 md:py-14 lg:px-12">
        <div
          className="pointer-events-none absolute -right-24 -top-32 -z-10 size-80 rounded-full border border-accent/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-12 -top-20 -z-10 size-56 rounded-full border border-accent/10"
          aria-hidden="true"
        />

        <div className="grid gap-10 xl:grid-cols-[0.72fr_1.28fr] xl:items-end">
          <div>
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-accent">
              Interactive menu index
            </p>
            <h2
              id={`${id}-heading`}
              className="mt-5 max-w-xl font-serif text-[clamp(2.25rem,9.5vw,2.65rem)] font-normal leading-none tracking-[-0.04em] md:text-[clamp(3.5rem,4.5vw,5rem)] md:leading-[0.9] md:tracking-[-0.05em]"
            >
              {heading}
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-muted">
              {description}
            </p>
          </div>

          <div>
            <label
              htmlFor={`${id}-search`}
              className="text-[0.6rem] font-semibold uppercase tracking-[0.17em] text-accent"
            >
              Search dishes or sections
            </label>
            <div className="relative mt-3 border-b border-foreground/25 focus-within:border-accent">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-1/2 size-5 -translate-y-1/2 text-muted"
              />
              <input
                id={`${id}-search`}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape" && query) {
                    event.preventDefault();
                    setQuery("");
                  }
                }}
                placeholder="Try “paneer”, “biryani” or “coffee”"
                autoComplete="off"
                enterKeyHint="search"
                spellCheck={false}
                aria-controls={resultsId}
                aria-describedby={statusId}
                className="h-16 w-full appearance-none bg-transparent pl-9 pr-14 font-serif text-xl text-foreground outline-none placeholder:text-muted/65 focus-visible:ring-0 [&::-webkit-search-cancel-button]:hidden"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-0 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full text-muted transition-colors hover:bg-ivory hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                  aria-label="Clear menu search"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <fieldset className="mt-10 w-full min-w-0 max-w-full border-t border-foreground/14 pt-6 md:mt-12">
          <legend className="sr-only">Filter menu by category</legend>
          <div className="-mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 xl:mx-0 xl:flex-wrap xl:overflow-visible xl:px-0">
            <button
              type="button"
              aria-pressed={activeCategoryId === "all"}
              aria-controls={resultsId}
              onClick={() => setActiveCategoryId("all")}
              className={cn(
                "inline-flex min-h-11 shrink-0 snap-start items-center gap-3 rounded-full border px-5 text-[0.6rem] font-semibold uppercase tracking-[0.13em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-sand",
                activeCategoryId === "all"
                  ? "border-olive bg-olive text-ivory"
                  : "border-foreground/22 text-muted hover:border-foreground/50 hover:text-foreground",
              )}
            >
              All dishes
              <span
                className={cn(
                  "tabular-nums",
                  activeCategoryId === "all"
                    ? "text-gold-light"
                    : "text-accent",
                )}
                aria-hidden="true"
              >
                {totalItemCount}
              </span>
            </button>

            {categories.map((category) => {
              const isActive = activeCategoryId === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={isActive}
                  aria-controls={resultsId}
                  onClick={() => setActiveCategoryId(category.id)}
                  className={cn(
                    "inline-flex min-h-11 shrink-0 snap-start items-center gap-3 rounded-full border px-5 text-[0.6rem] font-semibold uppercase tracking-[0.13em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-sand",
                    isActive
                      ? "border-olive bg-olive text-ivory"
                      : "border-foreground/22 text-muted hover:border-foreground/50 hover:text-foreground",
                  )}
                >
                  {category.eyebrow}
                  <span
                    className={cn(
                      "tabular-nums",
                      isActive ? "text-gold-light" : "text-accent",
                    )}
                    aria-hidden="true"
                  >
                    {category.items.length}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div
        id={statusId}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="flex min-h-14 items-center justify-between gap-5 border-b border-foreground/18 py-3 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted"
      >
        <span>{statusCopy}</span>
        {query || activeCategoryId !== "all" ? (
          <button
            type="button"
            onClick={resetExplorer}
            aria-label="Reset menu explorer"
            className="min-h-11 shrink-0 text-accent underline decoration-accent/35 underline-offset-4 hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            Reset
          </button>
        ) : null}
      </div>

      <div id={resultsId} className="grid gap-x-12 lg:grid-cols-2">
        {filteredCategories.map((category) => (
          <article
            key={category.id}
            className="border-b border-foreground/18 py-10 md:py-12 lg:px-4 lg:odd:border-r lg:odd:pr-12 lg:even:pl-12"
          >
            <header className="grid grid-cols-[2.5rem_1fr] gap-3">
              <span className="pt-1 text-[0.6rem] font-semibold tracking-[0.15em] text-accent">
                {categoryNumbers.get(category.id)}
              </span>
              <div>
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted">
                  {category.eyebrow}
                </p>
                <h3 className="mt-5 max-w-md font-serif text-[1.8rem] font-normal leading-[1.02] tracking-[-0.035em] md:text-5xl md:leading-[0.94] md:tracking-[-0.045em]">
                  {category.title}
                </h3>
                <p className="mt-4 max-w-md text-xs leading-6 text-muted">
                  {category.description}
                </p>
              </div>
            </header>

            <ol className="mt-8">
              {category.items.map((item, index) => (
                <li
                  key={`${category.id}-${item}`}
                  className="grid min-h-14 grid-cols-[2.5rem_1fr] items-center gap-3 border-t border-foreground/12 py-3"
                >
                  <span
                    className="text-[0.56rem] tracking-[0.13em] text-muted tabular-nums"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-foreground/88">{item}</span>
                </li>
              ))}
            </ol>
          </article>
        ))}

        {filteredCategories.length === 0 ? (
          <div className="border-b border-foreground/18 py-16 lg:col-span-2 lg:py-24">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.17em] text-accent">
              Nothing found
            </p>
            <h3 className="mt-5 max-w-2xl font-serif text-[1.8rem] font-normal leading-[1.02] tracking-[-0.035em] md:text-6xl md:leading-[0.95] md:tracking-[-0.045em]">
              Try another dish, or return to the complete menu.
            </h3>
            <button
              type="button"
              onClick={resetExplorer}
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-foreground px-6 text-[0.64rem] font-semibold uppercase tracking-[0.16em] transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
            >
              Show complete menu
            </button>
          </div>
        ) : null}
      </div>

      <p className="mt-6 max-w-2xl text-xs leading-6 text-muted">
        Dish names reflect the current public menu. Prices and availability are
        intentionally omitted; use the live ordering menu or call the restaurant
        for the latest information.
      </p>
    </section>
  );
}
