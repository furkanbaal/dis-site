"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarDays, Menu, X } from "lucide-react";
import { highlightedNavHref, siteConfig } from "@/lib/site-config";

function BrandMark() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo.png" alt="BalDent logo" className="h-12 w-12 shrink-0 rounded-xl object-contain" />
  );
}

function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <a href="#anasayfa" onClick={onClick} className="group flex items-center gap-2.5" aria-label={`${siteConfig.name} ana sayfa`}>
      <BrandMark />
      <span className="leading-[0.92]">
        <span className="block text-[18px] font-black tracking-[0.11em] text-ink">{siteConfig.brand.line1}</span>
        <span className="mt-1 block text-[11px] font-extrabold tracking-[0.22em] text-mint-800">{siteConfig.brand.line2}</span>
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
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[13px] font-extrabold transition-colors hover:text-mint-800 ${item.href === highlightedNavHref ? "text-mint-800" : "text-ink/75"}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.bookingAnchor}
            className="hidden items-center gap-2 rounded-full bg-sunshine-400 px-5 py-3 text-[13px] font-black text-ink shadow-[0_5px_0_#e9b94d] transition-all hover:-translate-y-0.5 hover:bg-sunshine-200 active:translate-y-0 active:shadow-none sm:inline-flex"
          >
            <CalendarDays size={16} strokeWidth={2.5} />
            İlk muayene randevusu
            <ArrowRight size={15} strokeWidth={2.5} />
          </a>

          {/* Küçük ekranlarda yer kazanmak için yalnızca ikonlu kısayol. */}
          <a
            href={siteConfig.bookingAnchor}
            aria-label="Randevu planla"
            className="grid h-11 w-11 place-items-center rounded-full bg-sunshine-400 text-ink sm:hidden"
          >
            <CalendarDays size={19} strokeWidth={2.5} />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={menuOpen}
            aria-controls="mobil-menu"
            className="grid h-11 w-11 place-items-center rounded-full bg-mint-100 text-mint-800 transition hover:bg-mint-200 lg:hidden"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobil-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            aria-label="Mobil menü"
            className="overflow-hidden border-t border-mint-100 bg-white lg:hidden"
          >
            <div className="container-shell flex flex-col gap-1 py-4">
              {siteConfig.nav.map((item) => (
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
                href={siteConfig.bookingAnchor}
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
