import Link from 'next/link';
import { ArrowRight, Star, ShieldCheck, Clock, Tag } from 'lucide-react';
import { HeroPanel } from '@/components/HeroPanel';
import { FeatureGrid } from '@/components/FeatureGrid';
import { AboutBlock } from '@/components/AboutBlock';
import { StatsBlock } from '@/components/StatsBlock';
import { ClientLogos } from '@/components/ClientLogos';
import { ServiceCard } from '@/components/ServiceCard';

const SERVICE_KINDS = ['PACKAGE', 'FLOWERS', 'DOCUMENTS', 'EXPRESS', 'COOLING', 'BUSINESS'];

const REVIEWS = [
  { quote: 'Top zuverlässig, immer pünktlich und sehr persönlich. Wir lassen alle unsere Magazine über Fast Transport Wien zustellen.', name: 'Media for Med Magazine Service GmbH' },
  { quote: 'Kurzfristig angefragt, eine Stunde später war das Paket beim Kunden. Genau das, was wir brauchten.', name: 'Sara Köhler', role: 'Boutique-Inhaberin' },
  { quote: 'Schnelle Kommunikation, faire Preise, professionelle Abwicklung – uneingeschränkt empfehlenswert.', name: 'Markus Weber', role: 'Eventagentur' },
];

const FAQ = [
  { q: 'Wie schnell könnt ihr liefern?', a: 'Standard-Lieferungen am selben Tag in Wien. Express in der Regel innerhalb von 90 Minuten nach Bestätigung.' },
  { q: 'Welche Zahlungsarten werden akzeptiert?', a: 'Rechnung mit IBAN-Überweisung. Firmenkunden bekommen eine PDF-Rechnung.' },
  { q: 'Liefert ihr auch außerhalb Wiens?', a: 'Ja – europaweite Direktfahrten auf Anfrage. Bitte kontaktieren Sie uns für ein individuelles Angebot.' },
  { q: 'Sind die Sendungen versichert?', a: 'Ja, jede Sendung ist standardmäßig versichert.' },
];

export default function HomePage() {
  return (
    <>
      {/* ====================== CINEMATIC HERO ====================== */}
      <section className="bg-navy-pattern relative overflow-hidden text-white">
        {/* Decorative gold radial glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0"
          style={{
            background:
              'radial-gradient(60% 70% at 85% 15%, rgba(229,201,125,0.18), transparent 60%), radial-gradient(50% 60% at 10% 90%, rgba(20,39,59,0.6), transparent 70%)',
          }}
        />
        {/* Top gradient gold accent line */}
        <div className="absolute inset-x-0 top-0 z-10 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

        <div className="container-page relative z-10 grid gap-10 py-16 md:grid-cols-2 md:items-center md:gap-12 md:py-24 lg:gap-16">
          {/* LEFT: Headline + CTAs */}
          <div className="flex flex-col">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-gold-500/40 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-300 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Wien · Express · Europa
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight md:text-[64px]">
              Schnell.<br />
              Sicher.<br />
              <span className="gold-text">Zuverlässig.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
              Ihr Partner für Express-Transporte in Wien und ganz Europa.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/auftrag" className="btn-primary">
                Anfrage senden <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/ueber-uns"
                className="inline-flex items-center justify-center gap-2 rounded-[0.6rem] border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-white/60 hover:bg-white/10"
              >
                Mehr erfahren
              </Link>
            </div>

            {/* Trust strip */}
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 text-sm text-white/80 sm:grid-cols-3">
              <TrustItem icon={<Clock className="h-4 w-4 text-gold-400" />} title="Pünktlich ans Ziel" sub="Ohne Umwege." />
              <TrustItem icon={<ShieldCheck className="h-4 w-4 text-gold-400" />} title="Sicher & versichert" sub="Ihre Ware in besten Händen." />
              <TrustItem icon={<Star className="h-4 w-4 fill-gold-400 text-gold-400" />} title="Direkt & persönlich" sub="Bei uns kein Callcenter." />
            </div>
          </div>

          {/* RIGHT: Premium credentials panel (no AI-style illustrations) */}
          <div className="relative">
            <HeroPanel />
          </div>
        </div>
      </section>

      {/* ====================== FEATURE GRID ====================== */}
      <FeatureGrid />

      {/* ====================== ABOUT + STATS (combined for visual rhythm) ====================== */}
      <section className="bg-ink-50/50 py-20">
        <div className="container-page grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="section-eyebrow">Über uns</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy-900 md:text-4xl">
              Mehr als Lieferung – ein <span className="gold-text">Premium Service.</span>
            </h2>
            <div className="gold-divider mt-5" />
            <p className="mt-5 text-base leading-relaxed text-ink-600 md:text-lg">
              Fast Transport Wien steht für professionelle Express-Transporte, höchste
              Zuverlässigkeit und persönlichen Service.
            </p>
            <div className="mt-7">
              <Link href="/ueber-uns" className="btn-dark text-sm">
                Mehr über uns <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { value: '1000+', label: 'Zufriedene Kunden' },
              { value: '5000+', label: 'Erfolgreiche Lieferungen' },
              { value: 'Top',   label: 'bewertet in Wien' },
            ].map((s) => (
              <div key={s.label} className="card-feature flex flex-col items-center text-center">
                <div className="text-3xl font-extrabold tracking-tight text-navy-900">{s.value}</div>
                <div className="mt-1 text-xs font-semibold text-ink-600">{s.label}</div>
                <div className="gold-divider mt-3" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== SERVICES ====================== */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Leistungen</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 md:text-4xl">
              Was wir für Sie liefern
            </h2>
            <div className="gold-divider mx-auto mt-4" />
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_KINDS.map((k) => <ServiceCard key={k} kind={k} />)}
          </div>
        </div>
      </section>

      {/* ====================== REVIEWS ====================== */}
      <section className="bg-ink-50/50 py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Kundenstimmen</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-900 md:text-4xl">
              Was unsere Kunden sagen
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <figure key={i} className="card-feature">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-ink-700">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4">
                  <div className="text-sm font-bold text-navy-900">{r.name}</div>
                  {r.role && <div className="text-xs text-ink-500">{r.role}</div>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== FAQ ====================== */}
      <section className="bg-white py-20">
        <div className="container-page mx-auto max-w-3xl">
          <div className="text-center">
            <span className="section-eyebrow">FAQ</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-900 md:text-4xl">
              Häufig gestellte Fragen
            </h2>
          </div>
          <div className="mt-8 space-y-3">
            {FAQ.map((f, i) => (
              <details key={i} className="card group p-5 open:shadow-md">
                <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-navy-900">
                  {f.q}
                  <span className="text-gold-600 transition group-open:rotate-45">＋</span>
                </summary>
                <p className="mt-3 text-sm text-ink-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== CTA ====================== */}
      <section className="container-page py-20">
        <div className="bg-navy-pattern relative overflow-hidden rounded-3xl p-10 text-white md:p-14">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-gold-300 via-gold-500 to-gold-700" />
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-extrabold md:text-4xl">Bereit für Ihre erste Lieferung?</h2>
              <p className="mt-3 max-w-xl text-white/70">
                Anfrage in unter 2 Minuten – Live-Preis sofort sichtbar.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Link href="/auftrag" className="btn-primary text-base">
                Anfrage senden <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== CLIENT LOGOS ====================== */}
      <ClientLogos />
    </>
  );
}

function TrustItem({ icon, title, sub }: { icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5 flex-shrink-0">{icon}</div>
      <div>
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="text-xs text-white/60">{sub}</div>
      </div>
    </div>
  );
}
