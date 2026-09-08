import { Navbar } from "@/components/navbar";
import { SereneScroll } from "@/components/serene-scroll";
import { AmbientScene } from "@/components/ambient-scene";
import { Intro, type Profile, type Role } from "@/components/intro";
import { Reveal } from "@/components/reveal";
import { Projects, type Project } from "@/components/projects";

/*
 * Everything the page says lives in these three lists. Adding a role, swapping
 * the portrait or promoting a project is an edit here — the components below
 * take it from there.
 */

const profile: Profile = {
  photo: { src: "/new_headshot_square.jpg", alt: "Julien Liang" },
  lead: [
    <>
      I&apos;m a <strong>Computer Science</strong> student at the University of
      Waterloo building software for startups, enterprise-scale applications,
      and everything in between.
    </>,
    <>
      I am currently a software engineer at <strong>Cloudflare</strong> building
      gateway filtering and routing for MCPs, WARP, and more.
    </>,
  ],
  aside: (
    <>
      Beyond software, I&apos;m deeply passionate about history. I&apos;ve read
      everything from recent works such as{" "}
      <em>1587, a Year of No Significance</em> to 12th-century writings like{" "}
      <em>Ten Essays on Defence</em>.
    </>
  ),
};

const experience: Role[] = [
  { org: "Cloudflare", title: "SWE, Gateway Routing and Filtering", period: "Summer 2026" },
  { org: "Cisco", title: "SWE, IOS XR Simulation Platforms + Agentic Services", period: "Summer 2025" },
  { org: "Ford", title: "SWE, IPC/HMI", period: "Winter 2025" },
  { org: "Blackberry QNX", title: "SWE, RTOS File System", period: "Summer 2024" },
];

const projects: Project[] = [
  {
    title: "PolyTerminal",
    featured: true,
    description:
      "A PvP strategy, predictions, and data visualization platform for Polytopia players to optimize game performance.",
    href: "https://polyterminator.com/",
    imageSrc: "/polyterminal.png",
    imageAlt: "PolyTerminal project preview",
    tech: [
      "Python",
      "Java",
      "AWS",
      "MySQL",
      "Docker",
      "React",
      "JavaScript",
    ],
  },
  {
    title: "Remy",
    featured: true,
    description:
      "An AI kitchen coach that takes you from random ingredients in the fridge to simple meals and grocery savings.",
    href: "https://github.com/julienliang2740/remy-agent-layer",
    imageSrc: "/remy.png",
    imageAlt: "Remy project preview",
    tech: ["Python", "TypeScript", "MediaPipe", "Cloudflare D1 + R2"],
  },
  {
    title: "Sekoa AI",
    featured: true,
    description:
      "AI-Native Marketing Agency creating UGC promotional content for business users.",
    href: "https://sekoa.ai/",
    imageSrc: "/sekoa.png",
    imageAlt: "Sekoa AI project preview",
    tech: ["Python", "TypeScript", "Supabase", "Cloudflare R2"],
  },
  {
    title: "Sparkflow",
    description:
      "An AI mentor that crafts interactive lessons built from scratch for each student.",
    href: "https://sparkflowlearn.pages.dev/",
    imageSrc: "/sparkflow-logo.png",
    imageAlt: "Sparkflow project preview",
    tech: ["TypeScript", "React", "Cloudflare Pages"],
  },
  {
    title: "Studytype",
    description:
      "Monkeytype for study notes.",
    href: "https://study-type.pages.dev/",
    imageSrc: "/study-type.png",
    imageAlt: "Studytype project preview",
    tech: ["TypeScript", "Cloudflare Workers", "Cloudflare R2"],
  },
  {
    title: "UTMIST & Lovelytics",
    description:
      "An intelligent task automation system that leverages Large Language Models (LLMs) to help business users automate complex workflows without requiring technical expertise.",
    href: "https://github.com/julienliang2740/Lovelytics",
    imageSrc: "/new_lovelytics.png",
    imageAlt: "Business automation project preview",
    tech: ["Python", "React", "DSPy", "LangChain", "LangGraph", "MongoDB"],
  },
  {
    title: "CivilizAgent",
    description:
      "A historical simulation program powered by an LLM multi-agent system, modelling both interactions between countries and internal politics.",
    href: "https://github.com/julienliang2740/CivilizAgent-Demo",
    imageSrc: "/civilizagent.png",
    imageAlt: "Multi-agent simulation project preview",
    tech: ["Python", "RAG", "Pydantic"],
  },
  {
    title: "TuneScriber",
    description:
      "A web application that transforms music files into separate tracks and sheet music scores in PDF format based on instrumentation.",
    href: "https://devpost.com/software/melodymapper",
    imageSrc: "/tunescriber.png",
    imageAlt: "Multi-agent simulation project preview",
    tech: ["Python", "React", "Flask"],
  },
  {
    title: "ConfederAgent",
    description:
      "An AI-powered parliament simulation to model the legislative process. Made 10x faster by async execution and fine-tuning tiny <10B models.",
    href: "https://github.com/julienliang2740/ConfederAgent-Beta-Version",
    imageSrc: "/confederagent.png",
    imageAlt: "Multi-agent simulation project preview",
    tech: ["Python", "QLoRA", "PyTorch"],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip w-full">
      <Navbar overlay />
      <AmbientScene variant="home" />

      <SereneScroll />

      <div
        id="page-content"
        className="relative z-10 -mt-[38svh] px-8 pb-16 pt-24 md:px-16 lg:px-24"
      >
        <div className="mx-auto max-w-3xl">
          <Intro profile={profile} experience={experience} />

          <div className="pt-16">
            <Projects projects={projects} />
          </div>

          <Reveal>
            <p className="pt-14 text-lg leading-relaxed">
              If any of this seems interesting, feel free to reach out via
              LinkedIn or email (jh2liang@uwaterloo.ca) &mdash; I&apos;d love to
              chat!
            </p>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
