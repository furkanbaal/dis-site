import { siteConfig } from "./site-config";

/**
 * schema.org yapılandırılmış verisi (JSON-LD).
 * Google'ın işletme/klinik bilgi kartını doğru göstermesi için kullanılır.
 * Tüm değerler `lib/site-config.ts` dosyasından beslenir.
 */
export function buildStructuredData() {
  const { contact, hours, social } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Dentist",
        "@id": `${siteConfig.url}/#klinik`,
        name: siteConfig.legalName,
        alternateName: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        telephone: contact.phoneHref,
        email: contact.email,
        medicalSpecialty: "Dentistry",
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.address.street,
          addressLocality: contact.address.district,
          addressRegion: contact.address.city,
          postalCode: contact.address.postalCode,
          addressCountry: contact.address.country,
        },
        openingHoursSpecification: hours.map((entry) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [...entry.days],
          opens: entry.opens,
          closes: entry.closes,
        })),
        sameAs: social.map((item) => item.href),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.shortDescription,
        inLanguage: "tr-TR",
        publisher: { "@id": `${siteConfig.url}/#klinik` },
      },
    ],
  };
}

/**
 * JSON-LD'yi `<script>` etiketi içine güvenle gömülebilir hâle getirir.
 * `</script>` dizisi kaçış karakteriyle etkisiz hâle getirilir.
 */
export function serializeStructuredData(): string {
  return JSON.stringify(buildStructuredData()).replace(/</g, "\\u003c");
}
