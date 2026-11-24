"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import Script from "next/script";

import { Button } from "@/components/ui/button";

export const CONSENT_KEY = "aanjaneya_cookie_consent";
export const CONSENT_EVENT = "aanjaneya-consent";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CONSENT_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CONSENT_EVENT, onStoreChange);
  };
}

function readConsent(): "accepted" | "rejected" | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === "accepted" || stored === "rejected") return stored;
  return null;
}

export function CookieBanner() {
  const stored = useSyncExternalStore(subscribe, readConsent, () => null);
  const [override, setOverride] = useState<"accepted" | "rejected" | null>(
    null,
  );
  const consent = override ?? stored;

  const choose = useCallback((value: "accepted" | "rejected") => {
    localStorage.setItem(CONSENT_KEY, value);
    setOverride(value);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }, []);

  const gaId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  const showBanner = consent === null;

  return (
    <>
      {consent === "accepted" && gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {consent === "accepted" && clarityId ? (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
        </Script>
      ) : null}

      {showBanner ? (
        <div className="fixed inset-x-4 bottom-[calc(var(--mobile-cta-height)+1rem)] z-50 mx-auto max-w-xl rounded-md border border-border bg-white p-5 shadow-lift md:inset-x-auto md:bottom-6 md:right-6 lg:bottom-6">
          <p className="text-sm font-semibold text-ink">Cookies & analytics</p>
          <p className="mt-2 text-sm text-muted">
            We use essential cookies to run the site. Analytics (GA4 / Clarity)
            load only if you accept. See our{" "}
            <a href="/privacy-policy" className="underline">
              Privacy Policy
            </a>
            .
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="primary"
              onClick={() => choose("accepted")}
            >
              Accept
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => choose("rejected")}
            >
              Reject non-essential
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
