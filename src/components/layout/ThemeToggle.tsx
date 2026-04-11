"use client";

import { useTheme } from "@/components/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="grid h-7 w-7 place-items-center rounded-full border border-[var(--accent-primary)]/60 bg-bg-secondary transition-colors hover:border-[var(--accent-primary)] hover:bg-bg-tertiary"
    >
      <span
        className={`h-2 w-2 rounded-full transition-colors ${
          isDark
            ? "bg-[var(--accent-primary)]"
            : "bg-[var(--text-primary)]"
        }`}
      />
    </button>
  );
}
