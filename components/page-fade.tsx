"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Cross-dissolve between pages.
 *
 * Without this, leaving the home page cuts straight from the opening scene's
 * warm paper to the site background — a hard jump, and a very loud one in dark
 * mode. A curtain in the page background colour fades in over the outgoing
 * page, the route changes behind it, then it fades back out. The two pages
 * dissolve through their shared ground instead of swapping in one frame.
 *
 * Navigation is caught by one delegated click handler rather than a custom
 * link component, so every existing next/link keeps working untouched.
 */

// Out is quicker than in: covering the old page should feel responsive to the
// click, while revealing the new one can settle. The hold matters more than it
// looks — tearing down the home page (seven scene layers plus its listeners)
// blocks the main thread long enough that without it the curtain reverses
// before it has finished covering, so that direction dissolved to only ~0.7
// and lasted half as long as the other. Holding gives the incoming page a beat
// to paint and makes both directions identical.
const FADE_OUT_MS = 180;
const HOLD_MS = 90;
const FADE_IN_MS = 300;

export function PageFade() {
  const router = useRouter();
  const pathname = usePathname();
  const [leaving, setLeaving] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const clear = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };

    const onClick = (event: MouseEvent) => {
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

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      // leave mailto:, tel:, external origins and in-page anchors alone
      if (/^[a-z]+:/i.test(href) && !href.startsWith("/")) return;
      if (href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      // already here — nothing to dissolve
      if (url.pathname.replace(/\/$/, "") === pathname.replace(/\/$/, "")) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Capture phase, so this runs before next/link's own handler; stop the
      // event there so the router isn't driven twice.
      event.preventDefault();
      event.stopPropagation();
      setLeaving(true);
      clear();
      timers.current.push(
        window.setTimeout(() => router.push(url.pathname + url.search), FADE_OUT_MS),
        // safety net: never strand the curtain if navigation stalls
        window.setTimeout(() => setLeaving(false), FADE_OUT_MS + 2500),
      );
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clear();
    };
  }, [router, pathname]);

  // The new route has rendered — hold a beat, then lift the curtain.
  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const id = window.setTimeout(() => setLeaving(false), HOLD_MS);
    timers.current.push(id);
    return () => clearTimeout(id);
  }, [pathname]);

  return (
    <div
      aria-hidden
      className="page-fade"
      data-leaving={leaving ? "" : undefined}
      style={{ transitionDuration: `${leaving ? FADE_OUT_MS : FADE_IN_MS}ms` }}
    />
  );
}
