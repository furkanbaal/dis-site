"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Baby, Heart, MoonStar, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

const services: {
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
  colors: string;
  iconColors: string;
}[] = [
  {
    title: "İlk diş hekimi ziyareti",
    description: "Önce tanışma, keşif ve bolca merak. İlk ziyaret için alıştırma seanslarıyla güvenli bir başlangıç.",
    detail: "İlk ziyaret",
    icon: Baby,
    colors: "bg-mint-50",
    iconColors: "bg-mint-200 text-mint-800",
  },
  {
    title: "Süt dişi tedavileri",
    description: "Süt dişlerinin sağlığını ve konforunu önemseyen, çocuğun temposuna göre planlanan tedaviler.",
    detail: "Nazik yaklaşım",
    icon: Heart,
    colors: "bg-coral-100",
    iconColors: "bg-coral-200 text-[#bb6657]",
  },
  {
    title: "Yer tutucu uygulamaları",
    description: "Süt dişi erken kaybedildiğinde, daimi dişler için doğru alanın korunmasına yardımcı çözümler.",
    detail: "Kişiye özel plan",
    icon: Sparkles,
    colors: "bg-sunshine-100",
    iconColors: "bg-sunshine-200 text-amber-700",
  },
  {
    title: "Koruyucu diş hekimliği",
    description: "Fissür örtücü ve flor uygulamalarıyla çürük riskini azaltmaya yönelik koruyucu bakım.",
    detail: "Sağlıklı alışkanlıklar",
    icon: ShieldCheck,
    colors: "bg-sky-100",
    iconColors: "bg-sky-200 text-sky-500",
  },
  {
    title: "Sedasyon ve genel anestezi",
    description: "Gerekli görülen durumlarda, uzman değerlendirmesi ve uygun koşullar eşliğinde tedavi seçenekleri.",
    detail: "Uzman değerlendirmesi",
    icon: MoonStar,
    colors: "bg-[#f1edff]",
    iconColors: "bg-[#e3dcff] text-[#7768bf]",
  },
];

export default function ServicesSection() {
  return (
    <section id="hizmetler" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-24 top-10 h-60 w-60 rounded-full bg-sky-100/50 blur-3xl" />
      <div className="container-shell relative">
        <SectionTitle
          eyebrow="Miniklere özel bakım"
          title={<>Her gülüş için <span className="text-mint-800">sevgiyle</span> planlanmış hizmetler</>}
          description="Koruyucu bakımdan tedaviye, çocuğunuzun ihtiyacına ve gelişim dönemine uygun bir yol haritası birlikte çiziyoruz."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            const positionClass = index === 3 ? "lg:col-start-2" : index === 4 ? "lg:col-start-4" : "";
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className={`group relative flex min-h-[268px] flex-col overflow-hidden rounded-[28px] border border-ink/[0.04] p-6 shadow-[0_8px_30px_rgba(32,59,64,0.035)] transition-shadow hover:shadow-card sm:p-7 lg:col-span-2 ${positionClass} ${service.colors}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={`grid h-[54px] w-[54px] place-items-center rounded-[18px] ${service.iconColors}`}>
                    <Icon size={25} strokeWidth={2.2} />
                  </span>
                  <span className="rounded-full bg-white/75 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] text-ink/60">0{index + 1}</span>
                </div>
                <div className="mt-6">
                  <h3 className="text-[19px] font-black leading-tight tracking-[-0.03em] text-ink">{service.title}</h3>
                  <p className="mt-2.5 text-[13px] leading-[1.75] text-ink/70">{service.description}</p>
                </div>
                <a href="#randevu" className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-xs font-black text-mint-800">
                  {service.detail}
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white/80 transition-transform group-hover:translate-x-1">
                    <ArrowUpRight size={14} strokeWidth={2.5} />
                  </span>
                </a>
                <div className="pointer-events-none absolute -bottom-8 -right-7 h-28 w-28 rounded-full border-[18px] border-white/20 transition-transform duration-500 group-hover:scale-125" />
              </motion.article>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs font-semibold text-muted">
          * Tedavi seçenekleri, çocuğunuzun muayenesi ve hekim değerlendirmesi sonrasında belirlenir.
        </p>
      </div>
    </section>
  );
}
