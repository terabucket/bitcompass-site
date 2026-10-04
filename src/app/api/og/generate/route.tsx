import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { company, site } from "@/resources";

export const runtime = "nodejs";

// Loaded once per server instance
const assets = Promise.all([
  readFile(path.join(process.cwd(), "src/resources/fonts/SuezOne-Regular.ttf")),
  readFile(path.join(process.cwd(), "public/brand/logo-horizontal-dark.png")),
]);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = (url.searchParams.get("title") || company.tagline).slice(0, 120);
  const [font, logo] = await assets;
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "72px 80px",
        background: "linear-gradient(135deg, #050817 0%, #0b1240 55%, #2440d9 100%)",
        color: "white",
        fontFamily: "Suez One",
      }}
    >
      <img src={logoSrc} height={64} width={Math.round((791 / 160) * 64)} alt="" />
      <div style={{ display: "flex", fontSize: title.length > 60 ? 60 : 72, lineHeight: 1.15, maxWidth: 1000 }}>
        {title}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#c9d3ff" }}>
        <div style={{ display: "flex", width: 14, height: 14, borderRadius: 999, background: site.brandColor }} />
        {company.tagline}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Suez One", data: font, style: "normal", weight: 400 }],
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable" },
    },
  );
}
