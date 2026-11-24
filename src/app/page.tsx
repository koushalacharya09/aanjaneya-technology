import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { LeadForm } from "@/components/forms/lead-form";
import { SiteImage } from "@/components/media/site-image";
import { KineticHeadline } from "@/components/motion/kinetic-text";
import { MagneticTilt } from "@/components/motion/magnetic-tilt";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/ui/section-header";
import {
  homeAudit,
  homeContact,
  homeFaq,
  homeHero,
  homeIndustries,
  homeObjections,
  homeProblems,
  homeProcess,
  homeServices,
  homeWhy,
} from "@/content/home";
import { keywordMap } from "@/content/seo/keyword-map";
import { contactLinks, site } from "@/content/site";
import { createMetadata } from "@/lib/seo";
import {
  faqSchema,
  JsonLd,
  localBusinessSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/schema";

export const metadata = createMetadata({
  title: keywordMap.home.title,
  description: keywordMap.home.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          organizationSchema(),
          localBusinessSchema(),
          websiteSchema(),
          faqSchema([
            ...homeObjections.items.map((i) => ({ question: i.q, answer: i.a })),
            ...homeFaq.items,
          ]),
        ]}
      />

      {/* 1. Hero */}
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-void text-white">
        <SiteImage
          src={homeHero.image.src}
          alt={homeHero.image.alt}
          priority
          kenBurns
          overlay="ink-left"
          sizes="100vw"
          className="absolute inset-0"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/45" />

        <Container className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-16 pt-[calc(var(--header-height)+3rem)] md:pb-24">
          <div className="max-w-3xl">
            <p className="eyebrow text-saffron">{homeHero.eyebrow}</p>
            <p className="mt-6 text-[clamp(1.05rem,2vw,1.35rem)] font-semibold tracking-[0.04em] text-saffron">
              {homeHero.brand}
            </p>
            <div className="mt-4">
              <KineticHeadline text={homeHero.headline} className="text-white" />
            </div>
            <p className="mt-7 max-w-xl text-body-lg text-white/75">{homeHero.sub}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="primary" size="lg" className="group">
                <Link href={homeHero.primaryCta.href}>
                  {homeHero.primaryCta.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outlineDark" size="lg">
                <a href={homeHero.secondaryCta.href}>{homeHero.secondaryCta.label}</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Problems */}
      <section className="section-paper section-y">
        <Container>
          <Reveal>
            <SectionHeader eyebrow={homeProblems.eyebrow} title={homeProblems.title} />
          </Reveal>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {homeProblems.items.map((item, index) => (
              <div
                key={item.problem}
                className="grid items-center gap-6 py-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10"
              >
                <div>
                  <span className="font-mono text-caption text-saffron">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-h2 text-ink dark:text-white">{item.problem}</h3>
                  <p className="mt-3 max-w-lg text-body-lg text-muted">{item.solution}</p>
                </div>
                <MagneticTilt intensity={10}>
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <SiteImage
                      src={item.image.src}
                      alt={item.image.alt}
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="absolute inset-0"
                    />
                  </div>
                </MagneticTilt>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Services */}
      <section className="section-paper border-t border-border pb-[var(--space-section-y)]">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow={homeServices.eyebrow}
              title={homeServices.title}
              description={homeServices.description}
            />
          </Reveal>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {homeServices.items.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group grid gap-4 py-6 transition-colors md:grid-cols-[7rem_minmax(0,1fr)_minmax(0,1.2fr)_auto] md:items-center md:gap-8"
              >
                <div className="relative hidden aspect-[4/3] overflow-hidden md:block">
                  <SiteImage
                    src={service.image.src}
                    alt=""
                    sizes="112px"
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-h4 text-ink transition-colors group-hover:text-saffron dark:text-white">
                  {service.name}
                </h3>
                <p className="text-sm text-muted">{service.summary}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-saffron md:justify-self-end">
                  Explore <ArrowUpRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Industries */}
      <section className="section-paper border-t border-border pb-[var(--space-section-y)]">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow={homeIndustries.eyebrow}
              title={homeIndustries.title}
              description={homeIndustries.description}
            />
          </Reveal>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {homeIndustries.featured.map((industry) => (
              <li key={industry.slug}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden"
                >
                  <SiteImage
                    src={industry.image.src}
                    alt={industry.image.alt}
                    sizes="(max-width: 640px) 100vw, 20vw"
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/90 via-void/20 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 z-10 p-4 text-sm font-semibold text-white">
                    {industry.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button asChild variant="secondary">
              <Link href="/industries">
                See all {homeIndustries.allCount} industries
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* 5. Process */}
      <section className="relative isolate overflow-hidden section-y">
        <SiteImage
          src={homeProcess.image.src}
          alt={homeProcess.image.alt}
          sizes="100vw"
          className="absolute inset-0"
          overlay="ink-soft"
        />
        <div className="absolute inset-0 bg-void/80" />
        <Container className="relative z-10">
          <Reveal>
            <SectionHeader eyebrow={homeProcess.eyebrow} title={homeProcess.title} tone="dark" />
          </Reveal>
          <ol className="mt-12 grid gap-6 md:grid-cols-5">
            {homeProcess.steps.map((step, index) => (
              <li
                key={step.number}
                className={`border-t border-white/15 pt-5 md:border-t-0 md:border-l md:pl-5 md:pt-0 ${
                  index === 0 ? "md:border-l-0 md:pl-0" : ""
                }`}
              >
                <p className="font-mono text-caption text-saffron">{step.number}</p>
                <h3 className="mt-3 text-h4 text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-white/65">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 7. Why us */}
      <section className="section-paper section-y">
        <Container>
          <Reveal>
            <SectionHeader eyebrow={homeWhy.eyebrow} title={homeWhy.title} />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {homeWhy.points.map((point, index) => (
              <article key={point.title}>
                <span className="font-mono text-caption text-saffron">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-h4 text-ink dark:text-white">{point.title}</h3>
                <p className="mt-2 text-sm text-muted">{point.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. Audit CTA */}
      <section className="relative isolate overflow-hidden section-y">
        <SiteImage
          src={homeAudit.image.src}
          alt={homeAudit.image.alt}
          sizes="100vw"
          className="absolute inset-0"
          overlay="ink-left"
        />
        <div className="absolute inset-0 bg-void/70" />
        <Container className="relative z-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="eyebrow text-saffron">{homeAudit.eyebrow}</p>
              <h2 className="mt-5 max-w-xl text-h1 text-white">{homeAudit.title}</h2>
              <p className="mt-4 max-w-xl text-body-lg text-white/70">{homeAudit.description}</p>
            </div>
            <form action="/free-website-audit" method="get" className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Input
                name="url"
                type="url"
                placeholder="https://yourwebsite.com"
                className="h-12 border-white/15 bg-void/80 text-white placeholder:text-white/40"
                required
              />
              <Button type="submit" variant="primary" size="lg">
                Request audit
              </Button>
            </form>
          </div>
        </Container>
      </section>

      {/* 9. FAQ — native details so content always renders */}
      <section className="section-paper section-y">
        <Container className="max-w-3xl">
          <SectionHeader eyebrow={homeFaq.eyebrow} title={homeFaq.title} />
          <div className="mt-10 divide-y divide-border border-y border-border">
            {homeFaq.items.map((item) => (
              <details key={item.question} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-[0.9375rem] font-semibold text-ink tap-target marker:content-none dark:text-white [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span
                    aria-hidden
                    className="text-muted transition-transform group-open:rotate-180"
                  >
                    ▾
                  </span>
                </summary>
                <p className="pb-5 text-sm text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* 10. Contact form */}
      <section id="enquire" className="section-ink section-y relative scroll-mt-24">
        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div>
              <p className="eyebrow text-saffron">{homeContact.eyebrow}</p>
              <h2 className="mt-5 text-h1 text-white">{homeContact.title}</h2>
              <p className="mt-5 max-w-xl text-body-lg text-white/65">
                {homeContact.description} {site.phoneDisplay}.
              </p>
              <ul className="mt-10 space-y-5 border-t border-white/10 pt-8">
                {homeObjections.items.map((item) => (
                  <li key={item.q}>
                    <p className="text-sm font-semibold text-white">{item.q}</p>
                    <p className="mt-1.5 text-sm text-white/60">{item.a}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="primary" size="lg">
                  <a href={contactLinks.phoneHref}>Call {site.phoneDisplay}</a>
                </Button>
                <Button asChild variant="outlineDark" size="lg">
                  <a
                    href={contactLinks.whatsappWithMessage(
                      "Hi Aanjaneya Technology — I'd like a quote.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp us
                  </a>
                </Button>
              </div>
            </div>
            <div className="rounded-md border border-white/10 bg-white/5 p-6 md:p-8">
              <LeadForm formType="home" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
