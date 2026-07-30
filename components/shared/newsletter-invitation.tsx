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
        "relative isolate overflow-hidden border border-foreground/16 bg-ivory/72 p-7 text-foreground md:p-10",
        className,
      )}
      aria-labelledby="zayit-letter-title"
    >
      <div
        className="absolute -right-20 -top-20 -z-10 size-64 rounded-full border border-gold/20"
        aria-hidden="true"
      />
      <Mail aria-hidden="true" className="size-5 text-accent" />
      <p className="mt-12 text-[0.59rem] font-semibold uppercase tracking-[0.17em] text-accent">
        Newsletter · integration ready
      </p>
      <h2
        id="zayit-letter-title"
        className="mt-5 max-w-xl font-serif text-4xl font-normal leading-[0.9] tracking-[-0.045em] md:text-5xl"
      >
        The Zayit Letter.
      </h2>
      <p className="pretty-copy mt-5 max-w-xl text-sm leading-7 text-muted">
        Seasonal plates, Golden City notes and table announcements—once the
        owner connects an authorised mailing platform, consent wording and
        privacy policy.
      </p>
      <a className="rule-link mt-7" href={requestHref}>
        Ask to be notified
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </a>
      <p className="mt-5 max-w-xl text-[0.67rem] leading-5 text-muted">
        This opens your email app. It does not subscribe or store your address.
        Replace with the owner’s consent-based provider before public launch.
      </p>
    </aside>
  );
}
