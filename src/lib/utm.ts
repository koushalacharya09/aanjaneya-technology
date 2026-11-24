"use client";

const UTM_KEY = "aanjaneya_attribution";

export type Attribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  fbclid?: string;
  referrer?: string;
};

export function captureAttributionFromUrl() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const existing = readAttribution();
  const next: Attribution = {
    ...existing,
    referrer: existing.referrer || document.referrer || undefined,
  };

  const map: Record<string, keyof Attribution> = {
    utm_source: "utmSource",
    utm_medium: "utmMedium",
    utm_campaign: "utmCampaign",
    utm_term: "utmTerm",
    utm_content: "utmContent",
    gclid: "gclid",
    fbclid: "fbclid",
  };

  let changed = false;
  for (const [param, key] of Object.entries(map)) {
    const value = params.get(param);
    if (value && !existing[key]) {
      next[key] = value;
      changed = true;
    }
  }

  if (!existing.referrer && document.referrer) changed = true;
  if (changed || !sessionStorage.getItem(UTM_KEY)) {
    sessionStorage.setItem(UTM_KEY, JSON.stringify(next));
  }
}

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(UTM_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Attribution;
  } catch {
    return {};
  }
}
