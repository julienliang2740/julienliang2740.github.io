"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Cross-fade one page directly into the next.
 *
 * Two earlier attempts both went through an in-between state and both felt
 * invasive for the same reason. A translucent curtain over the swap left the
 * cut visible through it; fading the page down to zero and back up removed the
 * cut but put a blank in its place, so leaving the home scene meant watching
 * it dissolve to nothing before the blog scene appeared.
 *
 * The View Transitions API does the thing neither could: it holds a snapshot
 * of the outgoing page and dissolves it straight into the incoming one, both
 * on screen together, never a frame of anything else. The home scene fades
 * directly into the blog scene.
 *
 * Where the API is missing the navigation is simply instant, which is far less
 * invasive than reintroducing a blank flash for those browsers.
 */

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => unknown;
};

export function PageFade({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const commitRef = useRef<(() => void) | null>(null);

  useEffect(() => {
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

      const doc = document as ViewTransitionDocument;
      if (
        typeof doc.startViewTransition !== "function" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return; // let next/link navigate normally, with no transition
      }

      // Capture phase, so this runs before next/link's own handler; stop the
      // event there so the router isn't driven twice.
      event.preventDefault();
      event.stopPropagation();

      const target = url.pathname + url.search;
      doc.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            // The browser has snapshotted the old page and is holding the
            // frame. It snapshots the new one the moment this resolves, so it
            // must not resolve until React has committed the new route.
            commitRef.current = resolve;
            // Never let a stalled navigation hold the frame forever.
            window.setTimeout(() => {
              const pending = commitRef.current;
              if (pending) {
                commitRef.current = null;
                pending();
              }
            }, 800);
            router.push(target);
          }),
      );
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router, pathname]);

  useEffect(() => {
    const commit = commitRef.current;
    if (!commit) return;
    commitRef.current = null;
    /*
     * A timer, emphatically not requestAnimationFrame. While a view
     * transition holds the frame the browser suppresses rendering, so rAF
     * callbacks never run — waiting on one deadlocks the transition against
     * itself and it never starts. Timers still fire, and this effect already
     * runs after React has committed the new route.
     */
    const id = window.setTimeout(commit, 0);
    return () => clearTimeout(id);
  }, [pathname]);

  return <>{children}</>;
}
