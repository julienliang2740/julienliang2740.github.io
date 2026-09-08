"use client";

import Image from "next/image";
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

function Chips({ tech }: { tech: TechItem[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((t, i) => (
        <span
          key={`${label(t)}-${i}`}
          className={`rounded-md border border-current/15 bg-current/5 px-2.5 py-0.5 text-sm ${
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
      className="inline-block h-[0.7em] w-[0.7em] shrink-0 translate-y-[-0.05em] opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-70"
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

/**
 * A featured project. Image and words sit side by side and swap sides down the
 * column, which keeps three of them from reading as three of the same card —
 * the eye has somewhere new to land each time. Full-width stacked images were
 * the other candidate; three screenshots at that size fought each other and
 * pushed the rest of the page a screen and a half further down.
 */
function Feature({
  project,
  index,
  flip,
}: {
  project: Project;
  index: number;
  flip: boolean;
}) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group grid grid-cols-1 items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10"
    >
      <div
        className={`overflow-hidden rounded-xl border border-current/20 ${
          flip ? "md:order-2" : ""
        }`}
      >
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          width={900}
          height={520}
          className="h-[200px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] md:h-[240px]"
        />
      </div>
      <div className={flip ? "md:order-1" : ""}>
        <span className="text-xs tracking-[0.18em] opacity-45">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-1 flex items-center gap-1.5 text-xl font-semibold leading-tight md:text-2xl">
          {project.title}
          <Arrow />
        </h3>
        <p className="mt-2 opacity-85">{project.description}</p>
        <div className="mt-4">
          <Chips tech={project.tech} />
        </div>
      </div>
    </a>
  );
}

/** Everything else: one quiet line each, no images competing for attention. */
function IndexRow({ project, first }: { project: Project; first: boolean }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group grid grid-cols-1 items-baseline gap-x-6 gap-y-1 py-4 transition-colors hover:bg-current/5 md:grid-cols-[minmax(0,1fr)_auto] ${
        first ? "" : "border-t border-dashed border-current/25"
      }`}
    >
      <div className="min-w-0">
        <h3 className="flex items-center gap-1.5 text-lg font-semibold leading-snug">
          {project.title}
          <Arrow />
        </h3>
        <p className="mt-0.5 text-base opacity-70">{project.description}</p>
      </div>
      <span className="text-sm opacity-55 md:text-right">
        {project.tech.map(label).join(" · ")}
      </span>
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

export function Projects({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <section className="pt-8">
        <Reveal>
          <SectionHeading>Selected Work</SectionHeading>
        </Reveal>
        <div className="mt-8 space-y-12 md:space-y-14">
          {featured.map((p, i) => (
            <Reveal key={p.title}>
              <Feature project={p} index={i} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pt-16">
        <Reveal>
          <SectionHeading>Also Built</SectionHeading>
        </Reveal>
        <div className="mt-2">
          {rest.map((p, i) => (
            <Reveal key={p.title}>
              <IndexRow project={p} first={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
