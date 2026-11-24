"use client";

import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, ScanSearch } from "lucide-react";

import { industryIcons, serviceIcons } from "@/components/layout/nav-icons";
import { industries, primaryNav, services } from "@/content/site";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
  tone?: "light" | "dark";
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const itemMotion = {
  hidden: { opacity: 0, y: 8 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.22,
      ease: easeOut,
    },
  }),
};

export function MegaMenu({ tone = "dark" }: MegaMenuProps) {
  const reduceMotion = useReducedMotion();
  const linkClass =
    tone === "light"
      ? "text-white/85 hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10"
      : "text-ink/90 hover:bg-surface-elevated hover:text-ink data-[state=open]:bg-surface-elevated";

  return (
    <NavigationMenu.Root className="relative z-20 hidden lg:flex">
      <NavigationMenu.List className="flex items-center gap-0.5">
        {primaryNav.map((item) => {
          if (!("children" in item) || !item.children) {
            return (
              <NavigationMenu.Item key={item.href}>
                <NavigationMenu.Link asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "tap-target inline-flex items-center rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                      linkClass,
                    )}
                  >
                    {item.label}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            );
          }

          const isServices = item.label === "Services";

          return (
            <NavigationMenu.Item key={item.href} value={item.label}>
              <NavigationMenu.Trigger
                className={cn(
                  "group tap-target inline-flex items-center gap-1 rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                  linkClass,
                )}
              >
                {item.label}
                <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute top-full left-0 pt-3 data-[motion=from-end]:animate-in data-[motion=from-start]:animate-in data-[motion=to-end]:animate-out data-[motion=to-start]:animate-out">
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "overflow-hidden rounded-2xl border border-border bg-white shadow-lift",
                    isServices ? "w-[44rem]" : "w-[28rem]",
                  )}
                >
                    <div className="border-b border-border bg-paper px-5 py-3.5">
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-saffron-deep"
                      >
                        View all {item.label.toLowerCase()}
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>

                    {isServices ? (
                      <div className="grid grid-cols-[1fr_1fr_13.5rem] gap-0">
                        <ul className="col-span-2 grid grid-cols-2 gap-1 p-3">
                          {services.map((service, index) => {
                            const Icon = serviceIcons[service.slug];
                            return (
                              <motion.li
                                key={service.slug}
                                custom={index}
                                initial={reduceMotion ? false : "hidden"}
                                animate="show"
                                variants={reduceMotion ? undefined : itemMotion}
                              >
                                <NavigationMenu.Link asChild>
                                  <Link
                                    href={`/services/${service.slug}`}
                                    className="flex gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-surface-elevated"
                                  >
                                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-saffron-soft text-saffron-deep">
                                      <Icon className="size-4" aria-hidden />
                                    </span>
                                    <span className="min-w-0">
                                      <span className="block text-sm font-semibold text-ink">
                                        {service.name}
                                      </span>
                                      <span className="mt-1 block text-xs leading-relaxed text-muted">
                                        {service.summary}
                                      </span>
                                    </span>
                                  </Link>
                                </NavigationMenu.Link>
                              </motion.li>
                            );
                          })}
                        </ul>
                        <div className="border-l border-border bg-gradient-to-b from-saffron-soft to-white p-4">
                          <div className="flex size-10 items-center justify-center rounded-xl bg-saffron/15 text-saffron-deep">
                            <ScanSearch className="size-5" aria-hidden />
                          </div>
                          <p className="mt-4 text-sm font-bold text-ink">
                            Free Website Audit
                          </p>
                          <p className="mt-2 text-xs leading-relaxed text-muted">
                            Honest feedback on speed, SEO basics, and conversion gaps—no sales pitch.
                          </p>
                          <Link
                            href="/free-website-audit"
                            className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-saffron-deep hover:underline"
                          >
                            Start audit
                            <ArrowRight className="size-3" />
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <ul className="grid grid-cols-2 gap-1 p-3">
                        {industries.map((industry, index) => {
                          const Icon = industryIcons[industry.slug];
                          return (
                            <motion.li
                              key={industry.slug}
                              custom={index}
                              initial={reduceMotion ? false : "hidden"}
                              animate="show"
                              variants={reduceMotion ? undefined : itemMotion}
                            >
                              <NavigationMenu.Link asChild>
                                <Link
                                  href={`/industries/${industry.slug}`}
                                  className="flex items-start gap-2.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-elevated"
                                >
                                  <Icon
                                    className="mt-0.5 size-4 shrink-0 text-saffron"
                                    aria-hidden
                                  />
                                  <span className="text-sm font-medium text-ink">
                                    {industry.name}
                                  </span>
                                </Link>
                              </NavigationMenu.Link>
                            </motion.li>
                          );
                        })}
                      </ul>
                    )}
                </motion.div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          );
        })}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}