import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type PagePlaceholderProps = {
  title: string;
  description?: string;
  phase?: string;
};

export function PagePlaceholder({
  title,
  description = "Content for this page will be built in a later phase.",
  phase = "Phase 1",
}: PagePlaceholderProps) {
  return (
    <section className="pb-16 pt-[calc(var(--header-height)+2rem)] md:pb-24 md:pt-[calc(var(--header-height)+3rem)]">
      <Container className="max-w-3xl">
        <Badge variant="saffron">{phase}</Badge>
        <h1 className="mt-4 text-h1 text-navy">{title}</h1>
        <p className="mt-4 text-body-lg text-muted">{description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="primary">
            <Link href="/">Back to Phase 0 preview</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/get-a-quote">Get a Quote</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
