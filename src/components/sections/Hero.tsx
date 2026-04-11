"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { AnimatedText } from "@/components/animations/AnimatedText";
import { StaggerContainer } from "@/components/animations/StaggerContainer";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function Item({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const roles = [t("roles.0"), t("roles.1"), t("roles.2")];

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hero-grid"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hero-glow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg-primary to-transparent"
      />

      <StaggerContainer
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
        staggerDelay={0.12}
        delayChildren={0.1}
      >
        <Item>
          <span className="inline-block font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--accent-primary)] sm:text-sm">
            &gt; {t("availabilityLabel")}
          </span>
        </Item>

        <Item>
          <h1 className="font-mono text-4xl font-semibold tracking-tight text-text-primary md:text-6xl">
            {t("greeting")}{" "}
            <span className="bg-[linear-gradient(135deg,#3B82F6,#8B5CF6)] bg-clip-text text-transparent">
              {t("name")}
            </span>
          </h1>
        </Item>

        <Item>
          <div className="font-mono text-xl text-[color:var(--accent-primary)] md:text-2xl">
            <AnimatedText texts={roles} />
          </div>
        </Item>

        <Item className="max-w-xl">
          <p className="text-base leading-relaxed text-text-secondary md:text-lg">
            {t("description")}
          </p>
        </Item>

        <Item>
          <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-md bg-[linear-gradient(135deg,#3B82F6,#8B5CF6)] px-6 py-3 font-mono text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition-transform hover:-translate-y-0.5 hover:shadow-blue-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
            >
              {t("ctaProjects")}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md border border-border bg-bg-secondary/40 px-6 py-3 font-mono text-sm font-medium text-text-primary backdrop-blur-sm transition-colors hover:border-[color:var(--accent-primary)] hover:text-[color:var(--accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
            >
              {t("ctaContact")}
            </a>
          </div>
        </Item>
      </StaggerContainer>
    </section>
  );
}
