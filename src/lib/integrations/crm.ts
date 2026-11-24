/**
 * Outbound CRM webhook stub — wire to HubSpot / Zoho / custom CRM later.
 * Never log PII here.
 */
export async function syncLeadToCrm(payload: {
  id?: string;
  sourcePage?: string | null;
  createdAt?: Date;
}) {
  void payload;
  const webhookUrl = process.env.CRM_WEBHOOK_URL;
  if (!webhookUrl) {
    return { synced: false as const, reason: "CRM_WEBHOOK_URL not set" };
  }

  // Intentionally stubbed for Phase 1.
  return { synced: false as const, reason: "CRM sync not implemented yet" };
}
