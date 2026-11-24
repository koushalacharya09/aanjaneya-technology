"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { contactLinks, site } from "@/content/site";

const nextSteps = [
  "We review your enquiry and context.",
  "We reply with clarifying questions or a suggested next call.",
  "We agree a practical path—scope, timeline, and priorities.",
];

export default function ThankYouPage() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-paper section-y">
      <Container className="max-w-2xl text-center">
        <motion.div
          className="mx-auto grid size-16 place-items-center rounded-full bg-saffron text-ink"
          initial={reduceMotion ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Check className="size-8" strokeWidth={2.5} />
        </motion.div>
        <h1 className="mt-8 text-h1 text-ink">Thank you — we received it.</h1>
        <p className="mt-4 text-body-lg text-muted">
          Your enquiry is with the Aanjaneya Technology team. We’ll respond
          shortly during business hours ({site.hoursDisplay}).
        </p>
        <div className="mt-10 text-left">
          <h2 className="text-h3 text-ink">What happens next</h2>
          <ol className="mt-4 space-y-3">
            {nextSteps.map((step, i) => (
              <li
                key={step}
                className="flex gap-3 rounded-2xl border border-border bg-white p-4 text-sm text-muted"
              >
                <span className="font-mono text-saffron">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild variant="whatsapp" size="lg">
            <a
              href={contactLinks.whatsappWithMessage(
                "Hi — I just submitted an enquiry on your website.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
