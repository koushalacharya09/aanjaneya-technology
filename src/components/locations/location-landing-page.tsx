import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { LeadForm } from "@/components/forms/lead-form";
import { Breadcrumbs } from "@/components/sections/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import {
  buildLandingSlug,
  resolveRelatedAreas,
  type LocationLanding,
} from "@/content/locations";
import { getIndustry } from "@/content/industries";
import { contactLinks, site } from "@/content/site";
import {
  breadcrumbSchema,
  faqSchema,
  JsonLd,
  serviceSchema,
} from "@/lib/schema";

export function LocationLandingPage({ landing }: { landing: LocationLanding }) {
  const { area, copy, service } = landing;
  const related = resolveRelatedAreas(area);
  const twinSlug = buildLandingSlug(service === "website" ? "seo" : "website", area.slug);
  const twinLabel =
    service === "website"
      ? `SEO services in ${area.name}`
      : `Website development in ${area.name}`;

  const crumbs = [
    { name: "Home", path: "/" },
    {
      name: service === "website" ? "Website development" : "SEO services",
      path: landing.parentServiceHref,
    },
    { name: `${area.name}, Jaipur`, path: landing.path },
  ];

  const whatsappMessage =
    service === "website"
      ? `Hi ${site.shortName}, I need website development for my business in ${area.name}, Jaipur (${area.pincode}).`
      : `Hi ${site.shortName}, I need SEO / digital marketing for my business in ${area.name}, Jaipur (${area.pincode}).`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema({
            name: landing.h1,
            description: landing.description,
            path: landing.path,
          }),
          faqSchema(copy.faqs),
        ]}
      />

      <section className="section-ink relative section-y">
        <Container className="relative z-10">
          <Breadcrumbs items={crumbs} tone="dark" />
          <p className="eyebrow mt-8">
            {area.name} · PIN {area.pincode} · Jaipur
          </p>
          <h1 className="mt-4 max-w-3xl text-h1 text-white">{landing.h1}</h1>
          <p className="mt-5 max-w-2xl text-body-lg text-muted-dark">{copy.uniqueAngle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="primary" size="lg">
              <Link href={site.primaryCta.href}>{site.primaryCta.label}</Link>
            </Button>
            <Button asChild variant="whatsapp" size="lg">
              <a
                href={contactLinks.whatsappWithMessage(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp us
              </a>
            </Button>
            <Button asChild variant="outlineDark" size="lg">
              <a href={contactLinks.phoneHref}>Call {site.phoneDisplay}</a>
            </Button>
          </div>
        </Container>
      </section>

      <section className="section-paper section-y">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Local context"
              title={`Why ${area.name} businesses choose us`}
              description={copy.whoWeHelp}
            />
            <p className="mt-6 text-body-lg text-muted">{copy.localContext}</p>
            <div className="mt-8 border border-border p-5">
              <p className="text-caption font-semibold uppercase tracking-[0.14em] text-saffron">
                Landmarks & catchment
              </p>
              <p className="mt-2 text-sm text-muted">
                PIN {area.pincode} · {area.landmarks.join(" · ")}
              </p>
              <p className="mt-3 text-sm text-muted">{area.nearbyBusinesses}</p>
            </div>
          </div>
          <div>
            <SectionHeader
              title="Who we help nearby"
              description="Typical organisations we support in this catchment."
            />
            <ul className="mt-6 space-y-3">
              {area.industriesServed.map((slug) => {
                const industry = getIndustry(slug);
                if (!industry) return null;
                return (
                  <li key={slug}>
                    <Link
                      href={`/industries/${slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-saffron dark:text-white"
                    >
                      {industry.name}
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      <section id="enquire" className="section-ink section-y scroll-mt-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-saffron">Enquire from {area.name}</p>
            <h2 className="mt-4 text-h1 text-white">
              Tell us what you need in {area.name}.
            </h2>
            <p className="mt-4 text-body-lg text-white/65">
              Share a few details. We reply with clarifying questions and a
              practical next step. Serving businesses across Jaipur; most
              collaboration is online or by appointment.
            </p>
            <ul className="mt-8 space-y-4 border-t border-white/10 pt-8">
              {copy.faqs.map((faq) => (
                <li key={faq.question}>
                  <p className="text-sm font-semibold text-white">{faq.question}</p>
                  <p className="mt-1.5 text-sm text-white/60">{faq.answer}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-white/10 bg-white/5 p-6 md:p-8">
            <LeadForm
              formType={service === "website" ? "service" : "service"}
              defaultService={
                service === "website"
                  ? "website-software-development"
                  : "digital-marketing-seo"
              }
            />
          </div>
        </Container>
      </section>

      <section className="section-paper section-y">
        <Container>
          <SectionHeader
            title="Explore related"
            description="Parent service, twin offering for this area, and nearby localities."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Link
              href={landing.parentServiceHref}
              className="border border-border p-5 transition-colors hover:border-saffron/40"
            >
              <p className="text-caption text-saffron">Service</p>
              <p className="mt-2 text-h4 text-ink dark:text-white">{landing.parentServiceLabel}</p>
            </Link>
            <Link
              href={`/${twinSlug}`}
              className="border border-border p-5 transition-colors hover:border-saffron/40"
            >
              <p className="text-caption text-saffron">Same area</p>
              <p className="mt-2 text-h4 text-ink dark:text-white">{twinLabel}</p>
            </Link>
            {related[0] ? (
              <Link
                href={`/${buildLandingSlug(service, related[0].slug)}`}
                className="border border-border p-5 transition-colors hover:border-saffron/40"
              >
                <p className="text-caption text-saffron">Nearby</p>
                <p className="mt-2 text-h4 text-ink dark:text-white">
                  {related[0].name}, Jaipur
                </p>
              </Link>
            ) : null}
          </div>
          {related.length > 1 ? (
            <ul className="mt-8 flex flex-wrap gap-3">
              {related.slice(1).map((rel) => (
                <li key={rel.slug}>
                  <Link
                    href={`/${buildLandingSlug(service, rel.slug)}`}
                    className="inline-flex border border-border px-3 py-2 text-sm text-muted transition-colors hover:border-saffron/40 hover:text-ink dark:hover:text-white"
                  >
                    {rel.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      </section>
    </>
  );
}
