import Link from "next/link";
import { notFound } from "next/navigation";

import { LeadForm } from "@/components/forms/lead-form";
import { Breadcrumbs } from "@/components/sections/breadcrumbs";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqSection } from "@/components/sections/faq-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { getIndustry, industries as industryContent } from "@/content/industries";
import { keywordMap } from "@/content/seo/keyword-map";
import { contactLinks, services, site } from "@/content/site";
import { breadcrumbSchema, faqSchema, JsonLd } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industryContent.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return createMetadata({
    title: industry.metaTitle,
    description: industry.metaDescription,
    path: `/industries/${slug}`,
    keywords:
      keywordMap.industriesBySlug[
        slug as keyof typeof keywordMap.industriesBySlug
      ],
  });
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: industry.name, path: `/industries/${industry.slug}` },
  ];

  const relatedServiceSlugs = industry.relatedServices as readonly string[];
  const related = services.filter((s) =>
    relatedServiceSlugs.includes(s.slug),
  );

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(industry.faqs)]} />

      <section className="section-ink relative section-y">
        <Container className="relative z-10">
          <Breadcrumbs items={crumbs} tone="dark" />
          <p className="eyebrow mt-8">{industry.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-h1 text-white">{industry.headline}</h1>
          <p className="mt-5 max-w-2xl text-body-lg text-muted-dark">
            {industry.heroSub}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="primary" size="lg">
              <Link href={site.primaryCta.href}>{site.primaryCta.label}</Link>
            </Button>
            <Button asChild variant="whatsapp" size="lg">
              <a
                href={contactLinks.whatsappWithMessage(
                  `Hi ${site.shortName}, I need digital solutions for ${industry.name} in Jaipur.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp us
              </a>
            </Button>
          </div>
        </Container>
      </section>

      <section className="section-paper section-y">
        <Container>
          <SectionHeader title={industry.challenges.title} />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {industry.challenges.items.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border bg-white p-6"
              >
                <h3 className="text-h4 text-ink">{item.title}</h3>
                <p className="mt-3 text-sm text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-ink section-y relative">
        <Container className="relative z-10">
          <SectionHeader title={industry.solutionBundle.title} tone="dark" />
          <ol className="mt-10 space-y-3">
            {industry.solutionBundle.items.map((item, index) => (
              <li
                key={item.name}
                className="flex gap-4 rounded-2xl border border-line-dark bg-ink-2/70 p-5"
              >
                <span className="font-mono text-sm text-saffron">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-h4 text-white">{item.name}</h3>
                  <p className="mt-2 text-sm text-muted-dark">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section-paper section-y">
        <Container>
          <SectionHeader title={industry.features.title} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {industry.features.items.map((item) => (
              <article
                key={item.name}
                className="rounded-2xl border border-border bg-white p-6"
              >
                <h3 className="text-h4 text-ink">{item.name}</h3>
                <p className="mt-3 text-sm text-muted">{item.description}</p>
              </article>
            ))}
          </div>

          {industry.bodySections.map((section) => (
            <div key={section.title} className="mt-14 max-w-3xl">
              <h2 className="text-h2 text-ink">{section.title}</h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="mt-4 text-body-lg text-muted">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </Container>
      </section>

      <section className="section-ink section-y relative">
        <Container className="relative z-10">
          <SectionHeader title={industry.process.title} tone="dark" />
          <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {industry.process.steps.map((step, index) => (
              <li key={step.title}>
                <p className="font-mono text-sm text-saffron">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-h4 text-white">{step.title}</h3>
                <p className="mt-3 text-sm text-muted-dark">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section-paper section-y">
        <Container>
          <div className="border border-border bg-surface-elevated p-8 text-sm text-muted">
            <p className="font-semibold text-ink dark:text-white">Industry work</p>
            <p className="mt-2">{industry.workNote}</p>
          </div>
          <div className="mt-14">
            <h2 className="text-h3 text-ink">Recommended services</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {related.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-ink hover:border-saffron/40"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="section-paper border-t border-border section-y">
        <Container className="grid gap-10 lg:grid-cols-2">
          <SectionHeader
            title={`Talk to us about ${industry.shortName}`}
            description="Share your context—we’ll map a practical digital stack."
          />
          <LeadForm formType="industry" defaultIndustry={industry.slug} />
        </Container>
      </section>

      <FaqSection items={industry.faqs} withSchema={false} />

      <CtaBand
        title="Let's design the right stack for your industry"
        primary={site.primaryCta}
        secondary={{ label: "Browse services", href: "/services" }}
      />
    </>
  );
}
