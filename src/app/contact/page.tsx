import { LeadForm } from "@/components/forms/lead-form";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { keywordMap } from "@/content/seo/keyword-map";
import { contactLinks, site } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: keywordMap.contact.title,
  description: keywordMap.contact.description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="section-ink relative section-y">
        <Container className="relative z-10">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 max-w-3xl text-h1 text-white">
            Let’s talk about what’s next.
          </h1>
          <p className="mt-5 max-w-2xl text-body-lg text-muted-dark">
            Call, WhatsApp, or send a short brief. We’ll reply with clear
            questions—not a generic pitch deck.
          </p>
        </Container>
      </section>
      <section className="section-paper section-y">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader title="Send an enquiry" />
            <div className="mt-8">
              <LeadForm formType="contact" />
            </div>
          </div>
          <div className="space-y-4">
            <a
              href={contactLinks.phoneHref}
              className="block border border-border bg-white p-5 dark:bg-void/40"
            >
              <p className="text-caption font-semibold uppercase tracking-[0.14em] text-saffron">
                Phone
              </p>
              <p className="mt-2 text-h4 text-ink dark:text-white">{site.phoneDisplay}</p>
            </a>
            <a
              href={contactLinks.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-border bg-white p-5 dark:bg-void/40"
            >
              <p className="text-caption font-semibold uppercase tracking-[0.14em] text-saffron">
                WhatsApp
              </p>
              <p className="mt-2 text-h4 text-ink dark:text-white">{site.phoneDisplay}</p>
            </a>
            {site.email ? (
              <a
                href={contactLinks.emailHref}
                className="block border border-border bg-white p-5 dark:bg-void/40"
              >
                <p className="text-caption font-semibold uppercase tracking-[0.14em] text-saffron">
                  Email
                </p>
                <p className="mt-2 break-all text-h4 text-ink dark:text-white">{site.email}</p>
              </a>
            ) : null}
            <div className="border border-border bg-white p-5 dark:bg-void/40">
              <p className="text-caption font-semibold uppercase tracking-[0.14em] text-saffron">
                Location & hours
              </p>
              <p className="mt-2 text-sm text-muted">{site.address}</p>
              <p className="mt-2 text-sm text-muted">{site.hoursDisplay}</p>
              <p className="mt-4 text-sm text-muted">
                Meetings by appointment—call or WhatsApp to schedule. Serving clients across India; most work runs online.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
