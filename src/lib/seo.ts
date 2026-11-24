import type { Metadata } from "next";

import { site } from "@/content/site";

function siteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv && !fromEnv.includes("[PLACEHOLDER")) return fromEnv;
  return "http://localhost:3000";
}

export function absoluteUrl(path = "/") {
  const base = siteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createMetadata({
  title,
  description,
  path = "/",
  /** Accepted for call-site compatibility; never emitted (keywords meta is obsolete). */
  keywords: _keywords,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string | string[];
  noIndex?: boolean;
}): Metadata {
  void _keywords;
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(`/opengraph-image?title=${encodeURIComponent(title)}`);

  return {
    /** Absolute so layout `%s | brand` does not double the brand in SERP titles */
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: site.name,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export { siteUrl };
