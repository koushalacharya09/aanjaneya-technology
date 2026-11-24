import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth";

export default function AdminLoginPage() {
  async function login(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
        redirectTo: "/admin",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        redirect("/admin/login?error=credentials");
      }
      throw error;
    }
  }

  return (
    <section className="section-paper section-y">
      <Container className="max-w-md">
        <h1 className="text-h2 text-ink">Admin login</h1>
        <p className="mt-2 text-sm text-muted">
          Single-admin credentials from environment variables.
        </p>
        <form action={login} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" variant="primary">
            Sign in
          </Button>
        </form>
      </Container>
    </section>
  );
}
