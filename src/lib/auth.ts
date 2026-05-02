/**
 * Lightweight admin auth – no external deps.
 * - Login compares against ADMIN_EMAIL / ADMIN_PASSWORD env vars.
 * - Session is a HMAC-SHA256-signed cookie (timestamp.signature).
 * - No database row required for the admin.
 */
import { cookies } from 'next/headers';
import crypto from 'crypto';

export const ADMIN_COOKIE = 'ftw_admin';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecret(): string {
  return process.env.ADMIN_SECRET || 'dev-only-insecure-secret-change-me';
}

function sign(value: string): string {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('hex');
}

export function createSessionToken(): string {
  const ts = Date.now().toString();
  return `${ts}.${sign(ts)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [value, sig] = parts;
  // Compare HMAC in constant time
  const expected = sign(value);
  if (sig.length !== expected.length) return false;
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  const ts = parseInt(value, 10);
  if (!Number.isFinite(ts)) return false;
  const age = Date.now() - ts;
  if (age < 0 || age > SESSION_TTL_MS) return false;
  return true;
}

export async function isAdmin(): Promise<boolean> {
  try {
    const c = cookies().get(ADMIN_COOKIE);
    return verifySessionToken(c?.value);
  } catch {
    return false;
  }
}

export function checkCredentials(email: string, password: string): boolean {
  const ee = process.env.ADMIN_EMAIL;
  const ep = process.env.ADMIN_PASSWORD;
  if (!ee || !ep) return false;
  // Constant-time compare to be safe
  const a = Buffer.from(email);
  const b = Buffer.from(ee);
  const c = Buffer.from(password);
  const d = Buffer.from(ep);
  if (a.length !== b.length || c.length !== d.length) return false;
  return crypto.timingSafeEqual(a, b) && crypto.timingSafeEqual(c, d);
}

export function adminCookieOptions() {
  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
    path: '/',
  };
}
