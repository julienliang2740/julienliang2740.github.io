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

const LAYERS: Record<Variant, { className: string; src: string }[]> = {
  blog: [
    { className: "ambient-scene__far", src: "/scene/blog/mountain.webp" },
    { className: "ambient-scene__right", src: "/scene/blog/blossom.webp" },
    { className: "ambient-scene__left", src: "/scene/blog/willow.webp" },
  ],
  home: [
    { className: "ambient-scene__far", src: "/scene/mountains_village.webp" },
    { className: "ambient-scene__left", src: "/scene/tree.webp" },
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
        // eslint-disable-next-line @next/next/no-img-element
        <img key={layer.src} className={layer.className} src={layer.src} alt="" />
      ))}
    </div>
  );
}
