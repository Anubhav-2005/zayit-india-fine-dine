"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type CursorAuraProps = {
  className?: string;
  interactiveSelector?: string;
};

export function CursorAura({
  className,
  interactiveSelector = "a, button, input, textarea, select, summary, [role='button']",
}: CursorAuraProps) {
  const auraRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const sync = () => setEnabled(finePointer.matches && !reducedMotion.matches);
    sync();
    finePointer.addEventListener("change", sync);
    reducedMotion.addEventListener("change", sync);

    return () => {
      finePointer.removeEventListener("change", sync);
      reducedMotion.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let x = -80;
    let y = -80;
    let scale = 1;

    const render = () => {
      const aura = auraRef.current;
      if (aura) {
        aura.style.transform = `translate3d(${x - 24}px, ${y - 24}px, 0) scale(${scale})`;
        aura.style.opacity = "1";
      }
      frameRef.current = null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      x = event.clientX;
      y = event.clientY;
      const target = event.target;
      scale =
        target instanceof Element && target.closest(interactiveSelector)
          ? 1.55
          : 1;

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(render);
      }
    };

    const hide = () => {
      if (auraRef.current) auraRef.current.style.opacity = "0";
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [enabled, interactiveSelector]);

  if (!enabled) return null;

  return (
    <div
      ref={auraRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[110] size-12 rounded-full border border-gold-light/65 opacity-0 shadow-[0_0_28px_rgba(202,165,101,0.24)] will-change-transform transition-[opacity,border-color,box-shadow] duration-200",
        className,
      )}
    >
      <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-light/75" />
    </div>
  );
}
