import type { Metadata } from "next";
import "@fontsource-variable/nunito";
import "./globals.css";

export const metadata: Metadata = {
  title: "BalDent | Çocuk Diş Kliniği",
  description:
    "BalDent’te minik kahramanlar için sevgi dolu pedodonti. İlk diş ziyaretinden koruyucu bakıma, her adımda güvenli ve eğlenceli bir deneyim.",
  applicationName: "BalDent Çocuk Diş Kliniği",
  keywords: ["pedodonti", "çocuk diş hekimi", "çocuk diş kliniği", "çocuklarda ağız sağlığı"],
  openGraph: {
    title: "BalDent | Mutlu gülüşler burada başlıyor",
    description: "Minik kahramanlar için sevgi dolu çocuk diş hekimliği.",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
