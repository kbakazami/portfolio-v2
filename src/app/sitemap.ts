import type { MetadataRoute } from "next";

import { getProjectSlugs as getFallbackSlugs } from "@/data/projects";
import { routing } from "@/i18n/routing";
import { loadProjectSlugs } from "@/lib/portfolio-data";

const SITE_URL = "https://kba.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sanitySlugs = await loadProjectSlugs();
  const slugs =
    sanitySlugs && sanitySlugs.length > 0 ? sanitySlugs : getFallbackSlugs();

  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const base = `${SITE_URL}/${locale}`;
    entries.push({
      url: base,
      lastModified: now,
      changeFrequency: "monthly",
      priority: locale === routing.defaultLocale ? 1 : 0.9,
    });

    for (const slug of slugs) {
      entries.push({
        url: `${base}/projects/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
