import { Container } from "@/components/ui/container";
import { keywordMap } from "@/content/seo/keyword-map";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: keywordMap.terms.title,
  description: keywordMap.terms.description,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <section className="section-paper section-y">
      <Container className="max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 text-h1 text-ink">Terms of Use</h1>
        <p className="mt-4 text-sm text-muted">
          Last updated: {site.copyrightYear}.
        </p>
        <div className="mt-10 space-y-8 text-body-lg text-muted">
          <section>
            <h2 className="text-h3 text-ink">Acceptance</h2>
            <p className="mt-3">
              By using this website you agree to these terms and our Privacy
              Policy. If you do not agree, please do not use the site.
            </p>
          </section>
          <section>
            <h2 className="text-h3 text-ink">Services information</h2>
            <p className="mt-3">
              Content on this site is for general information. Project scope,
              pricing, and timelines are confirmed only in a written proposal or
              agreement. We do not guarantee search rankings or specific
              business results.
            </p>
          </section>
          <section>
            <h2 className="text-h3 text-ink">Intellectual property</h2>
            <p className="mt-3">
              Site design, copy, and branding are owned by {site.name} unless
              otherwise stated. You may not copy or reuse materials without
              permission.
            </p>
          </section>
          <section>
            <h2 className="text-h3 text-ink">User submissions</h2>
            <p className="mt-3">
              When you send an enquiry, you confirm the information is accurate
              and that you have authority to share it.
            </p>
          </section>
          <section>
            <h2 className="text-h3 text-ink">Limitation of liability</h2>
            <p className="mt-3">
              To the fullest extent permitted by law, {site.name} is not liable
              for indirect or consequential losses arising from use of this
              website.
            </p>
          </section>
          <section>
            <h2 className="text-h3 text-ink">Governing law</h2>
            <p className="mt-3">
              These terms are governed by the laws of India. Courts in Jaipur,
              Rajasthan shall have jurisdiction, subject to applicable law.
            </p>
          </section>
          <section>
            <h2 className="text-h3 text-ink">Contact</h2>
            <p className="mt-3">
              {site.email} · {site.phoneDisplay} · {site.address}
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
