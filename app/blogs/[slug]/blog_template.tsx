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

      <Image
        src="/polyterminal.png"
        alt="PolyTerminal preview"
        width={900}
        height={500}
        className="w-[min(80vw,900px)] h-auto rounded-xl shadow-md"
      />

    </div>
  );
};

export default function BlogPostTemplate() {
  return (
    <>
      {/* Intro */}
      <section className={sectionCls}>
        <HeroVisual />

        <h2 className={h2Cls}>[Title / hook]</h2>

        <p className={paragraphCls}>[Intro paragraph 1]</p>
        <p className={paragraphCls}>[Intro paragraph 2]</p>



        {/* Example: optional math/latex
        <p className={paragraphCls}>
          Here is some math: <LatexRenderer>{"x^2 + y^2 = 1"}</LatexRenderer>
        </p>
        */}
      </section>

      {/* Section 1 */}
      <section className={sectionCls}>
        <h2 className={h2Cls}>[Section heading]</h2>
        <p className={paragraphCls}>[Section content]</p>

        <h3 className={h3Cls}>[Subheading]</h3>
        <p className={paragraphCls}>[More content]</p>

        {/* Example list */}
        <ul className="list-disc pl-6 space-y-1">
          <li>[Bullet 1]</li>
          <li>[Bullet 2]</li>
          <li>[Bullet 3]</li>
        </ul>
      </section>

      {/* Section 2 (optional interactive/widget placeholder) */}
      <section className={sectionCls}>
        <h2 className={h2Cls}>[Interactive / demo section]</h2>
        <p className={paragraphCls}>[Explain what the user should do here]</p>

        {/* Uncomment and replace with your component
        <WallpaperPlayground />
        */}
        <div className="mt-4 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4">
          <span className="text-sm text-neutral-500">[Your interactive component here]</span>
        </div>
      </section>

      {/* Conclusion */}
      <section className={sectionCls}>
        <h2 className={h2Cls}>[Conclusion]</h2>
        <p className={paragraphCls}>[Wrap-up + key takeaway]</p>
      </section>
    </>
  );
}