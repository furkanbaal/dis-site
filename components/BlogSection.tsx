"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Baby, BookOpen, ChevronRight, Heart, Sparkles, X, type LucideIcon } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

type Article = {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  icon: LucideIcon;
  artwork: string;
  content: string[];
};

const articles: Article[] = [
  {
    title: "Bebeklerde ağız bakımı nasıl yapılır?",
    excerpt: "İlk diş görünmeden başlayan, yaşa uygun ve nazik ağız bakımının küçük ipuçları.",
    category: "Bebek bakımı",
    readTime: "4 dk okuma",
    icon: Baby,
    artwork: "bg-mint-100",
    content: [
      "Ağız bakımı, ilk diş çıkmadan önce de günlük rutinin bir parçası olabilir. Beslenme sonrasında diş etlerini temiz, nemli bir gazlı bezle nazikçe silmek bebeğinizin ağzını temiz tutmaya yardımcı olur.",
      "İlk diş göründüğünde yumuşak kıllı, yaşına uygun bir fırçayla günde iki kez fırçalamaya başlayın. Kullanılacak diş macununun miktarı ve flor içeriği için çocuğunuzun diş hekiminden kişisel öneri alın.",
      "İlk diş hekimi ziyareti için belirli bir sorun çıkmasını beklemeyin. Erken tanışma, hem koruyucu önerileri zamanında almayı hem de klinik ortamını sakince keşfetmeyi sağlar. Her bebeğin ihtiyacı farklı olduğundan, sorularınızı hekiminizle paylaşın.",
    ],
  },
  {
    title: "Parmak emme alışkanlığı nasıl bırakılır?",
    excerpt: "Baskı kurmadan, çocuğunuzun duygularını anlayarak ilerleyebileceğiniz destekleyici öneriler.",
    category: "Alışkanlıklar",
    readTime: "5 dk okuma",
    icon: Heart,
    artwork: "bg-coral-100",
    content: [
      "Parmak emme bebeklik ve erken çocukluk döneminde sık görülebilen, çoğu zaman kendini yatıştırmaya yarayan bir alışkanlıktır. Önce hangi anlarda arttığını gözlemleyin: uykuya geçiş, yorgunluk ya da heyecan gibi durumlar ipucu verebilir.",
      "Azarlamak, utandırmak veya elini zorla çekmek yerine çocuğunuzla sakince konuşun. Parmak emmediği zamanları fark edip küçük ve içten bir takdir sunmak, değişimi olumlu bir deneyime dönüştürebilir.",
      "Alışkanlık uzun sürüyorsa, çocuğunuzda kaygı yaratıyorsa ya da diş ve çene gelişimiyle ilgili soru işaretiniz varsa pedodontistinize danışın. Her çocuğun gelişim hızı farklıdır; size özel bir yol haritası için profesyonel görüş alın.",
    ],
  },
  {
    title: "Diş fırçalamayı oyuna dönüştürmenin 5 yolu",
    excerpt: "Müzik, hikâye ve seçim hakkıyla günlük fırçalama rutinini daha keyifli hale getirin.",
    category: "Günlük rutinler",
    readTime: "3 dk okuma",
    icon: Sparkles,
    artwork: "bg-sky-100",
    content: [
      "Fırçalama zamanı bir görev gibi hissettirmek zorunda değil. Sevilen kısa bir şarkı açabilir, fırçayı minik bir kahramanın macerasına dönüştürebilir veya aynanın karşısında birlikte fırçalayabilirsiniz.",
      "Çocuğunuza iki uygun fırça ya da macun arasından seçim hakkı verin. Kendi seçimleri, rutine katılma isteğini artırabilir. Bir takvimde fırçalama günlerini işaretlemek de ilerlemeyi görünür kılar.",
      "Yetişkin gözetimi ve yardımı çocuğun yaşına, el becerisine ve diş hekiminizin önerisine göre değişir. Eğlence kadar doğru teknik de önemlidir; bir sonraki kontrolde fırçalama yöntemini hekiminizden göstermesini isteyin.",
    ],
  },
];

/** Klavye odağının içeride kalmasını sağlayan seçici. */
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function BlogSection() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!selectedArticle) return;

    const previousOverflow = document.body.style.overflow;
    // Pencere kapandığında odağı geri vereceğimiz öğe (açan buton).
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current;
    dialog?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedArticle(null);
        return;
      }
      if (event.key !== "Tab" || !dialog) return;

      // Odak tuzağı: Tab, pencere içindeki öğeler arasında döner.
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [selectedArticle]);

  return (
    <section id="blog" className="overflow-hidden bg-white py-20 sm:py-28">
      <div className="container-shell">
        <div className="flex flex-col items-end justify-between gap-5 sm:flex-row sm:items-end">
          <SectionTitle
            align="left"
            eyebrow="Ebeveynler için küçük notlar"
            title={<>Bilgiyle büyüyen <span className="text-mint-800">gülüşler</span></>}
            description="Ağız ve diş sağlığı yolculuğunuzda işinize yarayacak pratik, güvenilir başlangıç notları."
          />
          <a href="#randevu" className="mb-1 hidden shrink-0 items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-3 text-xs font-black text-ink transition hover:border-mint-300 hover:bg-mint-50 sm:inline-flex">Bize danışın <ChevronRight size={15} /></a>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {articles.map((article, index) => {
            const Icon = article.icon;
            return (
              <motion.article
                key={article.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="group overflow-hidden rounded-[28px] border border-ink/[0.055] bg-[#fffefa] shadow-[0_8px_30px_rgba(32,59,64,0.04)] transition-shadow hover:shadow-card"
              >
                <div className={`relative flex h-[188px] items-center justify-center overflow-hidden ${article.artwork}`}>
                  <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full border-[24px] border-white/35" />
                  <div className="absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-white/30" />
                  <motion.div whileHover={{ rotate: index % 2 === 0 ? 8 : -8, scale: 1.06 }} className="relative z-10 grid h-[94px] w-[94px] place-items-center rounded-[32px] bg-white text-mint-800 shadow-soft">
                    <Icon size={42} strokeWidth={1.8} />
                  </motion.div>
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/80 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.1em] text-ink/70">{article.category}</span>
                  <span className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1.5 text-[9px] font-black text-ink/70">{article.readTime}</span>
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-[18px] font-black leading-snug tracking-[-0.03em] text-ink">{article.title}</h3>
                  <p className="mt-2.5 min-h-[48px] text-[13px] leading-6 text-muted">{article.excerpt}</p>
                  <button type="button" onClick={() => setSelectedArticle(article)} className="mt-4 inline-flex items-center gap-1.5 text-xs font-black text-mint-800">
                    Yazıyı oku <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedArticle(null); }}
            className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-ink/45 p-4 backdrop-blur-sm"
          >
            <motion.article
              ref={dialogRef}
              tabIndex={-1}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="article-dialog-title"
              className="relative my-8 max-h-[min(85vh,760px)] w-full max-w-[620px] overflow-y-auto rounded-[30px] bg-white p-6 shadow-float outline-none sm:p-9"
            >
              <button type="button" onClick={() => setSelectedArticle(null)} aria-label="Yazıyı kapat" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-mint-50 text-ink transition hover:bg-mint-100"><X size={18} /></button>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-mint-100 px-3 py-2 text-[10px] font-black uppercase tracking-[0.1em] text-mint-800"><BookOpen size={14} /> {selectedArticle.category} · {selectedArticle.readTime}</div>
              <h2 id="article-dialog-title" className="max-w-[500px] pr-9 text-[27px] font-black leading-tight tracking-[-0.045em] text-ink sm:text-[34px]">{selectedArticle.title}</h2>
              <p className="mt-3 border-b border-ink/[0.07] pb-5 text-sm leading-6 text-muted">{selectedArticle.excerpt}</p>
              <div className="space-y-4 py-5">
                {selectedArticle.content.map((paragraph) => <p key={paragraph.slice(0, 36)} className="text-sm leading-7 text-ink/80">{paragraph}</p>)}
              </div>
              <p className="rounded-2xl bg-sunshine-100/70 p-4 text-[11px] leading-5 text-ink/70"><b className="text-ink">Küçük not:</b> Bu içerik genel bilgilendirme amaçlıdır; tanı veya tedavi önerisi yerine geçmez. Çocuğunuza özel sorular için diş hekiminize danışın.</p>
              <button type="button" onClick={() => setSelectedArticle(null)} className="mt-5 inline-flex items-center gap-2 rounded-full bg-mint-800 px-5 py-3 text-xs font-black text-white transition hover:bg-[#12584f]">Okumayı bitirdim <ChevronRight size={15} /></button>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
