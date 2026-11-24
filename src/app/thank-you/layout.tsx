import { keywordMap } from "@/content/seo/keyword-map";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: keywordMap.thankYou.title,
  description: keywordMap.thankYou.description,
  path: "/thank-you",
  noIndex: true,
});

export default function ThankYouLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
