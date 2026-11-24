import { Container } from "@/components/ui/container";
import { keywordMap } from "@/content/seo/keyword-map";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: keywordMap.privacy.title,
  description: keywordMap.privacy.description,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <section className="section-paper section-y">
      <Container className="prose-like max-w-3xl">
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 text-h1 text-ink">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted">
          Last updated: {site.copyrightYear}. Aligned with India’s Digital
          Personal Data Protection Act, 2023 (DPDP Act).
        </p>

        <div className="mt-10 space-y-8 text-body-lg text-muted">
          <section>
            <h2 className="text-h3 text-ink">Who we are</h2>
            <p className="mt-3">
              {site.name} (“we”, “us”) operates this website. Contact:{" "}
              {site.email}, {site.phoneDisplay}, {site.address}.
            </p>
          </section>
          <section>
            <h2 className="text-h3 text-ink">What we collect</h2>
            <p className="mt-3">
              When you submit a form we may collect name, phone, email, business
              details, project information, website URL, preferred contact
              method, and technical attribution data (UTM parameters, referrer).
              We also use essential cookies for site operation and, only with
              consent, analytics cookies (GA4 / Microsoft Clarity).
            </p>
          </section>
          <section>
            <h2 className="text-h3 text-ink">Purpose & legal basis</h2>
            <p className="mt-3">
              We process personal data to respond to enquiries, provide
              requested services, improve the website, and comply with law. By
              submitting a form and checking consent, you agree to be contacted
              about your enquiry.
            </p>
          </section>
          <section>
            <h2 className="text-h3 text-ink">Sharing</h2>
            <p className="mt-3">
              We use processors such as hosting (Vercel), email (Resend),
              database (Neon), bot protection (Cloudflare Turnstile), and
              optionally analytics providers after consent. We do not sell
              personal data.
            </p>
          </section>
          <section>
            <h2 className="text-h3 text-ink">Retention</h2>
            <p className="mt-3">
              Lead records are retained as long as needed for business
              follow-up and legal requirements, then deleted or anonymised.
            </p>
          </section>
          <section>
            <h2 className="text-h3 text-ink">Your rights (DPDP)</h2>
            <p className="mt-3">
              You may request access, correction, or erasure of your personal
              data, and withdraw consent for non-essential processing, subject
              to applicable law. Contact us using the details above.
            </p>
          </section>
          <section>
            <h2 className="text-h3 text-ink">Security</h2>
            <p className="mt-3">
              We apply reasonable technical and organisational measures.
              No method of transmission is perfectly secure.
            </p>
          </section>
          <section>
            <h2 className="text-h3 text-ink">Children</h2>
            <p className="mt-3">
              Our services are directed to businesses and adults. We do not
              knowingly collect data from children.
            </p>
          </section>
          <section>
            <h2 className="text-h3 text-ink">Changes</h2>
            <p className="mt-3">
              We may update this policy. The latest version will always be on
              this page.
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
