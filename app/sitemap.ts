import type { MetadataRoute } from "next";

import { blogPosts } from "@/lib/content";
import { navigation, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = navigation.map((item) => ({
    url: new URL(
      item.href === "/" ? "/" : `${item.href.replace(/\/+$/, "")}/`,
      siteConfig.url,
    ).toString(),
    lastModified: new Date("2026-07-29"),
    changeFrequency: item.href === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: item.href === "/" ? 1 : item.href === "/reservations" ? 0.9 : 0.7,
  }));
  const posts = blogPosts.map((post) => ({
    url: new URL(`/blog/${post.slug}/`, siteConfig.url).toString(),
    lastModified: new Date("2026-07-29"),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...routes, ...posts];
}
