import { z } from "zod";

import {
  budgetRanges,
  preferredContactMethods,
  services,
} from "@/content/site";

const serviceSlugs = services.map((s) => s.slug) as [string, ...string[]];

/** Indian mobile: 10 digits, optional +91 / 91 / 0 prefix */
export const indianPhoneSchema = z
  .string()
  .trim()
  .min(1, "Phone is required")
  .transform((value) => value.replace(/[\s-]/g, ""))
  .refine((value) => {
    const digits = value.replace(/^\+?91/, "").replace(/^0/, "");
    return /^[6-9]\d{9}$/.test(digits);
  }, "Enter a valid 10-digit Indian mobile number")
  .transform((value) => {
    const digits = value.replace(/^\+?91/, "").replace(/^0/, "");
    return `+91${digits}`;
  });

export const leadBaseSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  phone: indianPhoneSchema,
  email: z.string().trim().email("Enter a valid email").max(160),
  businessName: z.string().trim().max(160).optional().or(z.literal("")),
  industry: z.string().trim().max(120).optional().or(z.literal("")),
  services: z.array(z.enum(serviceSlugs)).max(6).optional().default([]),
  service: z.string().trim().max(120).optional().or(z.literal("")),
  description: z.string().trim().max(4000).optional().or(z.literal("")),
  budget: z
    .enum([...budgetRanges] as [string, ...string[]])
    .optional()
    .or(z.literal("")),
  timeline: z.string().trim().max(120).optional().or(z.literal("")),
  websiteUrl: z
    .string()
    .trim()
    .max(500)
    .optional()
    .or(z.literal(""))
    .refine(
      (v) => !v || /^https?:\/\//i.test(v) || /^[\w.-]+\.[a-z]{2,}/i.test(v),
      "Enter a valid website URL",
    ),
  preferredContact: z
    .enum([...preferredContactMethods] as [string, ...string[]])
    .optional()
    .or(z.literal("")),
  consent: z.literal(true, {
    error: "Please agree to the privacy policy",
  }),
  sourcePage: z.string().trim().max(300).optional().or(z.literal("")),
  utmSource: z.string().trim().max(120).optional().or(z.literal("")),
  utmMedium: z.string().trim().max(120).optional().or(z.literal("")),
  utmCampaign: z.string().trim().max(160).optional().or(z.literal("")),
  utmTerm: z.string().trim().max(160).optional().or(z.literal("")),
  utmContent: z.string().trim().max(160).optional().or(z.literal("")),
  gclid: z.string().trim().max(200).optional().or(z.literal("")),
  fbclid: z.string().trim().max(200).optional().or(z.literal("")),
  referrer: z.string().trim().max(500).optional().or(z.literal("")),
  turnstileToken: z.string().min(1, "Please complete the security check"),
  /** Honeypot — must stay empty */
  website: z.string().max(0).optional().or(z.literal("")),
});

export const contactLeadSchema = leadBaseSchema.extend({
  description: z
    .string()
    .trim()
    .min(10, "Please share a short message")
    .max(4000),
});

export const quoteLeadSchema = leadBaseSchema.extend({
  services: z
    .array(z.enum(serviceSlugs))
    .min(1, "Select at least one service"),
  businessName: z.string().trim().min(2, "Business name is required").max(160),
  description: z
    .string()
    .trim()
    .min(20, "Tell us a bit more about the requirements")
    .max(4000),
});

export const auditLeadSchema = leadBaseSchema.extend({
  websiteUrl: z
    .string()
    .trim()
    .min(4, "Website URL is required")
    .max(500)
    .refine(
      (v) => /^https?:\/\//i.test(v) || /^[\w.-]+\.[a-z]{2,}/i.test(v),
      "Enter a valid website URL",
    ),
});

export type LeadInput = z.infer<typeof leadBaseSchema>;
export type QuoteLeadInput = z.infer<typeof quoteLeadSchema>;
export type AuditLeadInput = z.infer<typeof auditLeadSchema>;
export type ContactLeadInput = z.infer<typeof contactLeadSchema>;

export function normalizeWebsiteUrl(url?: string | null) {
  if (!url) return "";
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}
