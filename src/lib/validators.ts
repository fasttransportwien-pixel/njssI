import { z } from 'zod';

export const SERVICE_TYPES = [
  'PACKAGE',
  'FLOWERS',
  'DOCUMENTS',
  'MAGAZINES',
  'STORE_PICKUP',
  'EXPRESS',
  'COOLING',
  'BUSINESS',
] as const;

export const ORDER_STATUSES = [
  'RECEIVED',
  'IN_REVIEW',
  'CONFIRMED',
  'IN_PROGRESS',
  'DELIVERED',
  'CANCELLED',
] as const;

export const orderStopSchema = z.object({
  address: z.string().min(3),
  lat: z.number().nullable().optional(),
  lng: z.number().nullable().optional(),
  contact: z.string().nullable().optional(),
});

export const createOrderSchema = z.object({
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(4),
  customerCompany: z.string().nullable().optional(),

  serviceType: z.enum(SERVICE_TYPES),
  goodsType: z.string().nullable().optional(),
  weightKg: z.coerce.number().min(0).max(10000).nullable().optional(),
  isExpress: z.boolean().optional().default(false),
  isCooling: z.boolean().optional().default(false),

  pickupAddress: z.string().min(3),
  pickupLat: z.number().nullable().optional(),
  pickupLng: z.number().nullable().optional(),
  scheduledDate: z.string().min(1),
  scheduledTime: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),

  stops: z.array(orderStopSchema).min(1).max(50),
  discountCode: z.string().nullable().optional(),
  acceptedTerms: z.literal(true),
  acceptedPrivacy: z.literal(true),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export const pricingInputSchema = z.object({
  numAddresses: z.coerce.number().min(0).max(50),
  weightKg: z.coerce.number().min(0).max(10000).nullable().optional(),
  isExpress: z.boolean().optional().default(false),
  isCooling: z.boolean().optional().default(false),
  discountCode: z.string().nullable().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5).max(5000),
});

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const adminPatchSchema = z.object({
  status: z.enum(ORDER_STATUSES).optional(),
  adminPriceGrossEuros: z.number().min(0).max(100000).optional(),
  adminNote: z.string().nullable().optional(),
});
