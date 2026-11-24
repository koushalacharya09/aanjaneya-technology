import Link from "next/link";

import { SiteImage } from "@/components/media/site-image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { media } from "@/content/media";
import { keywordMap } from "@/content/seo/keyword-map";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: keywordMap.work.title,
  description: keywordMap.work.description,
  path: "/work",
});

const engagementShapes = [
  {
    title: "Discovery → scoped proposal",
    description:
      "Notes on goals, constraints and customers—then a written scope you can defend internally.",
  },
  {
    title: "Build in reviewable stages",
    description:
      "Design and delivery checkpoints so you see craft early, not only at launch.",
  },
  {
    title: "Handoff you own",
    description:
      "Access, docs and next steps included. Case studies publish only with real, approved outcomes.",
  },
] as const;

export default function WorkPage() {
  return (
    <>
      <section className="relative isolate min-h-[70svh] overflow-hidden bg-void text-white">
        <SiteImage
          src={media.why.src}
          alt={media.why.alt}
          priority
          overlay="ink-left"
          sizes="100vw"
          className="absolute inset-0"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/50" />
        <Container className="relative z-10 flex min-h-[70svh] flex-col justify-end pb-16 pt-[calc(var(--header-height)+3rem)]">
          <p className="eyebrow text-saffron">Work</p>
          <h1 className="mt-4 max-w-3xl text-h1 text-white">
            Case studies publish when outcomes are real.
          </h1>
          <p className="mt-5 max-w-2xl text-body-lg text-white/70">
            We don’t invent clients or pad results. Until named stories are ready,
            here’s exactly how an engagement runs—and how to talk through a
            similar challenge for your business.
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
          <h2 className="text-h2 text-ink dark:text-white">What you get before a public case study</h2>
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {engagementShapes.map((item, index) => (
              <li key={item.title} className="grid gap-2 py-7 sm:grid-cols-[4rem_1fr]">
                <span className="font-mono text-caption text-saffron">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-h4 text-ink dark:text-white">{item.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm text-muted">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-body-lg text-muted">
            Prefer to see fit first? Share your industry and goal—we’ll outline what a comparable engagement would involve.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="primary" size="lg">
              <Link href={site.primaryCta.href}>{site.primaryCta.label}</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
