import { site } from "@/content/site";

import { areaAliasMap, jaipurAreas } from "./areas";
import type { JaipurArea, LocationLanding, LocationServiceKind } from "./types";

export type { JaipurArea, LocationLanding, LocationServiceKind } from "./types";
export { jaipurAreas } from "./areas";

const SERVICE_META: Record<
  LocationServiceKind,
  {
    slugPrefix: string;
    parentServiceHref: string;
    parentServiceLabel: string;
    titleService: string;
    h1Service: string;
    descService: string;
  }
> = {
  website: {
    slugPrefix: "website-development",
    parentServiceHref: "/services/website-software-development",
    parentServiceLabel: "Website & Software Development",
    titleService: "Website Development",
    h1Service: "Website development",
    descService: "website development",
  },
  seo: {
    slugPrefix: "seo-services",
    parentServiceHref: "/services/digital-marketing-seo",
    parentServiceLabel: "Digital Marketing & SEO",
    titleService: "SEO & Digital Marketing",
    h1Service: "SEO and digital marketing",
    descService: "SEO and digital marketing",
  },
};

export function getAreaBySlug(slug: string): JaipurArea | undefined {
  const resolved = areaAliasMap[slug] ?? slug;
  return jaipurAreas.find((area) => area.slug === resolved);
}

export function buildLandingSlug(service: LocationServiceKind, areaSlug: string) {
  return `${SERVICE_META[service].slugPrefix}-${areaSlug}-jaipur`;
}

export function parseLandingSlug(slug: string): {
  service: LocationServiceKind;
  areaSlug: string;
} | null {
  const websitePrefix = "website-development-";
  const seoPrefix = "seo-services-";
  const suffix = "-jaipur";

  if (!slug.endsWith(suffix)) return null;

  if (slug.startsWith(websitePrefix)) {
    const areaSlug = slug.slice(websitePrefix.length, -suffix.length);
    if (!areaSlug || !getAreaBySlug(areaSlug)) return null;
    return { service: "website", areaSlug };
  }

  if (slug.startsWith(seoPrefix)) {
    const areaSlug = slug.slice(seoPrefix.length, -suffix.length);
    if (!areaSlug || !getAreaBySlug(areaSlug)) return null;
    return { service: "seo", areaSlug };
  }

  return null;
}

export function getLocationLanding(slug: string): LocationLanding | undefined {
  const parsed = parseLandingSlug(slug);
  if (!parsed) return undefined;

  const area = getAreaBySlug(parsed.areaSlug);
  if (!area) return undefined;

  const meta = SERVICE_META[parsed.service];
  const copy = parsed.service === "website" ? area.website : area.seo;
  const path = `/${slug}` as const;

  return {
    slug,
    path,
    service: parsed.service,
    area,
    title: `${meta.titleService} in ${area.name}, Jaipur (${area.pincode}) | ${site.name}`,
    description: `${meta.titleService} for businesses in ${area.name}, Jaipur ${area.pincode}. ${copy.uniqueAngle.slice(0, 120)}…`,
    h1: `${meta.h1Service} in ${area.name}, Jaipur`,
    parentServiceHref: meta.parentServiceHref,
    parentServiceLabel: meta.parentServiceLabel,
    copy,
  };
}

export function allLocationLandings(): LocationLanding[] {
  const landings: LocationLanding[] = [];
  for (const area of jaipurAreas) {
    for (const service of ["website", "seo"] as const) {
      const slug = buildLandingSlug(service, area.slug);
      const landing = getLocationLanding(slug);
      if (landing) landings.push(landing);
    }
  }
  return landings;
}

export function allLocationSlugs(): string[] {
  return allLocationLandings().map((l) => l.slug);
}

export function resolveRelatedAreas(area: JaipurArea): JaipurArea[] {
  const out: JaipurArea[] = [];
  for (const related of area.relatedAreaSlugs) {
    const found = getAreaBySlug(related);
    if (found && found.slug !== area.slug) out.push(found);
  }
  return out.slice(0, 3);
}

export const featuredLocationAreas = jaipurAreas.filter((a) =>
  ["malviya-nagar", "vaishali-nagar", "c-scheme", "mansarovar", "sitapura", "mi-road"].includes(
    a.slug,
  ),
);
