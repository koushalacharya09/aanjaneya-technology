import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="section-ink relative section-y">
      <Container className="relative z-10 text-center">
        <p className="eyebrow justify-center">404</p>
        <h1 className="mt-4 text-h1 text-white">Page not found</h1>
        <p className="mx-auto mt-4 max-w-lg text-body-lg text-muted-dark">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="primary" size="lg">
            <Link href="/">Go home</Link>
          </Button>
          <Button asChild variant="outlineDark" size="lg">
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
