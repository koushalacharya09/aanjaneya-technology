"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { MegaMenu } from "@/components/layout/mega-menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeControls } from "@/components/theme/theme-controls";
import { useTheme } from "@/components/theme/theme-provider";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { contactLinks, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const { mode, ready } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;
  const effectiveMode = ready ? mode : "dark";
  const logoTone = transparent || effectiveMode === "dark" ? "light" : "dark";
  const menuTone = transparent || effectiveMode === "dark" ? "light" : "dark";

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      if (y <= 40) {
        setVisible(true);
      } else if (y > lastY.current + 8) {
        setVisible(false);
      } else if (y < lastY.current - 8) {
        setVisible(true);
      }

      lastY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,border-color,box-shadow] duration-300",
        transparent
          ? "border-b border-transparent bg-transparent"
          : effectiveMode === "dark"
            ? "border-b border-white/[0.06] bg-void/92 shadow-soft backdrop-blur-md"
            : "border-b border-ink/10 bg-paper/90 shadow-soft backdrop-blur-md",
      )}
      initial={false}
      animate={{
        y: reduceMotion ? 0 : visible ? 0 : "-100%",
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.28,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Container className="flex h-[var(--header-height)] items-center justify-between gap-3">
        <Link
          href="/"
          aria-label={`${site.name} home`}
          className="group relative inline-flex shrink-0 max-w-full"
        >
          <span
            className="pointer-events-none absolute -inset-2 rounded-lg bg-saffron/15 opacity-70 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden
          />
          <span className="relative inline-flex overflow-hidden rounded-md border border-saffron/35 bg-gradient-to-br from-[#3a0a10] via-[#1a0508] to-[#0a0304] p-1.5 shadow-[0_0_0_1px_rgba(232,163,23,0.12),0_18px_40px_-18px_rgba(0,0,0,0.85)] ring-1 ring-white/5 transition duration-300 group-hover:border-saffron/55 group-hover:shadow-[0_0_0_1px_rgba(232,163,23,0.22),0_22px_48px_-16px_rgba(232,163,23,0.25)] sm:p-2">
            <span
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-saffron/70 to-transparent"
              aria-hidden
            />
            <Logo
              variant="full"
              tone={logoTone}
              size="sm"
              href=""
              className="relative z-[1]"
            />
          </span>
        </Link>

        <MegaMenu tone={menuTone} />

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeControls className="hidden sm:inline-flex" />
          <a
            href={contactLinks.phoneHref}
            className={cn(
              "tap-target hidden items-center gap-2 px-2 py-2 text-sm font-medium transition-colors xl:inline-flex",
              transparent || effectiveMode === "dark"
                ? "text-white/75 hover:text-white"
                : "text-ink/70 hover:text-ink",
            )}
          >
            <Phone className="size-3.5" aria-hidden />
            {site.phoneDisplay}
          </a>
          <Button asChild variant="primary" size="sm" className="hidden sm:inline-flex">
            <Link href={site.primaryCta.href}>{site.primaryCta.label}</Link>
          </Button>
          <ThemeControls className="sm:hidden" />
          <MobileNav headerTone={menuTone} />
        </div>
      </Container>
    </motion.header>
  );
}
