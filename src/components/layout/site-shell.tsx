import type { ReactNode } from "react";

import { CursorSpotlight } from "@/components/home/cursor-spotlight";
import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { MobileCtaBar } from "@/components/layout/mobile-cta-bar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/theme/theme-provider";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <CursorSpotlight />
      <ScrollProgress />
      <SiteHeader />
      <main className="relative z-[2] flex-1 pb-[calc(var(--mobile-cta-height)+env(safe-area-inset-bottom))] lg:pb-0">
        {children}
      </main>
      <SiteFooter />
      <MobileCtaBar />
      <FloatingWhatsApp />
    </ThemeProvider>
  );
}