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

const INK = "oklch(0.20 0.016 55)";
const INK_MUTED = "oklch(0.36 0.020 55)";

const LAYERS = {
  background: "/scene/background.webp",
  moon: "/scene/moon.webp",
  waterGround: "/scene/water_ground.webp",
  mountainsVillage: "/scene/mountains_village.webp",
  tree: "/scene/tree.webp",
  bank: "/scene/foreground_bank_clean.webp",
};

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
  src,
  style,
  className = "",
}: {
  src: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full object-cover will-change-transform ${className}`}
      style={style}
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

  // depth: 0 = far, 1 = near. drives speed and mouse parallax.
  const depth = {
    moon: 0.08,
    water: 0.3,
    tree: 0.72,
    bank: 1,
  };

  // far layers linger and dissolve; near layers leave early and hard
  const moonP = easeOut(seg(p, 0.05, 1.0));
  const waterP = easeOut(seg(p, 0.1, 0.95));
  const treeP = easeIn(seg(p, 0.05, 0.9));
  const bankP = easeIn(seg(p, 0.0, 0.8));

  return (
    <div ref={wrapRef} data-scene className="relative h-[260svh] font-hero">
      {/*
        dvh, not svh: svh is the viewport height *with* mobile browser chrome
        showing. Once the URL bar hides on scroll the visible viewport grows,
        and an svh-sized pane leaves a strip of page background at the bottom.
        dvh tracks the live viewport, so the scene always fills it. The wrapper
        above stays in svh so the scroll length doesn't change mid-scroll.
      */}
      <section className="sticky top-0 h-[100dvh] overflow-hidden">
        <Layer src={LAYERS.background} style={{ transform: `scale(${1 + p * 0.08})` }} />

        {/* moon — farthest: barely moves, dissolves softly */}
        <div className="pointer-events-none absolute inset-0 animate-hero-bob">
          <Layer
            src={LAYERS.moon}
            className="scene-moon"
            style={{
              transform: `translate3d(calc(${px(moonP * 130)} + ${px(pt.x * depth.moon * 12)}), ${px(pt.y * depth.moon * 6)}, 0) scale(${1 - moonP * 0.05})`,
              opacity: 1 - moonP * 0.95,
              filter: `blur(${moonP * 2}px)`,
            }}
          />
        </div>

        {/* water + mountains — mid ground: slow drift right */}
        <div
          className="pointer-events-none absolute inset-0 will-change-transform"
          style={{
            transform: `translate3d(calc(${px(waterP * 420)} + ${px(pt.x * depth.water * 12)}), ${px(pt.y * depth.water * 6)}, 0) scale(${1.2 - waterP * 0.05})`,
            opacity: 1 - waterP * 0.98,
            filter: `blur(${waterP * 3}px)`,
          }}
        >
          <Layer src={LAYERS.waterGround} className="scene-mid" />
          <Layer src={LAYERS.mountainsVillage} className="scene-mid" />
        </div>

        {/* tree — near-mid: sways gently, leaves faster */}
        <div className="pointer-events-none absolute inset-0 animate-hero-sway">
          <Layer
            src={LAYERS.tree}
            className="scene-near"
            style={{
              transform: `translate3d(calc(${px(-treeP * 820)} + ${px(pt.x * depth.tree * 12)}), ${px(pt.y * depth.tree * 6)}, 0) scale(${1.2 + treeP * 0.1})`,
              opacity: 1 - treeP * 0.98,
              filter: `blur(${treeP * 5}px)`,
            }}
          />
        </div>

        {/* bank — nearest: fastest push left */}
        <div
          className="pointer-events-none absolute inset-0 will-change-transform"
          style={{
            transform: `translate3d(calc(${px(-bankP * 1150)} + ${px(pt.x * depth.bank * 12)}), ${px(pt.y * depth.bank * 6)}, 0) scale(${1.25 + bankP * 0.18})`,
            opacity: 1 - bankP * 0.98,
            filter: `blur(${bankP * 7}px)`,
          }}
        >
          <Layer src={LAYERS.bank} className="scene-near" />
        </div>

        <div
          className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center"
          style={{
            transform: `translateY(${px(easeIn(seg(p, 0, 0.8)) * -90)})`,
            opacity: 1 - easeIn(seg(p, 0.35, 0.75)),
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
        </div>

        <div
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
          style={{ color: INK_MUTED, opacity: 1 - p * 6 }}
        >
          <span className="text-[13px] font-medium tracking-[0.28em] uppercase">Scroll</span>
          <svg
            className="animate-scroll-hint h-6 w-6"
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
        </div>

        {/* hand the painting off to the page background at the end of the scene */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[60dvh]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--background) 18%, transparent) 38%, color-mix(in srgb, var(--background) 55%, transparent) 66%, color-mix(in srgb, var(--background) 85%, transparent) 86%, var(--background) 100%)",
            opacity: easeIn(seg(p, 0.7, 1)),
          }}
        />
      </section>
    </div>
  );
}
