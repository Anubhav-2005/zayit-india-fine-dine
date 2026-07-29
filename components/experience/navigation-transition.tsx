"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { RouteLoadingScreen } from "./route-loading-screen";

/**
 * Shows the cinematic loader only for a client-side navigation that takes long
 * enough to notice. Keeping it outside app/loading.tsx preserves a complete,
 * immediately paintable first response for visitors and search engines.
 */
export function NavigationTransition() {
  const pathname = usePathname();
  const delayRef = useRef<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (delayRef.current !== null) {
      window.clearTimeout(delayRef.current);
      delayRef.current = null;
    }
    const frame = window.requestAnimationFrame(() => setVisible(false));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const showForNavigation = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const origin = event.target;
      const anchor =
        origin instanceof Element ? origin.closest<HTMLAnchorElement>("a[href]") : null;
      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);
      const current = new URL(window.location.href);
      if (
        destination.origin !== current.origin ||
        (destination.pathname === current.pathname &&
          destination.search === current.search)
      ) {
        return;
      }

      if (delayRef.current !== null) window.clearTimeout(delayRef.current);
      delayRef.current = window.setTimeout(() => setVisible(true), 120);
    };

    document.addEventListener("click", showForNavigation, true);
    return () => {
      document.removeEventListener("click", showForNavigation, true);
      if (delayRef.current !== null) {
        window.clearTimeout(delayRef.current);
      }
    };
  }, []);

  return visible ? <RouteLoadingScreen /> : null;
}
