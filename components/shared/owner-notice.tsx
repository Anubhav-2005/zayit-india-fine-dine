import { MessageCircleMore } from "lucide-react";

import { cn } from "@/lib/utils";

type OwnerNoticeProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
};

export function OwnerNotice({
  title,
  children,
  className,
  dark = false,
}: OwnerNoticeProps) {
  return (
    <aside
      className={cn(
        "border p-6 md:p-8",
        dark
          ? "border-gold/35 bg-white/4 text-ivory"
          : "border-foreground/25 bg-sand/55 text-foreground",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.15em]",
          dark ? "text-gold-light" : "text-accent",
        )}
      >
        <MessageCircleMore aria-hidden="true" className="size-4" />
        Please ask Zayit directly
      </div>
      <h2 className="mt-5 font-serif text-[1.75rem] font-normal leading-[1.04] tracking-[-0.035em] md:text-4xl md:leading-none md:tracking-[-0.04em]">
        {title}
      </h2>
      <div
        className={cn(
          "pretty-copy mt-4 text-sm leading-7",
          dark ? "text-ivory/66" : "text-muted",
        )}
      >
        {children}
      </div>
    </aside>
  );
}
