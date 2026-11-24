"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { contactLinks, site } from "@/content/site";

const nextSteps = [
  "We review your enquiry and context.",
  "Continue the conversation on WhatsApp so we can clarify scope quickly.",
  "We agree a practical path—scope, timeline, and priorities.",
];

const DEFAULT_WA =
  "Hi — I just submitted a quote request on your website.";

export default function ThankYouPage() {
  const reduceMotion = useReducedMotion();
  const [waHref, setWaHref] = useState(
    contactLinks.whatsappWithMessage(DEFAULT_WA),
  );

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("aanjaneya_quote_wa");
      if (saved) {
        setWaHref(contactLinks.whatsappWithMessage(saved));
      }
    } catch {
      /* ignore */
    }
  }, []);

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
          Your enquiry is with the Aanjaneya Technology team. For the fastest
          sales follow-up, continue on WhatsApp ({site.phoneDisplay}).
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
            <a href={waHref} target="_blank" rel="noopener noreferrer">
              Continue on WhatsApp
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
