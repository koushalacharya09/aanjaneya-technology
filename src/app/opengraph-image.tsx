import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const logoBytes = await readFile(join(process.cwd(), "public/brand/logo.jpg"));
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
          justifyContent: "space-between",
          padding: 64,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            width={280}
            height={88}
            alt=""
            style={{ objectFit: "contain", objectPosition: "left center" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.08,
              maxWidth: 920,
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 24,
              color: "#c4b8b0",
            }}
          >
            Jaipur, Rajasthan · Serving businesses across India
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: 6,
            width: 180,
            background: "#E8A317",
          }}
        />
      </div>
    ),
    size,
  );
}
