import { Resend } from "resend";

import { site } from "@/content/site";

type LeadEmailPayload = {
  name: string;
  phone: string;
  email: string;
  businessName?: string | null;
  industry?: string | null;
  services?: string[];
  service?: string | null;
  description?: string | null;
  budget?: string | null;
  timeline?: string | null;
  websiteUrl?: string | null;
  preferredContact?: string | null;
  sourcePage?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function row(label: string, value?: string | null) {
  if (!value) return "";
  return `<tr><td style="padding:8px 0;color:#5B6475;width:160px;">${escapeHtml(label)}</td><td style="padding:8px 0;color:#0B1220;font-weight:600;">${escapeHtml(value)}</td></tr>`;
}

export async function sendLeadNotification(lead: LeadEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from =
    process.env.RESEND_FROM_EMAIL ?? "Aanjaneya Technology <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.warn("[email] RESEND_API_KEY or LEAD_NOTIFY_EMAIL missing — skipped");
    return { skipped: true as const };
  }

  const resend = new Resend(apiKey);
  const phoneDigits = lead.phone.replace(/\D/g, "");
  const wa = `https://wa.me/${phoneDigits}`;
  const services =
    lead.services && lead.services.length > 0
      ? lead.services.join(", ")
      : lead.service ?? "";

  const html = `
  <div style="font-family:Manrope,Segoe UI,sans-serif;background:#FAFAF7;padding:24px;">
    <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #E7E5E0;border-radius:16px;overflow:hidden;">
      <div style="background:#0B1220;padding:20px 24px;">
        <p style="margin:0;color:#F59E0B;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;">New lead</p>
        <h1 style="margin:8px 0 0;color:#fff;font-size:22px;">${escapeHtml(site.name)}</h1>
      </div>
      <div style="padding:24px;">
        <table style="width:100%;border-collapse:collapse;">
          ${row("Name", lead.name)}
          ${row("Phone", lead.phone)}
          ${row("Email", lead.email)}
          ${row("Business", lead.businessName)}
          ${row("Industry", lead.industry)}
          ${row("Services", services)}
          ${row("Budget", lead.budget)}
          ${row("Timeline", lead.timeline)}
          ${row("Website", lead.websiteUrl)}
          ${row("Preferred contact", lead.preferredContact)}
          ${row("Source page", lead.sourcePage)}
          ${row("UTM source", lead.utmSource)}
          ${row("UTM medium", lead.utmMedium)}
          ${row("UTM campaign", lead.utmCampaign)}
        </table>
        ${
          lead.description
            ? `<p style="margin:16px 0 0;color:#5B6475;font-size:13px;text-transform:uppercase;letter-spacing:0.12em;">Message</p><p style="margin:8px 0 0;color:#0B1220;line-height:1.6;">${escapeHtml(lead.description)}</p>`
            : ""
        }
        <p style="margin:24px 0 0;">
          <a href="${wa}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:12px 18px;border-radius:999px;font-weight:700;">WhatsApp this lead</a>
        </p>
      </div>
    </div>
  </div>`;

  await resend.emails.send({
    from,
    to,
    subject: `New lead — ${lead.name}${lead.businessName ? ` · ${lead.businessName}` : ""}`,
    html,
  });

  return { skipped: false as const };
}
