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
        <h1 className="hero-display mt-5 text-[clamp(3.5rem,16vw,4.5rem)] font-normal leading-none tracking-[-0.05em] md:mt-6 md:text-[clamp(6rem,10vw,9rem)] md:leading-[0.88] md:tracking-[-0.065em]">
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
