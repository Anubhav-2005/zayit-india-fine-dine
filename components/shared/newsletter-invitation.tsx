import { ArrowUpRight, Mail } from "lucide-react";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function NewsletterInvitation({ className }: { className?: string }) {
  const requestHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    "The Zayit Letter — notify me when it launches",
  )}`;

  return (
    <aside
      className={cn(
        "relative isolate overflow-hidden border border-foreground/16 bg-ivory/72 p-4 text-foreground sm:p-5",
        className,
      )}
      aria-labelledby="zayit-letter-title"
    >
      <div
        className="absolute -right-20 -top-20 -z-10 size-56 rounded-full border border-gold/20"
        aria-hidden="true"
      />
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8">
        <div>
          <div className="flex items-center gap-3">
            <Mail aria-hidden="true" className="size-4 text-accent" />
            <p className="text-[0.59rem] font-semibold uppercase tracking-[0.17em] text-accent">
              The Zayit Letter
            </p>
          </div>
          <h2
            id="zayit-letter-title"
            className="mt-2 max-w-xl font-serif text-xl font-normal leading-none tracking-[-0.035em] sm:text-2xl"
          >
            Stories from the Golden City.
          </h2>
          <p className="pretty-copy mt-2 hidden max-w-2xl text-[0.78rem] leading-5 text-muted md:block">
            Seasonal plates, city notes and table announcements—when the first
            letter is ready.
          </p>
        </div>
        <div className="sm:text-right">
          <a className="rule-link" href={requestHref}>
            Ask to be notified
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
          <p className="mt-2 hidden max-w-xs text-[0.6rem] leading-4 text-muted md:block">
            Opens your email app; this website stores no address.
          </p>
        </div>
      </div>
    </aside>
  );
}
