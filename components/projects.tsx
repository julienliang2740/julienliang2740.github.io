"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

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

/*
 * Every item, always. This used to cap the list and append a "+3", which says
 * nothing to someone reading the site — they cannot tell whether the hidden
 * three are languages, clouds or nothing much, and there is no way to see them.
 */
function Chips({ tech }: { tech: TechItem[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tech.map((t, i) => (
        <span
          key={`${label(t)}-${i}`}
          className={`border border-current/20 px-2 py-0.5 text-[0.78rem] tracking-wide ${
            struck(t) ? "line-through decoration-2 decoration-current/70" : ""
          }`}
        >
          {label(t)}
        </span>
      ))}
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
function Sheet({ project, active }: { project: Project; active: boolean }) {
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
      className="paper paper-lift group block h-full p-4 sm:p-6"
    >
      {/*
        Only the sheet on top shows its face. The ones behind are blank paper —
        letting their screenshots peek out of the stack turned the fan into a
        row of dimmed thumbnails instead of a pile of pages.
      */}
      {/*
        No transition on the face. The view transition dissolves the whole pile
        from one arrangement to the next, so fading each face separately on top
        of that only reintroduced the blank beat it exists to remove.
      */}
      <div className="flex h-full flex-col" style={{ opacity: active ? 1 : 0 }}>
      <div className="paper-plate">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          width={900}
          height={520}
          draggable={false}
          className="paper-shot h-[180px] w-full object-cover select-none sm:h-[248px]"
        />
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="flex items-center gap-2 text-xl font-semibold leading-tight sm:text-[1.65rem]">
          {project.title}
          <Arrow />
        </h3>
        <p className="mt-3 flex-1 text-base leading-relaxed opacity-80">
          {project.description}
        </p>
        <div className="mt-4">
          <Chips tech={project.tech} />
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
      <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed opacity-75">
        {project.description}
      </p>
      <div className="mt-3">
        <Chips tech={project.tech} />
      </div>
    </a>
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
  const deckRef = useRef<HTMLDivElement>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  /* True while a swap is mid-flight, so a gesture cannot stack another on top. */
  const swapping = useRef(false);

  /*
   * The swap is the same cross-fade one page makes into the next: the browser
   * holds a snapshot of the pile as it stands and dissolves it straight into
   * the new arrangement, both on screen together.
   *
   * It replaces a hand-rolled fade of each sheet's face, which put a beat of
   * blank paper between the two — so going from a dark game screenshot to a
   * white app screenshot flashed the page ground in between. Sliding the
   * sheets during the swap is off for the same reason: the snapshot has to be
   * of the settled arrangement, not of one caught mid-travel.
   */
  const go = useCallback(
    (d: number) => {
      const doc = document as Document & {
        startViewTransition?: (cb: () => void | Promise<void>) => unknown;
      };
      const commit = () => setActive((a) => Math.min(Math.max(a + d, 0), total - 1));
      const stage = stageRef.current;
      if (
        typeof doc.startViewTransition !== "function" ||
        !stage ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        commit();
        return;
      }

      stage.dataset.swapping = "";
      swapping.current = true;
      const done = () => {
        delete stage.dataset.swapping;
        swapping.current = false;
      };
      const vt = doc.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            flushSync(commit);
            resolve();
          }),
      ) as { finished?: Promise<unknown> };
      if (vt?.finished) vt.finished.then(done, done);
      else window.setTimeout(done, 600);
    },
    [total],
  );
  const atStart = active === 0;
  const atEnd = active === total - 1;

  /*
   * A sideways trackpad swipe over the deck moves it, and the sheet tracks the
   * gesture as it goes rather than snapping when some threshold trips.
   *
   * Bound natively rather than through React's onWheel, because React attaches
   * wheel listeners passively and a passive listener cannot preventDefault —
   * without that the browser also scrolls the page sideways under the gesture.
   *
   * The hard part is momentum. One flick is a short burst followed by a tail of
   * decaying events that can run for over a second, and the first version
   * treated that tail as more input: a single flick advanced two sheets, and
   * because its "wait for the stream to go quiet" lock was reset by every one
   * of those tail events, the deck then sat unresponsive until the tail died.
   *
   * So a gesture commits once and then disarms, and the whole tail is swallowed
   * however long it runs. Re-arming needs positive evidence of a new gesture: a
   * gap in the stream, or a delta bigger than the one before it, which momentum
   * — monotonically decaying — never produces. A sustained push that never
   * decays re-arms on its own after half a second so it keeps advancing.
   */
  useEffect(() => {
    const el = deckRef.current;
    if (!el) return;
    /*
     * Travel that counts as a sheet. 90 was a light flick — the deck moved
     * before the gesture felt finished, which read as oversensitive rather
     * than quick. This asks for a deliberate push.
     */
    const COMMIT = 165;
    let acc = 0;
    let armed = true;
    let lastDelta = 0;
    let lastAt = 0;
    let disarmedAt = 0;
    let settle: ReturnType<typeof setTimeout>;

    const onWheel = (e: WheelEvent) => {
      // shiftKey is how a mouse with only a vertical wheel asks to go sideways.
      const dx = e.shiftKey && e.deltaX === 0 ? e.deltaY : e.deltaX;
      if (!e.shiftKey && Math.abs(dx) <= Math.abs(e.deltaY)) return; // a plain scroll
      if (Math.abs(dx) < 1) return;
      e.preventDefault();

      const now = e.timeStamp;
      const gap = now - lastAt;
      lastAt = now;

      /*
       * A view transition freezes painting for its duration but wheel events
       * keep arriving. Left alone they pile up and the pause reads as a gap in
       * the stream, which re-arms the gesture and lets one hard flick spend a
       * second sheet the moment the swap lands. Hold the gesture spent instead.
       */
      if (swapping.current) {
        lastDelta = dx;
        armed = false;
        acc = 0;
        return;
      }

      if (
        gap > 120 || // the stream stopped and started again
        (!armed && Math.abs(dx) > Math.abs(lastDelta) + 1.5) || // a fresh push
        (!armed && now - disarmedAt > 500 && Math.abs(dx) >= 6) // still pushing
      ) {
        armed = true;
        acc = 0;
      }
      lastDelta = dx;
      if (!armed) return; // swallowing the tail of a gesture already spent

      acc += dx;
      const end = (acc > 0 && atEnd) || (acc < 0 && atStart);
      setOffset(-(end ? acc * 0.25 : acc));

      clearTimeout(settle);
      settle = setTimeout(() => setOffset(0), 140);

      if (Math.abs(acc) >= COMMIT && !end) {
        go(acc > 0 ? 1 : -1);
        acc = 0;
        armed = false;
        disarmedAt = now;
        setOffset(0);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      clearTimeout(settle);
    };
  }, [go, atStart, atEnd]);

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
    const past = (dx < 0 && atEnd) || (dx > 0 && atStart);
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
      {/*
        The stage exists so the arrows can sit beside the deck without being
        inside the drag surface — a press on an arrow would otherwise open a
        gesture on the pile.
      */}
      <div ref={stageRef} className="deck-stage mx-auto w-[calc(100%-2rem)] max-w-[620px] sm:w-full">
      <div
        ref={deckRef}
        className="deck h-[458px] w-full cursor-grab select-none active:cursor-grabbing sm:h-[466px]"
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
            <Sheet project={p} active={i === active} />
          </div>
        ))}
      </div>
        <DeckArrow dir={-1} disabled={atStart} onClick={() => go(-1)} />
        <DeckArrow dir={1} disabled={atEnd} onClick={() => go(1)} />
      </div>

      <div className="mt-7 flex items-center justify-center">
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
      className={`deck-arrow deck-nav deck-nav--${dir === 1 ? "next" : "prev"} flex h-9 w-9 items-center justify-center rounded-full`}
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
              {featured.map((p) => (
                <Sheet key={p.title} project={p} active />
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
