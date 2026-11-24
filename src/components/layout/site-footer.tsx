import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/container";
import {
  buildLandingSlug,
  featuredLocationAreas,
} from "@/content/locations";
import {
  contactLinks,
  footerNav,
  industries,
  publishedSocials,
  services,
  site,
} from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-void text-[#f7f7f5]">
      <div
        className="pointer-events-none absolute -bottom-8 left-0 select-none text-[clamp(5rem,20vw,12rem)] font-extrabold uppercase leading-none tracking-tighter text-white/[0.03]"
        aria-hidden
      >
        AANJANEYA
      </div>

      <Container className="relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label={`${site.name} home`}
              className="group relative inline-flex max-w-full"
            >
              <span
                className="pointer-events-none absolute -inset-3 rounded-lg bg-saffron/15 opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden
              />
              <span className="relative inline-flex overflow-hidden rounded-md border border-saffron/35 bg-gradient-to-br from-[#3a0a10] via-[#1a0508] to-[#0a0304] p-2.5 shadow-[0_0_0_1px_rgba(232,163,23,0.12),0_18px_40px_-18px_rgba(0,0,0,0.85)] ring-1 ring-white/5 transition duration-300 group-hover:border-saffron/55 group-hover:shadow-[0_0_0_1px_rgba(232,163,23,0.22),0_22px_48px_-16px_rgba(232,163,23,0.25)] sm:p-3">
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-saffron/70 to-transparent"
                  aria-hidden
                />
                <Logo variant="full" tone="light" size="lg" href="" className="relative z-[1]" />
              </span>
            </Link>
            <p className="mt-7 max-w-sm text-body-lg font-semibold tracking-tight text-white">
              {site.tagline}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
              {site.description}
            </p>
            {publishedSocials.length > 0 ? (
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
                {publishedSocials.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap-target inline-flex items-center text-caption font-medium text-white/50 transition-colors hover:text-saffron"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-eyebrow text-saffron">Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-eyebrow text-saffron">Industries</h2>
            <ul className="mt-5 columns-1 gap-x-6 space-y-3 sm:columns-2 lg:columns-1">
              {industries.map((industry) => (
                <li key={industry.slug} className="break-inside-avoid">
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h2 className="text-eyebrow text-saffron">Company</h2>
            <ul className="mt-5 space-y-3">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-eyebrow text-saffron">Contact</h2>
            <ul className="mt-5 space-y-3.5 text-sm text-white/65">
              <li>
                <a
                  href={contactLinks.phoneHref}
                  className="inline-flex items-start gap-2.5 transition-colors hover:text-white"
                >
                  <Phone className="mt-0.5 size-3.5 shrink-0 text-saffron" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={contactLinks.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2.5 transition-colors hover:text-white"
                >
                  <Phone className="mt-0.5 size-3.5 shrink-0 text-saffron opacity-0" aria-hidden />
                  <span>WhatsApp · {site.phoneDisplay}</span>
                </a>
              </li>
              {site.email ? (
                <li>
                  <a
                    href={contactLinks.emailHref}
                    className="inline-flex items-start gap-2.5 break-all transition-colors hover:text-white"
                  >
                    <Mail className="mt-0.5 size-3.5 shrink-0 text-saffron" />
                    {site.email}
                  </a>
                </li>
              ) : null}
              <li className="inline-flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-saffron" />
                <span>{site.address}</span>
              </li>
              <li className="pl-6 text-white/40">{site.hoursDisplay}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/[0.06] pt-10">
          <h2 className="text-eyebrow text-saffron">Website & SEO in Jaipur areas</h2>
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
            {featuredLocationAreas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/${buildLandingSlug("website", area.slug)}`}
                  className="text-sm text-white/55 transition-colors hover:text-white"
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/[0.06] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-white/35">
            © {site.copyrightYear} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-5">
            {footerNav.legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-caption text-white/40 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
