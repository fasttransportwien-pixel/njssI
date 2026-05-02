/**
 * Backend pricing engine. ALL discount logic is here (and only here).
 * Frontend receives only subtotal / discount / total — never the rules.
 *
 * All amounts are CENTS (integer). Listed prices are GROSS (incl. 20% VAT).
 */

export interface PricingInput {
  numAddresses: number;
  weightKg?: number;
  isExpress?: boolean;
  isCooling?: boolean;
  discountCode?: string | null;
}

export interface PricingBreakdown {
  numAddresses: number;
  vatRate: number;
  baseGrossCents: number;
  surchargeGrossCents: number;
  subtotalGrossCents: number;
  discountCents: number;
  appliedDiscountCode: string | null;
  totalGrossCents: number;
  totalNetCents: number;
  totalVatCents: number;
}

export interface PublicPricingSummary {
  subtotalGrossCents: number;
  discountCents: number;
  totalGrossCents: number;
  totalNetCents: number;
  totalVatCents: number;
  vatRate: number;
  numAddresses: number;
  appliedDiscount: boolean;
  discountCodeAccepted: boolean;
}

const num = (v: string | undefined, fallback: number): number =>
  v && !Number.isNaN(parseFloat(v)) ? parseFloat(v) : fallback;

export function getPricingConfig() {
  return {
    perAddressGrossCents: Math.round(num(process.env.PRICE_PER_ADDRESS_GROSS, 25) * 100),
    discountedPerAddressGrossCents: Math.round(num(process.env.PRICE_DISCOUNT_PER_ADDRESS_GROSS, 20) * 100),
    surchargeOver10kgGrossCents: Math.round(num(process.env.SURCHARGE_OVER_10KG_GROSS, 10) * 100),
    surchargeExpressGrossCents: Math.round(num(process.env.SURCHARGE_EXPRESS_GROSS, 15) * 100),
    surchargeCoolingGrossCents: Math.round(num(process.env.SURCHARGE_COOLING_GROSS, 20) * 100),
    minOrderGrossCents: Math.round(num(process.env.MIN_ORDER_GROSS, 25) * 100),
    discountCode: (process.env.DISCOUNT_CODE || 'FTW20').toUpperCase(),
    discountMaxGrossCents: Math.round(num(process.env.DISCOUNT_MAX_GROSS, 100) * 100),
    vatRate: num(process.env.VAT_RATE, 0.2),
  };
}

export function computePricing(input: PricingInput): PricingBreakdown {
  const cfg = getPricingConfig();
  const numAddresses = Math.max(0, Math.floor(input.numAddresses || 0));

  const baseGrossCents = numAddresses * cfg.perAddressGrossCents;

  let surchargeGrossCents = 0;
  if ((input.weightKg || 0) > 10) surchargeGrossCents += cfg.surchargeOver10kgGrossCents;
  if (input.isExpress) surchargeGrossCents += cfg.surchargeExpressGrossCents;
  if (input.isCooling) surchargeGrossCents += cfg.surchargeCoolingGrossCents;

  const subtotalGrossCents = baseGrossCents + surchargeGrossCents;

  // ---- Discount ----
  let discountCents = 0;
  let appliedDiscountCode: string | null = null;
  const code = (input.discountCode || '').trim().toUpperCase();
  if (code === cfg.discountCode && numAddresses > 0) {
    const discountedBase = numAddresses * cfg.discountedPerAddressGrossCents;
    const raw = baseGrossCents - discountedBase;
    discountCents = Math.max(0, Math.min(raw, cfg.discountMaxGrossCents));
    if (discountCents > 0) appliedDiscountCode = cfg.discountCode;
  }

  // ---- Apply discount + min-order floor ----
  let totalGrossCents = subtotalGrossCents - discountCents;
  if (totalGrossCents < cfg.minOrderGrossCents) {
    const overshoot = cfg.minOrderGrossCents - totalGrossCents;
    discountCents = Math.max(0, discountCents - overshoot);
    totalGrossCents = subtotalGrossCents - discountCents;
    if (totalGrossCents < cfg.minOrderGrossCents) totalGrossCents = cfg.minOrderGrossCents;
  }

  const totalNetCents = Math.round(totalGrossCents / (1 + cfg.vatRate));
  const totalVatCents = totalGrossCents - totalNetCents;

  return {
    numAddresses,
    vatRate: cfg.vatRate,
    baseGrossCents,
    surchargeGrossCents,
    subtotalGrossCents,
    discountCents,
    appliedDiscountCode,
    totalGrossCents,
    totalNetCents,
    totalVatCents,
  };
}

export function toPublicSummary(p: PricingBreakdown, codeAttempted: boolean): PublicPricingSummary {
  return {
    subtotalGrossCents: p.subtotalGrossCents,
    discountCents: p.discountCents,
    totalGrossCents: p.totalGrossCents,
    totalNetCents: p.totalNetCents,
    totalVatCents: p.totalVatCents,
    vatRate: p.vatRate,
    numAddresses: p.numAddresses,
    appliedDiscount: p.discountCents > 0,
    discountCodeAccepted: codeAttempted ? p.discountCents > 0 : false,
  };
}
