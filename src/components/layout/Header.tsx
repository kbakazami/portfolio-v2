"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

const SECTIONS = ["about", "projects", "skills", "timeline", "contact"] as const;

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-primary/70 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          onClick={close}
          className="font-mono text-base font-bold tracking-tight bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent"
        >
          kba.dev
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {SECTIONS.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="font-mono text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              {t(key)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-6 bg-text-primary"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="block h-0.5 w-6 bg-text-primary"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-6 bg-text-primary"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-border bg-bg-secondary md:hidden"
          >
            <nav
              aria-label="Mobile"
              className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-6"
            >
              {SECTIONS.map((key) => (
                <a
                  key={key}
                  href={`#${key}`}
                  onClick={close}
                  className="rounded-md px-2 py-3 font-mono text-sm text-text-secondary transition-colors hover:bg-bg-tertiary hover:text-text-primary"
                >
                  &gt; {t(key)}
                </a>
              ))}
              <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                <LocaleSwitcher />
                <ThemeToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
