import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

function canonicalPath(path: string) {
  if (path === "/") return "/";
  return `${path.replace(/\/+$/, "")}/`;
}

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
}: PageMetadataInput): Metadata {
  const canonical = canonicalPath(path);
  const openGraph =
    type === "article"
      ? {
          type: "article" as const,
          locale: "en_IN",
          siteName: siteConfig.name,
          title,
          description,
          url: canonical,
        }
      : {
          type: "website" as const,
          locale: "en_IN",
          siteName: siteConfig.name,
          title,
          description,
          url: canonical,
        };

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph,
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
