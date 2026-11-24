import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <section className="section-paper section-y">
      <Container className="max-w-2xl">
        <p className="eyebrow">Admin</p>
        <h1 className="mt-4 text-h1 text-ink dark:text-white">Lead inbox</h1>
        <p className="mt-4 text-body-lg text-muted">
          You’re signed in as {session.user.email}. The full lead dashboard ships
          in Phase 2—until then, new enquiries are emailed to the ops inbox when
          Resend is configured.
        </p>
        <form
          className="mt-8"
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <Button type="submit" variant="secondary">
            Sign out
          </Button>
        </form>
      </Container>
    </section>
  );
}
