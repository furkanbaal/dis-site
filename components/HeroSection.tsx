"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check, Heart, Sparkles, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="anasayfa" className="relative isolate overflow-hidden bg-mint-50">
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-sky-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 -top-28 h-96 w-96 rounded-full bg-sunshine-100/70 blur-3xl" />
      <div className="container-shell relative grid min-h-[650px] items-center gap-8 pb-16 pt-12 md:pb-20 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4 lg:pb-14 lg:pt-12">
        <div className="relative z-10 max-w-[650px] py-5 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white bg-white/90 px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.1em] text-mint-800 shadow-soft sm:text-xs"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-sunshine-100 text-amber-700">
              <Sparkles size={14} />
            </span>
            Çocuklara özel, sevgi dolu bakım
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.68, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[690px] text-balance font-rounded text-[clamp(2.7rem,6.1vw,5rem)] font-black leading-[0.98] tracking-[-0.065em] text-ink"
          >
            Minik kahramanların <span className="relative inline-block text-mint-800">mutlu gülüşleri<span className="absolute -bottom-1 left-1 h-2 w-[94%] -rotate-2 rounded-full bg-sunshine-400/80" /></span> burada başlıyor!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.16, ease: "easeOut" }}
            className="mt-6 max-w-[545px] text-[16px] leading-8 text-muted sm:text-[18px]"
          >
            Diş hekimi koltuğu biraz daha az heyecanlı, gülüşler çok daha kocaman olsun. İlk tanışmadan tedaviye, her adımda çocuğunuzun yanındayız.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.56, delay: 0.24, ease: "easeOut" }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#randevu"
              className="group inline-flex min-h-[56px] items-center justify-center gap-3 rounded-full bg-mint-800 px-7 py-4 text-sm font-black text-white shadow-[0_6px_0_#0e5149] transition-all hover:-translate-y-1 hover:bg-[#12584f] hover:shadow-[0_9px_0_#0e5149] active:translate-y-0 active:shadow-none"
            >
              İlk randevunu planla
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1">
                <ArrowRight size={16} strokeWidth={2.6} />
              </span>
            </a>
            <a
              href="#deneyim"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold text-ink transition hover:bg-white/75"
            >
              Kliniğimizi keşfet <span aria-hidden="true">↓</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.43 }}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <div className="flex -space-x-2" aria-hidden="true">
              <span className="grid h-9 w-9 place-items-center rounded-full border-[3px] border-mint-50 bg-coral-200 text-base">😊</span>
              <span className="grid h-9 w-9 place-items-center rounded-full border-[3px] border-mint-50 bg-sunshine-200 text-base">😄</span>
              <span className="grid h-9 w-9 place-items-center rounded-full border-[3px] border-mint-50 bg-sky-200 text-base">😁</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="flex gap-0.5 text-sunshine-500" aria-label="5 üzerinden 5 yıldız">
                {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={13} fill="currentColor" strokeWidth={1.5} />)}
              </span>
              <span className="text-xs font-extrabold text-ink">Minik gülüşlere kocaman özen</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[550px] lg:mr-[-12px]"
        >
          <div className="absolute -inset-4 rounded-[38px] border border-white/70 bg-white/25 shadow-soft" />
          <motion.div
            animate={{ y: [0, -5, 0], rotate: [0, 0.25, 0] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <Image
              src="/baldent-main.svg"
              alt="BalDent Çocuk Diş Kliniği: gülümseyen bir diş maskotuna sarılan sevimli arı illüstrasyonu"
              width={800}
              height={450}
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="relative z-10 h-auto w-full rounded-[30px] shadow-[0_22px_65px_rgba(39,78,74,0.12)]"
            />
          </motion.div>

          <motion.div
            animate={{ y: [0, -7, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-[28%] z-20 hidden items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-card sm:-left-7 sm:flex sm:px-4 sm:py-3"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-sunshine-100 text-amber-700"><Heart size={18} fill="currentColor" /></span>
            <span><b className="block text-[11px] font-black text-ink">Kocaman sevgi</b><small className="mt-0.5 block text-[9px] font-bold text-muted">Her minik kahramana</small></span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 7, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="absolute -bottom-4 right-1 z-20 hidden items-center gap-2 rounded-2xl bg-white px-3 py-2.5 shadow-card sm:-bottom-5 sm:right-3 sm:flex sm:px-4 sm:py-3"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-mint-100 text-mint-800"><Check size={18} strokeWidth={3} /></span>
            <span><b className="block text-[11px] font-black text-ink">Önce tanışıyoruz</b><small className="mt-0.5 block text-[9px] font-bold text-muted">Rahat, acele etmeden</small></span>
          </motion.div>

          <motion.div
            animate={{ rotate: [0, 12, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-2 -top-5 z-20 grid h-11 w-11 place-items-center rounded-2xl bg-sunshine-400 text-white shadow-soft sm:-right-4 sm:-top-6"
            aria-hidden="true"
          >
            <Sparkles size={21} fill="currentColor" />
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-7 bg-[radial-gradient(60%_40px_at_50%_100%,#fffdf8_99%,transparent_100%)]" />
    </section>
  );
}
