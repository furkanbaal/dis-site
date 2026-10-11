import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { createReference, parseAppointment, type AppointmentPayload } from "@/lib/booking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Aynı IP'den 10 dakikada en fazla 5 talep kabul edilir. */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(key) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  requestLog.set(key, recent);

  // Bellek şişmesini önlemek için eski kayıtları temizle.
  if (requestLog.size > 5_000) {
    for (const [entryKey, times] of requestLog) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) requestLog.delete(entryKey);
    }
  }

  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

type AppointmentRecord = AppointmentPayload & {
  reference: string;
  receivedAt: string;
  source: string;
};

/**
 * Talebi sunucudaki yerel günlük dosyasına ekler.
 * Sunucusuz (serverless) ortamlarda dosya sistemi salt okunur olduğu için
 * sessizce atlanır; kalıcı kayıt için APPOINTMENT_WEBHOOK_URL kullanın.
 */
async function persistLocally(record: AppointmentRecord): Promise<boolean> {
  if (process.env.VERCEL) return false;
  try {
    const directory = path.join(process.cwd(), "data");
    await mkdir(directory, { recursive: true });
    await appendFile(
      path.join(directory, "appointments.ndjson"),
      `${JSON.stringify(record)}\n`,
      "utf8",
    );
    return true;
  } catch (error) {
    console.error("[randevu] Yerel kayıt başarısız:", error);
    return false;
  }
}

/**
 * Talebi yapılandırılmış bir webhook'a (Slack, Zapier, n8n, kendi API'niz…)
 * iletir. APPOINTMENT_WEBHOOK_URL tanımlı değilse atlanır.
 */
async function forwardToWebhook(record: AppointmentRecord): Promise<boolean> {
  const endpoint = process.env.APPOINTMENT_WEBHOOK_URL?.trim();
  if (!endpoint) return false;
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) {
      console.error("[randevu] Webhook yanıtı başarısız:", response.status);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[randevu] Webhook iletimi başarısız:", error);
    return false;
  }
}

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const clientKey = forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "bilinmiyor";

  if (isRateLimited(clientKey)) {
    return NextResponse.json(
      { ok: false, message: "Çok fazla talep gönderildi. Lütfen birkaç dakika sonra tekrar deneyin." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Gönderilen veri okunamadı." },
      { status: 400 },
    );
  }

  // Bot tuzağı (honeypot): gerçek kullanıcılar bu alanı hiç doldurmaz.
  if (typeof body === "object" && body !== null && (body as Record<string, unknown>).website) {
    return NextResponse.json({ ok: true, reference: createReference() });
  }

  const parsed = parseAppointment(body);
  if (!parsed.ok) {
    return NextResponse.json(
      { ok: false, message: parsed.errors[0] ?? "Form bilgileri eksik.", errors: parsed.errors },
      { status: 422 },
    );
  }

  const record: AppointmentRecord = {
    ...parsed.data,
    reference: createReference(),
    receivedAt: new Date().toISOString(),
    source: "minik-dis-web",
  };

  console.info("[randevu] Yeni talep:", {
    reference: record.reference,
    date: record.date,
    time: record.time,
    service: record.service,
  });

  const [stored, forwarded] = await Promise.all([
    persistLocally(record),
    forwardToWebhook(record),
  ]);

  return NextResponse.json({
    ok: true,
    reference: record.reference,
    stored,
    forwarded,
    message: "Randevu talebiniz alındı.",
  });
}
