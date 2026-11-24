"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

import { CONSENT_EVENT, CONSENT_KEY } from "@/components/consent/cookie-banner";
import { contactLinks, site } from "@/content/site";
import { cn } from "@/lib/utils";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CONSENT_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CONSENT_EVENT, onStoreChange);
  };
}

function readConsentDone(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONSENT_KEY) !== null;
}

/** Desktop WhatsApp — after cookie choice, delayed so it doesn’t fight the banner */
export function FloatingWhatsApp() {
  const pathname = usePathname();
  const consentDone = useSyncExternalStore(subscribe, readConsentDone, () => false);
  const [showTip, setShowTip] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!consentDone) {
      setVisible(false);
      return;
    }
    const t = window.setTimeout(() => setVisible(true), 1800);
    return () => window.clearTimeout(t);
  }, [consentDone]);

  const pageName =
    pathname === "/" ? "the homepage" : pathname.replace(/^\//, "").replace(/-/g, " ");
  const href = contactLinks.whatsappWithMessage(
    `Hi ${site.shortName}, I have a question about ${pageName}.`,
  );

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 hidden lg:block"
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      <div
        className={cn(
          "pointer-events-none absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-md bg-void px-3 py-1.5 text-xs font-medium text-white transition-opacity duration-200",
          showTip ? "opacity-100" : "opacity-0",
        )}
        role="tooltip"
      >
        Chat with us
      </div>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="tap-target inline-flex size-12 items-center justify-center rounded-md bg-[#25D366] text-white shadow-lift transition-transform hover:scale-105 hover:bg-[#1ebe57]"
      >
        <MessageCircle className="size-5" />
      </Link>
    </div>
  );
}
