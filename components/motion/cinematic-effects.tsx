"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number },
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function CinematicEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const desktopMotion = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
    );
    const idleWindow = window as IdleWindow;
    let disposed = false;
    let initialising = false;
    let cleanup: (() => void) | undefined;

    const initialise = async () => {
      if (initialising || disposed) return;
      initialising = true;

      try {
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

        const lenis = desktopMotion.matches
          ? new Lenis({
              anchors: true,
              duration: 0.95,
              smoothWheel: true,
              syncTouch: false,
              wheelMultiplier: 0.88,
            })
          : undefined;
        const ticker = lenis
          ? (time: number) => lenis.raf(time * 1000)
          : undefined;

        if (lenis && ticker) {
          lenis.on("scroll", ScrollTrigger.update);
          gsap.ticker.add(ticker);
        }

        const context = gsap.context(() => {
          gsap.to(".reading-progress", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              start: 0,
              end: "max",
              scrub: 0.2,
            },
          });

          gsap.utils
            .toArray<HTMLElement>("[data-reveal]")
            .forEach((element) => {
              const reveal = element.dataset.reveal;
              const isImage = reveal === "image";
              const isCard = reveal === "card";

              gsap.fromTo(
                element,
                {
                  autoAlpha: 0,
                  y: isImage ? 18 : isCard ? 24 : 20,
                  clipPath: isImage
                    ? "inset(0 0 12% 0)"
                    : "inset(0 0 0 0)",
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  clipPath: "inset(0 0 0 0)",
                  duration: isImage ? 1.1 : 0.82,
                  ease: "power3.out",
                  clearProps: "visibility",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 88%",
                    once: true,
                  },
                },
              );
            });

          gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((rule) => {
            gsap.fromTo(
              rule,
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 0.75,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: rule,
                  start: "top 90%",
                  once: true,
                },
              },
            );
          });

          if (!desktopMotion.matches) return;

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

          const homeHero = document.querySelector<HTMLElement>(".home-hero");
          const homeHeroMedia = homeHero?.querySelector<HTMLElement>(
            ".home-hero__media",
          );
          const homeHeroCopy = homeHero?.querySelector<HTMLElement>(
            ".home-hero__copy",
          );
          if (homeHero && homeHeroMedia && homeHeroCopy) {
            gsap.to(homeHeroMedia, {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: homeHero,
                start: "top top",
                end: "bottom top",
                scrub: 0.7,
              },
            });
            gsap.to(homeHeroCopy, {
              yPercent: 9,
              autoAlpha: 0.42,
              ease: "none",
              scrollTrigger: {
                trigger: homeHero,
                start: "38% top",
                end: "bottom top",
                scrub: 0.55,
              },
            });
          }

          const pageHero = document.querySelector<HTMLElement>(
            "[data-page-hero]",
          );
          const pageHeroMedia = pageHero?.querySelector<HTMLElement>(
            ".page-hero__media",
          );
          if (pageHero && pageHeroMedia) {
            gsap.fromTo(
              pageHeroMedia,
              { yPercent: -2, scale: 1.055 },
              {
                yPercent: 3,
                scale: 1.075,
                ease: "none",
                scrollTrigger: {
                  trigger: pageHero,
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.65,
                },
              },
            );
          }

          const sequence = document.querySelector<HTMLElement>(
            "[data-interior-sequence]",
          );
          if (sequence) {
            const images = Array.from(
              sequence.querySelectorAll<HTMLElement>("[data-sequence-image]"),
            );
            const steps = Array.from(
              sequence.querySelectorAll<HTMLElement>("[data-sequence-step]"),
            );

            gsap.set(images, { autoAlpha: 0, scale: 1.035 });
            if (images[0]) {
              gsap.set(images[0], { autoAlpha: 1, scale: 1 });
            }

            const showImage = (activeIndex: number) => {
              images.forEach((image, imageIndex) => {
                gsap.to(image, {
                  autoAlpha: imageIndex === activeIndex ? 1 : 0,
                  scale: imageIndex === activeIndex ? 1 : 1.025,
                  duration: imageIndex === activeIndex ? 1.05 : 0.72,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              });
            };

            steps.forEach((step, index) => {
              ScrollTrigger.create({
                trigger: step,
                start: "top 52%",
                end: "bottom 48%",
                onEnter: () => showImage(index),
                onEnterBack: () => showImage(index),
              });
            });
          }
        });

        let refreshFrame = 0;
        const resizeObserver =
          typeof ResizeObserver === "undefined"
            ? undefined
            : new ResizeObserver(() => {
                window.cancelAnimationFrame(refreshFrame);
                refreshFrame = window.requestAnimationFrame(() =>
                  ScrollTrigger.refresh(),
                );
              });
        const main = document.querySelector("main");
        if (main) resizeObserver?.observe(main);

        document.fonts?.ready.then(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
        ScrollTrigger.refresh();

        cleanup = () => {
          resizeObserver?.disconnect();
          window.cancelAnimationFrame(refreshFrame);
          context.revert();
          if (ticker) gsap.ticker.remove(ticker);
          lenis?.destroy();
        };
      } catch {
        initialising = false;
      }
    };

    const interactionEvents = ["wheel", "touchstart", "keydown"] as const;
    const removeInteractionListeners = () => {
      interactionEvents.forEach((eventName) =>
        window.removeEventListener(eventName, start),
      );
    };
    const start = () => {
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer);
      if (idleHandle !== undefined) idleWindow.cancelIdleCallback?.(idleHandle);
      removeInteractionListeners();
      void initialise();
    };

    const fallbackTimer = window.setTimeout(start, 2400);
    const idleHandle = idleWindow.requestIdleCallback?.(start, {
      timeout: 1500,
    });
    interactionEvents.forEach((eventName) =>
      window.addEventListener(eventName, start, {
        once: true,
        passive: eventName !== "keydown",
      }),
    );

    return () => {
      disposed = true;
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer);
      if (idleHandle !== undefined) idleWindow.cancelIdleCallback?.(idleHandle);
      removeInteractionListeners();
      cleanup?.();
    };
  }, [pathname]);

  return <div className="reading-progress" aria-hidden="true" />;
}
