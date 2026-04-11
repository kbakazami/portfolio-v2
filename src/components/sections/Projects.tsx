"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectCard, type ProjectGithubStats } from "@/components/ui/ProjectCard";
import { getProjects, type LocalizedProject } from "@/data/projects";
import type { ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

export type ProjectStatsMap = Record<string, ProjectGithubStats>;

type FilterKey = "all" | ProjectCategory;

const FILTERS: FilterKey[] = ["all", "pro", "perso", "lab"];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export function Projects({
  data,
  githubStats,
}: {
  data?: LocalizedProject[] | null;
  githubStats?: ProjectStatsMap;
}) {
  const t = useTranslations("projects");
  const locale = useLocale() as "fr" | "en";
  const shouldReduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<FilterKey>("all");

  const projects = useMemo(
    () => (data && data.length > 0 ? data : getProjects(locale)),
    [data, locale],
  );

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((project) => project.category === filter);
  }, [projects, filter]);

  return (
    <section id="projects" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeader
            label={t("sectionLabel")}
            title={t("title")}
            description={t("subtitle")}
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div
            role="tablist"
            aria-label={t("filtersLabel")}
            className="mt-10 flex flex-wrap gap-2"
          >
            {FILTERS.map((key) => {
              const active = filter === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(key)}
                  className={cn(
                    "relative rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-primary)] sm:text-sm",
                    active
                      ? "border-[color:var(--accent-primary)]/40 text-[color:var(--accent-primary)]"
                      : "border-border text-text-secondary hover:border-[color:var(--accent-primary)]/40 hover:text-text-primary",
                  )}
                >
                  {active && !shouldReduceMotion ? (
                    <motion.span
                      layoutId="project-filter-bg"
                      className="absolute inset-0 rounded-full bg-[color:var(--accent-primary)]/10"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  ) : null}
                  <span className="relative">{t(`filters.${key}`)}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        <LayoutGroup>
          <motion.ul
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
            variants={shouldReduceMotion ? undefined : gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.li
                  key={project._id}
                  layout
                  variants={shouldReduceMotion ? undefined : cardVariants}
                  initial={shouldReduceMotion ? undefined : "hidden"}
                  animate={shouldReduceMotion ? undefined : "visible"}
                  exit={
                    shouldReduceMotion
                      ? undefined
                      : { opacity: 0, y: -12, transition: { duration: 0.25 } }
                  }
                  className="h-full"
                >
                  <ProjectCard
                    project={project}
                    href={`/projects/${project.slug}`}
                    githubStats={githubStats?.[project._id]}
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </div>
    </section>
  );
}
