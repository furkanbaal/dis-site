/**
 * SİTE YAPILANDIRMASI — tek kaynak (single source of truth)
 * ---------------------------------------------------------------------------
 * Buradaki bilgiler sitenin HER yerinde kullanılır: üst menü, alt bilgi
 * (footer), yapılandırılmış veri (JSON-LD), site haritası (sitemap.xml),
 * robots.txt ve sosyal paylaşım kartları.
 *
 * YAYINA ALMADAN ÖNCE YAPILACAKLAR
 *   1. `contact`, `hours` ve `social` alanlarını gerçek bilgilerle doldurun.
 *   2. Gerçek bilgiler girildikten sonra `isSampleData` değerini `false` yapın.
 *      Bu bayrak `true` olduğu sürece sitede "örnek bilgi" uyarısı görünür.
 *   3. `NEXT_PUBLIC_SITE_URL` ortam değişkenini gerçek alan adına ayarlayın.
 *
 * Not: Buradaki bir değeri değiştirdiğinizde telefon/adres bilgisi hem footer
 * hem JSON-LD hem de randevu bölümünde aynı anda güncellenir.
 */

/** Örnek (yer tutucu) bilgiler mi kullanılıyor? Yayında `false` olmalıdır. */
export const isSampleData = true;

const FALLBACK_URL = "https://minikdis.example.com";

/** Geçersiz bir NEXT_PUBLIC_SITE_URL değeri derlemeyi bozmasın diye korumalı. */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK_URL;
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return FALLBACK_URL;
  }
}

export type OpeningHoursEntry = {
  /** Ekranda gösterilen etiket, ör. "Hafta içi" */
  label: string;
  /** Ekranda gösterilen saat aralığı, ör. "09.00–18.00" */
  display: string;
  /** schema.org dayOfWeek değerleri */
  days: readonly string[];
  /** 24 saat formatında açılış, ör. "09:00" */
  opens: string;
  /** 24 saat formatında kapanış, ör. "18:00" */
  closes: string;
};

export const siteConfig = {
  /** Kısa ad — başlıklarda ve marka işaretinde kullanılır. */
  name: "Minik Diş",
  /** Tam ticari/unvan adı — JSON-LD ve telif satırında kullanılır. */
  legalName: "Minik Diş Çocuk Diş Kliniği",
  /** Marka işaretinin iki satırı (üst menü ve footer). */
  brand: { line1: "MİNİK", line2: "DİŞ KLİNİĞİ" },
  tagline: "Mutlu gülüşler burada başlıyor",
  shortDescription: "Minik kahramanlar için sevgi dolu çocuk diş hekimliği.",
  description:
    "Minik kahramanlar için sevgi dolu pedodonti. İlk diş ziyaretinden koruyucu bakıma, her adımda güvenli ve eğlenceli bir deneyim.",
  url: resolveSiteUrl(),
  locale: "tr_TR",
  lang: "tr",
  keywords: [
    "pedodonti",
    "çocuk diş hekimi",
    "çocuk diş kliniği",
    "çocuklarda ağız sağlığı",
    "süt dişi tedavisi",
    "diş hekimi randevu",
  ],

  contact: {
    /** Ekranda görünen biçim */
    phoneDisplay: "+90 (216) 555 02 02",
    /** `tel:` bağlantısı için E.164 biçimi (yalnızca + ve rakam) */
    phoneHref: "+902165550202",
    email: "merhaba@minikdis.example.com",
    address: {
      street: "Bağdat Caddesi No: 123",
      district: "Kadıköy",
      city: "İstanbul",
      postalCode: "34710",
      country: "TR",
    },
  },

  hours: [
    {
      label: "Hafta içi",
      display: "09.00–18.00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      label: "Cumartesi",
      display: "09.00–14.00",
      days: ["Saturday"],
      opens: "09:00",
      closes: "14:00",
    },
  ] as readonly OpeningHoursEntry[],

  /** Pazar günü kapalıyız — JSON-LD ve footer notunda kullanılır. */
  closedDaysNote: "Pazar günleri kapalıyız.",

  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
  ] as readonly { label: string; href: string }[],

  /** Üst menü bağlantıları (aynı zamanda footer "Keşfet" listesi). */
  nav: [
    { label: "Hizmetler", href: "#hizmetler" },
    { label: "Korkusuz deneyim", href: "#deneyim" },
    { label: "Ekibimiz", href: "#ekibimiz" },
    { label: "Ebeveyn rehberi", href: "#blog" },
  ] as readonly { label: string; href: string }[],

  /** Randevu bölümünün bağlantı hedefi. */
  bookingAnchor: "#randevu",
} as const;

/** Footer "Keşfet" listesi — üst menüyle aynı kaynaktan beslenir. */
export const quickLinks = siteConfig.nav;

/**
 * Üst menüde vurgulanan bağlantı. (Tasarımdaki mevcut davranışı korur.)
 */
export const highlightedNavHref = "#deneyim";
