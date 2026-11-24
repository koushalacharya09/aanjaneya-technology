import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { CtaBand } from "@/components/sections/cta-band";
import { allServices } from "@/content/services";
import { keywordMap } from "@/content/seo/keyword-map";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: keywordMap.services.title,
  description: keywordMap.services.description,
  path: "/services",
});

export default function ServicesIndexPage() {
  return (
    <>
      <section className="section-ink relative section-y">
        <Container className="relative z-10">
          <p className="eyebrow">Digital services in Jaipur</p>
          <h1 className="mt-4 max-w-3xl text-h1 text-white">
            Website development, SEO and digital services in Jaipur.
          </h1>
          <p className="mt-5 max-w-2xl text-body-lg text-muted-dark">
            Six capabilities under one accountable digital partner—so Jaipur
            businesses are not juggling agencies for every digital need.
          </p>
        </Container>
      </section>
      <section className="section-paper section-y">
        <Container>
          <SectionHeader
            title="Choose a capability—or start with the problem"
            description="Not sure which service fits? Tell us the outcome and we’ll map the right approach."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {allServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:border-saffron/40 hover:shadow-lift"
              >
                <h2 className="text-h3 text-ink">{service.name}</h2>
                <p className="mt-3 text-sm text-muted">{service.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-saffron">
                  Explore{" "}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand
        title="Ready to map the right capability?"
        primary={site.primaryCta}
        secondary={{ label: "Industries", href: "/industries" }}
      />
    </>
  );
}
