"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Cross-fade between pages.
 *
 * An earlier version laid a translucent curtain over the page and swapped the
 * route behind it. That never looked smooth: the curtain only reached partial
 * opacity, so the instant the route changed you still saw the old page snap to
 * the new one straight through it — softened, but still a cut.
 *
 * So instead of veiling the swap, this fades the page itself right down to
 * zero, changes route while nothing is on screen, and fades the new one up.
 * There is no moment where two different pages are visible, so there is no cut
 * to soften — the pages dissolve through the shared background.
 *
 * Navigation is caught by one delegated click handler, so every existing
 * next/link keeps working untouched.
 */

const FADE_OUT_MS = 170;
// Small cushion past the fade so the route only changes once the old page has
// genuinely reached zero — a frame of jank here would expose the swap.
const SWAP_DELAY_MS = FADE_OUT_MS + 40;
const FADE_IN_MS = 260;

export function PageFade({ children }: { children: React.ReactNode }) {
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
      if (/^[a-z]+:/i.test(href) && !href.startsWith("/")) return;
      if (href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname.replace(/\/$/, "") === pathname.replace(/\/$/, "")) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Capture phase, so this runs before next/link's own handler; stop the
      // event there so the router isn't driven twice.
      event.preventDefault();
      event.stopPropagation();
      setLeaving(true);
      clear();
      timers.current.push(
        window.setTimeout(() => router.push(url.pathname + url.search), SWAP_DELAY_MS),
        // safety net: never strand the page invisible if navigation stalls
        window.setTimeout(() => setLeaving(false), SWAP_DELAY_MS + 2500),
      );
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clear();
    };
  }, [router, pathname]);

  /*
   * Bring the new route up — but only once it has actually been painted.
   *
   * `pathname` updates while React is still rendering the incoming tree, so
   * reacting to it directly starts the fade-in before the new DOM is on
   * screen, and the swap lands mid-fade in plain view (measured at 0.24
   * opacity). Two frames of waiting puts this after the commit has painted,
   * so the page is still at zero when the content changes underneath it.
   */
  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setLeaving(false));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [pathname]);

  return (
    <div
      className="page-fade"
      data-leaving={leaving ? "" : undefined}
      style={{ transitionDuration: `${leaving ? FADE_OUT_MS : FADE_IN_MS}ms` }}
    >
      {children}
    </div>
  );
}
