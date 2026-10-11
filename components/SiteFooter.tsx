import { ArrowUpRight, Clock3, Facebook, Instagram, MapPin, Phone, Sparkles } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const quickLinks = [
  { label: "Hizmetlerimiz", href: "#hizmetler" },
  { label: "Korkusuz deneyim", href: "#deneyim" },
  { label: "Uzman ekibimiz", href: "#ekibimiz" },
  { label: "Ebeveyn rehberi", href: "#blog" },
];

export default function SiteFooter() {
  return (
    <footer id="iletisim" className="relative overflow-hidden bg-[#153f3c] text-white">
      <div className="pointer-events-none absolute -right-28 -top-36 h-80 w-80 rounded-full border-[36px] border-white/[0.035]" />
      <div className="container-shell relative pb-6 pt-14 sm:pt-16">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.35fr_0.8fr_1fr] md:gap-12">
          <div>
            <BrandLogo footer />
            <p className="mt-5 max-w-[330px] text-[13px] leading-6 text-white/65">Minik kahramanların kendilerini güvende, meraklı ve kocaman gülümserken hissetmesi için buradayız.</p>
            <div className="mt-5 flex gap-2">
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-mint-800"><Instagram size={17} /></a>
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-mint-800"><Facebook size={17} /></a>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.12em] text-sunshine-200">Keşfet</h2>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => <li key={link.href}><a href={link.href} className="text-[13px] font-semibold text-white/65 transition hover:text-white">{link.label}</a></li>)}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.12em] text-sunshine-200">Bize ulaşın</h2>
            <div className="mt-4 space-y-4">
              <p className="flex gap-3 text-[13px] leading-5 text-white/70"><MapPin size={17} className="mt-0.5 shrink-0 text-mint-300" /><span>Bağdat Caddesi, Kadıköy<br />İstanbul</span></p>
              <a href="tel:+902165550202" className="flex items-center gap-3 text-[13px] font-semibold text-white/70 transition hover:text-white"><Phone size={16} className="text-mint-300" /> +90 (216) 555 02 02</a>
              <div className="flex gap-3 text-[13px] leading-5 text-white/70"><Clock3 size={17} className="mt-0.5 shrink-0 text-mint-300" /><span>Hafta içi 09.00–18.00<br />Cumartesi 09.00–14.00</span></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 pt-5 text-[10px] font-semibold text-white/45 sm:flex-row sm:items-center">
          <p>© 2026 BalDent Çocuk Diş Kliniği. Tüm hakları saklıdır.</p>
          <a href="#anasayfa" className="inline-flex items-center gap-1.5 transition hover:text-white">Yukarı dön <ArrowUpRight size={13} /></a>
        </div>
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 text-[9px] font-semibold text-white/45"><Sparkles size={11} /> Bu taslaktaki adres, telefon, ekip ve saat bilgileri örnektir; yayından önce güncellenmelidir.</p>
      </div>
    </footer>
  );
}
