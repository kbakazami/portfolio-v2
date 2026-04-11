import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ProjectCaseStudy } from "@/components/sections/ProjectCaseStudy";
import {
  getProject,
  getProjects,
  getProjectSlugs,
  type LocalizedProject,
} from "@/data/projects";
import { routing } from "@/i18n/routing";
import {
  loadAllProjectsForNav,
  loadProjectBySlug,
  loadProjectSlugs,
} from "@/lib/portfolio-data";

type PageParams = { locale: string; slug: string };

export async function generateStaticParams() {
  const sanitySlugs = await loadProjectSlugs();
  const slugs =
    sanitySlugs && sanitySlugs.length > 0 ? sanitySlugs : getProjectSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

async function resolveProject(
  slug: string,
  locale: "fr" | "en",
): Promise<{ project: LocalizedProject | null; all: LocalizedProject[] }> {
  const [sanityProject, sanityList] = await Promise.all([
    loadProjectBySlug(slug),
    loadAllProjectsForNav(),
  ]);

  if (sanityProject && sanityList && sanityList.length > 0) {
    return { project: sanityProject, all: sanityList };
  }

  const fallback = getProject(slug, locale);
  return {
    project: fallback ?? null,
    all: getProjects(locale),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const { project } = await resolveProject(slug, locale as "fr" | "en");
  if (!project) return {};
  return {
    title: `${project.title} — Kba`,
    description: project.description,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const typedLocale = locale as "fr" | "en";
  const { project, all } = await resolveProject(slug, typedLocale);
  if (!project) notFound();

  const index = all.findIndex((p) => p.slug === slug);
  const previous =
    index > 0
      ? { slug: all[index - 1].slug, title: all[index - 1].title }
      : null;
  const next =
    index >= 0 && index < all.length - 1
      ? { slug: all[index + 1].slug, title: all[index + 1].title }
      : null;

  const t = await getTranslations("projects");

  return (
    <ProjectCaseStudy
      project={project}
      previous={previous}
      next={next}
      labels={{
        back: t("back"),
        context: t("caseStudy.context"),
        solution: t("caseStudy.solution"),
        highlights: t("caseStudy.highlights"),
        stack: t("caseStudy.stack"),
        metrics: t("caseStudy.metrics"),
        previous: t("caseStudy.previous"),
        next: t("caseStudy.next"),
        viewCode: t("viewCode"),
        viewDemo: t("viewDemo"),
        viewLive: t("viewLive"),
        viewDocs: t("viewDocs"),
        privateNotice: t("privateNotice"),
        galleryPrevious: t("caseStudy.galleryPrevious"),
        galleryNext: t("caseStudy.galleryNext"),
      }}
    />
  );
}
