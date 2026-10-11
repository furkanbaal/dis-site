import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * /sitemap.xml — arama motorlarına taranacak sayfaları bildirir.
 * Site şu an tek sayfalık bir açılış sayfası olduğu için yalnızca
 * kök adres listelenir (bölüm bağlantıları ayrı sayfa değildir).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
