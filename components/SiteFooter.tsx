import { ArrowUpRight, Clock3, Facebook, Instagram, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { isSampleData, quickLinks, siteConfig } from "@/lib/site-config";

const socialIcons = { Instagram, Facebook } as const;

type SocialName = keyof typeof socialIcons;

export default function SiteFooter() {
  const { contact, hours, closedDaysNote, social } = siteConfig;
  const { address } = contact;

  return (
    <footer id="iletisim" className="relative overflow-hidden bg-[#153f3c] text-white">
      <div className="pointer-events-none absolute -right-28 -top-36 h-80 w-80 rounded-full border-[36px] border-white/[0.035]" />
      <div className="container-shell relative pb-6 pt-14 sm:pt-16">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.35fr_0.8fr_1fr] md:gap-12">
          <div>
            <a href="#anasayfa" className="inline-flex items-center gap-3" aria-label={`${siteConfig.name} ana sayfa`}>
              <span className="grid h-12 w-12 place-items-center rounded-[17px] bg-white text-mint-800">
                <svg aria-hidden="true" viewBox="0 0 40 40" className="h-8 w-8">
                  <path d="M13 7c-5 1-7 6-5 12l3 12c1 3 3 3 5 0l3-7c1-2 2-2 3 0l3 7c2 3 4 3 5 0l3-12c2-6 0-11-5-12-4-1-6 1-9 1s-4-2-9-1Z" fill="#fff" stroke="#17685f" strokeWidth="2.5" strokeLinejoin="round" />
                  <circle cx="15" cy="17" r="1.5" fill="#203b40" /><circle cx="25" cy="17" r="1.5" fill="#203b40" />
                  <path d="M16 22c2 3 6 3 8 0" fill="none" stroke="#ed917c" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <span className="leading-[0.92]"><span className="block text-[18px] font-black tracking-[0.1em]">{siteConfig.brand.line1}</span><span className="mt-1 block text-[10px] font-extrabold tracking-[0.22em] text-mint-300">{siteConfig.brand.line2}</span></span>
            </a>
            <p className="mt-5 max-w-[330px] text-[13px] leading-6 text-white/65">Minik kahramanların kendilerini güvende, meraklı ve kocaman gülümserken hissetmesi için buradayız.</p>
            <div className="mt-5 flex gap-2">
              {social.map((item) => {
                const Icon = socialIcons[item.label as SocialName];
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={item.label}
                    className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-mint-800"
                  >
                    {Icon ? <Icon size={17} /> : item.label}
                  </a>
                );
              })}
            </div>
          </div>

          <nav aria-label="Alt bilgi menüsü">
            <h2 className="text-xs font-black uppercase tracking-[0.12em] text-sunshine-200">Keşfet</h2>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => <li key={link.href}><a href={link.href} className="text-[13px] font-semibold text-white/65 transition hover:text-white">{link.label}</a></li>)}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.12em] text-sunshine-200">Bize ulaşın</h2>
            <div className="mt-4 space-y-4">
              <p className="flex gap-3 text-[13px] leading-5 text-white/70">
                <MapPin size={17} className="mt-0.5 shrink-0 text-mint-300" />
                <span>{address.street}<br />{address.district} / {address.city}</span>
              </p>
              <a href={`tel:${contact.phoneHref}`} className="flex items-center gap-3 text-[13px] font-semibold text-white/70 transition hover:text-white">
                <Phone size={16} className="text-mint-300" /> {contact.phoneDisplay}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-[13px] font-semibold text-white/70 transition hover:text-white">
                <Mail size={16} className="text-mint-300" /> {contact.email}
              </a>
              <div className="flex gap-3 text-[13px] leading-5 text-white/70">
                <Clock3 size={17} className="mt-0.5 shrink-0 text-mint-300" />
                <span>
                  {hours.map((entry) => (
                    <span key={entry.label} className="block">{entry.label} {entry.display}</span>
                  ))}
                  <span className="block">{closedDaysNote}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 pt-5 text-[10px] font-semibold text-white/45 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. Tüm hakları saklıdır.</p>
          <a href="#anasayfa" className="inline-flex items-center gap-1.5 transition hover:text-white">Yukarı dön <ArrowUpRight size={13} /></a>
        </div>

        {isSampleData && (
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1.5 text-[9px] font-semibold text-white/45">
            <Sparkles size={11} /> Bu taslaktaki adres, telefon, e-posta, ekip ve saat bilgileri örnektir; yayından önce <b className="font-black text-white/70">lib/site-config.ts</b> dosyasından güncellenmelidir.
          </p>
        )}
      </div>
    </footer>
  );
}
