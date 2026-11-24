import { QuoteWizard } from "@/components/forms/quote-wizard";
import { Container } from "@/components/ui/container";
import { keywordMap } from "@/content/seo/keyword-map";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: keywordMap.quote.title,
  description: keywordMap.quote.description,
  path: "/get-a-quote",
  keywords: keywordMap.quote.primary,
});

export default function GetAQuotePage() {
  return (
    <>
      <section className="section-ink relative py-16 md:py-20">
        <Container className="relative z-10">
          <p className="eyebrow">Get a quote · Jaipur</p>
          <h1 className="mt-4 max-w-3xl text-h1 text-white">
            Get a quote for website & digital work in Jaipur.
          </h1>
          <p className="mt-5 max-w-2xl text-body-lg text-muted-dark">
            Four short steps. We reply with clarifying questions and a practical
            next step before quoting. Prefer voice? Call or WhatsApp{" "}
            {site.phoneDisplay}.
          </p>
        </Container>
      </section>
      <section className="section-paper section-y">
        <Container className="max-w-3xl">
          <QuoteWizard />
        </Container>
      </section>
    </>
  );
}
