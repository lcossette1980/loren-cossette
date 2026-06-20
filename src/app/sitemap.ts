import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const siteUrl = "https://www.lorencossette.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /* ── Static pages ── */
  const staticPages: MetadataRoute.Sitemap = [
    /* Home */
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },

    /* Procurement landing — highest commercial value */
    {
      url: `${siteUrl}/public-sector`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/capability-statement`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/intro`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/security`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },

    /* Programs and case studies */
    {
      url: `${siteUrl}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/activity`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.85,
    },

    /* Services */
    {
      url: `${siteUrl}/consulting`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/methodology`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/demo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    /* Personal projects / products */
    {
      url: `${siteUrl}/apps`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },

    /* Identity */
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/experience`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },

    /* Content */
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },

    /* Trust / compliance */
    {
      url: `${siteUrl}/accessibility`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },

    /* OVERRIDE book section */
    {
      url: `${siteUrl}/override`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/override/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/override/tools`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/override/media`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  /* ── Dynamic project pages ── */
  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages];
}
