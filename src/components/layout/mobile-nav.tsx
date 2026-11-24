"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, MessageCircle, Phone, X } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { contactLinks, primaryNav, site } from "@/content/site";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const linkStagger = {
  hidden: { opacity: 0, x: 12 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.25,
      ease: easeOut,
    },
  }),
};

type MobileNavProps = {
  headerTone?: "light" | "dark";
};

export function MobileNav({ headerTone = "dark" }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  let linkIndex = 0;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "lg:hidden",
            headerTone === "light" &&
              "text-white hover:bg-white/10 hover:text-white",
          )}
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </Button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-ink/60 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className="fixed inset-0 z-50 flex flex-col bg-ink text-white lg:hidden"
                initial={{ x: reduceMotion ? 0 : "100%" }}
                animate={{ x: 0 }}
                exit={{ x: reduceMotion ? 0 : "100%" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  className="pointer-events-none absolute -right-8 top-24 select-none text-[5.5rem] font-extrabold uppercase tracking-tighter text-white/[0.04]"
                  aria-hidden
                >
                  AT
                </motion.div>

                <div className="flex h-[var(--header-height)] items-center justify-between border-b border-white/10 px-4">
                  <Logo variant="full" tone="light" size="sm" />
                  <Dialog.Close asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Close menu"
                      className="text-white hover:bg-white/10 hover:text-white"
                    >
                      <X className="size-5" />
                    </Button>
                  </Dialog.Close>
                </div>

                <Dialog.Title className="sr-only">{site.name} navigation</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Browse services, industries, and contact options.
                </Dialog.Description>

                <nav className="flex-1 overflow-y-auto px-5 py-6">
                  <ul className="space-y-1">
                    {primaryNav.map((item) => {
                      if (!("children" in item) || !item.children) {
                        const i = linkIndex++;
                        return (
                          <motion.li
                            key={item.href}
                            custom={i}
                            initial={reduceMotion ? false : "hidden"}
                            animate="show"
                            variants={reduceMotion ? undefined : linkStagger}
                          >
                            <Dialog.Close asChild>
                              <Link
                                href={item.href}
                                className="tap-target flex items-center rounded-xl px-2 py-3 text-2xl font-semibold tracking-tight text-white hover:bg-white/5"
                              >
                                {item.label}
                              </Link>
                            </Dialog.Close>
                          </motion.li>
                        );
                      }

                      const isOpen = expanded === item.label;
                      const i = linkIndex++;

                      return (
                        <motion.li
                          key={item.href}
                          custom={i}
                          initial={reduceMotion ? false : "hidden"}
                          animate="show"
                          variants={reduceMotion ? undefined : linkStagger}
                          className="rounded-xl"
                        >
                          <button
                            type="button"
                            className="tap-target flex w-full items-center justify-between rounded-xl px-2 py-3 text-left text-2xl font-semibold tracking-tight text-white hover:bg-white/5"
                            aria-expanded={isOpen}
                            onClick={() =>
                              setExpanded(isOpen ? null : item.label)
                            }
                          >
                            {item.label}
                            <ChevronDown
                              className={cn(
                                "size-5 text-white/60 transition-transform",
                                isOpen && "rotate-180",
                              )}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen ? (
                              <motion.ul
                                initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                                transition={{ duration: reduceMotion ? 0 : 0.22 }}
                                className="overflow-hidden pb-2 pl-2"
                              >
                                <li>
                                  <Dialog.Close asChild>
                                    <Link
                                      href={item.href}
                                      className="tap-target flex items-center rounded-lg px-3 py-2.5 text-base font-semibold text-saffron"
                                    >
                                      All {item.label.toLowerCase()}
                                    </Link>
                                  </Dialog.Close>
                                </li>
                                {item.children.map((child) => (
                                  <li key={child.href}>
                                    <Dialog.Close asChild>
                                      <Link
                                        href={child.href}
                                        className="tap-target flex items-center rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                                      >
                                        {child.label}
                                      </Link>
                                    </Dialog.Close>
                                  </li>
                                ))}
                              </motion.ul>
                            ) : null}
                          </AnimatePresence>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                <div className="grid grid-cols-2 gap-3 border-t border-white/10 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                  <Dialog.Close asChild>
                    <Button
                      asChild
                      variant="outlineDark"
                      className="w-full border-white/20"
                    >
                      <a href={contactLinks.phoneHref}>
                        <Phone className="size-4" />
                        Phone
                      </a>
                    </Button>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <Button asChild variant="whatsapp" className="w-full">
                      <a
                        href={contactLinks.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="size-4" />
                        WhatsApp
                      </a>
                    </Button>
                  </Dialog.Close>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}