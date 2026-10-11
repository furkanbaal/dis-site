"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

type Doctor = {
  name: string;
  title: string;
  focus: string;
  description: string;
  palette: string;
  hair: string;
  scrubs: string;
  variant: number;
};

const doctors: Doctor[] = [
  {
    name: "Uzm. Dt. Deniz Aydın",
    title: "Pedodontist",
    focus: "İlk ziyaretler & koruyucu bakım",
    description: "Miniklerin sorularını sabırla dinler; her yeni adımı birlikte keşfeder.",
    palette: "#e3f5eb",
    hair: "#4b3730",
    scrubs: "#6db99c",
    variant: 0,
  },
  {
    name: "Uzm. Dt. Ece Demir",
    title: "Pedodontist",
    focus: "Çocuk psikolojisi & tedavi",
    description: "Oyunla iletişimi ve sakin anlatımıyla güvenli bir tedavi deneyimi kurar.",
    palette: "#e8f3ff",
    hair: "#6b4735",
    scrubs: "#75b4e2",
    variant: 1,
  },
  {
    name: "Uzm. Dt. Mert Kaya",
    title: "Pedodontist",
    focus: "Koruyucu uygulamalar",
    description: "Sağlıklı alışkanlıkları ailece sürdürülebilir hale getirmeye odaklanır.",
    palette: "#fff0e9",
    hair: "#3e3533",
    scrubs: "#ee9a83",
    variant: 2,
  },
];

function DoctorPortrait({ doctor }: { doctor: Doctor }) {
  const longHair = doctor.variant === 0;
  const fringe = doctor.variant === 1;
  return (
    <svg viewBox="0 0 360 250" className="h-full w-full" role="img" aria-label={`${doctor.name} için çizim portre`}>
      <rect width="360" height="250" rx="26" fill={doctor.palette} />
      <circle cx="180" cy="135" r="96" fill="white" opacity="0.45" />
      <circle cx="70" cy="55" r="8" fill="#fff" opacity="0.75" />
      <path d="m286 40 4 10 10 4-10 4-4 10-4-10-10-4 10-4 4-10Z" fill="#ffd66f" />
      <path d="M69 221c8-53 49-78 111-78s103 25 111 78v29H69v-29Z" fill={doctor.scrubs} />
      <path d="M149 143c2 19 12 31 31 31s29-12 31-31" fill="#eac0a5" />
      <path d="M114 104c-3-41 19-74 67-74 46 0 68 30 65 76l-5 41c-4 37-28 64-61 64s-57-27-61-64l-5-43Z" fill="#f1c9ac" />
      {longHair ? (
        <path d="M112 113c-17-37-5-81 27-98 33-17 80-10 100 21 13 20 14 48 7 76l-12 53-11-49c-18 1-45-13-58-31-12 20-31 31-53 32l-5 47-10-51Z" fill={doctor.hair} />
      ) : fringe ? (
        <path d="M111 110c-10-42 7-83 46-93 40-10 81 8 89 47 3 16 2 36-4 52l-12 20-5-48c-20 5-41-1-54-20-13 19-34 28-57 28l-2 40-11-26Z" fill={doctor.hair} />
      ) : (
        <path d="M113 112c-7-44 12-80 51-91 37-10 76 9 84 44 4 17 2 36-4 54l-11 18-6-47c-18 9-42 5-58-12-14 17-33 24-53 22l-4 37-10-25Z" fill={doctor.hair} />
      )}
      <path d="M151 119c5-4 12-4 17 0m27 0c5-4 12-4 17 0" fill="none" stroke="#4f3933" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="160" cy="133" rx="3.5" ry="5" fill="#203b40" />
      <ellipse cx="202" cy="133" rx="3.5" ry="5" fill="#203b40" />
      <path d="M170 157c7 7 16 7 23 0" fill="none" stroke="#bf7465" strokeWidth="4" strokeLinecap="round" />
      <path d="M137 184c14 13 28 19 43 19s29-6 43-19l13 66h-112l13-66Z" fill="#fff" />
      <path d="m177 187 4 8 5-8 11 63h-31l11-63Z" fill="#d7efe4" />
      <path d="M143 217h18m39 0h18" stroke={doctor.scrubs} strokeWidth="5" strokeLinecap="round" opacity="0.8" />
      <circle cx="305" cy="199" r="21" fill="#fff" />
      <path d="M305 187v24m-12-12h24" stroke={doctor.scrubs} strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export default function TeamSection() {
  return (
    <section id="ekibimiz" className="overflow-hidden bg-[#fffdf8] py-20 sm:py-28">
      <div className="container-shell">
        <SectionTitle
          eyebrow="Tanışalım mı?"
          title={<>Miniklerin dilinden <span className="text-mint-800">anlayan ekip</span></>}
          description="Güler yüzlü iletişim, çocuk psikolojisine duyarlı yaklaşım ve aileyle kurulan güvenli iş birliği."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {doctors.map((doctor, index) => (
            <motion.article
              key={doctor.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.52, delay: index * 0.09 }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-[30px] border border-ink/[0.055] bg-white p-3 shadow-[0_10px_35px_rgba(32,59,64,0.045)] transition-shadow hover:shadow-card"
            >
              <div className="relative overflow-hidden rounded-[23px]">
                <DoctorPortrait doctor={doctor} />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-2 text-[10px] font-black text-mint-800 shadow-soft backdrop-blur">
                  <Sparkles size={12} fill="currentColor" /> Minik dostu
                </span>
              </div>
              <div className="px-3 pb-3 pt-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-[18px] font-black tracking-[-0.035em] text-ink">{doctor.name}</h3>
                    <p className="mt-1 text-xs font-bold text-mint-800">{doctor.title}</p>
                  </div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-coral-100 text-coral-500"><Heart size={17} fill="currentColor" /></span>
                </div>
                <p className="mt-3 min-h-[42px] text-[13px] leading-6 text-muted">{doctor.description}</p>
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-ink/[0.06] pt-4">
                  <span className="text-[10px] font-extrabold text-ink/55">{doctor.focus}</span>
                  <a href="#randevu" aria-label={`${doctor.name} için randevu planla`} className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mint-100 text-mint-800 transition group-hover:bg-mint-800 group-hover:text-white"><ArrowRight size={15} /></a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        <p className="mt-6 text-center text-[11px] font-semibold text-muted">Hekim profilleri örnek içeriktir; yayına alınmadan önce kliniğin gerçek ekip bilgileriyle güncellenmelidir.</p>
      </div>
    </section>
  );
}
