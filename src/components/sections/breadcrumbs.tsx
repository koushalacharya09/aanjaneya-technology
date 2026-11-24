import Link from "next/link";

import { breadcrumbSchema, JsonLd } from "@/lib/schema";
import { cn } from "@/lib/utils";

type Crumb = { name: string; path: string };

export function Breadcrumbs({
  items,
  tone = "light",
}: {
  items: Crumb[];
  tone?: "light" | "dark";
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(items)} />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-caption">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={item.path} className="inline-flex items-center gap-2">
                {index > 0 ? (
                  <span
                    className={cn(tone === "dark" ? "text-white/35" : "text-muted")}
                  >
                    /
                  </span>
                ) : null}
                {last ? (
                  <span
                    className={cn(
                      "font-medium",
                      tone === "dark" ? "text-white" : "text-ink",
                    )}
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className={cn(
                      "underline-offset-4 hover:underline",
                      tone === "dark" ? "text-white/65" : "text-muted",
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}