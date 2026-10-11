"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarDays, Menu, X } from "lucide-react";

const navigation = [
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Korkusuz deneyim", href: "#deneyim" },
  { label: "Ekibimiz", href: "#ekibimiz" },
  { label: "Ebeveyn rehberi", href: "#blog" },
];

function BrandMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 52 52" className="h-12 w-12 shrink-0">
      <circle cx="26" cy="26" r="25" fill="#EAF8F1" />
      <path
        d="M18 12.5c-6.3 1.5-8.1 8-6.3 15.5l4.1 15.3c.9 3.4 4.4 3.6 6 0l2.8-7.1c.6-1.5 1.4-2.2 2.4-2.2s1.8.7 2.4 2.2l2.8 7.1c1.5 3.6 5.1 3.4 6 0l4.1-15.3c1.8-7.5 0-14-6.3-15.5-4.4-1-7.2 1.5-9 1.5s-4.6-2.5-9-1.5Z"
        fill="white"
        stroke="#17685F"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <circle cx="21.5" cy="24" r="1.6" fill="#203B40" />
      <circle cx="30.5" cy="24" r="1.6" fill="#203B40" />
      <path d="M22.5 29c2.1 2.4 5 2.4 7 0" fill="none" stroke="#ED917C" strokeWidth="2" strokeLinecap="round" />
      <path d="m39 8 1.2 3.4 3.4 1.2-3.4 1.2-1.2 3.4-1.2-3.4-3.4-1.2 3.4-1.2L39 8Z" fill="#F3BD4E" />
    </svg>
  );
}

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <a href="#anasayfa" onClick={onClick} className="group flex items-center gap-2.5" aria-label="Minik Diş ana sayfa">
      <BrandMark />
      <span className="leading-[0.92]">
        <span className="block text-[18px] font-black tracking-[0.11em] text-ink">MİNİK</span>
        <span className="mt-1 block text-[11px] font-extrabold tracking-[0.22em] text-mint-800">DİŞ KLİNİĞİ</span>
      </span>
    </a>
  );
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-mint-100/80 bg-white/90 backdrop-blur-xl">
      <div className="container-shell flex h-[78px] items-center justify-between gap-4">
        <Brand onClick={closeMenu} />

        <nav aria-label="Ana menü" className="hidden items-center gap-8 lg:flex">
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[13px] font-extrabold transition-colors hover:text-mint-800 ${index === 1 ? "text-mint-800" : "text-ink/75"}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#randevu"
          className="hidden items-center gap-2 rounded-full bg-sunshine-400 px-5 py-3 text-[13px] font-black text-ink shadow-[0_5px_0_#e9b94d] transition-all hover:-translate-y-0.5 hover:bg-sunshine-200 active:translate-y-0 active:shadow-none sm:inline-flex"
        >
          <CalendarDays size={16} strokeWidth={2.5} />
          İlk muayene randevusu
          <ArrowRight size={15} strokeWidth={2.5} />
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={menuOpen}
          className="grid h-11 w-11 place-items-center rounded-full bg-mint-100 text-mint-800 transition hover:bg-mint-200 lg:hidden"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            aria-label="Mobil menü"
            className="overflow-hidden border-t border-mint-100 bg-white lg:hidden"
          >
            <div className="container-shell flex flex-col gap-1 py-4">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-2xl px-4 py-3 text-sm font-extrabold text-ink transition hover:bg-mint-50 hover:text-mint-800"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#randevu"
                onClick={closeMenu}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-sunshine-400 px-5 py-3.5 text-sm font-black text-ink"
              >
                <CalendarDays size={17} /> Randevunu planla <ArrowRight size={16} />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
