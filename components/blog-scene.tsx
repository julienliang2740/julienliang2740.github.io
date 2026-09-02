"use client";

/**
 * Ambient backdrop for the blog pages.
 *
 * Deliberately not scroll-driven — it is scenery, not a sequence. It sits
 * fixed behind the page and drifts on very slow loops so it reads as alive
 * rather than animated. Layers are pushed to the edges so the column of text
 * runs over clear ground.
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
      <img className="blog-scene__mountains" src="/scene/mountains_village.webp" alt="" />
      <img className="blog-scene__tree" src="/scene/tree.webp" alt="" />
      {/* eslint-enable @next/next/no-img-element */}
    </div>
  );
}
