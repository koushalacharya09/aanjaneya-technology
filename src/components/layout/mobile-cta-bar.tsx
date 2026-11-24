"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, MessageCircle, Phone } from "lucide-react";

import { contactLinks, site } from "@/content/site";

export function MobileCtaBar() {
  const pathname = usePathname();
  const pageName =
    pathname === "/" ? "homepage" : pathname.replace(/^\//, "").replace(/\//g, " › ");
  const whatsappHref = contactLinks.whatsappWithMessage(
    `Hi ${site.shortName}, I'm on your ${pageName} page and would like a quote.`,
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-paper/95 backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-3 gap-2 px-2 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        <a
          href={contactLinks.phoneHref}
          className="tap-target inline-flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-md bg-void px-2 py-2 text-xs font-semibold text-white"
        >
          <Phone className="size-4" aria-hidden />
          Call
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="tap-target inline-flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-md bg-[#25D366] px-2 py-2 text-xs font-semibold text-white"
        >
          <MessageCircle className="size-4" aria-hidden />
          WhatsApp
        </a>
        <Link
          href={site.primaryCta.href}
          className="tap-target inline-flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-md bg-saffron px-2 py-2 text-xs font-semibold text-ink"
        >
          <FileText className="size-4" aria-hidden />
          Get a quote
        </Link>
      </div>
    </div>
  );
}
