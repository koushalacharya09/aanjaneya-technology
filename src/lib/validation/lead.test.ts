import { describe, expect, it } from "vitest";

import { indianPhoneSchema, normalizeWebsiteUrl } from "@/lib/validation/lead";

describe("indianPhoneSchema", () => {
  it("accepts 10-digit Indian mobiles", () => {
    expect(indianPhoneSchema.parse("9876543210")).toBe("+919876543210");
  });

  it("accepts +91 prefix", () => {
    expect(indianPhoneSchema.parse("+91 98765 43210")).toBe("+919876543210");
  });

  it("rejects invalid numbers", () => {
    expect(() => indianPhoneSchema.parse("12345")).toThrow();
  });
});

describe("normalizeWebsiteUrl", () => {
  it("adds https when missing", () => {
    expect(normalizeWebsiteUrl("example.com")).toBe("https://example.com");
  });

  it("keeps existing protocol", () => {
    expect(normalizeWebsiteUrl("https://example.com")).toBe(
      "https://example.com",
    );
  });
});
