import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { LeadForm } from "@/components/forms/lead-form";
import { Breadcrumbs } from "@/components/sections/breadcrumbs";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqSection } from "@/components/sections/faq-section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { industries as industryNav } from "@/content/site";
import { allServices, getService } from "@/content/services";
import { keywordMap } from "@/content/seo/keyword-map";
import { contactLinks, site } from "@/content/site";
import {
  breadcrumbSchema,
  faqSchema,
  JsonLd,
  serviceSchema,
} from "@/lib/schema";
import { createMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const keyword =
    keywordMap.servicesBySlug[slug as keyof typeof keywordMap.servicesBySlug];
  return createMetadata({
    title: service.metaTitle ?? `${keyword} | ${site.name}`,
    description: service.metaDescription,
    path: `/services/${slug}`,
    keywords: service.primaryKeyword,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ];

  const relatedServiceSlugs = service.relatedServices as readonly string[];
  const relatedIndustrySlugs = service.relatedIndustries as readonly string[];
  const relatedServices = allServices.filter((s) =>
    relatedServiceSlugs.includes(s.slug),
  );
  const relatedIndustries = industryNav.filter((i) =>
    relatedIndustrySlugs.includes(i.slug),
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema({
            name: service.name,
            description: service.summary,
            path: `/services/${service.slug}`,
          }),
          faqSchema(service.faqs),
        ]}
      />

      <section className="section-ink relative section-y">
        <Container className="relative z-10">
          <Breadcrumbs items={crumbs} tone="dark" />
          <p className="eyebrow mt-8">{service.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-h1 text-white">
            {service.headline.split(service.headlineAccent).map((part, i, arr) =>
              i < arr.length - 1 ? (
                <span key={i}>
                  {part}
                  <span className="text-saffron">{service.headlineAccent}</span>
                </span>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </h1>
          <p className="mt-5 max-w-2xl text-body-lg text-muted-dark">
            {service.heroSub}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="primary" size="lg">
              <Link href={site.primaryCta.href}>{site.primaryCta.label}</Link>
            </Button>
            <Button asChild variant="whatsapp" size="lg">
              <a
                href={contactLinks.whatsappWithMessage(
                  `Hi — I'm interested in ${service.name}.`,
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
          <SectionHeader title={service.whoFor.title} />
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {service.whoFor.items.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-border bg-white p-5 text-sm text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="section-ink section-y relative">
        <Container className="relative z-10">
          <SectionHeader title={service.problems.title} tone="dark" />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {service.problems.items.map((item) => (
              <article
                key={item.problem}
                className="rounded-2xl border border-line-dark bg-ink-2/70 p-6"
              >
                <h3 className="text-h4 text-white">{item.problem}</h3>
                <p className="mt-3 text-sm text-muted-dark">{item.solution}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-paper section-y">
        <Container>
          <SectionHeader title={service.deliverables.title} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.deliverables.items.map((item) => (
              <article
                key={item.name}
                className="rounded-2xl border border-border bg-white p-6"
              >
                <h3 className="text-h4 text-ink">{item.name}</h3>
                <p className="mt-3 text-sm text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-ink section-y relative">
        <Container className="relative z-10">
          <SectionHeader title={service.approach.title} tone="dark" />
          <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {service.approach.steps.map((step, index) => (
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
          <SectionHeader title="Technologies & tools" />
          <ul className="mt-8 flex flex-wrap gap-2">
            {service.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border bg-white px-3 py-1.5 text-caption text-ink"
              >
                {tech}
              </li>
            ))}
          </ul>

          {service.bodySections.map((section) => (
            <div key={section.title} className="mt-14 max-w-3xl">
              <h2 className="text-h2 text-ink">{section.title}</h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 24)} className="mt-4 text-body-lg text-muted">
                  {p}
                </p>
              ))}
            </div>
          ))}

          <div className="mt-14 border border-border bg-surface-elevated p-8 text-sm text-muted">
            <p className="font-semibold text-ink dark:text-white">Related work</p>
            <p className="mt-2">{service.workNote}</p>
          </div>
        </Container>
      </section>

      <section className="section-paper border-t border-border section-y">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader
              title={`Enquire about ${service.shortName}`}
              description="Tell us what you’re trying to achieve—we’ll reply with clear next steps."
            />
          </div>
          <LeadForm formType="service" defaultService={service.slug} />
        </Container>
      </section>

      <FaqSection items={service.faqs} withSchema={false} />

      <section className="section-paper section-y border-t border-border">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-h3 text-ink">Related services</h2>
              <ul className="mt-4 space-y-2">
                {relatedServices.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-saffron-deep"
                    >
                      {s.name} <ArrowRight className="size-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-h3 text-ink">Related industries</h2>
              <ul className="mt-4 space-y-2">
                {relatedIndustries.map((i) => (
                  <li key={i.slug}>
                    <Link
                      href={`/industries/${i.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-saffron-deep"
                    >
                      {i.name} <ArrowRight className="size-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        title="Ready to scope this properly?"
        description="No invented promises—just a clear conversation about fit, scope and next steps."
        primary={site.primaryCta}
        secondary={{ label: "Contact", href: "/contact" }}
      />
    </>
  );
}
