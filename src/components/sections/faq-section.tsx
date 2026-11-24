import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { faqSchema, JsonLd } from "@/lib/schema";

export function FaqSection({
  eyebrow = "FAQ",
  title = "Questions, answered clearly",
  description,
  items,
  withSchema = true,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: readonly { question: string; answer: string }[];
  withSchema?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <>
      {withSchema ? <JsonLd data={faqSchema(items)} /> : null}
      <section className="section-paper section-y">
        <Container className="max-w-3xl">
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
          <div className="mt-8 divide-y divide-border border-y border-border">
            {items.map((item) => (
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
    </>
  );
}
