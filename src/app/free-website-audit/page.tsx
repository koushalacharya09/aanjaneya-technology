import { LeadForm } from "@/components/forms/lead-form";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { keywordMap } from "@/content/seo/keyword-map";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: keywordMap.audit.title,
  description: keywordMap.audit.description,
  path: "/free-website-audit",
  keywords: keywordMap.audit.primary,
});

const checks = [
  "SEO fundamentals & structure for Jaipur search intent",
  "Speed / Core Web Vitals signals",
  "Mobile experience (how most Jaipur buyers browse)",
  "Design clarity & enquiry conversion",
  "Google Business / local presence cues",
];

type Props = { searchParams: Promise<{ url?: string }> };

export default async function FreeWebsiteAuditPage({ searchParams }: Props) {
  const params = await searchParams;
  const defaultUrl = params.url ?? "";

  return (
    <>
      <section className="section-ink relative section-y">
        <Container className="relative z-10">
          <p className="eyebrow">Free website audit · Jaipur</p>
          <h1 className="mt-4 max-w-3xl text-h1 text-white">
            Free website audit for Jaipur businesses.
          </h1>
          <p className="mt-5 max-w-2xl text-body-lg text-muted-dark">
            Share your URL. We review what’s holding the site back—clarity,
            mobile, speed signals and conversion basics—then send practical next
            steps. No ranking guarantees.
          </p>
        </Container>
      </section>
      <section className="section-paper section-y">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader title="What we check" />
            <ul className="mt-8 space-y-3">
              {checks.map((item) => (
                <li
                  key={item}
                  className="border border-border bg-white px-5 py-4 text-sm text-ink dark:bg-void/40 dark:text-white"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader title="Request your audit" />
            <div className="mt-8">
              <LeadForm formType="audit" defaultWebsiteUrl={defaultUrl} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
