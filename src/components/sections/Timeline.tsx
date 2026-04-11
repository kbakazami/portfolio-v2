"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

type EntryKey = "aws" | "magentizy" | "esgi";

type TimelineEntry = {
  key: EntryKey;
  current?: boolean;
};

const ENTRIES: TimelineEntry[] = [
  { key: "aws", current: true },
  { key: "magentizy" },
  { key: "esgi" },
];

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function ItemContent({ entry }: { entry: TimelineEntry }) {
  const t = useTranslations("timeline.entries");

  return (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-1.5 h-[9px] w-[9px] translate-x-[-4px] rounded-full border border-[color:var(--accent-primary)]",
          entry.current ? "bg-[color:var(--accent-primary)]" : "bg-bg-primary",
        )}
      />
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--accent-primary)] sm:text-sm">
          {t(`${entry.key}.date`)}
        </span>
        <h3 className="text-base font-medium text-text-primary md:text-lg">
          {t(`${entry.key}.role`)}
        </h3>
        <p className="text-sm text-text-secondary md:text-base">
          {t(`${entry.key}.company`)}
        </p>
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-text-secondary">
          {t(`${entry.key}.description`)}
        </p>
      </div>
    </>
  );
}

function AnimatedItem({ entry }: { entry: TimelineEntry }) {
  const shouldReduceMotion = useReducedMotion();
  const itemClass = "relative pl-10 sm:pl-12";

  if (shouldReduceMotion) {
    return (
      <li className={itemClass}>
        <ItemContent entry={entry} />
      </li>
    );
  }

  return (
    <motion.li variants={itemVariants} className={itemClass}>
      <ItemContent entry={entry} />
    </motion.li>
  );
}

export function Timeline() {
  const t = useTranslations("timeline");
  const shouldReduceMotion = useReducedMotion();

  const listClass = "relative flex flex-col gap-10 border-l border-border pl-0";
  const items = ENTRIES.map((entry) => (
    <AnimatedItem key={entry.key} entry={entry} />
  ));

  return (
    <section id="timeline" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeader label={t("sectionLabel")} title={t("title")} />
        </FadeIn>

        <div className="mt-14 max-w-3xl">
          {shouldReduceMotion ? (
            <ul className={listClass}>{items}</ul>
          ) : (
            <motion.ul
              className={listClass}
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {items}
            </motion.ul>
          )}
        </div>
      </div>
    </section>
  );
}
