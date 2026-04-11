import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ProjectCaseStudy } from "@/components/sections/ProjectCaseStudy";
import { getProject, getProjectSlugs, getProjects } from "@/data/projects";
import { routing } from "@/i18n/routing";

type PageParams = { locale: string; slug: string };

export function generateStaticParams() {
  const slugs = getProjectSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug, locale as "fr" | "en");
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
  const project = getProject(slug, typedLocale);
  if (!project) notFound();

  const allProjects = getProjects(typedLocale);
  const index = allProjects.findIndex((p) => p.slug === slug);
  const previous =
    index > 0
      ? { slug: allProjects[index - 1].slug, title: allProjects[index - 1].title }
      : null;
  const next =
    index >= 0 && index < allProjects.length - 1
      ? { slug: allProjects[index + 1].slug, title: allProjects[index + 1].title }
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
