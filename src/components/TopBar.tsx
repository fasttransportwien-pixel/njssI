'use client';

import { useEffect, useState } from 'react';
import { Check, Copy, Tag } from 'lucide-react';

const DISCOUNT_CODE = 'FTW20';

/**
 * Rolling 2-day countdown.
 * Uses (now mod 2 days) so the timer NEVER expires – it restarts automatically
 * every 48 hours.
 */
const CYCLE_MS = 2 * 24 * 60 * 60 * 1000; // 2 days
function computeRemaining(): { d: number; h: number; m: number; s: number } {
  const elapsed = Date.now() % CYCLE_MS;
  let diff = CYCLE_MS - elapsed;
  const d = Math.floor(diff / 86_400_000); diff -= d * 86_400_000;
  const h = Math.floor(diff / 3_600_000);  diff -= h * 3_600_000;
  const m = Math.floor(diff / 60_000);     diff -= m * 60_000;
  const s = Math.floor(diff / 1000);
  return { d, h, m, s };
}

export function TopBar() {
  // Initial state computed eagerly so that values are real on first paint
  // (a tiny SSR/client mismatch is acceptable here — suppressHydrationWarning).
  const [t, setT] = useState(() => computeRemaining());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Sync to current time as soon as we hydrate
    setT(computeRemaining());
    const id = setInterval(() => setT(computeRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(DISCOUNT_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = DISCOUNT_CODE;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {}
      document.body.removeChild(ta);
    }
  }

  return (
    <div className="relative z-40 border-b border-white/5 bg-navy-950 text-white">
      {/* Subtle gold edges (top hairline + bottom glow) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

      <div className="container-page flex flex-col items-center justify-between gap-2 py-2 text-[12px] sm:flex-row sm:py-2.5 sm:text-[13px]">
        <div className="flex items-center gap-2">
          <Tag className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
          <span className="font-semibold tracking-[0.01em] text-white/90">
            <span className="font-extrabold text-gold-300">20% Rabatt</span>
            <span className="text-white/55"> — nur für kurze Zeit</span>
          </span>
        </div>

        <div className="flex items-center gap-3" suppressHydrationWarning>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45 sm:inline">
            Aktion endet in
          </span>

          <div className="flex items-center gap-1.5">
            <Cell value={t.d} label="Tage" />
            <Sep />
            <Cell value={t.h} label="Std" />
            <Sep />
            <Cell value={t.m} label="Min" />
            <Sep />
            <Cell value={t.s} label="Sek" />
          </div>

          <div className="ml-1 hidden items-center gap-2 sm:flex">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">Code</span>
            <span className="rounded-md border border-dashed border-gold-500/60 bg-gold-500/5 px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider text-gold-200">
              {DISCOUNT_CODE}
            </span>
          </div>

          <button
            onClick={copyCode}
            className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-br from-gold-400 to-gold-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-navy-900 shadow-sm shadow-gold-500/30 transition hover:from-gold-300 hover:to-gold-500"
            aria-label="Rabattcode kopieren"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Kopiert' : 'Kopieren'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Cell({ value, label }: { value: number; label: string }) {
  return (
    <span className="flex flex-col items-center leading-none">
      <span
        suppressHydrationWarning
        className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[12px] font-extrabold tabular-nums text-white"
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-wider text-white/45">{label}</span>
    </span>
  );
}

function Sep() {
  return <span aria-hidden="true" className="text-gold-500/50">:</span>;
}
