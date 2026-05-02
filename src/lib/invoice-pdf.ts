/**
 * Invoice PDF generator using pdf-lib (pure JS, works on Vercel runtime).
 */
import { PDFDocument, StandardFonts, rgb, type PDFPage, type PDFFont } from 'pdf-lib';
import { formatEuroCents } from './utils';

const BRAND_GREEN = rgb(34 / 255, 160 / 255, 90 / 255);
const TEXT_DARK = rgb(0.12, 0.14, 0.18);
const TEXT_MUTED = rgb(0.36, 0.41, 0.47);
const RULE = rgb(0.85, 0.87, 0.9);

export interface InvoiceData {
  invoiceNumber: string;
  issuedAt: Date;
  dueDays: number;
  customer: { name: string; addressLines: string[] };
  company: { name: string; addressLines: string[]; phone: string; email: string; uid: string; iban: string };
  items: { label: string; grossCents: number }[];
  netCents: number;
  vatCents: number;
  grossCents: number;
}

export async function buildInvoicePdf(d: InvoiceData): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`Rechnung ${d.invoiceNumber}`);
  pdf.setAuthor(d.company.name);
  pdf.setProducer('Fast Transport Wien E.U.');

  const page = pdf.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();
  const margin = 50;

  const helv = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  let y = height - margin;

  // Header "Rechnung"
  page.drawText('Rechnung', { x: margin, y: y - 24, size: 28, font: bold, color: TEXT_DARK });
  page.drawRectangle({ x: margin, y: y - 32, width: width - margin * 2, height: 2, color: BRAND_GREEN });
  y -= 60;

  // Logo + Company block
  drawFtwLogo(page, bold, margin, y - 80, 80);
  const compRightX = width - margin;
  let cy = y - 16;
  drawRight(page, bold, d.company.name, compRightX, cy, 11, TEXT_DARK);
  cy -= 14;
  for (const line of d.company.addressLines) { drawRight(page, helv, line, compRightX, cy, 10, TEXT_MUTED); cy -= 13; }
  drawRight(page, helv, `Tel: ${d.company.phone}`, compRightX, cy, 10, TEXT_MUTED); cy -= 13;
  drawRight(page, helv, `Email: ${d.company.email}`, compRightX, cy, 10, TEXT_MUTED); cy -= 13;
  drawRight(page, helv, `UID: ${d.company.uid}`, compRightX, cy, 10, TEXT_MUTED); cy -= 13;
  drawRight(page, helv, `IBAN: ${d.company.iban}`, compRightX, cy, 10, TEXT_MUTED);

  y = Math.min(y - 110, cy - 10);
  page.drawLine({ start: { x: margin, y }, end: { x: width - margin, y }, thickness: 1, color: RULE });
  y -= 24;

  // Meta
  page.drawText(`Rechnungsnummer: ${d.invoiceNumber}`, { x: margin, y, size: 11, font: helv, color: TEXT_DARK }); y -= 16;
  page.drawText(`Rechnungsdatum: ${formatDateDe(d.issuedAt)}`, { x: margin, y, size: 11, font: helv, color: TEXT_DARK }); y -= 24;

  page.drawLine({ start: { x: margin, y }, end: { x: width - margin, y }, thickness: 1, color: RULE });
  y -= 24;

  // Customer
  page.drawText(`Kunde: ${d.customer.name}`, { x: margin, y, size: 11, font: bold, color: TEXT_DARK }); y -= 16;
  for (const line of d.customer.addressLines) {
    page.drawText(line, { x: margin, y, size: 11, font: helv, color: TEXT_DARK }); y -= 14;
  }
  y -= 18;

  // Items
  page.drawText('Leistungsbeschreibung:', { x: margin, y, size: 11, font: bold, color: TEXT_DARK }); y -= 18;
  for (const item of d.items) {
    page.drawText(`- ${item.label}`, { x: margin, y, size: 11, font: helv, color: TEXT_DARK });
    drawRight(page, helv, formatEuroCents(item.grossCents), width - margin, y, 11, TEXT_DARK);
    y -= 16;
  }
  y -= 12;

  // Totals
  drawTotalRow(page, bold, margin, width - margin, y, 'Netto-Betrag', formatEuroCents(d.netCents), false); y -= 18;
  drawTotalRow(page, bold, margin, width - margin, y, 'MWSt (20 %)', formatEuroCents(d.vatCents), false); y -= 22;
  drawTotalRow(page, bold, margin, width - margin, y, 'Gesamtbetrag (inkl. MwSt)', formatEuroCents(d.grossCents), true); y -= 32;

  page.drawLine({ start: { x: margin, y }, end: { x: width - margin, y }, thickness: 1, color: RULE });
  y -= 24;

  page.drawText(`Zahlbar innerhalb von ${d.dueDays} Tagen ohne Abzug.`, { x: margin, y, size: 11, font: helv, color: TEXT_DARK }); y -= 28;
  page.drawText('Mit freundlichen Grüßen', { x: margin, y, size: 11, font: helv, color: TEXT_DARK }); y -= 24;
  page.drawText(d.company.name, { x: margin, y, size: 11, font: helv, color: TEXT_DARK });

  return await pdf.save();
}

function drawRight(page: PDFPage, font: PDFFont, text: string, x: number, y: number, size: number, color: ReturnType<typeof rgb>) {
  const w = font.widthOfTextAtSize(text, size);
  page.drawText(text, { x: x - w, y, size, font, color });
}

function drawTotalRow(page: PDFPage, bold: PDFFont, xLeft: number, xRight: number, y: number, label: string, value: string, emphasize: boolean) {
  page.drawText(label + ':', { x: xLeft, y, size: emphasize ? 12 : 11, font: bold, color: TEXT_DARK });
  drawRight(page, bold, value, xRight, y, emphasize ? 14 : 11, emphasize ? BRAND_GREEN : TEXT_DARK);
}

function drawFtwLogo(page: PDFPage, font: PDFFont, x: number, y: number, size: number) {
  const cx = x + size / 2;
  const cy = y + size / 2;
  const r = size / 2;
  page.drawCircle({ x: cx, y: cy, size: r, borderColor: TEXT_DARK, borderWidth: 3 });
  const shaftY = cy + r * 0.05;
  page.drawLine({ start: { x: cx - r * 0.35, y: shaftY }, end: { x: cx + r * 0.4, y: shaftY }, thickness: 3, color: TEXT_DARK });
  page.drawLine({ start: { x: cx + r * 0.25, y: shaftY + r * 0.15 }, end: { x: cx + r * 0.4, y: shaftY }, thickness: 3, color: TEXT_DARK });
  page.drawLine({ start: { x: cx + r * 0.25, y: shaftY - r * 0.15 }, end: { x: cx + r * 0.4, y: shaftY }, thickness: 3, color: TEXT_DARK });
  const label = 'FTW';
  const labelSize = r * 0.45;
  const w = font.widthOfTextAtSize(label, labelSize);
  page.drawText(label, { x: cx - w / 2, y: cy - r * 0.65, size: labelSize, font, color: TEXT_DARK });
}

function formatDateDe(d: Date): string {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${d.getFullYear()}`;
}
