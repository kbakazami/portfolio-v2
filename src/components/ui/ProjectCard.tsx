"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import type { Project } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";
import { BrowserFrame } from "./BrowserFrame";
import { Button } from "./Button";

export interface ProjectGithubStats {
  commits?: number;
  branches?: number;
  loc?: number;
}

export interface ProjectCardProps {
  project: Project;
  githubStats?: ProjectGithubStats;
  className?: string;
  href?: string;
}

const CATEGORY_LABELS: Record<Project["category"], string> = {
  pro: "pro",
  perso: "perso",
  lab: "lab",
};

function ExternalLinkIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.24 2.77.12 3.07.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.35.78 1.05.78 2.12v3.15c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function ProjectCard({
  project,
  githubStats,
  className,
  href,
}: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const isPrivate = project.visibility === "private";
  const showStats =
    !isPrivate &&
    githubStats &&
    (githubStats.commits !== undefined ||
      githubStats.branches !== undefined ||
      githubStats.loc !== undefined);

  return (
    <motion.article
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex h-full flex-col gap-5 rounded-2xl border border-border bg-bg-secondary p-5 transition-colors duration-300 hover:border-[color:var(--accent-primary)]",
        className,
      )}
    >
      {href ? (
        <Link
          href={href}
          aria-label={project.title}
          className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-primary)]"
        />
      ) : null}

      <div className="flex items-center gap-2">
        {project.featured ? <Badge variant="accent">featured</Badge> : null}
        <Badge variant="category" category={project.category}>
          {CATEGORY_LABELS[project.category]}
        </Badge>
      </div>

      <BrowserFrame url={project.liveUrl ?? `${project.slug}.kba.dev`}>
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-tertiary">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,rgba(59,130,246,0.12),rgba(139,92,246,0.12))]"
            >
              <span className="font-mono text-3xl text-text-secondary">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </BrowserFrame>

      <div className="flex flex-col gap-2">
        <h3 className="font-mono text-lg font-semibold tracking-tight text-text-primary">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>
      </div>

      {project.technologies.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="relative z-20 mt-auto flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {isPrivate ? (
            <span className="font-mono text-xs text-text-secondary">
              Projet client — code privé
            </span>
          ) : project.githubUrl ? (
            <Button
              variant="outline"
              size="sm"
              asChild
              leftIcon={<GithubIcon />}
            >
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                repo
              </a>
            </Button>
          ) : null}

          {project.liveUrl || project.demoVideoUrl ? (
            <Button
              variant="ghost"
              size="sm"
              asChild
              rightIcon={<ExternalLinkIcon />}
            >
              <a
                href={project.liveUrl ?? project.demoVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                demo
              </a>
            </Button>
          ) : null}
        </div>

        {showStats ? (
          <div className="flex flex-wrap gap-4 border-t border-border pt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-text-secondary sm:text-xs">
            {githubStats?.commits !== undefined ? (
              <span>
                <span className="text-text-primary">{githubStats.commits}</span>{" "}
                commits
              </span>
            ) : null}
            {githubStats?.branches !== undefined ? (
              <span>
                <span className="text-text-primary">{githubStats.branches}</span>{" "}
                branches
              </span>
            ) : null}
            {githubStats?.loc !== undefined ? (
              <span>
                <span className="text-text-primary">
                  {githubStats.loc.toLocaleString()}
                </span>{" "}
                loc
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
