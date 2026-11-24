import { describe, expect, it } from "vitest";

import { absoluteUrl, createMetadata } from "@/lib/seo";

describe("seo helpers", () => {
  it("builds absolute urls", () => {
    expect(absoluteUrl("/about")).toContain("/about");
  });

  it("creates metadata with canonical", () => {
    const meta = createMetadata({
      title: "Test | Aanjaneya Technology",
      description: "Desc",
      path: "/about",
    });
    expect(
      typeof meta.title === "object" && meta.title && "absolute" in meta.title
        ? meta.title.absolute
        : meta.title,
    ).toContain("Aanjaneya");
    expect(meta.alternates?.canonical).toContain("/about");
  });
});
