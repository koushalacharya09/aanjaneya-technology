import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { AttributionCapture } from "@/components/analytics/attribution-capture";
import { CookieBanner } from "@/components/consent/cookie-banner";
import { SiteShell } from "@/components/layout/site-shell";
import { site } from "@/content/site";
import { absoluteUrl, createMetadata } from "@/lib/seo";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  ...createMetadata({
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    path: "/",
  }),
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} dark h-full antialiased`}
      data-theme="dark"
      data-atmosphere="ink"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem('at-theme-mode');var mode=(m==='light'||m==='dark')?m:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');var r=document.documentElement;r.dataset.theme=mode;r.dataset.atmosphere='ink';r.classList.toggle('dark',mode==='dark');r.classList.toggle('light',mode==='light');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <AttributionCapture />
        <SiteShell>{children}</SiteShell>
        <CookieBanner />
      </body>
    </html>
  );
}
