import { NextResponse } from "next/server";

import { prisma, isDatabaseConfigured } from "@/lib/db";
import { sendLeadNotification } from "@/lib/email/leads";
import { syncLeadToCrm } from "@/lib/integrations/crm";
import { rateLimitLeads } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import {
  auditLeadSchema,
  contactLeadSchema,
  leadBaseSchema,
  normalizeWebsiteUrl,
  quoteLeadSchema,
} from "@/lib/validation/lead";

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function pickSchema(formType: string | undefined) {
  switch (formType) {
    case "quote":
      return quoteLeadSchema;
    case "audit":
      return auditLeadSchema;
    case "contact":
      return contactLeadSchema;
    default:
      return leadBaseSchema;
  }
}

export async function POST(request: Request) {
  try {
    const ip = clientIp(request);
    const limited = await rateLimitLeads(ip);
    if (!limited.success) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = (await request.json()) as Record<string, unknown>;
    const formType =
      typeof body.formType === "string" ? body.formType : "contact";

    // Honeypot
    if (typeof body.website === "string" && body.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const parsed = pickSchema(formType).safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "Validation failed",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const turnstile = await verifyTurnstile(data.turnstileToken, ip);
    if (!turnstile.success) {
      return NextResponse.json(
        { ok: false, error: "Security verification failed. Please retry." },
        { status: 400 },
      );
    }

    const websiteUrl = normalizeWebsiteUrl(data.websiteUrl);
    const services =
      data.services && data.services.length > 0
        ? data.services
        : data.service
          ? [data.service]
          : [];

    const leadRecord = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      businessName: data.businessName || null,
      industry: data.industry || null,
      services,
      service: data.service || services[0] || null,
      description: data.description || null,
      budget: data.budget || null,
      timeline: data.timeline || null,
      websiteUrl: websiteUrl || null,
      preferredContact: data.preferredContact || null,
      sourcePage: data.sourcePage || null,
      utmSource: data.utmSource || null,
      utmMedium: data.utmMedium || null,
      utmCampaign: data.utmCampaign || null,
      utmTerm: data.utmTerm || null,
      utmContent: data.utmContent || null,
      gclid: data.gclid || null,
      fbclid: data.fbclid || null,
      referrer: data.referrer || null,
    };

    let savedId: string | undefined;
    let dbFailed = false;

    if (isDatabaseConfigured()) {
      try {
        const created = await prisma.lead.create({ data: leadRecord });
        savedId = created.id;
        void syncLeadToCrm({
          id: created.id,
          sourcePage: created.sourcePage,
          createdAt: created.createdAt,
        });
      } catch (error) {
        dbFailed = true;
        console.error("[leads] database write failed", {
          reason: error instanceof Error ? error.message : "unknown",
        });
      }
    } else {
      dbFailed = true;
      console.warn("[leads] DATABASE_URL not configured — email-only path");
    }

    try {
      await sendLeadNotification(leadRecord);
    } catch (error) {
      console.error("[leads] email send failed", {
        reason: error instanceof Error ? error.message : "unknown",
        dbFailed,
      });
      if (dbFailed) {
        return NextResponse.json(
          {
            ok: false,
            error: "Unable to submit right now. Please call or WhatsApp us.",
          },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({
      ok: true,
      id: savedId,
      redirectTo: "/thank-you",
    });
  } catch (error) {
    console.error("[leads] unexpected error", {
      reason: error instanceof Error ? error.message : "unknown",
    });
    return NextResponse.json(
      { ok: false, error: "Unexpected server error" },
      { status: 500 },
    );
  }
}
