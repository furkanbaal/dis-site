"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Gift, HeartHandshake, Puzzle, Smile, Sparkles } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

const comforts = [
  {
    icon: Puzzle,
    title: "Oyunla tanışma",
    description: "Randevu öncesi oyun, kitap ve keşif zamanı.",
    tone: "bg-[#d9f2e6] text-mint-800",
  },
  {
    icon: Gift,
    title: "Ödül köşesi",
    description: "Her cesur adım için minik bir kutlama.",
    tone: "bg-[#fff0c5] text-amber-700",
  },
  {
    icon: HeartHandshake,
    title: "Hassas yaklaşım",
    description: "Çocuğun temposuna saygılı, güven veren iletişim.",
    tone: "bg-[#ffe0d9] text-[#bb6657]",
  },
  {
    icon: Smile,
    title: "Ebeveynle iş birliği",
    description: "Her aşamada açık bilgi ve birlikte alınan kararlar.",
    tone: "bg-[#dceeff] text-[#4b90c2]",
  },
];

const visitSteps = [
  { emoji: "👋", title: "Meraklı bir merhaba", subtitle: "Önce birbirimizi tanıyoruz" },
  { emoji: "🔎", title: "Keşfetme zamanı", subtitle: "Aletler ve koltuk oyunla tanışıyor" },
  { emoji: "🏅", title: "Cesaret madalyası", subtitle: "Minik kahramanlığını kutluyoruz" },
];

export default function ExperienceSection() {
  return (
    <section id="deneyim" className="relative isolate overflow-hidden bg-[#17685f] py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-32 -top-40 h-[460px] w-[460px] rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-16 -top-24 h-[330px] w-[330px] rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -left-40 bottom-[-180px] h-[420px] w-[420px] rounded-full bg-[#2c806d]/45 blur-3xl" />

      <div className="container-shell relative grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16">
        <div>
          <SectionTitle
            align="left"
            light
            eyebrow="Korkusuz dişçi deneyimi"
            title={<>Dişçi koltuğu değil, <span className="text-sunshine-200">küçük bir macera.</span></>}
            description="İlk kez gelen minikler için hiçbir şeyi aceleye getirmiyoruz. Merak etmelerine, soru sormalarına ve kendilerini güvende hissetmelerine alan açıyoruz."
          />

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {comforts.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.46, delay: index * 0.07 }}
                  className="rounded-[22px] border border-white/10 bg-white/[0.07] p-5 text-white backdrop-blur-sm sm:p-5"
                >
                  <span className={`mb-4 grid h-10 w-10 place-items-center rounded-[14px] ${item.tone}`}><Icon size={20} strokeWidth={2.1} /></span>
                  <h3 className="text-sm font-black">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-white/65">{item.description}</p>
                </motion.div>
              );
            })}
          </div>

          <a href="#randevu" className="mt-8 inline-flex items-center gap-2 rounded-full bg-sunshine-400 px-6 py-3.5 text-sm font-black text-ink shadow-[0_5px_0_#d9ad45] transition-all hover:-translate-y-0.5 hover:bg-sunshine-200 active:translate-y-0 active:shadow-none">
            Bizi daha yakından tanı <ArrowRight size={17} strokeWidth={2.5} />
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[500px]"
        >
          <div className="absolute -right-5 -top-5 z-10 grid h-[76px] w-[76px] rotate-6 place-items-center rounded-[24px] bg-sunshine-400 text-amber-800 shadow-card sm:-right-7 sm:-top-7">
            <div className="text-center"><Sparkles size={19} className="mx-auto" /><span className="mt-1 block text-[9px] font-black uppercase tracking-[0.08em]">Yaşasın!</span></div>
          </div>
          <div className="rounded-[32px] bg-[#f4fbf6] p-5 shadow-float sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.12em] text-mint-800">İlk ziyaret rotası</p>
                <h3 className="mt-1 text-[22px] font-black tracking-[-0.04em] text-ink">Adım adım, birlikte</h3>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-mint-800 shadow-soft"><HeartHandshake size={22} /></span>
            </div>

            <div className="relative mt-7 space-y-3 before:absolute before:bottom-8 before:left-[25px] before:top-8 before:w-[2px] before:border-l-2 before:border-dashed before:border-mint-300">
              {visitSteps.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.18 + index * 0.12 }}
                  className="relative flex items-center gap-4 rounded-2xl bg-white p-3.5 shadow-[0_5px_20px_rgba(32,59,64,0.035)] sm:p-4"
                >
                  <span className={`relative z-10 grid h-[50px] w-[50px] shrink-0 place-items-center rounded-[16px] text-[22px] ${index === 1 ? "bg-sunshine-100" : index === 2 ? "bg-coral-100" : "bg-mint-100"}`}>{item.emoji}</span>
                  <span className="min-w-0 flex-1">
                    <b className="block text-sm font-black text-ink">{item.title}</b>
                    <small className="mt-1 block text-[11px] leading-4 text-muted">{item.subtitle}</small>
                  </span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-mint-100 text-mint-800"><Check size={14} strokeWidth={3} /></span>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#fff5d6] px-4 py-3.5">
              <span className="text-[22px]" aria-hidden="true">💛</span>
              <p className="text-xs font-bold leading-5 text-ink/80">Küçük adımlar, kocaman bir <span className="font-black">özgüven</span> demek.</p>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 -z-10 h-28 w-28 rounded-full border-[18px] border-[#55a88b]/50" />
        </motion.div>
      </div>
    </section>
  );
}
