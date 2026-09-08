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

function Chips({ tech, max }: { tech: TechItem[]; max?: number }) {
  const shown = max ? tech.slice(0, max) : tech;
  const extra = max ? tech.length - shown.length : 0;
  return (
    <div className="flex flex-wrap gap-1.5">
      {shown.map((t, i) => (
        <span
          key={`${label(t)}-${i}`}
          className={`rounded-md border border-current/15 bg-current/5 px-2 py-0.5 text-[0.8rem] ${
            struck(t) ? "line-through decoration-2 decoration-current/70" : ""
          }`}
        >
          {label(t)}
        </span>
      ))}
      {extra > 0 && (
        <span className="px-1 py-0.5 text-[0.8rem] opacity-50">+{extra}</span>
      )}
    </div>
  );
}

function Arrow() {
  return (
    <svg
      className="inline-block h-[0.7em] w-[0.7em] shrink-0 translate-y-[-0.05em] opacity-30 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-80"
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

/** A featured project card: image plate on top, words below. */
function Card({ project, index }: { project: Project; index: number }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="proj-card group flex h-full flex-col overflow-hidden rounded-2xl"
    >
      <div className="overflow-hidden">
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          width={900}
          height={520}
          className="proj-shot h-[160px] w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[0.7rem] tracking-[0.18em] opacity-40">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-1 flex items-center gap-1.5 text-lg font-semibold leading-tight">
          {project.title}
          <Arrow />
        </h3>
        <div className="proj-rule mt-2 h-px w-10 bg-current/40" />
        <p className="mt-2.5 flex-1 text-[0.95rem] leading-relaxed opacity-80">
          {project.description}
        </p>
        <div className="mt-4">
          <Chips tech={project.tech} max={4} />
        </div>
      </div>
    </a>
  );
}

/** The rest: little cards, text only, so they read as a quiet second tier. */
function MiniCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="proj-card group flex h-full flex-col rounded-xl p-4"
    >
      <h3 className="flex items-center gap-1.5 text-base font-semibold leading-snug">
        {project.title}
        <Arrow />
      </h3>
      <div className="proj-rule mt-1.5 h-px w-8 bg-current/40" />
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
 * Every card glides in from the same side rather than simply fading up, and
 * they overlap heavily — a 70ms step reads as one gesture unrolling, the way a
 * handscroll opens, where a longer stagger reads as the page still loading.
 * A purely vertical rise of a few pixels didn't read as movement at all.
 */
const STEP = 70;
const SHIFT = "34px";

export function Projects({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <>
      <section className="pt-8">
        <Reveal>
          <SectionHeading>Projects</SectionHeading>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * STEP}
              shift={SHIFT}
              rise="14px"
              className="h-full"
            >
              <Card project={p} index={i} />
            </Reveal>
          ))}
        </div>
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
              <MiniCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
