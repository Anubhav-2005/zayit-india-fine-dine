import Image from "next/image";

import { cn } from "@/lib/utils";

type RouteLoadingScreenProps = {
  className?: string;
  message?: string;
};

export function RouteLoadingScreen({
  className,
  message = "Preparing your next chapter",
}: RouteLoadingScreenProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        "fixed inset-0 z-[130] grid min-h-svh place-items-center bg-ivory px-6 text-center text-foreground",
        className,
      )}
    >
      <div>
        <div className="relative mx-auto grid size-28 place-items-center">
          <span
            className="absolute inset-0 animate-spin rounded-full border border-gold/25 border-t-accent motion-reduce:animate-none"
            aria-hidden="true"
          />
          <Image
            src="/images/zayit-official-logo-112.webp"
            alt=""
            width={88}
            height={88}
            sizes="88px"
            className="size-[5.5rem] rounded-full"
            priority
          />
        </div>
        <p className="mt-8 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-accent">
          {message}
        </p>
        <span className="sr-only">Loading page</span>
      </div>
    </div>
  );
}
