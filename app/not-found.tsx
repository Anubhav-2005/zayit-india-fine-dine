import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="grid min-h-[75svh] place-items-center bg-sand px-5 pb-20 pt-36 text-center text-foreground"
    >
      <div>
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-accent">
          404 · The path ends here
        </p>
        <h1 className="hero-display mt-6 text-[clamp(5rem,14vw,10rem)] font-normal leading-[0.74] tracking-[-0.08em]">
          Back to
          <br />
          <em className="font-normal text-accent">the table.</em>
        </h1>
        <Button asChild className="mt-10">
          <Link href="/">Return home</Link>
        </Button>
      </div>
    </main>
  );
}
