"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, Heart, LoaderCircle, Phone, ShieldCheck, Sparkles } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import { siteConfig } from "@/lib/site-config";
import {
  ages,
  characters,
  initialForm,
  maxBookingISO,
  services,
  stepNames,
  timeSlots,
  todayISO,
  type FormState,
} from "@/lib/booking";

type SubmitState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "done"; reference: string; delivered: boolean }
  | { status: "error"; message: string };

export default function BookingSection() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [error, setError] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  /** Bot tuzağı: gerçek kullanıcılar bu alanı görmez, doldurmaz. */
  const [honeypot, setHoneypot] = useState("");

  const today = todayISO();
  const maxDate = maxBookingISO();

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const nextStep = () => {
    if (step === 1 && (!form.age || !form.character)) {
      setError("Devam etmeden önce yaş aralığını ve kahramanını seçelim.");
      return;
    }
    if (step === 2 && (!form.service || !form.date || !form.time)) {
      setError("Sana uygun bir hizmet, tarih ve saat seçmeyi unutma.");
      return;
    }
    setError("");
    setStep((current) => Math.min(current + 1, 3));
  };

  const goBack = () => {
    setError("");
    setStep((current) => Math.max(current - 1, 1));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState.status === "sending") return;

    if (!form.parentName.trim() || !form.phone.trim() || !form.consent) {
      setError("İletişim bilgilerini tamamlayıp onay kutusunu işaretleyelim.");
      return;
    }

    setError("");
    setSubmitState({ status: "sending" });

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: honeypot }),
      });

      const result: {
        ok?: boolean;
        reference?: string;
        stored?: boolean;
        forwarded?: boolean;
        message?: string;
      } = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        setSubmitState({
          status: "error",
          message: result.message ?? "Randevu isteğiniz gönderilemedi. Lütfen tekrar deneyin.",
        });
        return;
      }

      setSubmitState({
        status: "done",
        reference: result.reference ?? "",
        delivered: Boolean(result.stored || result.forwarded),
      });
    } catch {
      setSubmitState({
        status: "error",
        message: "Bağlantı kurulamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.",
      });
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setHoneypot("");
    setStep(1);
    setError("");
    setSubmitState({ status: "idle" });
  };

  const sending = submitState.status === "sending";

  return (
    <section id="randevu" className="relative overflow-hidden bg-[#f1f8f5] py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-36 top-20 h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sunshine-100/80 blur-3xl" />
      <div className="container-shell relative">
        <SectionTitle
          eyebrow="Kolayca planlayalım"
          title={<>İlk ziyaret, <span className="text-mint-800">güzel bir anı</span> olsun.</>}
          description="Birkaç küçük adımda randevu isteğini bize ilet. Önce minik kahramanını tanıyalım!"
        />

        <div className="mx-auto mt-12 grid max-w-[1050px] items-start gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10">
          <aside className="pt-2 lg:pt-7">
            <div className="relative overflow-hidden rounded-[30px] bg-mint-800 p-6 text-white shadow-card sm:p-8">
              <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full border-[20px] border-white/[0.07]" />
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sunshine-400 text-amber-800"><Heart size={23} fill="currentColor" /></span>
              <h3 className="mt-5 max-w-[260px] text-[25px] font-black leading-tight tracking-[-0.04em]">Her minik kahraman kendi hızında.</h3>
              <p className="mt-3 text-sm leading-6 text-white/75">Randevu talebin bize ulaştıktan sonra uygun zamanı birlikte netleştirelim.</p>
              <div className="mt-6 space-y-3 border-t border-white/15 pt-5">
                <div className="flex gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/10"><Clock3 size={16} /></span><p className="pt-1 text-xs font-bold leading-5 text-white/85">İlk ziyaret için kendimize zaman ayırıyoruz.</p></div>
                <div className="flex gap-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/10"><Phone size={16} /></span><p className="pt-1 text-xs font-bold leading-5 text-white/85">Randevuyu telefonla teyit ediyoruz.</p></div>
              </div>
              <a
                href={`tel:${siteConfig.contact.phoneHref}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-xs font-black text-white transition hover:bg-white/20"
              >
                <Phone size={14} /> {siteConfig.contact.phoneDisplay}
              </a>
            </div>
            <p className="mt-4 flex items-start gap-2 px-2 text-[11px] leading-5 text-muted">
              <ShieldCheck size={15} className="mt-0.5 shrink-0 text-mint-800" />
              Paylaştığınız bilgiler yalnızca randevu talebinizi değerlendirmek için kullanılır, üçüncü taraflarla paylaşılmaz.
            </p>
          </aside>

          <div className="overflow-hidden rounded-[30px] border border-ink/[0.05] bg-white p-5 shadow-card sm:p-8">
            {submitState.status !== "done" ? (
              <>
                <div className="mb-7 flex items-center justify-between gap-2">
                  {stepNames.map((name, index) => {
                    const number = index + 1;
                    const isCurrent = step === number;
                    const isDone = step > number;
                    return (
                      <div key={name} className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-black transition-colors ${isCurrent || isDone ? "bg-mint-800 text-white" : "bg-mint-50 text-muted"}`}>
                          {isDone ? <Check size={15} strokeWidth={3} /> : `0${number}`}
                        </span>
                        <span className={`hidden truncate text-[10px] font-extrabold sm:block ${isCurrent ? "text-mint-800" : "text-muted/70"}`}>{name}</span>
                        {index < stepNames.length - 1 && <span className={`h-px min-w-3 flex-1 ${step > number ? "bg-mint-500" : "bg-ink/10"}`} />}
                      </div>
                    );
                  })}
                </div>

                <form onSubmit={handleSubmit} noValidate aria-busy={sending}>
                  {/* Bot tuzağı: ekranda görünmez, klavye odağına girmez. */}
                  <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
                    <label htmlFor="website">Web sitesi</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(event) => setHoneypot(event.target.value)}
                    />
                  </div>

                  <AnimatePresence mode="wait" initial={false}>
                    {step === 1 && (
                      <motion.div key="step-one" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.22 }}>
                        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-mint-800">Adım 1 / 3</p>
                        <h3 className="mt-1 text-[22px] font-black tracking-[-0.04em] text-ink">Minik kahramanını tanıyalım</h3>
                        <label htmlFor="child-name" className="mb-2 mt-5 block text-xs font-extrabold text-ink">Minik kahramanın adı <span className="font-semibold text-muted">(isteğe bağlı)</span></label>
                        <input id="child-name" name="childName" value={form.childName} onChange={(event) => update("childName", event.target.value)} placeholder="Örn. Ada" autoComplete="off" maxLength={60} className="h-12 w-full rounded-2xl border border-ink/10 bg-[#fffefa] px-4 text-sm font-semibold text-ink placeholder:text-muted/55 focus:border-mint-500 focus:outline-none focus:ring-4 focus:ring-mint-100" />

                        <fieldset className="mt-5">
                          <legend className="mb-2.5 text-xs font-extrabold text-ink">Kaç yaşında? <span className="text-coral-500">*</span></legend>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {ages.map((age) => (
                              <button key={age} type="button" aria-pressed={form.age === age} onClick={() => update("age", age)} className={`rounded-2xl border px-3 py-3 text-xs font-extrabold transition ${form.age === age ? "border-mint-800 bg-mint-100 text-mint-800 shadow-[inset_0_0_0_1px_#17685f]" : "border-ink/10 bg-white text-ink/70 hover:border-mint-300 hover:bg-mint-50"}`}>
                                {age}
                              </button>
                            ))}
                          </div>
                        </fieldset>

                        <fieldset className="mt-5">
                          <legend className="mb-2.5 text-xs font-extrabold text-ink">Randevu arkadaşını seç <span className="text-coral-500">*</span></legend>
                          <div className="grid grid-cols-4 gap-2">
                            {characters.map((character) => (
                              <button key={character.name} type="button" aria-pressed={form.character === character.name} onClick={() => update("character", character.name)} className={`rounded-2xl border p-2.5 text-center transition ${form.character === character.name ? "border-mint-800 bg-mint-50 shadow-[inset_0_0_0_1px_#17685f]" : "border-ink/10 bg-white hover:border-mint-300"}`}>
                                <span className={`mx-auto grid h-10 w-10 place-items-center rounded-[14px] text-[22px] ${character.color}`}>{character.emoji}</span>
                                <span className="mt-1.5 block text-[10px] font-black text-ink">{character.name}</span>
                              </button>
                            ))}
                          </div>
                        </fieldset>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div key="step-two" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.22 }}>
                        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-mint-800">Adım 2 / 3</p>
                        <h3 className="mt-1 text-[22px] font-black tracking-[-0.04em] text-ink">Birlikte uygun zamanı bulalım</h3>
                        <fieldset className="mt-5">
                          <legend className="mb-2.5 text-xs font-extrabold text-ink">Ziyaret nedeni <span className="text-coral-500">*</span></legend>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {services.map((service) => (
                              <button key={service} type="button" aria-pressed={form.service === service} onClick={() => update("service", service)} className={`flex min-h-11 items-center justify-between gap-2 rounded-2xl border px-3.5 py-3 text-left text-xs font-extrabold transition ${form.service === service ? "border-mint-800 bg-mint-50 text-mint-800 shadow-[inset_0_0_0_1px_#17685f]" : "border-ink/10 bg-white text-ink/75 hover:border-mint-300"}`}>
                                {service}{form.service === service && <Check size={15} strokeWidth={3} />}
                              </button>
                            ))}
                          </div>
                        </fieldset>

                        <div className="mt-5 grid gap-5 sm:grid-cols-[0.9fr_1.1fr]">
                          <div>
                            <label htmlFor="visit-date" className="mb-2.5 block text-xs font-extrabold text-ink">Tercih ettiğin tarih <span className="text-coral-500">*</span></label>
                            <div className="relative">
                              <CalendarDays size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mint-800" />
                              <input id="visit-date" name="date" type="date" min={today} max={maxDate} value={form.date} onChange={(event) => update("date", event.target.value)} className="h-12 w-full rounded-2xl border border-ink/10 bg-[#fffefa] pl-10 pr-3 text-xs font-bold text-ink focus:border-mint-500 focus:outline-none focus:ring-4 focus:ring-mint-100" />
                            </div>
                          </div>
                          <fieldset>
                            <legend className="mb-2.5 text-xs font-extrabold text-ink">Saat tercihi <span className="text-coral-500">*</span></legend>
                            <div className="grid grid-cols-3 gap-2">
                              {timeSlots.map((time) => (
                                <button key={time} type="button" aria-pressed={form.time === time} onClick={() => update("time", time)} className={`rounded-xl border px-2 py-2.5 text-[11px] font-extrabold transition ${form.time === time ? "border-mint-800 bg-mint-800 text-white" : "border-ink/10 bg-white text-ink/70 hover:border-mint-300 hover:bg-mint-50"}`}>
                                  {time}
                                </button>
                              ))}
                            </div>
                          </fieldset>
                        </div>
                        <p className="mt-4 text-[10px] leading-5 text-muted">Seçtiğin zaman bir randevu talebidir. Kesin saat, ekibimizin teyidiyle netleşir.</p>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div key="step-three" initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.22 }}>
                        <p className="text-[10px] font-black uppercase tracking-[0.12em] text-mint-800">Adım 3 / 3</p>
                        <h3 className="mt-1 text-[22px] font-black tracking-[-0.04em] text-ink">Sana nasıl ulaşalım?</h3>
                        <p className="mt-2 text-xs leading-5 text-muted">Randevu talebini teyit etmek için bir ebeveyn / vasinin iletişim bilgisi yeterli.</p>
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="parent-name" className="mb-2 block text-xs font-extrabold text-ink">Ebeveyn / vasi adı <span className="text-coral-500">*</span></label>
                            <input id="parent-name" name="parentName" autoComplete="name" required maxLength={80} value={form.parentName} onChange={(event) => update("parentName", event.target.value)} placeholder="Adınız soyadınız" className="h-12 w-full rounded-2xl border border-ink/10 bg-[#fffefa] px-4 text-sm font-semibold text-ink placeholder:text-muted/55 focus:border-mint-500 focus:outline-none focus:ring-4 focus:ring-mint-100" />
                          </div>
                          <div>
                            <label htmlFor="parent-phone" className="mb-2 block text-xs font-extrabold text-ink">Telefon numarası <span className="text-coral-500">*</span></label>
                            <input id="parent-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={20} value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="05xx xxx xx xx" className="h-12 w-full rounded-2xl border border-ink/10 bg-[#fffefa] px-4 text-sm font-semibold text-ink placeholder:text-muted/55 focus:border-mint-500 focus:outline-none focus:ring-4 focus:ring-mint-100" />
                          </div>
                        </div>
                        <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl bg-mint-50 p-3.5 text-[11px] leading-5 text-ink/70">
                          <input type="checkbox" checked={form.consent} onChange={(event) => update("consent", event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#17685f]" />
                          <span>Randevu talebimle ilgili olarak benimle iletişime geçilmesini kabul ediyorum. <span className="text-coral-500">*</span></span>
                        </label>
                        <div className="mt-5 rounded-2xl border border-sunshine-200 bg-sunshine-100/70 p-3.5">
                          <p className="flex items-center gap-2 text-xs font-black text-ink"><Sparkles size={15} className="text-amber-700" /> Minik ziyaret özeti</p>
                          <p className="mt-1.5 text-[10px] leading-5 text-ink/70">{form.childName.trim() || "Minik kahraman"} · {form.age} · {form.character} · {form.date} / {form.time}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div aria-live="polite">
                    {error && <p role="alert" className="mt-4 rounded-xl bg-coral-100 px-3.5 py-2.5 text-xs font-bold text-[#a64f41]">{error}</p>}
                    {submitState.status === "error" && (
                      <p role="alert" className="mt-4 flex items-start gap-2 rounded-xl bg-coral-100 px-3.5 py-2.5 text-xs font-bold text-[#a64f41]">
                        <AlertTriangle size={15} className="mt-0.5 shrink-0" /> {submitState.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-ink/[0.07] pt-5">
                    {step > 1 ? (
                      <button type="button" onClick={goBack} disabled={sending} className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-extrabold text-muted transition hover:bg-mint-50 hover:text-ink disabled:opacity-50"><ArrowLeft size={15} /> Geri dön</button>
                    ) : (
                      <span className="text-[10px] font-bold text-muted/70">* Doldurulması gereken alanlar</span>
                    )}
                    {step < 3 ? (
                      <button type="button" onClick={nextStep} className="inline-flex items-center gap-2 rounded-full bg-mint-800 px-5 py-3 text-xs font-black text-white shadow-[0_4px_0_#0e5149] transition-all hover:-translate-y-0.5 active:translate-y-0 active:shadow-none">Devam et <ArrowRight size={15} strokeWidth={2.5} /></button>
                    ) : (
                      <button type="submit" disabled={sending} className="inline-flex items-center gap-2 rounded-full bg-sunshine-400 px-5 py-3 text-xs font-black text-ink shadow-[0_4px_0_#d9ad45] transition-all hover:-translate-y-0.5 active:translate-y-0 active:shadow-none disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0">
                        {sending ? (
                          <>
                            <LoaderCircle size={15} className="animate-spin" /> Gönderiliyor…
                          </>
                        ) : (
                          <>
                            Randevu isteği oluştur <ArrowRight size={15} strokeWidth={2.5} />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[475px] flex-col items-center justify-center px-2 py-8 text-center">
                <span className="relative grid h-24 w-24 place-items-center rounded-[32px] bg-mint-100 text-mint-800">
                  <span className="absolute -right-2 -top-2 grid h-9 w-9 place-items-center rounded-full bg-sunshine-400 text-amber-800"><Sparkles size={17} /></span>
                  <Check size={42} strokeWidth={2.5} />
                </span>
                <p className="mt-6 text-[10px] font-black uppercase tracking-[0.14em] text-mint-800">Ne güzel bir başlangıç!</p>
                <h3 className="mt-2 max-w-[430px] text-[30px] font-black leading-tight tracking-[-0.05em] text-ink">{form.childName.trim() || "Minik kahraman"}, gülüş macerasına hazır!</h3>

                {submitState.delivered ? (
                  <p className="mt-3 max-w-[390px] text-sm leading-6 text-muted">
                    Randevu isteğiniz kliniğimize ulaştı. Ekibimiz en kısa sürede <b className="text-ink">{siteConfig.contact.phoneDisplay}</b> numarasından veya verdiğiniz numaradan sizinle iletişime geçip kesin saati teyit edecek.
                  </p>
                ) : (
                  <div className="mt-4 max-w-[420px] rounded-2xl bg-coral-100 p-4 text-left">
                    <p className="flex items-center gap-2 text-xs font-black text-[#a64f41]"><AlertTriangle size={15} /> Talebiniz iletilemedi</p>
                    <p className="mt-1.5 text-[11px] leading-5 text-[#8f4437]">
                      Şu anda randevu kaydı alınamıyor. Lütfen aşağıdaki numaradan bizi arayın, randevunuzu hemen planlayalım.
                    </p>
                    <a href={`tel:${siteConfig.contact.phoneHref}`} className="mt-3 inline-flex items-center gap-2 rounded-full bg-mint-800 px-4 py-2.5 text-xs font-black text-white">
                      <Phone size={15} /> {siteConfig.contact.phoneDisplay}
                    </a>
                  </div>
                )}

                {submitState.delivered && submitState.reference && (
                  <p className="mt-4 rounded-full bg-mint-50 px-4 py-2 text-[11px] font-black tracking-[0.08em] text-mint-800">
                    Talep kodu: {submitState.reference}
                  </p>
                )}

                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-sunshine-100 px-4 py-2.5 text-xs font-extrabold text-ink"><span>{characters.find((character) => character.name === form.character)?.emoji}</span>{form.date} · {form.time} için tercih</div>

                {siteConfig.contact.email && (
                  <p className="mt-4 text-[11px] leading-5 text-muted">
                    Dilerseniz <a href={`mailto:${siteConfig.contact.email}`} className="font-black text-mint-800 underline decoration-mint-300 underline-offset-2">{siteConfig.contact.email}</a> adresine de yazabilirsiniz.
                  </p>
                )}

                <button type="button" onClick={resetForm} className="mt-7 inline-flex items-center gap-2 rounded-full bg-mint-800 px-5 py-3 text-xs font-black text-white transition hover:bg-[#12584f]"><Heart size={15} /> Yeni bir randevu planla</button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
