export type LocationServiceKind = "website" | "seo";

export type LocationFaq = {
  question: string;
  answer: string;
};

export type LocationServiceCopy = {
  /** 2–3 sentences unique to this area + service */
  uniqueAngle: string;
  whoWeHelp: string;
  localContext: string;
  faqs: readonly LocationFaq[];
};

export type JaipurArea = {
  slug: string;
  name: string;
  pincode: string;
  tier: "premium" | "growing" | "commercial" | "industrial";
  landmarks: readonly string[];
  nearbyBusinesses: string;
  industriesServed: readonly string[];
  relatedAreaSlugs: readonly string[];
  website: LocationServiceCopy;
  seo: LocationServiceCopy;
};

export type LocationLanding = {
  slug: string;
  path: `/${string}`;
  service: LocationServiceKind;
  area: JaipurArea;
  title: string;
  description: string;
  h1: string;
  parentServiceHref: string;
  parentServiceLabel: string;
  copy: LocationServiceCopy;
};
