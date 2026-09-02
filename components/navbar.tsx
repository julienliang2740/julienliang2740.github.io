"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SocialLinks } from "@/components/social-links";

// Ink and halo track the scene's own palette, so the links stay legible on
// paper by day and on the night painting after dark, while the bar itself
// stays invisible over the art.
const INK = "var(--scene-ink)";
const HALO = "var(--scene-halo)";

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
          : "bg-[#ece6da]/95 dark:bg-[#2c3947]/95 backdrop-blur-sm border-b border-[#ded7c9] dark:border-[#3d4c5b]"
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
