"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ColorTheme = "light" | "dark";

type ThemeToggleProps = {
  className?: string;
  storageKey?: string;
  defaultTheme?: ColorTheme | "system";
  onThemeChange?: (theme: ColorTheme) => void;
};

function applyTheme(theme: ColorTheme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

export function ThemeToggle({
  className,
  storageKey = "zayit-color-theme",
  defaultTheme = "system",
  onThemeChange,
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<ColorTheme | null>(null);
  const followsSystem = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    let storedTheme: ColorTheme | null = null;

    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored === "light" || stored === "dark") storedTheme = stored;
    } catch {
      // Storage can be unavailable in privacy-restricted browsing contexts.
    }

    followsSystem.current = !storedTheme && defaultTheme === "system";
    const initialTheme =
      storedTheme ??
      (defaultTheme === "system"
        ? media.matches
          ? "dark"
          : "light"
        : defaultTheme);

    applyTheme(initialTheme);
    const initialStateFrame = window.requestAnimationFrame(() => {
      setTheme(initialTheme);
    });

    const handleSystemTheme = (event: MediaQueryListEvent) => {
      if (!followsSystem.current) return;
      const nextTheme: ColorTheme = event.matches ? "dark" : "light";
      applyTheme(nextTheme);
      setTheme(nextTheme);
      onThemeChange?.(nextTheme);
    };

    media.addEventListener("change", handleSystemTheme);
    return () => {
      window.cancelAnimationFrame(initialStateFrame);
      media.removeEventListener("change", handleSystemTheme);
    };
  }, [defaultTheme, onThemeChange, storageKey]);

  const toggleTheme = useCallback(() => {
    const nextTheme: ColorTheme = theme === "dark" ? "light" : "dark";
    followsSystem.current = false;

    try {
      window.localStorage.setItem(storageKey, nextTheme);
    } catch {
      // The preference still applies for the current page when storage fails.
    }

    applyTheme(nextTheme);
    setTheme(nextTheme);
    onThemeChange?.(nextTheme);
  }, [onThemeChange, storageKey, theme]);

  const isDark = theme === "dark";
  const label = isDark ? "Use light theme" : "Use dark theme";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("relative overflow-hidden", className)}
      aria-label={label}
      aria-pressed={theme ? isDark : undefined}
      title={label}
      onClick={toggleTheme}
    >
      <Sun
        aria-hidden="true"
        className={cn(
          "absolute size-4 transition-[opacity,transform] duration-300 motion-reduce:transition-none",
          isDark ? "scale-0 opacity-0" : "scale-100 opacity-100",
        )}
      />
      <Moon
        aria-hidden="true"
        className={cn(
          "absolute size-4 transition-[opacity,transform] duration-300 motion-reduce:transition-none",
          isDark ? "scale-100 opacity-100" : "scale-0 opacity-0",
        )}
      />
    </Button>
  );
}
