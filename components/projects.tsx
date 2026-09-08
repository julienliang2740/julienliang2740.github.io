"use client";

import Image from "next/image";
import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { Reveal } from "@/components/reveal";

export type TechItem = string | { label: string; crossedOut?: boolean };

export type Project = {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  tech: TechItem[];
  featured?: boolean;
};

const label = (t: TechItem) => (typeof t === "string" ? t : t.label);
const struck = (t: TechItem) => typeof t !== "string" && t.crossedOut;

/**
 * The deckle filter. A little turbulence displacing the sheet's edge is what
 * separates paper from a rounded rectangle — the edge wanders by a pixel or
 * two the way a torn leaf does, and the shadow follows it because the shadow
 * is painted on the same layer.
 */
function PaperFilter() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <filter id="paper-deckle">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.022 0.04"
          numOctaves={3}
          seed={7}
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale={5}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}

function Chips({ tech, max }: { tech: TechItem[]; max?: number }) {
  const shown = max ? tech.slice(0, max) : tech;
  const extra = max ? tech.length - shown.length : 0;
  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map((t, i) => (
        <span
          key={`${label(t)}-${i}`}
          className={`border border-current/20 px-2 py-0.5 text-[0.78rem] tracking-wide ${
            struck(t) ? "line-through decoration-2 decoration-current/70" : ""
          }`}
        >
          {label(t)}
        </span>
      ))}
      {extra > 0 && (
        <span className="px-1 py-0.5 text-[0.78rem] opacity-50">+{extra}</span>
      )}
    </div>
  );
}

function Arrow() {
  return (
    <svg
      className="inline-block h-[0.62em] w-[0.62em] shrink-0 translate-y-[-0.1em] opacity-35 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-80"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

/** A featured sheet: the screenshot mounted as a print, words underneath. */
function Sheet({
  project,
  index,
  total,
  active,
}: {
  project: Project;
  index: number;
  total: number;
  active: boolean;
}) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={active ? 0 : -1}
      aria-hidden={!active}
      /*
       * Anchors are natively draggable. Leaving that on meant the browser
       * started its own link-drag on the first pixel of a swipe and tore down
       * the pointer stream, so no swipe ever reached the sheet.
       */
      draggable={false}
      className="paper paper-lift group block h-full p-4 sm:p-5"
    >
      {/*
        Only the sheet on top shows its face. The ones behind are blank paper —
        letting their screenshots peek out of the stack turned the fan into a
        row of dimmed thumbnails instead of a pile of pages.
      */}
      <div
        className="flex h-full flex-col transition-opacity"
        style={{
          opacity: active ? 1 : 0,
          /*
           * Asymmetric on purpose. Fading both faces at the same rate left the
           * two sheets double-exposed through the middle of the swap, one set
           * of words showing through the other. The old face leaves at once and
           * the new one waits until the sheets have travelled.
           */
          transitionDuration: active ? "360ms" : "180ms",
          transitionDelay: active ? "240ms" : "0ms",
        }}
      >
      <div className="paper-plate">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          width={900}
          height={520}
          draggable={false}
          className="paper-shot h-[168px] w-full object-cover select-none sm:h-[196px]"
        />
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <span className="text-[0.68rem] tracking-[0.3em] opacity-40">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <h3 className="mt-1.5 flex items-center gap-2 text-xl font-semibold leading-tight sm:text-2xl">
          {project.title}
          <Arrow />
        </h3>
        <div className="paper-rule mt-2 h-px w-12 bg-current/45" />
        <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed opacity-80">
          {project.description}
        </p>
        <div className="mt-4">
          <Chips tech={project.tech} max={5} />
        </div>
      </div>
      </div>
    </a>
  );
}

/** The rest: small slips of the same paper, no images, laid out in a grid. */
function Slip({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="paper paper-lift group flex h-full flex-col p-4"
    >
      <h3 className="flex items-center gap-2 text-base font-semibold leading-snug">
        {project.title}
        <Arrow />
      </h3>
      <div className="paper-rule mt-1.5 h-px w-8 bg-current/45" />
      <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed opacity-70">
        {project.description}
      </p>
      <div className="mt-3">
        <Chips tech={project.tech} max={3} />
      </div>
    </a>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 className="text-2xl md:text-3xl font-semibold tracking-[0.22em] uppercase">
        {children}
      </h2>
      <div className="mt-5 border-t border-dashed border-current/40" />
    </>
  );
}

/*
 * How each sheet sits relative to the one in front. Read sheets fan out to the
 * left, unread ones to the right, every one turned a couple of degrees because
 * a handful of paper never sits square. Sending read sheets away entirely was
 * the first attempt and it made the pile visibly thin out as you advanced,
 * which read as running out rather than moving through.
 */
function sheetStyle(rel: number, drag: number): React.CSSProperties {
  if (rel === 0) {
    return {
      transform: `translate3d(${drag}px, 0, 0) rotate(${drag * 0.012}deg)`,
      opacity: 1,
      zIndex: 30,
    };
  }
  const side = Math.sign(rel);
  const depth = Math.min(Math.abs(rel), 3);
  const step = side * depth;
  return {
    transform: `translate3d(calc(${step} * var(--fan-x)), calc(${depth} * var(--fan-y)), 0) rotate(calc(${step} * var(--fan-r))) scale(${
      1 - depth * 0.048
    })`,
    opacity: Math.abs(rel) > 3 ? 0 : 0.92 - depth * 0.14,
    zIndex: 30 - depth,
    pointerEvents: "none",
  };
}

const SWIPE = 60; // px of travel that counts as "next sheet", not a stray drag

function Deck({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const [offset, setOffset] = useState(0);
  const total = projects.length;

  /*
   * The gesture lives in a ref, not in state. The distance travelled has to be
   * readable synchronously when the pointer lifts — reading it out of a state
   * updater instead made every swipe a no-op, because calling setActive from
   * inside another setter is a side effect React is free to drop.
   */
  const drag = useRef({ id: -1, x: 0, y: 0, live: false, dx: 0 });
  const swiped = useRef(false);

  const go = useCallback(
    (d: number) => setActive((a) => Math.min(Math.max(a + d, 0), total - 1)),
    [total],
  );

  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, live: false, dx: 0 };
  };

  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    /*
     * Wait for the gesture to commit to an axis. Claiming it on the first
     * pixel stopped the page from scrolling when someone flicked down with
     * their thumb over the deck.
     */
    if (!d.live) {
      if (Math.abs(dx) < 8 || Math.abs(dx) <= Math.abs(dy)) return;
      d.live = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    // Resist past either end, so the deck feels bounded rather than broken.
    const past = (dx < 0 && active === total - 1) || (dx > 0 && active === 0);
    d.dx = past ? dx * 0.25 : dx;
    setOffset(d.dx);
  };

  const onUp = () => {
    const { dx, live } = drag.current;
    drag.current = { id: -1, x: 0, y: 0, live: false, dx: 0 };
    setOffset(0);
    swiped.current = live && Math.abs(dx) > 4;
    if (dx <= -SWIPE) go(1);
    else if (dx >= SWIPE) go(-1);
  };

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div
        className="deck mx-auto h-[404px] w-[calc(100%-2rem)] max-w-[520px] cursor-grab select-none active:cursor-grabbing sm:w-full sm:h-[430px]"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        /* A swipe that ends on the sheet must not also open the project. */
        onClickCapture={(e) => {
          if (swiped.current) {
            e.preventDefault();
            e.stopPropagation();
            swiped.current = false;
          }
        }}
      >
        {projects.map((p, i) => (
          <div
            key={p.title}
            className="deck-sheet"
            data-dragging={i === active && offset !== 0 ? "" : undefined}
            style={sheetStyle(i - active, i === active ? offset : 0)}
          >
            <Sheet project={p} index={i} total={total} active={i === active} />
          </div>
        ))}
      </div>

      <div className="mt-7 flex items-center justify-center gap-5">
        <DeckArrow dir={-1} disabled={active === 0} onClick={() => go(-1)} />
        <div className="flex items-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.title}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${p.title}`}
              aria-current={i === active}
              className="deck-dot"
              data-on={i === active ? "" : undefined}
            />
          ))}
        </div>
        <DeckArrow dir={1} disabled={active === total - 1} onClick={() => go(1)} />
      </div>
    </div>
  );
}

function DeckArrow({
  dir,
  disabled,
  onClick,
}: {
  dir: -1 | 1;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 1 ? "Next project" : "Previous project"}
      className="deck-arrow flex h-9 w-9 items-center justify-center rounded-full border border-current/25"
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d={dir === 1 ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"} />
      </svg>
    </button>
  );
}

/*
 * True only once React has hydrated. The deck stacks its sheets on top of one
 * another and hides every face but the front one, so the prerendered HTML would
 * otherwise show one project and two blanks to a reader whose JavaScript never
 * arrives. Written with useSyncExternalStore rather than an effect that sets
 * state, which is the pattern React now flags for cascading renders.
 */
const subscribeNever = () => () => {};
const useHydrated = () =>
  useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );

export function Projects({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  const hydrated = useHydrated();

  return (
    <>
      <PaperFilter />

      <section className="pt-8">
        <Reveal>
          <SectionHeading>Projects</SectionHeading>
        </Reveal>
        <Reveal shift="34px" rise="14px">
          {hydrated ? (
            <div className="mt-9 pb-1">
              <Deck projects={featured} />
            </div>
          ) : (
            <div className="mt-9 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {featured.map((p, i) => (
                <Sheet
                  key={p.title}
                  project={p}
                  index={i}
                  total={featured.length}
                  active
                />
              ))}
            </div>
          )}
        </Reveal>
      </section>

      <section className="pt-14">
        <Reveal>
          <SectionHeading>Also Built</SectionHeading>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 45}
              shift="22px"
              rise="12px"
              className="h-full"
            >
              <Slip project={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
