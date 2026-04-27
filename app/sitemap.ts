import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";

const SITE_URL = "https://dameanrittmann.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${SITE_URL}/case-study/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    ...caseStudyRoutes,
  ];
}
