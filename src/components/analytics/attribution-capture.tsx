"use client";

import { useEffect } from "react";

import { captureAttributionFromUrl } from "@/lib/utm";

export function AttributionCapture() {
  useEffect(() => {
    captureAttributionFromUrl();
  }, []);

  return null;
}