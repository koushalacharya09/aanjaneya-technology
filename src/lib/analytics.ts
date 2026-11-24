"use client";

type EventName =
  | "form_submit"
  | "call_click"
  | "whatsapp_click"
  | "quote_step_complete";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  name: EventName,
  params?: Record<string, string | number | boolean>,
) {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("event", name, params);
  }
  if (window.clarity) {
    window.clarity("event", name);
  }
}
