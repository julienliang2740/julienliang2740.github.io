"use client";

/**
 * Ambient backdrop for the blog pages.
 *
 * Deliberately not scroll-driven — it is scenery, not a sequence. It sits
 * fixed behind the page and drifts on very slow loops so it reads as alive
 * rather than animated. The willow holds the left, the blossom the right, and
 * the mountain sits far back between them, leaving the text column clear.
 *
 * The stairs and the figures are left out: they are the busiest, most
 * story-carrying parts of the painting, and behind running text they pull the
 * eye off the words. Both are in /scene/blog if we want to try them.
 *
 * `intensity` scales every layer's opacity: the index carries the scene at
 * full strength, an individual post pulls it back so the writing dominates.
 */
export function BlogScene({ intensity = 1 }: { intensity?: number }) {
  return (
    <div
      aria-hidden
      className="blog-scene"
      style={{ "--scene-intensity": intensity } as React.CSSProperties}
    >
      {/* eslint-disable @next/next/no-img-element */}
      <img className="blog-scene__mountain" src="/scene/blog/mountain.webp" alt="" />
      <img className="blog-scene__blossom" src="/scene/blog/blossom.webp" alt="" />
      <img className="blog-scene__willow" src="/scene/blog/willow.webp" alt="" />
      {/* eslint-enable @next/next/no-img-element */}
    </div>
  );
}
