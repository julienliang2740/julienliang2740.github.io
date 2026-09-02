"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SocialLinks } from "@/components/social-links";

// Ink used by the opening scene, so the links stay legible on the paper
// regardless of the theme while the bar itself is invisible.
const INK = "oklch(0.20 0.016 55)";

// A soft paper-coloured halo instead of a bar, so links stay readable where
// they cross the painting's darker strokes.
const HALO =
  "drop-shadow(0 0 3px rgba(247,243,236,0.95)) drop-shadow(0 0 7px rgba(247,243,236,0.75))";

/**
 * Everything sits together on the right. Over the opening scene that side is
 * open paper, while the left is where the willow hangs — icons placed there
 * disappear into the branches.
 *
 * `overlay` lets the bar float over the scene with no background, so the
 * painting isn't cut off by a strip across the top. It picks the solid bar
 * back up as soon as page content scrolls underneath it.
 */
export function Navbar({ overlay = false }: { overlay?: boolean }) {
  const [overScene, setOverScene] = useState(overlay);

  useEffect(() => {
    if (!overlay) return;
    const el = document.querySelector<HTMLElement>("[data-scene]");
    if (!el) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setOverScene(el.getBoundingClientRect().bottom > 72));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, [overlay]);

  const floating = overlay && overScene;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 lg:px-12 w-full transition-colors duration-300 ${
        floating
          ? "bg-transparent border-b border-transparent"
          : "bg-[#faf9f6]/95 dark:bg-[#0f0f0f]/95 backdrop-blur-sm border-b border-[#e5e3e0] dark:border-[#2a2a2a]"
      }`}
      style={floating ? { color: INK } : undefined}
    >
      <div
        className="flex justify-end items-center gap-5 md:gap-8 max-w-full"
        style={floating ? { filter: HALO } : undefined}
      >
        <SocialLinks />
        <span className="h-5 w-px bg-current opacity-25" aria-hidden />
        <Link href="/" className="text-base hover:opacity-70 transition-opacity">
          Home
        </Link>
        <Link href="/blogs" className="text-base hover:opacity-70 transition-opacity">
          Blogs
        </Link>
        <ThemeToggle />
      </div>
    </div>
  );
}
