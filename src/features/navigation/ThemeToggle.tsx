"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { cn } from "@/shared/lib/cn";

type Theme = "light" | "dark";

/**
 * Toggles between the light and dark themes by flipping `data-theme` on the
 * document element and persisting the choice to localStorage. The initial
 * theme is applied before paint by the inline script in the root layout, so
 * this control only reconciles React state with the DOM after mount.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations("ThemeToggle");
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Ignore storage failures (private mode, disabled storage).
    }
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t(isDark ? "toLight" : "toDark")}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full border border-border text-ink transition-colors hover:bg-surface-subtle focus-visible:outline-none",
        className,
      )}
    >
      {/* Keep the icon stable until mount to avoid a hydration mismatch. */}
      {mounted && !isDark ? (
        <Moon aria-hidden className="size-4" />
      ) : (
        <Sun aria-hidden className="size-4" />
      )}
    </button>
  );
}
