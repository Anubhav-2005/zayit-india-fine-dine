"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function CinematicEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    let disposed = false;
    let initialising = false;
    let cleanup: (() => void) | undefined;

    const initialise = async () => {
      if (initialising || disposed) return;
      initialising = true;

      const [{ default: Lenis }, gsapModule, scrollTriggerModule] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (disposed) return;

      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        anchors: true,
        duration: 1,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.9,
      });
      const ticker = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      const context = gsap.context(() => {
        gsap.to(".reading-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: "max",
            scrub: 0.25,
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((frame) => {
          const image = frame.querySelector("img");
          if (!image) return;

          gsap.fromTo(
            image,
            { yPercent: -3 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
        });
      });
      ScrollTrigger.refresh();

      cleanup = () => {
        context.revert();
        gsap.ticker.remove(ticker);
        lenis.destroy();
      };
    };

    const interactionEvents = ["wheel", "touchstart", "keydown"] as const;
    const removeInteractionListeners = () => {
      interactionEvents.forEach((eventName) =>
        window.removeEventListener(eventName, start),
      );
    };
    const start = () => {
      window.clearTimeout(fallbackTimer);
      removeInteractionListeners();
      void initialise();
    };
    const fallbackTimer = window.setTimeout(start, 5000);

    interactionEvents.forEach((eventName) =>
      window.addEventListener(eventName, start, {
        once: true,
        passive: eventName !== "keydown",
      }),
    );

    return () => {
      disposed = true;
      window.clearTimeout(fallbackTimer);
      removeInteractionListeners();
      cleanup?.();
    };
  }, [pathname]);

  return <div className="reading-progress" aria-hidden="true" />;
}
