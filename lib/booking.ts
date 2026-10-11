/**
 * Randevu formunun seçenekleri ve doğrulama kuralları.
 * ---------------------------------------------------------------------------
 * Aynı dosya hem tarayıcıda (anında geri bildirim) hem de sunucuda
 * (`app/api/appointments`) kullanılır. Böylece iki taraf hiçbir zaman
 * birbiriyle çelişmez. Sunucu doğrulaması her zaman asıl kaynaktır;
 * tarayıcı doğrulaması yalnızca kullanıcı deneyimi içindir.
 */

export const ages = ["0–2 yaş", "3–5 yaş", "6–8 yaş", "9–12 yaş"] as const;

export type Character = {
  name: string;
  emoji: string;
  /** Tailwind arka plan sınıfı (yalnızca arayüzde kullanılır) */
  color: string;
};

export const characters: readonly Character[] = [
  { name: "Luna", emoji: "🦄", color: "bg-[#f1edff]" },
  { name: "Pati", emoji: "🐻", color: "bg-[#fff0e9]" },
  { name: "Maviş", emoji: "🐳", color: "bg-sky-100" },
  { name: "Roket", emoji: "🚀", color: "bg-sunshine-100" },
];

export const services = [
  "İlk diş hekimi ziyareti",
  "Kontrol / koruyucu bakım",
  "Süt dişi tedavisi",
  "Danışmanlık",
] as const;

export const timeSlots = ["09:30", "10:30", "11:30", "13:30", "14:30", "15:30"] as const;

export const stepNames = ["Minik kahraman", "Randevu planı", "İletişim"] as const;

export type AppointmentPayload = {
  childName: string;
  age: (typeof ages)[number];
  character: string;
  service: (typeof services)[number];
  date: string;
  time: (typeof timeSlots)[number];
  parentName: string;
  phone: string;
  consent: true;
};

export type FormState = {
  childName: string;
  age: string;
  character: string;
  service: string;
  date: string;
  time: string;
  parentName: string;
  phone: string;
  consent: boolean;
};

export const initialForm: FormState = {
  childName: "",
  age: "",
  character: "",
  service: "",
  date: "",
  time: "",
  parentName: "",
  phone: "",
  consent: false,
};

export const FIELD_LIMITS = {
  childName: 60,
  parentName: 80,
  phone: 20,
} as const;

/** Bugünün tarihini yerel saat diliminde `YYYY-MM-DD` olarak döndürür. */
export function todayISO(): string {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}

/** En fazla bir yıl sonrası için tarih sınırı. */
export function maxBookingISO(): string {
  const now = new Date();
  now.setFullYear(now.getFullYear() + 1);
  const offsetMs = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}

/**
 * Telefon numarasını karşılaştırılabilir hâle getirir.
 * `+90 (216) 555 02 02` → `+902165550202`
 */
export function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("90") && digits.length === 12) return `+${digits}`;
  if (digits.startsWith("0") && digits.length === 11) return `+9${digits}`;
  if (digits.startsWith("5") && digits.length === 10) return `+90${digits}`;
  return `+${digits}`;
}

/** Türkiye cep telefonu numarası geçerli mi? (5xx xxx xx xx) */
export function isValidTurkishMobile(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  const national = digits.startsWith("90") ? digits.slice(2) : digits.startsWith("0") ? digits.slice(1) : digits;
  return /^5\d{9}$/.test(national);
}

const AGE_VALUES: readonly string[] = ages;
const SERVICE_VALUES: readonly string[] = services;
const TIME_VALUES: readonly string[] = timeSlots;
const CHARACTER_NAMES: readonly string[] = characters.map((character) => character.name);

function asTrimmedString(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function isISODate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00`);
  return !Number.isNaN(parsed.getTime());
}

export type ValidationResult =
  | { ok: true; data: AppointmentPayload }
  | { ok: false; errors: string[] };

/**
 * Gelen ham veriyi doğrular ve temizler. Sunucu tarafında mutlaka çağrılır.
 */
export function parseAppointment(input: unknown): ValidationResult {
  const errors: string[] = [];

  if (typeof input !== "object" || input === null) {
    return { ok: false, errors: ["Gönderilen veri okunamadı."] };
  }

  const source = input as Record<string, unknown>;

  const childName = asTrimmedString(source.childName, FIELD_LIMITS.childName);
  const parentName = asTrimmedString(source.parentName, FIELD_LIMITS.parentName);
  const phone = asTrimmedString(source.phone, FIELD_LIMITS.phone);
  const age = asTrimmedString(source.age, 20);
  const character = asTrimmedString(source.character, 20);
  const service = asTrimmedString(source.service, 60);
  const date = asTrimmedString(source.date, 10);
  const time = asTrimmedString(source.time, 5);
  const consent = source.consent === true;

  if (!AGE_VALUES.includes(age)) errors.push("Yaş aralığı seçilmedi.");
  if (!CHARACTER_NAMES.includes(character)) errors.push("Randevu arkadaşı seçilmedi.");
  if (!SERVICE_VALUES.includes(service)) errors.push("Ziyaret nedeni seçilmedi.");
  if (!TIME_VALUES.includes(time)) errors.push("Saat tercihi seçilmedi.");

  if (!isISODate(date)) {
    errors.push("Geçerli bir tarih seçilmedi.");
  } else if (date < todayISO()) {
    errors.push("Geçmiş bir tarih için randevu istenemez.");
  } else if (date > maxBookingISO()) {
    errors.push("En fazla bir yıl sonrası için randevu istenebilir.");
  }

  if (parentName.length < 2) errors.push("Ebeveyn / vasi adı gerekli.");
  if (!isValidTurkishMobile(phone)) errors.push("Geçerli bir cep telefonu numarası girin. (5xx xxx xx xx)");
  if (!consent) errors.push("İletişim onayı işaretlenmeli.");

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      childName,
      age: age as AppointmentPayload["age"],
      character,
      service: service as AppointmentPayload["service"],
      date,
      time: time as AppointmentPayload["time"],
      parentName,
      phone: normalizePhone(phone),
      consent: true,
    },
  };
}

/** Randevu talebi için kısa, insan tarafından okunabilir referans kodu. */
export function createReference(): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const random = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `MD-${stamp}${random}`;
}
