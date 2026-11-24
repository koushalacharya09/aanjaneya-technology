import { notFound } from "next/navigation";

import { LocationLandingPage } from "@/components/locations/location-landing-page";
import {
  allLocationSlugs,
  getLocationLanding,
} from "@/content/locations";
import { createMetadata } from "@/lib/seo";

type Props = { params: Promise<{ serviceAreaSlug: string }> };

export function generateStaticParams() {
  return allLocationSlugs().map((serviceAreaSlug) => ({ serviceAreaSlug }));
}

export async function generateMetadata({ params }: Props) {
  const { serviceAreaSlug } = await params;
  const landing = getLocationLanding(serviceAreaSlug);
  if (!landing) return {};
  return createMetadata({
    title: landing.title,
    description: landing.description,
    path: landing.path,
    /** Thin until each landing has 500+ unique words */
    noIndex: true,
  });
}

export default async function ServiceAreaLandingPage({ params }: Props) {
  const { serviceAreaSlug } = await params;
  const landing = getLocationLanding(serviceAreaSlug);
  if (!landing) notFound();
  return <LocationLandingPage landing={landing} />;
}
