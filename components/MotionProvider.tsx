"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/**
 * İşletim sisteminde "hareketi azalt" ayarı açık olan ziyaretçiler için
 * tüm animasyonları otomatik olarak sadeleştirir. Tek yerden yönetilir;
 * bileşenlerin tek tek `useReducedMotion` kullanmasına gerek kalmaz.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
