"use client";

import Link from "next/link";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import { Badge } from "@/components/ui/Badge";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/animations/FadeIn";
import type { LocalizedProject } from "@/data/projects";
import { cn } from "@/lib/utils";

interface NavTarget {
  slug: string;
  title: string;
}

interface Labels {
  back: string;
  context: string;
  solution: string;
  highlights: string;
  stack: string;
  metrics: string;
  previous: string;
  next: string;
  viewCode: string;
  viewDemo: string;
  viewLive: string;
  viewDocs: string;
  privateNotice: string;
  galleryPrevious: string;
  galleryNext: string;
}

interface ProjectCaseStudyProps {
  project: LocalizedProject;
  previous: NavTarget | null;
  next: NavTarget | null;
  labels: Labels;
}

const GALLERY_PLACEHOLDER_GRADIENTS = [
  "linear-gradient(135deg, rgba(59,130,246,0.35), rgba(139,92,246,0.35))",
  "linear-gradient(135deg, rgba(236,72,153,0.3), rgba(59,130,246,0.3))",
  "linear-gradient(135deg, rgba(16,185,129,0.3), rgba(59,130,246,0.3))",
  "linear-gradient(135deg, rgba(249,115,22,0.3), rgba(139,92,246,0.3))",
];

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function ProjectCaseStudy({
  project,
  previous,
  next,
  labels,
}: ProjectCaseStudyProps) {
  const shouldReduceMotion = useReducedMotion();
  const galleryLength = project.gallery?.length ?? GALLERY_PLACEHOLDER_GRADIENTS.length;
  const [galleryIndex, setGalleryIndex] = useState(0);

  const goPrev = () =>
    setGalleryIndex((i) => (i - 1 + galleryLength) % galleryLength);
  const goNext = () => setGalleryIndex((i) => (i + 1) % galleryLength);

  const isPrivate = project.visibility === "private";

  return (
    <article className="relative px-6 py-20 md:py-28">
      <div className="mx-auto flex max-w-5xl flex-col gap-16">
        <FadeIn>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-text-secondary transition-colors hover:text-[color:var(--accent-primary)] sm:text-sm"
          >
            <ArrowLeftIcon />
            {labels.back}
          </Link>
        </FadeIn>

        <FadeIn delay={0.05}>
          <header className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              {project.featured ? <Badge variant="accent">featured</Badge> : null}
              <Badge variant="category" category={project.category}>
                {project.category}
              </Badge>
              {isPrivate ? <Badge>private</Badge> : null}
            </div>
            <h1 className="font-mono text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
              {project.title}
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
              {project.description}
            </p>
          </header>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-4">
            <BrowserFrame url={project.liveUrl ?? `${project.slug}.kba.dev`}>
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg-tertiary">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={galleryIndex}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background:
                        GALLERY_PLACEHOLDER_GRADIENTS[
                          galleryIndex % GALLERY_PLACEHOLDER_GRADIENTS.length
                        ],
                    }}
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 40 }}
                    animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, x: -40 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="font-mono text-sm uppercase tracking-[0.2em] text-white/80">
                      {project.title} — {galleryIndex + 1} / {galleryLength}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </BrowserFrame>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={goPrev}
                aria-label={labels.galleryPrevious}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:border-[color:var(--accent-primary)] hover:text-[color:var(--accent-primary)]"
              >
                <ArrowLeftIcon />
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: galleryLength }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setGalleryIndex(i)}
                    aria-label={`${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      i === galleryIndex
                        ? "w-6 bg-[color:var(--accent-primary)]"
                        : "w-1.5 bg-border",
                    )}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={goNext}
                aria-label={labels.galleryNext}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:border-[color:var(--accent-primary)] hover:text-[color:var(--accent-primary)]"
              >
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--accent-primary)]">
                // {labels.context}
              </h2>
              <p className="text-base leading-relaxed text-text-secondary">
                {project.context}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--accent-primary)]">
                // {labels.solution}
              </h2>
              <p className="text-base leading-relaxed text-text-secondary">
                {project.solution}
              </p>
            </div>
          </div>
        </FadeIn>

        {project.highlights && project.highlights.length > 0 ? (
          <FadeIn delay={0.1}>
            <div className="flex flex-col gap-4">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--accent-primary)]">
                // {labels.highlights}
              </h2>
              <ul className="flex flex-col gap-2 font-mono text-sm text-text-primary">
                {project.highlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-[color:var(--accent-primary)]">&gt;</span>
                    <span className="text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ) : null}

        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--accent-primary)]">
              // {labels.stack}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {project.metrics && project.metrics.length > 0 ? (
          <FadeIn delay={0.1}>
            <div className="flex flex-col gap-4">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--accent-primary)]">
                // {labels.metrics}
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl border border-border bg-bg-secondary p-5"
                  >
                    <div className="font-mono text-2xl font-semibold text-text-primary md:text-3xl">
                      {metric.value}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary sm:text-xs">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        ) : null}

        <FadeIn delay={0.1}>
          <div className="flex flex-wrap items-center gap-3">
            {isPrivate ? (
              <span className="font-mono text-xs text-text-secondary">
                {labels.privateNotice}
              </span>
            ) : null}
            {!isPrivate && project.githubUrl ? (
              <Button variant="outline" size="md" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  {labels.viewCode}
                </a>
              </Button>
            ) : null}
            {project.demoVideoUrl ? (
              <Button variant="ghost" size="md" asChild>
                <a href={project.demoVideoUrl} target="_blank" rel="noopener noreferrer">
                  {labels.viewDemo}
                </a>
              </Button>
            ) : null}
            {project.docsUrl ? (
              <Button variant="ghost" size="md" asChild>
                <a href={project.docsUrl} target="_blank" rel="noopener noreferrer">
                  {labels.viewDocs}
                </a>
              </Button>
            ) : null}
            {project.liveUrl ? (
              <Button variant="primary" size="md" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  {labels.viewLive}
                </a>
              </Button>
            ) : null}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <nav className="flex flex-col justify-between gap-4 border-t border-border pt-8 sm:flex-row">
            {previous ? (
              <Link
                href={`/projects/${previous.slug}`}
                className="group inline-flex flex-col gap-1 text-left"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary sm:text-xs">
                  ← {labels.previous}
                </span>
                <span className="font-mono text-base text-text-primary transition-colors group-hover:text-[color:var(--accent-primary)]">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group inline-flex flex-col gap-1 text-right sm:items-end"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary sm:text-xs">
                  {labels.next} →
                </span>
                <span className="font-mono text-base text-text-primary transition-colors group-hover:text-[color:var(--accent-primary)]">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </FadeIn>
      </div>
    </article>
  );
}
