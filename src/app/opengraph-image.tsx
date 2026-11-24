import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const logoBytes = await readFile(
    join(process.cwd(), "public/brand/logo.jpg"),
  );
  const logoSrc = `data:image/jpeg;base64,${logoBytes.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1a0508",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 64,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "3px solid #E8A317",
            borderRadius: 20,
            padding: "40px 56px",
            background: "#0a0304",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            width={760}
            height={253}
            alt=""
            style={{
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 42,
            fontSize: 28,
            fontWeight: 600,
            color: "#f7f3ee",
            textAlign: "center",
            maxWidth: 920,
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 22,
            color: "#E8A317",
            letterSpacing: 3,
          }}
        >
          JAIPUR · RAJASTHAN · INDIA
        </div>
      </div>
    ),
    size,
  );
}
