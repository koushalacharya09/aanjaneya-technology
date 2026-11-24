import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("home loads with brand H1", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /technology that|Aanjaneya/i,
  );
  await expect(page.getByRole("link", { name: /Get a Free Consultation/i }).first()).toBeVisible();
});

test("mobile CTA bar has call and whatsapp", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("link", { name: /^Call$/i })).toHaveAttribute(
    "href",
    "tel:+918209679146",
  );
  await expect(page.getByRole("link", { name: /WhatsApp/i }).first()).toHaveAttribute(
    "href",
    /wa\.me\/918209679146/,
  );
});

test("contact form shows validation errors", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /Send enquiry/i }).click();
  await expect(page.getByText(/required|valid|agree/i).first()).toBeVisible();
});

test("axe on home has no serious violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter(
    (v) => v.impact === "serious" || v.impact === "critical",
  );
  expect(serious).toEqual([]);
});
