import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

/**
 * The top of the page, driven entirely by the data passed in. Everything that
 * changes as Julien's year changes — a new role, a reworded line, a different
 * portrait — is a value in `app/page.tsx`, not markup to go hunting through.
 */

export type Role = {
  org: string;
  title: string;
  period: string;
};

export type Profile = {
  photo: { src: string; alt: string };
  /** Lead paragraphs, rendered in order. Bold with <strong> inside the string
   *  is deliberately not supported — pass JSX if a line needs emphasis. */
  lead: React.ReactNode[];
  aside?: React.ReactNode;
};

function RoleRow({ role, first }: { role: Role; first: boolean }) {
  return (
    <div
      data-first={first ? "" : undefined}
      className="role-row grid grid-cols-1 items-baseline gap-x-6 gap-y-0.5 py-3 sm:grid-cols-[minmax(0,1fr)_auto]">
      <p className="min-w-0 text-[1.05rem] leading-snug">
        <span className="font-semibold">{role.org}</span>
        <span className="opacity-70"> — {role.title}</span>
      </p>
      <p className="role-period text-sm sm:text-right">{role.period}</p>
    </div>
  );
}

export function Intro({
  profile,
  experience,
}: {
  profile: Profile;
  experience: Role[];
}) {
  return (
    <>
      {/*
        items-center, not items-start. The portrait is taller than the two
        paragraphs beside it, and top-aligning them left a column of dead space
        under the text that made the whole opening look unfinished.
      */}
      <Reveal>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_220px] md:items-center md:gap-12">
          <div className="space-y-5 text-lg leading-relaxed">
            {profile.lead.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <Image
            src={profile.photo.src}
            alt={profile.photo.alt}
            width={520}
            height={650}
            className="portrait order-first w-full max-w-[220px] justify-self-center rounded-lg object-cover aspect-[4/5] md:order-none md:justify-self-end"
            priority
          />
        </div>
      </Reveal>

      <section className="pt-14">
        <Reveal>
          <SectionHeading>Experience</SectionHeading>
        </Reveal>
        {/*
          Always open. It was a <details> that every reader had to click before
          the page said anything about where he has worked — the one thing most
          of them came for, hidden behind a disclosure triangle.
        */}
        <div className="mt-5">
          {experience.map((role, i) => (
            <Reveal key={role.org + role.period} delay={i * 45}>
              <RoleRow role={role} first={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      {profile.aside && (
        <Reveal>
          <p className="pt-12 text-lg leading-relaxed">{profile.aside}</p>
        </Reveal>
      )}
    </>
  );
}
