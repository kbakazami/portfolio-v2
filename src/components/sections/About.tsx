"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer } from "@/components/animations/StaggerContainer";

const STACK = [
  "React",
  "TypeScript",
  "Node.js",
  "PHP",
  "Symfony",
  "Magento 2",
  "Docker",
  "AWS",
];

const tagVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

function Tag({ label }: { label: string }) {
  const shouldReduceMotion = useReducedMotion();
  const className =
    "inline-flex items-center rounded-full border border-border bg-bg-tertiary px-3 py-1 font-mono text-xs text-[color:var(--accent-primary)] transition-colors hover:border-[color:var(--accent-primary)]";

  if (shouldReduceMotion) {
    return <span className={className}>{label}</span>;
  }

  return (
    <motion.span className={className} variants={tagVariants}>
      {label}
    </motion.span>
  );
}

export function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--accent-primary)] sm:text-sm">
            // {t("sectionLabel")}
          </span>
        </FadeIn>

        <FadeIn delay={0.05}>
          <h2 className="mt-4 font-mono text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
            {t("title")}
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-10 md:grid-cols-[auto_1fr] md:items-start md:gap-14">
          <FadeIn direction="right">
            <div
              className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-xl border border-border bg-bg-secondary sm:h-48 sm:w-48 md:h-56 md:w-56"
              aria-label={t("avatarAlt")}
            >
              <span className="font-mono text-6xl font-semibold text-[color:var(--accent-primary)] sm:text-7xl md:text-8xl">
                K
              </span>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(59,130,246,0.08),rgba(139,92,246,0.08))]"
              />
            </div>
          </FadeIn>

          <div className="flex flex-col gap-6">
            <FadeIn delay={0.1}>
              <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                {t.rich("p1", {
                  strong: (chunks) => (
                    <strong className="font-medium text-text-primary">
                      {chunks}
                    </strong>
                  ),
                })}
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                {t.rich("p2", {
                  strong: (chunks) => (
                    <strong className="font-medium text-text-primary">
                      {chunks}
                    </strong>
                  ),
                })}
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                {t.rich("p3", {
                  strong: (chunks) => (
                    <strong className="font-medium text-text-primary">
                      {chunks}
                    </strong>
                  ),
                })}
              </p>
            </FadeIn>

            <div className="mt-2">
              <FadeIn delay={0.25}>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
                  {t("stackLabel")}
                </span>
              </FadeIn>
              <StaggerContainer
                className="mt-3 flex flex-wrap gap-2"
                staggerDelay={0.05}
                delayChildren={0.3}
              >
                {STACK.map((tech) => (
                  <Tag key={tech} label={tech} />
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
