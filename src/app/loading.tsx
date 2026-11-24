import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <section className="section-paper py-20">
      <Container>
        <div className="h-4 w-40 animate-pulse rounded bg-surface-elevated" />
        <div className="mt-6 h-12 max-w-xl animate-pulse rounded-xl bg-surface-elevated" />
        <div className="mt-4 h-24 max-w-2xl animate-pulse rounded-xl bg-surface-elevated" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-2xl bg-surface-elevated"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
