import { publishedSocials, site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

function publicEmail() {
  return site.email.trim() || undefined;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: absoluteUrl("/"),
    ...(publicEmail() ? { email: publicEmail() } : {}),
    telephone: site.phoneE164,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: site.addressCountry,
    },
    sameAs: publishedSocials.map((s) => s.href),
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: site.name,
    description: site.description,
    url: absoluteUrl("/"),
    telephone: site.phoneE164,
    ...(publicEmail() ? { email: publicEmail() } : {}),
    image: absoluteUrl("/opengraph-image"),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: site.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: [
      { "@type": "City", name: "Jaipur" },
      { "@type": "State", name: "Rajasthan" },
      { "@type": "Country", name: "India" },
    ],
    openingHoursSpecification: site.hours.map((block) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: block.days,
      opens: block.opens,
      closes: block.closes,
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: absoluteUrl("/"),
    description: site.supportingLine,
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(
  faqs: readonly { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    provider: {
      "@type": "Organization",
      name: site.name,
    },
    areaServed: ["Jaipur", "Rajasthan", "India"],
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
