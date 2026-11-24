"use client";

import { useSyncExternalStore, type ReactNode } from "react";

function subscribe() {
  return () => undefined;
}

/** Renders children only after mount — avoids Radix ID hydration mismatches under PPR. */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return fallback;
  }

  return children;
}
