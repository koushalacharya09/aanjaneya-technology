import Link from "next/link";

import { SiteImage } from "@/components/media/site-image";
import { CtaBand } from "@/components/sections/cta-band";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { media } from "@/content/media";
import { keywordMap } from "@/content/seo/keyword-map";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: keywordMap.about.title,
  description: keywordMap.about.description,
  path: "/about",
});

const values = [
  {
    title: "Clarity",
    description: "We explain trade-offs in plain language so you can decide with confidence.",
  },
  {
    title: "Craft",
    description: "Details matter—performance, accessibility, and handoff quality are part of the job.",
  },
  {
    title: "Accountability",
    description: "One partner across the stack means fewer handoffs and clearer ownership.",
  },
  {
    title: "Honesty",
    description: "Durable work, transparent scope, and reporting you can trust.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate min-h-[70svh] overflow-hidden bg-void text-white">
        <SiteImage
          src={media.trust.src}
          alt={media.trust.alt}
          priority
          overlay="ink-left"
          sizes="100vw"
          className="absolute inset-0"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/45" />
        <Container className="relative z-10 flex min-h-[70svh] flex-col justify-end pb-16 pt-[calc(var(--header-height)+3rem)]">
          <p className="eyebrow text-saffron">About</p>
          <h1 className="mt-4 max-w-3xl text-h1 text-white">
            A Jaipur technology firm built for long-term partnership.
          </h1>
          <p className="mt-5 max-w-2xl text-body-lg text-white/70">{site.description}</p>
        </Container>
      </section>

      <section className="section-paper section-y">
        <Container className="max-w-3xl">
          <SectionHeader
            eyebrow="Story"
            title="Business problems first. Technology second."
            description="Aanjaneya Technology exists to help organisations get found, convert enquiries, and run cleaner operations—without drowning in tools or jargon."
          />
          <div className="mt-10 space-y-5 text-body-lg text-muted">
            <p>
              Too many digital projects start with a template, a buzzword, or a
              vendor’s favourite stack. We start with how your business actually
              works: who buys, who decides, which steps are manual, and what
              “better” would look like in revenue, speed, or trust.
            </p>
            <p>
              From websites and software to SEO, data, AI automation, branding
              and broader transformation, we keep the conversation consultative
              and the delivery accountable. Based in {site.city}, we serve
              clients across Rajasthan and India.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-ink section-y relative">
        <Container className="relative z-10 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-h2 text-white">Mission</h2>
            <p className="mt-4 text-body-lg text-muted-dark">
              Help every business we work with ship digital systems that create
              measurable outcomes—more qualified enquiries, less manual work,
              clearer decisions.
            </p>
          </div>
          <div>
            <h2 className="text-h2 text-white">Vision</h2>
            <p className="mt-4 text-body-lg text-muted-dark">
              Become the most trusted long-term digital partner for ambitious
              organisations rooted in Jaipur and growing everywhere.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-paper section-y">
        <Container>
          <SectionHeader eyebrow="Values" title="How we show up" />
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {values.map((v, index) => (
              <article key={v.title}>
                <span className="font-mono text-caption text-saffron">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-h4 text-ink dark:text-white">{v.title}</h3>
                <p className="mt-3 text-sm text-muted">{v.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-paper border-t border-border section-y">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Why Jaipur"
              title="Local roots. National standards."
              description="Jaipur’s businesses—from jewellery and hospitality to education and manufacturing—deserve digital partners who understand context and still deliver with consulting-grade restraint."
            />
            <div className="mt-8">
              <Button asChild variant="secondary">
                <Link href="/contact">Talk to the team</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <SiteImage
              src={media.process.src}
              alt={media.process.alt}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="absolute inset-0"
            />
          </div>
        </Container>
      </section>

      <CtaBand
        title="Want to know if we’re the right fit?"
        primary={site.primaryCta}
        secondary={{ label: "Contact", href: "/contact" }}
      />
    </>
  );
}
