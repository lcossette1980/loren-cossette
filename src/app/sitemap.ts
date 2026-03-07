import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const siteUrl = "https://www.lorencossette.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /* ── Static pages ── */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/consulting`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/apps`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/experience`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
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
