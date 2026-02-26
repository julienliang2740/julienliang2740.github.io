import Image from "next/image";
import { Navbar } from "@/components/navbar";

const projects = [
  {
    title: "PolyTerminal",
    description:
      "A PvP strategy, predictions, and data visualization platform for Polytopia players to optimize game performance.",
    href: "https://polyterminator.com/",
    imageSrc: "/polyterminal.png",
    imageAlt: "PolyTerminal project preview",
    tech: ["Python", "Java", "AWS", "MySQL", "Docker", "React", "JavaScript"],
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
    imageSrc: "/confederagent.jpg",
    imageAlt: "Multi-agent simulation project preview",
    tech: ["Python", "QLoRA", "PyTorch"],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden w-full">
      <Navbar />

      <div className="px-8 py-16 md:px-16 lg:px-24 pt-24 md:pt-28">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 flex flex-col md:flex-row items-center gap-8">
            <Image
              src="/new_headshot_square.jpg"
              alt="Julien Liang"
              width={200}
              height={200}
              className="rounded-full"
              priority
            />
            <h1 className="text-3xl md:text-4xl leading-tight">
              I&apos;m Julien - a software engineer who builds systems and makes things happen
            </h1>
          </div>

          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              I&apos;m a <strong>Computer Science</strong> student at the University of Waterloo.
            </p>

            <div className="space-y-4">
              <p>
                Recently, I was a software engineer at <strong>Cisco</strong>, where I built a simulation platform and integrated agentic services 
                to automate configurations for hundreds of complex router workflows. 
                Outside of work, I&apos;m the creator of { " " }
                  <strong>
                    <a
                      href="https://polyterminator.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:opacity-70 transition-opacity"
                    >
                      PolyTerminal
                    </a>
                  </strong>
                , an AI-powered strategy, predictions, and data visualization platform for Polytopia PvP players.

              </p>

              <details className="group">
                <summary className="cursor-pointer list-none flex items-center gap-1.5 hover:opacity-70 transition-opacity">
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-open:rotate-90"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Work Experience
                </summary>
                <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                  <li>
                    <strong>Cisco</strong> — SWE, IOS XR Simulation Platforms + Agentic Services (Summer 2025)
                  </li>
                  <li>
                    <strong>Ford</strong> — SDE, IPC/HMI (Winter 2025)
                  </li>
                  <li>
                    <strong>Blackberry QNX</strong> — SDE, RTOS File System (Summer 2024)
                  </li>
                </ul>
              </details>

              <details className="group">
                <summary className="cursor-pointer list-none flex items-center gap-1.5 hover:opacity-70 transition-opacity">
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-open:rotate-90"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Research + Projects
                </summary>
                <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                  <li>
                    <strong>
                      <a
                        href="https://polyterminator.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:opacity-70 transition-opacity"
                      >
                        PolyTerminal
                      </a>
                    </strong> — PolyTopia PvP predictions and data visualization 
                  </li>
                  <li>
                    <strong>UofT Machine Intelligence Team</strong> — Intelligent task automation
                  </li>
                  <li>
                    <strong>Stanford University</strong> — Multi-agent simulations
                  </li>
                </ul>
              </details>
            </div>

            <p>
              I've built across many areas in the past, with special focus on:
            </p>

            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Backend application systems</li>
              <li>Data platforms and analytics</li>
              <li>Distributed systems</li>
              <li>Agentic Services and Applied AI</li>
            </ul>

            <p>
              Beyond software, I'm deeply passionate about history. I've read everything from
              recent works such as <em>1587, a Year of No Significance (万历十五年)</em> { " " }
              to 12th-century writings like <em>Ten Essays on Defence (美芹十论)</em>.
            </p>




            <section className="pt-8">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-[0.22em] uppercase">
                Projects
              </h2>
              <div className="mt-5 border-t border-dashed border-current/40" />

              <div className="mt-8 space-y-8">
                {projects.map((project) => (
                  <article
                    key={project.title}
                    className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 items-start"
                  >
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full overflow-hidden rounded-xl border border-current/20 hover:opacity-85 transition-opacity"
                    >
                      <Image
                        src={project.imageSrc}
                        alt={project.imageAlt}
                        width={600}
                        height={340}
                        className="h-[190px] w-full object-cover"
                      />
                    </a>

                    <div className="space-y-3">
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <h3 className="text-xl md:text-2xl font-semibold leading-tight">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span
                              key={`${project.title}-${tech}`}
                              className="rounded-md border border-current/15 bg-current/5 px-2.5 py-0.5 text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p>{project.description}</p>

                    </div>
                  </article>
                ))}
              </div>
            </section>




            <p>
              If any of this seems interesting, feel free to reach out via LinkedIn or email (jh2liang@uwaterloo.ca) - I'd love to chat!
            </p>



          </div>
        </div>
      </div>
    </main>
  );
}
