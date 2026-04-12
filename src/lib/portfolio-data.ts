import type { PortableTextBlock } from "@portabletext/react";

import type { LocalizedProject } from "@/data/projects";
import { fetchGithubStats, parseGithubUrl, type GithubStats } from "@/lib/github";
import {
  getAbout,
  getAllProjects,
  getExperiences,
  getProjectBySlug,
  getProjectSlugs,
  getSiteSettings,
  getSkills,
  type SanityAbout,
  type SanityExperience,
  type SanityProjectDetail,
  type SanityProjectSummary,
  type SanitySiteSettings,
  type SanitySkill,
} from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

function resolveImage(image: unknown): string | undefined {
  if (!image) return undefined;
  try {
    return urlFor(image as Parameters<typeof urlFor>[0])
      .width(1600)
      .fit("max")
      .auto("format")
      .url();
  } catch {
    return undefined;
  }
}

function mapProjectSummary(project: SanityProjectSummary): LocalizedProject {
  return {
    _id: project._id,
    slug: project.slug,
    title: project.title,
    description: project.description ?? "",
    coverImage: resolveImage(project.coverImage),
    category: project.category,
    featured: Boolean(project.featured),
    visibility: project.visibility ?? "public",
    technologies: project.technologies ?? [],
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    demoVideoUrl: project.demoVideoUrl,
    docsUrl: project.docsUrl,
    context: [],
    solution: [],
    highlights: [],
    metrics: [],
  };
}

function mapProjectDetail(project: SanityProjectDetail): LocalizedProject {
  return {
    ...mapProjectSummary(project),
    gallery: project.gallery
      ?.map((item) => resolveImage(item))
      .filter((value): value is string => Boolean(value)),
    context: project.context ?? [],
    solution: project.solution ?? [],
    highlights: project.highlights ?? [],
    metrics: project.metrics ?? [],
  };
}

export interface HeroData {
  heroTexts?: string[];
  description?: string;
}

export interface AboutData {
  bio?: PortableTextBlock[];
  photo?: string;
  funFacts?: string[];
}

export interface SkillsData {
  skills: SanitySkill[];
}

export interface TimelineData {
  experiences: SanityExperience[];
}

export interface ContactData {
  github?: string;
  linkedin?: string;
  email?: string;
}

export interface PortfolioData {
  hero: HeroData | null;
  about: AboutData | null;
  projects: LocalizedProject[] | null;
  skills: SkillsData | null;
  timeline: TimelineData | null;
  contact: ContactData | null;
}

function mapHero(settings: SanitySiteSettings | null): HeroData | null {
  if (!settings) return null;
  const heroTexts = settings.heroTexts?.filter(Boolean) ?? [];
  if (!heroTexts.length && !settings.description) return null;
  return {
    heroTexts: heroTexts.length ? heroTexts : undefined,
    description: settings.description,
  };
}

function mapAbout(about: SanityAbout | null): AboutData | null {
  if (!about) return null;
  const hasBio = Array.isArray(about.bio) && about.bio.length > 0;
  if (!hasBio && !about.photo && !about.funFacts?.length) return null;
  return {
    bio: hasBio ? about.bio : undefined,
    photo: resolveImage(about.photo),
    funFacts: about.funFacts,
  };
}

function mapContact(settings: SanitySiteSettings | null): ContactData | null {
  const links = settings?.socialLinks;
  if (!links) return null;
  if (!links.github && !links.linkedin && !links.email) return null;
  return {
    github: links.github,
    linkedin: links.linkedin,
    email: links.email,
  };
}

export async function loadPortfolioData(locale: string): Promise<PortfolioData> {
  const [projectsRaw, aboutRaw, skillsRaw, experiencesRaw, siteSettings] =
    await Promise.all([
      getAllProjects(locale),
      getAbout(locale),
      getSkills(locale),
      getExperiences(locale),
      getSiteSettings(locale),
    ]);

  const projects =
    projectsRaw && projectsRaw.length > 0
      ? projectsRaw.map(mapProjectSummary)
      : null;

  const skills =
    skillsRaw && skillsRaw.length > 0 ? { skills: skillsRaw } : null;

  const timeline =
    experiencesRaw && experiencesRaw.length > 0
      ? { experiences: experiencesRaw }
      : null;

  return {
    hero: mapHero(siteSettings),
    about: mapAbout(aboutRaw),
    projects,
    skills,
    timeline,
    contact: mapContact(siteSettings),
  };
}

export async function loadProjectBySlug(
  slug: string,
  locale: string,
): Promise<LocalizedProject | null> {
  const project = await getProjectBySlug(slug, locale);
  if (!project) return null;
  return mapProjectDetail(project);
}

export async function loadProjectSlugs(locale: string): Promise<string[] | null> {
  const slugs = await getProjectSlugs(locale);
  if (!slugs || slugs.length === 0) return null;
  return slugs;
}

export type ProjectGithubStatsMap = Record<string, GithubStats>;

export async function loadProjectGithubStats(
  projects: LocalizedProject[] | null,
): Promise<ProjectGithubStatsMap> {
  if (!projects || projects.length === 0) return {};

  const targets = projects.flatMap((project) => {
    if (project.visibility === "private") return [];
    const parsed = parseGithubUrl(project.githubUrl);
    if (!parsed) return [];
    return [{ id: project._id, ...parsed }];
  });

  const results = await Promise.all(
    targets.map(async ({ id, owner, repo }) => {
      const stats = await fetchGithubStats(owner, repo).catch(() => null);
      return stats ? ([id, stats] as const) : null;
    }),
  );

  return results.reduce<ProjectGithubStatsMap>((acc, entry) => {
    if (entry) acc[entry[0]] = entry[1];
    return acc;
  }, {});
}

export async function loadAllProjectsForNav(locale: string): Promise<LocalizedProject[] | null> {
  const raw = await getAllProjects(locale);
  if (!raw || raw.length === 0) return null;
  return raw.map(mapProjectSummary);
}
