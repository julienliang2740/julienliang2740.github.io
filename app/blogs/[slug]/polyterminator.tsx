"use client";

import React from "react";
import Image from "next/image";

/**
 * OPTIONAL: keep these if your page uses them.
 * Delete any imports you don't need.
 */
// import LatexRenderer from "@/components/blog/LatexRenderer";
// import WallpaperPlayground from "@/components/blog/WallpaperPlayground";
// import KissingNumber from "@/components/blog/KissingNumber";

/**
 * OPTIONAL: simple reusable classnames (edit to match your site).
 */
const sectionCls = "my-12 space-y-3";
const h2Cls = "text-xl md:text-2xl font-semibold";
const h3Cls = "text-lg md:text-xl font-semibold";
const paragraphCls = "leading-relaxed";

/**
 * OPTIONAL: placeholder visual component you can swap with your own SVG/image.
 */
const HeroVisual: React.FC = () => {
  return (
    <div className="my-8 flex items-center justify-center">
      {/* <div className="w-[min(80vw,520px)] h-[220px] rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center">
        <span className="text-sm text-neutral-500">[Your image / SVG / animation here]</span>
      </div> */}

      <a
        href="https://polyterminator.com"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Image
          src="/polyterminal.png"
          alt="PolyTerminal preview"
          width={900}
          height={500}
          className="w-[min(80vw,900px)] h-auto rounded-xl shadow-md hover:opacity-90 transition-opacity cursor-pointer"
        />
      </a>
    </div>
  );
};

export default function BlogPostTemplate() {
  return (
    <>
      {/* Intro */}
      <section className={sectionCls}>
        <HeroVisual />

        <h2 className={h2Cls}>
          From losing game after game, to building a data and AI driven competitive edge
        </h2>
      </section>

      {/* Inspiration */}
      <section className={sectionCls}>
        <h2 className={h2Cls}>Inspiration:</h2>

        <p className={paragraphCls}>
          Polytopia is my favourite game to play, especially the PvP mode where you’re up against other
          real players. If you’ve ever played the game before you know the feeling: clean UI, fast
          turns, deep strategy beneath simple mechanics. Every tribe feels different. Every map has
          its unique features. There’s something so elegant about it all.
        </p>

        <p className={paragraphCls}>Is what I said until I lost 30+ games in a row.</p>

        <p className={paragraphCls}>
          Not just a few unlucky games. It was round after round after round. It got so bad my ELO
          dropped into double digits at some point (you start with 1000 ELO, btw).
        </p>

        <p className={paragraphCls}>
          First I thought it was bad RNG, then bad tactics. But eventually I came to terms with the
          truth: I wasn’t calculating anything. I blindly charged into matches with zero data and no
          analysis - just vibes. Sure it might’ve worked from time to time but queueing up and
          hoping for the best is not going to get me anywhere in the long run.
        </p>

        <p className={paragraphCls}>
          In traditional sports, teams don’t just charge into battle hoping to win. They study film.
          They analyze matchups. They adjust strategy based on data and track stats obsessively.
        </p>

        <p className={paragraphCls}>If I wanted to stop losing, I needed to leverage data.</p>
      </section>

      {/* Early Attempts */}
      <section className={sectionCls}>
        <h2 className={h2Cls}>Early Attempts: The Spreadsheet Era</h2>

        <p className={paragraphCls}>
          In the beginning there was a spreadsheet. I had no idea what actually mattered so I
          tracked everything: map size, map type, my tribe, opponent tribes, how many turns, and even
          the time of day I was playing. At first, the most obvious thing was just seeing my ELO
          trend as it would rise and fall and fall and fall.
        </p>

        <p className={paragraphCls}>Interesting? Sure.</p>
        <p className={paragraphCls}>Helpful? Not really.</p>

        <p className={paragraphCls}>
          I noticed that I tended to do better against low-ELO opponents (surprise surprise). I
          wondered if I could just play low-ELO opponents, but that isn’t exactly satisfying nor
          competitive.
        </p>

        <p className={paragraphCls}>At ~200 games patterns started appearing.</p>

        <p className={paragraphCls}>On certain map types, opponents overwhelmingly picked specific tribes.</p>
        <p className={paragraphCls}>On some map types, I consistently performed well with certain tribes.</p>
        <p className={paragraphCls}>With others? My win rate was just sad.</p>

        <p className={paragraphCls}>
          None of this was random. There were structural advantages baked into the combination of
          map type, map size, and tribe matchup. I was ignoring all this metadata until now. That
          was the turning point.
        </p>
      </section>

      {/* Building PolyTerminal */}
      <section className={sectionCls}>
        <h2 className={h2Cls}>Building PolyTerminal:</h2>

        <p className={paragraphCls}>
          The spreadsheet wasn’t scalable or visual, so it was time to cash in on my CS degree and
          make an app that anyone could use.
        </p>

        <p className={paragraphCls}>So I built PolyTerminal.</p>

        <p className={paragraphCls}>
          PolyTerminal is an online analytics and AI-powered analysis platform for Polytopia PvP
          matches. Instead of manually scanning rows of data, you can:
        </p>

        <ul className="list-disc pl-6 space-y-1">
          <li>Track ELO trends over time</li>
          <li>Analyze win/loss rates by map type and tribe</li>
          <li>See which tribes opponents tend to pick</li>
          <li>Identify statistically advantageous matchups</li>
          <li>Evaluate whether accepting a match is actually worth your time</li>
        </ul>

        <p className={paragraphCls}>Instead of playing on vibes, you play on data.</p>

        <p className={paragraphCls}>One of the biggest realizations from using PolyTerminal was this:</p>

        <p className={paragraphCls}>You don’t need to win every possible game.</p>
        <p className={paragraphCls}>You need to win the right games.</p>

        <p className={paragraphCls}>
          On certain maps with certain tribes, your expected value is simply higher. If you
          systematically choose advantageous situations, your ELO compounds over time.
        </p>

        <p className={paragraphCls}>It’s not about being lucky.</p>
        <p className={paragraphCls}>It’s about pre-selecting favorable battles.</p>
{/* 
        <p className={paragraphCls}>As Sun Tzu wrote:</p>
        <p className={paragraphCls}>胜兵先胜而后求战，败兵先战而后求胜</p> */}
        <p className={paragraphCls}>The victorious army wins first and then seeks battle.</p>

        <p className={paragraphCls}>PolyTerminal helps you win before the match even starts.</p>
      </section>

      {/* This is just the beginning */}
      <section className={sectionCls}>
        <h2 className={h2Cls}>This is just the beginning:</h2>

        <p className={paragraphCls}>
          PolyTerminal primarily analyzes metadata, things like who played who, the map, the tribes,
          and ELO counts.
        </p>

        <p className={paragraphCls}>When used well this already yields enormous strategic leverage.</p>

        <p className={paragraphCls}>But the real vision goes much further.</p>

        <p className={paragraphCls}>
          The long-term goal is to build a system that adapts to your specific playstyle and helps
          you improve across all games - not just the ones you’re already good at. This means
          identifying early-game decisions, detecting common expansion inefficiencies, adjusting
          recommendations based on user-specific tendencies, and more.
        </p>

        <p className={paragraphCls}>
          We’re going from playing advantageous maps to an advantage on EVERY map.
        </p>

        <p className={paragraphCls}>
          This is where PolyTerminator comes in. The ultimate plan is to build a system that helps
          you methodically dominate any and every Polytopia game.
        </p>
      </section>

      {/* Next Steps */}
      <section className={sectionCls}>
        <h2 className={h2Cls}>Next Steps:</h2>

        <p className={paragraphCls}>
          There’s a lot to build, so here’s two things I’m focusing on for now:
        </p>

        <h3 className={h3Cls}>1. Make data tracking frictionless</h3>

        <p className={paragraphCls}>Right now, match data entry is manual.</p>

        <p className={paragraphCls}>That’s not scalable.</p>

        <p className={paragraphCls}>
          The goal is to support screenshot uploads and match link ingestion for automatic parsing.
        </p>

        <p className={paragraphCls}>
          The key is to do it in a cost-efficient way. Running heavy models for every upload isn’t
          realistic, especially if I don’t want someone turning my AWS bill into a crypto mining
          operation.
        </p>

        <p className={paragraphCls}>
          So I’m actively experimenting with lightweight pipelines for ingestion and extraction.
        </p>

        <h3 className={h3Cls}>2. Go beyond metadata</h3>

        <p className={paragraphCls}>The next frontier is analyzing the match itself.</p>

        <p className={paragraphCls}>
          Early game Polytopia is relatively deterministic compared to mid-late game chaos. That
          makes it a good starting point.
        </p>

        <p className={paragraphCls}>
          If we can extract meaningful early-game patterns and compare them against winning
          baselines, we can evolve from pure analytics to live guidance.
        </p>

        <p className={paragraphCls}>This begins our journey from dashboard to coach.</p>
      </section>

      {/* Closing Thoughts */}
      <section className={sectionCls}>
        <h2 className={h2Cls}>Closing Thoughts:</h2>

        <p className={paragraphCls}>
          If you play Polytopia competitively, try{" "}
          <strong>
            <a
              href="https://polyterminator.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-70 transition-opacity"
            >
              PolyTerminal
            </a>.
          </strong>
        </p>


        <p className={paragraphCls}>What stats do you wish you had?</p>
        <p className={paragraphCls}>What decisions feel unclear before accepting a match?</p>
        <p className={paragraphCls}>What early-game situations consistently trip you up?</p>

        <p className={paragraphCls}>
          You can message me directly, or reach out at aquarion@polyterminator.com
        </p>

        <p className={paragraphCls}>PolyTerminal started because I was losing. It evolved because patterns emerged. It continues because competitive systems reward structured thinking.
        </p>

        <p className={paragraphCls}>Games are systems. Systems can be modeled.</p>

        <p className={paragraphCls}>
          This is Blog 1 in the PolyTerminator journey, where we build something that makes
          competitive improvement systematic.
        </p>

        <p className={paragraphCls}>Win first. Then seek battle.</p>
      </section>
    </>
  );
}