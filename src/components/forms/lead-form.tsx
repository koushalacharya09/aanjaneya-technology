"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { captureAttributionFromUrl, readAttribution } from "@/lib/utm";
import {
  auditLeadSchema,
  contactLeadSchema,
  leadBaseSchema,
} from "@/lib/validation/lead";
import { cn } from "@/lib/utils";

type FormType = "contact" | "audit" | "home" | "service" | "industry";

type LeadFormProps = {
  formType?: FormType;
  defaultService?: string;
  defaultIndustry?: string;
  defaultWebsiteUrl?: string;
  className?: string;
  compact?: boolean;
};

function schemaFor(formType: FormType) {
  if (formType === "audit") return auditLeadSchema;
  if (formType === "contact" || formType === "home") return contactLeadSchema;
  return leadBaseSchema;
}

type FormValues = {
  name: string;
  phone: string;
  email: string;
  businessName: string;
  industry: string;
  service: string;
  services: string[];
  description: string;
  websiteUrl: string;
  preferredContact: string;
  consent?: boolean;
  turnstileToken: string;
  website: string;
  sourcePage: string;
};

export function LeadForm({
  formType = "contact",
  defaultService,
  defaultIndustry,
  defaultWebsiteUrl = "",
  className,
  compact = false,
}: LeadFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const schema = schemaFor(formType);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    // Zod 4 + RHF resolver typing is strict; runtime validation still applies.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any) as any,
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      businessName: "",
      industry: defaultIndustry ?? "",
      service: defaultService ?? "",
      services: defaultService ? [defaultService] : [],
      description: "",
      websiteUrl: defaultWebsiteUrl,
      preferredContact: "",
      consent: undefined,
      turnstileToken: siteKey ? "" : "dev-bypass",
      website: "",
      sourcePage: "",
    },
  });

  useEffect(() => {
    captureAttributionFromUrl();
    setValue("sourcePage", window.location.pathname);
    if (defaultWebsiteUrl) setValue("websiteUrl", defaultWebsiteUrl);
  }, [defaultWebsiteUrl, setValue]);

  const onSubmit = handleSubmit(async (values) => {
    setSubmitting(true);
    setServerError(null);
    const attribution = readAttribution();

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          ...attribution,
          formType: formType === "home" ? "contact" : formType,
          sourcePage: values.sourcePage || window.location.pathname,
        }),
      });
      const payload = (await response.json()) as {
        ok: boolean;
        error?: string;
        redirectTo?: string;
      };

      if (!response.ok || !payload.ok) {
        setServerError(payload.error ?? "Submission failed");
        setSubmitting(false);
        return;
      }

      trackEvent("form_submit", { formType });
      router.push(payload.redirectTo ?? "/thank-you");
    } catch {
      setServerError("Network error. Please try again or WhatsApp us.");
      setSubmitting(false);
    }
  });

  return (
    <form onSubmit={onSubmit} className={cn("space-y-4", className)} noValidate>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
        {...register("website")}
      />

      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" autoComplete="name" {...register("name")} />
          {errors.name ? (
            <p className="text-caption text-danger">{errors.name.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="10-digit mobile"
            {...register("phone")}
          />
          {errors.phone ? (
            <p className="text-caption text-danger">{errors.phone.message}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-caption text-danger">{errors.email.message}</p>
        ) : null}
      </div>

      {!compact ? (
        <div className="space-y-2">
          <Label htmlFor="businessName">Business name</Label>
          <Input id="businessName" {...register("businessName")} />
        </div>
      ) : null}

      {(formType === "audit" || defaultWebsiteUrl) && (
        <div className="space-y-2">
          <Label htmlFor="websiteUrl">Website URL</Label>
          <Input
            id="websiteUrl"
            type="url"
            placeholder="https://example.com"
            {...register("websiteUrl")}
          />
          {errors.websiteUrl ? (
            <p className="text-caption text-danger">
              {errors.websiteUrl.message}
            </p>
          ) : null}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="description">
          {formType === "audit"
            ? "Anything we should focus on?"
            : "How can we help?"}
        </Label>
        <Textarea id="description" rows={4} {...register("description")} />
        {errors.description ? (
          <p className="text-caption text-danger">
            {errors.description.message}
          </p>
        ) : null}
      </div>

      <label className="flex items-start gap-3 text-sm text-muted">
        <Checkbox
          className="mt-0.5"
          onCheckedChange={(checked) =>
            setValue("consent", checked === true, { shouldValidate: true })
          }
        />
        <span>
          I agree to the{" "}
          <a
            href="/privacy-policy"
            className="font-medium text-ink underline-offset-4 hover:underline"
          >
            Privacy Policy
          </a>{" "}
          and consent to being contacted about this enquiry.
        </span>
      </label>
      {errors.consent ? (
        <p className="text-caption text-danger">{errors.consent.message}</p>
      ) : null}

      {siteKey ? (
        <Turnstile
          siteKey={siteKey}
          onSuccess={(token) =>
            setValue("turnstileToken", token, { shouldValidate: true })
          }
          options={{ theme: "light" }}
        />
      ) : null}
      {errors.turnstileToken ? (
        <p className="text-caption text-danger">
          {errors.turnstileToken.message}
        </p>
      ) : null}

      {serverError ? (
        <p className="rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
          {serverError}
        </p>
      ) : null}

      <Button type="submit" variant="primary" size="lg" disabled={submitting}>
        {submitting
          ? "Sending…"
          : formType === "audit"
            ? "Request free audit"
            : "Send enquiry"}
      </Button>
      <p className="text-caption text-muted">
        Or call / WhatsApp {site.phoneDisplay}
      </p>
    </form>
  );
}
