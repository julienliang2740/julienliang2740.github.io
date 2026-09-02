"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Deliberately not "theme". The previous version wrote the active theme to
 * that key on every mount, back when the default was dark — so every visitor
 * ended up with an explicit "dark" saved whether or not they ever chose it,
 * and switching the default to light could never take effect for them. A new
 * key ignores those, and we now only write on an actual toggle.
 */
const STORAGE_KEY = "theme-v2";

function readStoredTheme(): Theme | null {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return readStoredTheme() ?? "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const applyToggle = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      // Persist only a deliberate choice, so the default stays changeable.
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* private mode / storage disabled — the toggle still works for this visit */
      }
      return next;
    });
  };

  /*
   * Dissolve day into night the same way one page dissolves into the next.
   * Day and night are different paintings, so flipping them in a single frame
   * is the same hard cut a page swap was — the browser holds a snapshot of the
   * old theme and cross-fades it into the new one, both on screen together.
   */
  const toggleTheme = () => {
    const doc = document as Document & {
      startViewTransition?: (cb: () => void | Promise<void>) => unknown;
    };
    if (
      typeof doc.startViewTransition !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      applyToggle();
      return;
    }
    doc.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          flushSync(applyToggle);
          resolve();
        }),
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
