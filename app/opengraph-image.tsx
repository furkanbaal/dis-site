import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Yazı tipleri depodan yerelden okunur (`assets/fonts/`).
 * Böylece kart üretimi hiçbir CDN'e bağlı kalmaz ve markanın kendi yazı tipi
 * (Nunito) kullanılır. Türkçe karakterler (ç ğ ı ö ş ü) kapsam içindedir.
 */
async function loadFont(fileName: string): Promise<Buffer> {
  return readFile(path.join(process.cwd(), "assets", "fonts", fileName));
}

/**
 * /opengraph-image — WhatsApp, Instagram, X ve LinkedIn paylaşımlarında
 * görünen önizleme kartı. Derleme sırasında PNG olarak üretilir.
 */
export default async function OpengraphImage() {
  const [regular, extrabold] = await Promise.all([
    loadFont("nunito-400.ttf"),
    loadFont("nunito-800.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: "linear-gradient(135deg, #17685f 0%, #12584f 55%, #153f3c 100%)",
          fontFamily: "Nunito",
          color: "#ffffff",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-130px",
            top: "-150px",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            border: "48px solid rgba(255,255,255,0.06)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-100px",
            bottom: "-170px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(255,214,111,0.10)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "84px",
              height: "84px",
              borderRadius: "26px",
              background: "#eaf8f1",
            }}
          >
            <svg width="52" height="52" viewBox="0 0 52 52">
              <path
                d="M18 12.5c-6.3 1.5-8.1 8-6.3 15.5l4.1 15.3c.9 3.4 4.4 3.6 6 0l2.8-7.1c.6-1.5 1.4-2.2 2.4-2.2s1.8.7 2.4 2.2l2.8 7.1c1.5 3.6 5.1 3.4 6 0l4.1-15.3c1.8-7.5 0-14-6.3-15.5-4.4-1-7.2 1.5-9 1.5s-4.6-2.5-9-1.5Z"
                fill="#ffffff"
                stroke="#17685F"
                strokeWidth="2.8"
                strokeLinejoin="round"
              />
              <circle cx="21.5" cy="24" r="1.6" fill="#203B40" />
              <circle cx="30.5" cy="24" r="1.6" fill="#203B40" />
              <path
                d="M22.5 29c2.1 2.4 5 2.4 7 0"
                fill="none"
                stroke="#ED917C"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path d="m39 8 1.2 3.4 3.4 1.2-3.4 1.2-1.2 3.4-1.2-3.4-3.4-1.2 3.4-1.2L39 8Z" fill="#F3BD4E" />
            </svg>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "25px",
              fontWeight: 800,
              letterSpacing: "6px",
              color: "#b3e4ce",
            }}
          >
            {siteConfig.brand.line2}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "106px",
              fontWeight: 800,
              letterSpacing: "-3px",
              lineHeight: 1,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "42px",
              fontWeight: 400,
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.2,
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>

        <div style={{ display: "flex", gap: "14px" }}>
          {["Pedodonti", "Koruyucu bakım", "İlk ziyaret dostu"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "13px 26px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.12)",
                fontSize: "23px",
                fontWeight: 800,
                color: "#ffffff",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Nunito", data: regular, weight: 400, style: "normal" },
        { name: "Nunito", data: extrabold, weight: 800, style: "normal" },
      ],
    },
  );
}
