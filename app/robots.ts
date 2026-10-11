import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * /robots.txt — arama motoru botları için kurallar.
 * Randevu API'si taranmaz; site haritası bildirilir.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
