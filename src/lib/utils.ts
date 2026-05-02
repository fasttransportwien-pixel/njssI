import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEuroCents(cents: number, locale: string = 'de-AT'): string {
  const value = (cents || 0) / 100;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(date: Date | string, locale: string = 'de-AT'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
}

export const SERVICE_LABELS: Record<string, string> = {
  PACKAGE: 'Pakete & Sendungen',
  FLOWERS: 'Blumenlieferung',
  DOCUMENTS: 'Dokumente',
  MAGAZINES: 'Magazine & Zeitungen',
  STORE_PICKUP: 'Bestellungen aus Geschäften',
  EXPRESS: 'Express Lieferung',
  COOLING: 'Kühltransport',
  BUSINESS: 'Firmenkunden & Daueraufträge',
};

export const STATUS_LABELS: Record<string, string> = {
  RECEIVED: 'Eingegangen',
  IN_REVIEW: 'In Prüfung',
  CONFIRMED: 'Bestätigt',
  IN_PROGRESS: 'In Bearbeitung',
  DELIVERED: 'Zugestellt',
  CANCELLED: 'Storniert',
};
