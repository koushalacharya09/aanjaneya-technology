import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ClientOnly } from "@/components/ui/client-only";
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
  return (
    <>
      {withSchema ? <JsonLd data={faqSchema(items)} /> : null}
      <section className="section-paper section-y">
        <Container className="max-w-3xl">
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
          <ClientOnly
            fallback={
              <div className="mt-8 h-40 animate-pulse rounded-xl bg-surface-elevated" />
            }
          >
            <Accordion type="single" collapsible className="mt-8">
              {items.map((item, index) => (
                <AccordionItem key={item.question} value={`faq-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ClientOnly>
        </Container>
      </section>
    </>
  );
}