import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  const centered = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`${centered ? "mx-auto text-center" : "text-left"} max-w-[720px]`}
    >
      <span
        className={`mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.12em] ${light ? "bg-white/10 text-sunshine-200" : "bg-mint-100 text-mint-800"}`}
      >
        <Sparkles size={14} strokeWidth={2.4} /> {eyebrow}
      </span>
      <h2 className={`text-balance font-rounded text-[clamp(2rem,4vw,3.25rem)] font-black leading-[1.08] tracking-[-0.045em] ${light ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-[15px] leading-7 sm:text-base ${light ? "text-white/75" : "text-muted"}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
