import Link from "next/link";

import { SiteImage } from "@/components/media/site-image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { media } from "@/content/media";
import { keywordMap } from "@/content/seo/keyword-map";
import { site } from "@/content/site";
import { workProjects } from "@/content/work";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: keywordMap.work.title,
  description: keywordMap.work.description,
  path: "/work",
});

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
          <p className="eyebrow text-saffron">Work</p>
          <h1 className="mt-4 max-w-3xl text-h1 text-white">
            Selected projects from our practice.
          </h1>
          <p className="mt-5 max-w-2xl text-body-lg text-white/70">
            Named engagements we can stand behind today. Images and measured
            results marked [PLACEHOLDER] until assets and outcomes are ready to publish.
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
          <ul className="grid gap-10 md:grid-cols-3">
            {workProjects.map((project) => (
              <li key={project.slug} className="flex flex-col border border-border">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-void">
                  <SiteImage
                    src={project.image.src}
                    alt={project.image.alt}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="absolute inset-0"
                  />
                  <span className="absolute left-3 top-3 rounded-sm bg-void/80 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-saffron">
                    {project.imageNote}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-caption font-semibold uppercase tracking-[0.16em] text-saffron">
                    {project.category}
                  </p>
                  <h2 className="mt-2 text-h3 text-ink dark:text-white">{project.name}</h2>
                  <p className="mt-3 flex-1 text-sm text-muted">{project.summary}</p>
                  <p className="mt-5 text-sm font-medium text-ink dark:text-white">
                    {project.result}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-14 max-w-2xl">
            <h2 className="text-h2 text-ink dark:text-white">Discuss a similar brief</h2>
            <p className="mt-4 text-body-lg text-muted">
              Share your industry and goal—we’ll outline what a comparable engagement would involve.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="primary" size="lg">
                <Link href={site.primaryCta.href}>{site.primaryCta.label}</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
