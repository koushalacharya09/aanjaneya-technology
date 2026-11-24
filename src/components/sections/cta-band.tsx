import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function CtaBand({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="section-ink relative py-16 md:py-20">
      <Container className="relative z-10 text-center">
        <h2 className="mx-auto max-w-2xl text-h2 text-white">{title}</h2>
        {description ? (
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-muted-dark">
            {description}
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="primary" size="lg">
            <Link href={primary.href}>{primary.label}</Link>
          </Button>
          {secondary ? (
            <Button asChild variant="outlineDark" size="lg">
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
