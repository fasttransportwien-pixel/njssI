import { Logo } from './Logo';
import { Star, ShieldCheck, Clock, Headphones } from 'lucide-react';

/**
 * Hero right-side panel.
 *
 * INTENTIONALLY no illustrated vehicle / AI-style image — a clean premium
 * credentials card that conveys trust through typography, brand identity
 * and clear value props. Real photos can be added later by replacing this
 * component with a <Image src="/hero/your-photo.jpg" />.
 */
export function HeroPanel() {
  return (
    <div className="relative">
      {/* Soft gold glow behind the card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 50%, rgba(229,201,125,0.25), transparent 70%)',
        }}
      />

      {/* Floating gold "Premium" ribbon, top-right */}
      <div className="absolute -right-3 -top-3 z-20 rotate-3 rounded-xl bg-gradient-to-br from-gold-300 to-gold-600 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-navy-900 shadow-lg">
        ★ Premium Service
      </div>

      {/* Floating navy badge bottom-left */}
      <div className="absolute -bottom-3 -left-3 z-20 -rotate-2 rounded-xl border border-white/10 bg-navy-950 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-300 shadow-lg">
        Wien · Europa
      </div>

      {/* Main credentials card */}
      <div className="relative overflow-hidden rounded-3xl bg-white p-8 text-navy-900 shadow-2xl ring-1 ring-gold-500/10 md:p-10">
        {/* Top gold band */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-700" />

        {/* Inner luxurious gold hairline frame */}
        <div className="pointer-events-none absolute inset-3 rounded-[1.4rem] ring-1 ring-gold-500/15" />

        {/* Subtle dot pattern background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'radial-gradient(#0b1929 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />

        {/* Decorative gold corner ornaments */}
        <svg aria-hidden className="pointer-events-none absolute right-5 top-5 h-6 w-6 text-gold-500/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 8 V2 H8" strokeLinecap="round" />
        </svg>
        <svg aria-hidden className="pointer-events-none absolute bottom-5 left-5 h-6 w-6 text-gold-500/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 16 V22 H16" strokeLinecap="round" />
        </svg>

        <div className="relative">
          {/* Logo prominent */}
          <div className="flex items-center gap-3">
            <Logo size="lg" />
          </div>

          <div className="gold-line mt-6" />

          {/* Credential rows */}
          <ul className="mt-6 grid gap-4">
            <Row
              icon={<Clock className="h-5 w-5 text-gold-600" />}
              title="Express in unter 90 Minuten"
              sub="Pünktlich ans Ziel – ohne Umwege."
            />
            <Row
              icon={<ShieldCheck className="h-5 w-5 text-gold-600" />}
              title="Versichert & geprüft"
              sub="Jede Sendung in sicheren Händen."
            />
            <Row
              icon={<Headphones className="h-5 w-5 text-gold-600" />}
              title="24/7 erreichbar"
              sub="Direkt mit dem Inhaber – kein Callcenter."
            />
          </ul>

          {/* Footer rating */}
          <div className="mt-7 flex items-center justify-between rounded-2xl bg-ink-50 px-4 py-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
              ))}
              <span className="ml-2 text-sm font-bold text-navy-900">Top bewertet</span>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-500">in Wien</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold-100 to-gold-50 ring-1 ring-gold-200">
        {icon}
      </span>
      <span>
        <span className="block text-sm font-bold text-navy-900">{title}</span>
        <span className="block text-xs text-ink-500">{sub}</span>
      </span>
    </li>
  );
}
