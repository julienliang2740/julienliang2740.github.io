"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Parallax opening scene. Each painted layer sits on a depth plane: far layers
 * linger and dissolve, near layers leave early and hard, which reads as the
 * viewer walking forward through the scene as the page scrolls.
 *
 * The scene keeps its own ink-on-paper palette rather than the site tokens, so
 * the theme toggle never washes the painting out.
 */

/*
 * Art and ink come from CSS variables, which is what makes the night version
 * work: the stylesheet swaps both on `.dark`, so there is no hydration flash
 * of daylight art and only the active theme's images are ever fetched.
 */
const INK = "var(--scene-ink)";
const INK_MUTED = "var(--scene-ink-muted)";

function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const total = el.offsetHeight - window.innerHeight;
        const passed = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total);
        setP(total > 0 ? passed / total : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
  return p;
}

function usePointer() {
  const [pt, setPt] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    let pending = { x: 0, y: 0 };
    const onMove = (ev: PointerEvent) => {
      pending = {
        x: (ev.clientX / window.innerWidth - 0.5) * 2,
        y: (ev.clientY / window.innerHeight - 0.5) * 2,
      };
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setPt(pending);
        raf = 0;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return pt;
}

function Layer({
  name,
  style,
  className = "",
}: {
  name: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`hero-layer pointer-events-none absolute inset-0 h-full w-full will-change-transform ${className}`}
      style={{ backgroundImage: `var(--scene-${name})`, ...style }}
    />
  );
}

const clamp = (v: number, a = 0, b = 1) => Math.min(Math.max(v, a), b);
const seg = (p: number, from: number, to: number) => clamp((p - from) / (to - from));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 2.2);
const easeIn = (t: number) => t * t;

export function SereneScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(wrapRef);
  const pt = usePointer();
  const px = (v: number) => `${v.toFixed(2)}px`;

  // Jump to the content. It overlaps the end of the scene, so this targets the
  // section itself rather than the bottom of the scene — that would now land
  // well past where the writing starts.
  const scrollToContent = () => {
    const content = document.getElementById("page-content");
    const el = wrapRef.current;
    const top = content ? content.offsetTop : el ? el.offsetTop + el.offsetHeight : 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  // depth: 0 = far, 1 = near. drives speed and mouse parallax.
  const depth = {
    moon: 0.08,
    water: 0.3,
    tree: 0.72,
    bank: 1,
  };

  const introOpacity = 1 - easeIn(seg(p, 0.3, 0.7));

  // Layer scales are fixed. Each one's scale only exists to frame and crop it;
  // tying it to scroll as well made the art swell as it left — the foreground
  // bank grew by 18% and the tree by 10% on the way out, which read as the
  // scene expanding rather than departing. They now slide and fade at a
  // constant size.

  // far layers linger and dissolve; near layers leave early and hard. Every
  // one of them now runs to the end of the pinned range — when they finished
  // early the scene sat empty for the best part of a thousand pixels before
  // the content arrived.
  const moonP = easeOut(seg(p, 0.08, 1.0));
  const waterP = easeOut(seg(p, 0.12, 1.0));
  const treeP = easeIn(seg(p, 0.05, 0.97));
  const bankP = easeIn(seg(p, 0.0, 0.9));

  // The paper itself lifts last, revealing the ambient scene behind the page —
  // the same willow and mountains, much fainter — so the hero recedes into the
  // rest of the page instead of emptying out and handing over to nothing.
  const paperP = easeIn(seg(p, 0.7, 1.0));

  return (
    <div ref={wrapRef} data-scene className="relative z-10 h-[170svh] font-hero">
      {/*
        dvh, not svh: svh is the viewport height *with* mobile browser chrome
        showing. Once the URL bar hides on scroll the visible viewport grows,
        and an svh-sized pane leaves a strip of page background at the bottom.
        dvh tracks the live viewport, so the scene always fills it. The wrapper
        above stays in svh so the scroll length doesn't change mid-scroll.
      */}
      <section className="sticky top-0 h-[100dvh] overflow-hidden">
        <Layer
          name="background"
          style={{ opacity: 1 - paperP }}
        />

        {/* moon — farthest: barely moves, dissolves softly */}
        <div className="pointer-events-none absolute inset-0 animate-hero-bob">
          <Layer
            name="moon"
            className="scene-moon"
            style={{
              transform: `translate3d(calc(${px(moonP * 130)} + ${px(pt.x * depth.moon * 12)}), ${px(pt.y * depth.moon * 6)}, 0) scale(1)`,
              opacity: 1 - moonP * 0.95,
              filter: `blur(${moonP * 2}px)`,
            }}
          />
        </div>

        {/* water + mountains — mid ground: slow drift right */}
        <div
          className="pointer-events-none absolute inset-0 will-change-transform"
          style={{
            transform: `translate3d(calc(${px(waterP * 420)} + ${px(pt.x * depth.water * 12)}), ${px(pt.y * depth.water * 6)}, 0) scale(1.2)`,
            opacity: 1 - waterP * 0.98,
            filter: `blur(${waterP * 3}px)`,
          }}
        >
          <Layer name="water" className="scene-mid" />
          <Layer name="mountains" className="scene-mid" />
        </div>

        {/* tree — near-mid: sways gently, leaves faster */}
        <div className="pointer-events-none absolute inset-0 animate-hero-sway">
          <Layer
            name="tree"
            className="scene-near"
            style={{
              transform: `translate3d(calc(${px(-treeP * 820)} + ${px(pt.x * depth.tree * 12)}), ${px(pt.y * depth.tree * 6)}, 0) scale(1.2)`,
              opacity: 1 - treeP * 0.98,
              filter: `blur(${treeP * 5}px)`,
            }}
          />
        </div>

        {/* bank — nearest: fastest push left */}
        <div
          className="pointer-events-none absolute inset-0 will-change-transform"
          style={{
            transform: `translate3d(calc(${px(-bankP * 1150)} + ${px(pt.x * depth.bank * 12)}), ${px(pt.y * depth.bank * 6)}, 0) scale(1.25)`,
            opacity: 1 - bankP * 0.98,
            filter: `blur(${bankP * 7}px)`,
          }}
        >
          <Layer name="bank" className="scene-near" />
        </div>

        <div
          className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center"
          style={{
            transform: `translateY(${px(easeIn(seg(p, 0, 0.8)) * -90)})`,
            opacity: introOpacity,
            pointerEvents: introOpacity < 0.08 ? "none" : "auto",
          }}
        >
          <h1
            className="text-5xl leading-[1.1] font-normal sm:text-7xl"
            style={{ color: INK }}
          >
            Hi, I&apos;m Julien
          </h1>
          <p
            className="mt-6 max-w-2xl text-balance text-lg sm:text-2xl"
            style={{ color: INK_MUTED, opacity: 1 - easeIn(seg(p, 0.15, 0.45)) }}
          >
            A software engineer building systems people want
          </p>

          <button
            type="button"
            onClick={scrollToContent}
            className="scene-cta mt-10 inline-flex items-center gap-3 rounded-full border px-7 py-3 text-[12px] font-medium tracking-[0.28em] uppercase"
          >
            Scroll
            <svg
              className="animate-scroll-hint h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M12 4.5v13.5M6.5 12.5 12 18l5.5-5.5" />
            </svg>
          </button>
        </div>

      </section>
    </div>
  );
}
