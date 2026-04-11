import { groq } from "next-sanity";

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

export const getAllProjects = () => sanityClient.fetch(allProjectsQuery);

export const getProjectBySlug = (slug: string) =>
  sanityClient.fetch(projectBySlugQuery, { slug });

export const getProjectSlugs = () =>
  sanityClient.fetch<string[]>(projectSlugsQuery);

export const getAbout = () => sanityClient.fetch(aboutQuery);

export const getSkills = () => sanityClient.fetch(skillsQuery);

export const getExperiences = () => sanityClient.fetch(experiencesQuery);

export const getSiteSettings = () => sanityClient.fetch(siteSettingsQuery);
