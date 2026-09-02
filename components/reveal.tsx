"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades a section in as it comes into view.
 *
 * The hidden starting state lives behind a `reveal-ready` class that the
 * inline script in the layout sets before first paint. Without that gate a
 * reader with no JavaScript would get a page of invisible text, and putting
 * the gate in an effect instead would show every section and then blink it
 * away. This way no-JS simply sees everything, immediately.
 *
 * Deliberately a position check rather than IntersectionObserver. An observer
 * only reports *changes* in intersection, so a section you scroll straight
 * past — a flick, End, a jump to an anchor — goes from below the fold to above
 * it without ever intersecting, and never fires. Six sections stayed invisible
 * for good that way. Asking where the element is handles the skipped case for
 * free, because "above the line" and "at the line" are the same test.
 *
 * One shared rAF-throttled listener drives every section, and each drops out
 * once shown — re-fading on the way back up makes a page feel restless.
 */

type Check = () => void;

const pending = new Set<Check>();
let frame = 0;
let listening = false;

function runChecks() {
  frame = 0;
  for (const check of Array.from(pending)) check();
  if (pending.size === 0 && listening) {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    listening = false;
  }
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(runChecks);
}

function watch(check: Check) {
  pending.add(check);
  if (!listening) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    listening = true;
  }
  check();
  return () => {
    pending.delete(check);
  };
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No reduced-motion branch here on purpose: the stylesheet already forces
    // every section visible with no transition under that preference, so the
    // position checks below are simply harmless there.
    let done = false;
    const check: Check = () => {
      if (done) return;
      // Start a little before the section reaches the bottom edge, so it is
      // settling as it arrives rather than starting once it is already read.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        done = true;
        pending.delete(check);
        setShown(true);
      }
    };

    return watch(check);
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-shown={shown ? "" : undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
