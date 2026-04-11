"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { FadeIn } from "@/components/animations/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { SkillsData } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

type CategoryKey = "frontend" | "backend" | "devops" | "tools";

type Skill = {
  name: string;
  level: number;
};

type SkillCategory = {
  key: CategoryKey;
  dotClassName: string;
  skills: Skill[];
};

const MAX_LEVEL = 5;

const CATEGORIES: SkillCategory[] = [
  {
    key: "frontend",
    dotClassName: "bg-blue-500",
    skills: [
      { name: "React / Next.js", level: 4 },
      { name: "TypeScript", level: 4 },
      { name: "Tailwind CSS", level: 5 },
    ],
  },
  {
    key: "backend",
    dotClassName: "bg-violet-500",
    skills: [
      { name: "PHP / Symfony", level: 4 },
      { name: "Node.js", level: 3 },
      { name: "Magento 2", level: 4 },
    ],
  },
  {
    key: "devops",
    dotClassName: "bg-emerald-500",
    skills: [
      { name: "Docker", level: 3 },
      { name: "AWS", level: 2 },
      { name: "CI/CD", level: 3 },
    ],
  },
  {
    key: "tools",
    dotClassName: "bg-amber-500",
    skills: [
      { name: "Git / GitHub", level: 5 },
      { name: "Clean Architecture", level: 3 },
      { name: "WSL2 / Linux", level: 4 },
    ],
  },
];

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cellVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function LevelIndicator({ level }: { level: number }) {
  const squares = Array.from({ length: MAX_LEVEL }, (_, i) =>
    i < level ? "■" : "□",
  ).join("");

  return (
    <span
      aria-label={`${level} / ${MAX_LEVEL}`}
      className="font-mono text-sm tracking-[0.15em] text-[color:var(--accent-primary)]"
    >
      {squares}
    </span>
  );
}

function BentoCell({ category }: { category: SkillCategory }) {
  const t = useTranslations("skills.categories");

  return (
    <div className="flex h-full flex-col gap-5 rounded-xl border border-border bg-bg-secondary p-6 transition-colors hover:border-[color:var(--accent-primary)]/40 md:p-7">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={cn("h-2.5 w-2.5 rounded-full", category.dotClassName)}
        />
        <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-text-primary">
          {t(category.key)}
        </h3>
      </div>

      <ul className="flex flex-col gap-3">
        {category.skills.map((skill) => (
          <li
            key={skill.name}
            className="flex items-center justify-between gap-4"
          >
            <span className="text-sm text-text-secondary md:text-base">
              {skill.name}
            </span>
            <LevelIndicator level={skill.level} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function AnimatedCell({ category }: { category: SkillCategory }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="md:col-span-2">
        <BentoCell category={category} />
      </div>
    );
  }

  return (
    <motion.div variants={cellVariants} className="md:col-span-2">
      <BentoCell category={category} />
    </motion.div>
  );
}

const CATEGORY_DOT: Record<CategoryKey, string> = {
  frontend: "bg-blue-500",
  backend: "bg-violet-500",
  devops: "bg-emerald-500",
  tools: "bg-amber-500",
};

function buildCategoriesFromSanity(
  data: SkillsData,
): SkillCategory[] {
  const grouped: Record<CategoryKey, Skill[]> = {
    frontend: [],
    backend: [],
    devops: [],
    tools: [],
  };
  for (const skill of data.skills) {
    if (!grouped[skill.category]) continue;
    grouped[skill.category].push({
      name: skill.name,
      level: Math.min(Math.max(Math.round(skill.level ?? 3), 1), MAX_LEVEL),
    });
  }
  return (Object.keys(grouped) as CategoryKey[])
    .filter((key) => grouped[key].length > 0)
    .map((key) => ({
      key,
      dotClassName: CATEGORY_DOT[key],
      skills: grouped[key],
    }));
}

export function Skills({ data }: { data?: SkillsData | null }) {
  const t = useTranslations("skills");
  const shouldReduceMotion = useReducedMotion();

  const categories =
    data && data.skills.length > 0
      ? buildCategoriesFromSanity(data)
      : CATEGORIES;

  const gridClassName =
    "mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4";

  const cells = categories.map((category) => (
    <AnimatedCell key={category.key} category={category} />
  ));

  return (
    <section id="skills" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionHeader label={t("sectionLabel")} title={t("title")} />
        </FadeIn>

        {shouldReduceMotion ? (
          <div className={gridClassName}>{cells}</div>
        ) : (
          <motion.div
            className={gridClassName}
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {cells}
          </motion.div>
        )}
      </div>
    </section>
  );
}
