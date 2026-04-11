"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className="inline-flex items-center gap-0.5 rounded-full border border-border bg-bg-secondary p-0.5 font-mono text-[11px]"
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            disabled={isPending}
            aria-pressed={active}
            onClick={() => switchTo(l)}
            className={`rounded-full px-2.5 py-1 uppercase tracking-wider transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-primary)] ${
              active
                ? "bg-bg-tertiary text-text-primary"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
