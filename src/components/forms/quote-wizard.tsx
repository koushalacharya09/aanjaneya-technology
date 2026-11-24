"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  budgetRanges,
  contactLinks,
  industries,
  preferredContactMethods,
  services,
  site,
} from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { captureAttributionFromUrl, readAttribution } from "@/lib/utm";
import { indianPhoneSchema, quoteLeadSchema } from "@/lib/validation/lead";
import { cn } from "@/lib/utils";

function buildQuoteWhatsAppMessage(values: FormValues) {
  const serviceNames = values.services
    .map((slug) => services.find((s) => s.slug === slug)?.name ?? slug)
    .join(", ");
  const industryName =
    industries.find((i) => i.slug === values.industry)?.name ||
    values.industry ||
    "—";

  return [
    `Hi ${site.shortName} — quote request from your website.`,
    ``,
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email}`,
    `Business: ${values.businessName}`,
    `Industry: ${industryName}`,
    `Services: ${serviceNames || "—"}`,
    values.budget ? `Budget: ${values.budget}` : null,
    values.timeline ? `Timeline: ${values.timeline}` : null,
    values.websiteUrl ? `Website: ${values.websiteUrl}` : null,
    values.preferredContact
      ? `Preferred contact: ${values.preferredContact}`
      : null,
    ``,
    `Requirements:`,
    values.description,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
}

const steps = ["Service", "Business", "Requirements", "Contact"] as const;

const step1Schema = z.object({
  services: z.array(z.string()).min(1, "Select at least one service"),
});
const step2Schema = z.object({
  businessName: z.string().trim().min(2, "Business name is required"),
  industry: z.string().optional(),
  websiteUrl: z.string().optional(),
});
const step3Schema = z.object({
  description: z.string().trim().min(20, "Please add more detail"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});
const step4Schema = z.object({
  name: z.string().trim().min(2),
  phone: indianPhoneSchema,
  email: z.string().email(),
  preferredContact: z.string().optional(),
  consent: z.literal(true),
  turnstileToken: z.string().min(1),
});

type FormValues = {
  services: string[];
  businessName: string;
  industry: string;
  websiteUrl: string;
  description: string;
  budget: string;
  timeline: string;
  name: string;
  phone: string;
  email: string;
  preferredContact: string;
  consent?: boolean;
  turnstileToken: string;
  website: string;
  sourcePage: string;
};

export function QuoteWizard({ className }: { className?: string } = {}) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const form = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(quoteLeadSchema as any) as any,
    defaultValues: {
      services: [],
      businessName: "",
      industry: "",
      websiteUrl: "",
      description: "",
      budget: "",
      timeline: "",
      name: "",
      phone: "",
      email: "",
      preferredContact: "WhatsApp",
      consent: undefined,
      turnstileToken: siteKey ? "" : "dev-bypass",
      website: "",
      sourcePage: "/get-a-quote",
    },
    mode: "onTouched",
  });

  const { register, setValue, watch, getValues, formState } = form;
  // eslint-disable-next-line react-hooks/incompatible-library -- RHF watch is intentionally non-memoizable
  const selected = watch("services") ?? [];
  const preferredContact = watch("preferredContact");
  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  useEffect(() => {
    captureAttributionFromUrl();
  }, []);

  async function validateStep() {
    const values = getValues();
    const schema =
      step === 0
        ? step1Schema
        : step === 1
          ? step2Schema
          : step === 2
            ? step3Schema
            : step4Schema;
    const result = schema.safeParse(values);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const key = issue.path[0];
        if (typeof key === "string") {
          form.setError(key as keyof FormValues, { message: issue.message });
        }
      });
      return false;
    }
    trackEvent("quote_step_complete", { step: steps[step] ?? String(step) });
    return true;
  }

  async function next() {
    if (!(await validateStep())) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  async function onSubmit() {
    if (!(await validateStep())) return;
    setSubmitting(true);
    setServerError(null);
    const values = getValues();
    const attribution = readAttribution();
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          ...attribution,
          formType: "quote",
          sourcePage: "/get-a-quote",
        }),
      });
      const payload = (await res.json()) as {
        ok: boolean;
        error?: string;
        redirectTo?: string;
      };
      if (!res.ok || !payload.ok) {
        setServerError(payload.error ?? "Submission failed");
        setSubmitting(false);
        return;
      }
      trackEvent("form_submit", { formType: "quote" });
      trackEvent("whatsapp_click", { source: "quote_wizard" });

      const waMessage = buildQuoteWhatsAppMessage(values);
      const waHref = contactLinks.whatsappWithMessage(waMessage);
      try {
        sessionStorage.setItem("aanjaneya_quote_wa", waMessage);
      } catch {
        /* ignore */
      }
      window.open(waHref, "_blank", "noopener,noreferrer");
      router.push(payload.redirectTo ?? "/thank-you?channel=whatsapp");
    } catch {
      setServerError("Network error. Please try again or WhatsApp us.");
      setSubmitting(false);
    }
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-white p-6 shadow-soft md:p-8",
        className,
      )}
    >
      <div className="mb-8">
        <div className="flex items-center justify-between text-caption text-muted">
          <span>
            Step {step + 1} of {steps.length}
          </span>
          <span>{steps[step]}</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-elevated">
          <motion.div
            className="h-full rounded-full bg-saffron"
            animate={{ width: `${progress}%` }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.35 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={reduceMotion ? false : { opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
        >
          {step === 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {services.map((service) => {
                const active = selected.includes(service.slug);
                return (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => {
                      const nextVals = active
                        ? selected.filter((s) => s !== service.slug)
                        : [...selected, service.slug];
                      setValue("services", nextVals, { shouldValidate: true });
                    }}
                    className={cn(
                      "rounded-2xl border p-4 text-left transition-all",
                      active
                        ? "border-saffron bg-saffron-soft"
                        : "border-border hover:border-saffron/40",
                    )}
                  >
                    <p className="font-semibold text-ink">{service.name}</p>
                    <p className="mt-2 text-caption text-muted">
                      {service.summary}
                    </p>
                  </button>
                );
              })}
              {formState.errors.services ? (
                <p className="text-caption text-danger sm:col-span-2">
                  {formState.errors.services.message}
                </p>
              ) : null}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business name</Label>
                <Input id="businessName" {...register("businessName")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <select
                  id="industry"
                  className="flex h-12 w-full rounded-xl border border-border bg-white px-4 text-sm"
                  {...register("industry")}
                >
                  <option value="">Select industry</option>
                  {industries.map((i) => (
                    <option key={i.slug} value={i.slug}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="websiteUrl">Existing website (optional)</Label>
                <Input
                  id="websiteUrl"
                  placeholder="https://"
                  {...register("websiteUrl")}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Requirements</Label>
                <Textarea
                  id="description"
                  rows={5}
                  {...register("description")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget range</Label>
                <select
                  id="budget"
                  className="flex h-12 w-full rounded-xl border border-border bg-white px-4 text-sm"
                  {...register("budget")}
                >
                  <option value="">Select</option>
                  {budgetRanges.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline">Timeline</Label>
                <Input
                  id="timeline"
                  placeholder="e.g. 4–6 weeks / ASAP / exploring"
                  {...register("timeline")}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <input
                type="text"
                className="hidden"
                tabIndex={-1}
                {...register("website")}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" {...register("name")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" {...register("phone")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register("email")} />
              </div>
              <div className="space-y-2">
                <Label>Preferred contact</Label>
                <div className="flex flex-wrap gap-2">
                  {preferredContactMethods.map((method) => (
                    <button
                      key={method}
                      type="button"
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm",
                        preferredContact === method
                          ? "border-saffron bg-saffron-soft"
                          : "border-border",
                      )}
                      onClick={() =>
                        setValue("preferredContact", method, {
                          shouldValidate: true,
                        })
                      }
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
              <label className="flex items-start gap-3 text-sm text-muted">
                <Checkbox
                  className="mt-0.5"
                  onCheckedChange={(c) =>
                    setValue("consent", c === true, { shouldValidate: true })
                  }
                />
                <span>
                  I agree to the{" "}
                  <a href="/privacy-policy" className="underline">
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
              {siteKey ? (
                <Turnstile
                  siteKey={siteKey}
                  onSuccess={(token) =>
                    setValue("turnstileToken", token, { shouldValidate: true })
                  }
                />
              ) : null}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {serverError ? (
        <p className="mt-4 rounded-xl border border-danger/30 bg-danger/5 px-4 py-3 text-sm text-danger">
          {serverError}
        </p>
      ) : null}

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="secondary"
          disabled={step === 0 || submitting}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          Back
        </Button>
        {step < steps.length - 1 ? (
          <Button type="button" variant="primary" onClick={next}>
            Next
          </Button>
        ) : (
          <Button
            type="button"
            variant="primary"
            disabled={submitting}
            onClick={onSubmit}
          >
            {submitting ? "Opening WhatsApp…" : "Submit & continue on WhatsApp"}
          </Button>
        )}
      </div>
    </div>
  );
}
