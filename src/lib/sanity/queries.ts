import { groq } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/react";
import type { Image as SanityImage } from "sanity";

import { sanityClient } from "./client";

export const allProjectsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    coverImage,
    category,
    featured,
    visibility,
    technologies,
    githubUrl,
    liveUrl,
    demoVideoUrl,
    docsUrl,
    order
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    coverImage,
    gallery,
    category,
    featured,
    visibility,
    technologies,
    context,
    solution,
    highlights,
    metrics,
    githubUrl,
    liveUrl,
    demoVideoUrl,
    docsUrl
  }
`;

export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)][].slug.current
`;

export const aboutQuery = groq`
  *[_type == "about"][0] {
    bio,
    photo,
    funFacts
  }
`;

export const skillsQuery = groq`
  *[_type == "skill"] | order(order asc, name asc) {
    _id,
    name,
    category,
    level,
    order
  }
`;

export const experiencesQuery = groq`
  *[_type == "experience"] | order(startDate desc) {
    _id,
    title,
    company,
    location,
    startDate,
    endDate,
    description,
    order
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteTitle,
    description,
    socialLinks,
    heroTexts
  }
`;

export type SanityProjectCategory = "pro" | "perso" | "lab";
export type SanityProjectVisibility = "public" | "private";

export interface SanityProjectSummary {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: SanityImage;
  category: SanityProjectCategory;
  featured?: boolean;
  visibility?: SanityProjectVisibility;
  technologies?: string[];
  githubUrl?: string;
  liveUrl?: string;
  demoVideoUrl?: string;
  docsUrl?: string;
  order?: number;
}

export interface SanityProjectMetric {
  label: string;
  value: string;
}

export interface SanityProjectDetail extends SanityProjectSummary {
  gallery?: SanityImage[];
  context?: PortableTextBlock[];
  solution?: PortableTextBlock[];
  highlights?: string[];
  metrics?: SanityProjectMetric[];
}

export interface SanityAbout {
  bio?: PortableTextBlock[];
  photo?: SanityImage;
  funFacts?: string[];
}

export type SanitySkillCategory = "frontend" | "backend" | "devops" | "tools";

export interface SanitySkill {
  _id: string;
  name: string;
  category: SanitySkillCategory;
  level?: number;
  order?: number;
}

export interface SanityExperience {
  _id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: PortableTextBlock[];
  order?: number;
}

export interface SanitySocialLinks {
  github?: string;
  linkedin?: string;
  email?: string;
}

export interface SanitySiteSettings {
  siteTitle?: string;
  description?: string;
  socialLinks?: SanitySocialLinks;
  heroTexts?: string[];
}

async function safeFetch<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<T>(query, params ?? {});
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[sanity] fetch failed, falling back:", error);
    }
    return null;
  }
}

export const getAllProjects = () =>
  safeFetch<SanityProjectSummary[]>(allProjectsQuery);

export const getProjectBySlug = (slug: string) =>
  safeFetch<SanityProjectDetail | null>(projectBySlugQuery, { slug });

export const getProjectSlugs = () =>
  safeFetch<string[]>(projectSlugsQuery);

export const getAbout = () => safeFetch<SanityAbout | null>(aboutQuery);

export const getSkills = () => safeFetch<SanitySkill[]>(skillsQuery);

export const getExperiences = () =>
  safeFetch<SanityExperience[]>(experiencesQuery);

export const getSiteSettings = () =>
  safeFetch<SanitySiteSettings | null>(siteSettingsQuery);
