"use client";

/**
 * Ambient backdrop behind a page's text.
 *
 * Deliberately not scroll-driven — it is scenery, not a sequence. It sits
 * fixed behind the page and drifts on very slow loops so it reads as alive
 * rather than animated, with the layers pushed to the edges so the column of
 * text runs over clear ground.
 *
 * Two sets of art:
 *   "blog" — the colour painting: willow left, blossom right, mountain behind.
 *   "home" — the opening scene's own ink layers, so scrolling past the hero
 *            carries the same landscape down the rest of the page rather than
 *            dropping onto a blank sheet.
 *
 * `intensity` scales every layer's opacity: an index carries the scene at full
 * strength, a page of running text pulls it back so the writing dominates.
 */

type Variant = "blog" | "home";

/*
 * Layers name a CSS variable rather than a file. The stylesheet points each at
 * the day or night painting, so the theme swap needs no JavaScript and cannot
 * flash the wrong set before hydration.
 */
const LAYERS: Record<Variant, { className: string; art: string }[]> = {
  blog: [
    { className: "ambient-scene__far", art: "--blog-mountain" },
    { className: "ambient-scene__right", art: "--blog-blossom" },
    { className: "ambient-scene__left", art: "--blog-willow" },
  ],
  home: [
    { className: "ambient-scene__far", art: "--scene-mountains" },
    { className: "ambient-scene__left", art: "--scene-tree" },
  ],
};

export function AmbientScene({
  variant = "blog",
  intensity = 1,
}: {
  variant?: Variant;
  intensity?: number;
}) {
  return (
    <div
      aria-hidden
      className={`ambient-scene ambient-scene--${variant}`}
      style={{ "--scene-intensity": intensity } as React.CSSProperties}
    >
      {LAYERS[variant].map((layer) => (
        <div
          key={layer.art}
          className={`scene-layer ${layer.className}`}
          style={{ backgroundImage: `var(${layer.art})` }}
        />
      ))}
    </div>
  );
}
