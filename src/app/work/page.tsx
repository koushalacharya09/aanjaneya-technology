import Link from "next/link";

import { SiteImage } from "@/components/media/site-image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { media, type MediaAsset } from "@/content/media";
import { keywordMap } from "@/content/seo/keyword-map";
import { industries, site } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: keywordMap.work.title,
  description: keywordMap.work.description,
  path: "/work",
});

const industryImageMap: Record<string, MediaAsset> = {
  jewellery: media.industryJewellery,
  "textiles-exports": media.industryTextiles,
  "schools-colleges": media.industrySchools,
  "coaching-institutes": media.industryCoaching,
  healthcare: media.industryHealthcare,
  hospitality: media.industryHospitality,
  manufacturing: media.industryManufacturing,
  "real-estate": media.industryRealEstate,
  "temples-religious-trusts": media.industryTemple,
  "retail-local-business": media.industryRetail,
  "professional-services": media.why,
  "logistics-ecommerce": media.industryManufacturing,
  startups: media.industryStartup,
};

export default function WorkPage() {
  return (
    <>
      <section className="relative isolate min-h-[70svh] overflow-hidden bg-void text-white">
        <SiteImage
          src={media.final.src}
          alt={media.final.alt}
          priority
          overlay="ink-left"
          sizes="100vw"
          className="absolute inset-0"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/50" />
        <Container className="relative z-10 flex min-h-[70svh] flex-col justify-end pb-16 pt-[calc(var(--header-height)+3rem)]">
          <p className="eyebrow text-saffron">Work · Industries</p>
          <h1 className="mt-4 max-w-3xl text-h1 text-white">
            Industry-focused digital work in Jaipur.
          </h1>
          <p className="mt-5 max-w-2xl text-body-lg text-white/70">
            We build websites, SEO and digital systems around how each industry
            actually sells, serves and operates—not a template with the sector name swapped in.
          </p>
          <div className="mt-10">
            <Button asChild variant="primary" size="lg">
              <Link href={site.primaryCta.href}>{site.primaryCta.label}</Link>
            </Button>
          </div>
        </Container>
      </section>

      <section className="section-paper section-y">
        <Container>
          <SectionHeader
            eyebrow="Industries we serve"
            title="Pick your vertical"
            description="Explore how we approach jewellery, education, healthcare, manufacturing and more across Jaipur."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => {
              const image =
                industryImageMap[industry.slug] ?? media.industryRetail;
              return (
                <li key={industry.slug}>
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="group relative block overflow-hidden border border-border"
                  >
                    <div className="relative aspect-[16/10] w-full">
                      <SiteImage
                        src={image.src}
                        alt={image.alt}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/90 via-void/25 to-transparent" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 z-10 p-5">
                      <h2 className="text-h4 text-white">{industry.name}</h2>
                      <p className="mt-2 text-sm text-white/70">{industry.hoverSolution}</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-14 max-w-2xl">
            <h2 className="text-h2 text-ink dark:text-white">Discuss your industry brief</h2>
            <p className="mt-4 text-body-lg text-muted">
              Share your sector and goal—we’ll outline a clear next step for your Jaipur business.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="primary" size="lg">
                <Link href={site.primaryCta.href}>{site.primaryCta.label}</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/industries">All industries</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
