import Link from "next/link";

import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { CtaBand } from "@/components/sections/cta-band";
import { industries } from "@/content/industries";
import { keywordMap } from "@/content/seo/keyword-map";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: keywordMap.industries.title,
  description: keywordMap.industries.description,
  path: "/industries",
  keywords: keywordMap.industries.primary,
});

export default function IndustriesIndexPage() {
  return (
    <>
      <section className="section-ink relative section-y">
        <Container className="relative z-10">
          <p className="eyebrow">Industries · Jaipur</p>
          <h1 className="mt-4 max-w-3xl text-h1 text-white">
            Industry websites & digital solutions in Jaipur.
          </h1>
          <p className="mt-5 max-w-2xl text-body-lg text-muted-dark">
            From jewellery and textiles to healthcare, education, manufacturing
            and professional firms—context-aware digital work for Jaipur
            businesses, not a template with the industry name swapped in.
          </p>
        </Container>
      </section>
      <section className="section-paper section-y">
        <Container>
          <SectionHeader title="Pick your industry" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:border-saffron/40 dark:bg-void/40"
              >
                <h2 className="text-h4 text-ink dark:text-white">{industry.name}</h2>
                <p className="mt-3 text-sm text-muted">{industry.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand
        title="Don't see your industry?"
        description="Tell us your context—we'll say clearly whether we're a fit for your Jaipur business."
        primary={site.primaryCta}
      />
    </>
  );
}
