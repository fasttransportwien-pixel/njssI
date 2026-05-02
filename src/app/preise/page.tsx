import Link from 'next/link';
import { Check, ArrowRight, Tag } from 'lucide-react';

export const metadata = {
  title: 'Preise – Fast Transport Wien',
  description:
    'Transparente Festpreise für Kurier, Express, Kühltransport und Firmenkunden in Wien.',
};

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10 opacity-60" />
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-eyebrow">Preise</span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-navy-900 md:text-5xl">
              Klar. Fair. <span className="gold-text">Premium.</span>
            </h1>
            <div className="gold-divider mx-auto mt-5" />
            <p className="mt-6 text-base leading-relaxed text-ink-600 md:text-lg">
              Festpreise pro Lieferadresse – keine versteckten Kosten. Den genauen Endpreis
              sehen Sie live im Bestellformular, abhängig von Ware, Gewicht und Service.
            </p>
            <div className="mt-7 flex justify-center gap-3">
              <Link href="/auftrag" className="btn-primary text-sm">
                Live-Preis berechnen <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/kontakt" className="btn-secondary text-sm">Individuelles Angebot</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className="container-page py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Standard */}
          <div className="card-feature">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-400">Standard</p>
            <h3 className="mt-2 text-xl font-bold text-navy-900">Pakete &amp; Sendungen</h3>
            <p className="mt-1 text-sm text-ink-500">Die zuverlässige Standardzustellung in Wien.</p>
            <p className="mt-6 text-3xl font-extrabold text-navy-900">
              ab <span className="gold-text">25 €</span>
              <span className="ml-1 text-sm font-semibold text-ink-500">/ Adresse</span>
            </p>
            <p className="mt-1 text-xs text-ink-400">inkl. 20% MwSt</p>
            <ul className="mt-6 space-y-2 text-sm text-ink-700">
              {['Same-Day-Lieferung', 'Versichert', 'Mehrere Stops möglich', 'Auch sperrige Sendungen'].map((x) => (
                <li key={x} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-gold-600" /> {x}</li>
              ))}
            </ul>
          </div>

          {/* Express (highlighted) */}
          <div className="card-feature relative border-gold-200 bg-gradient-to-br from-white to-gold-50/40 ring-1 ring-gold-200">
            <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-gold-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-navy-900">
              Empfohlen
            </span>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-600">Express</p>
            <h3 className="mt-2 text-xl font-bold text-navy-900">Express in 90 Minuten</h3>
            <p className="mt-1 text-sm text-ink-500">Wenn es wirklich schnell gehen muss.</p>
            <p className="mt-6 text-3xl font-extrabold text-navy-900">
              ab <span className="gold-text">40 €</span>
              <span className="ml-1 text-sm font-semibold text-ink-500">/ Adresse</span>
            </p>
            <p className="mt-1 text-xs text-ink-400">inkl. 20% MwSt &amp; Express-Zuschlag</p>
            <ul className="mt-6 space-y-2 text-sm text-ink-700">
              {['Pickup innerhalb 30 Min', 'Direktfahrt – kein Umweg', 'Persönliche Übergabe', 'Live-Status auf Anfrage'].map((x) => (
                <li key={x} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-gold-600" /> {x}</li>
              ))}
            </ul>
          </div>

          {/* Business */}
          <div className="card-feature">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-ink-400">Firmenkunden</p>
            <h3 className="mt-2 text-xl font-bold text-navy-900">Daueraufträge &amp; Touren</h3>
            <p className="mt-1 text-sm text-ink-500">Individuelle Konditionen für regelmäßige Aufträge.</p>
            <p className="mt-6 text-3xl font-extrabold text-navy-900">
              <span className="gold-text">Auf Anfrage</span>
            </p>
            <p className="mt-1 text-xs text-ink-400">individuelles Angebot</p>
            <ul className="mt-6 space-y-2 text-sm text-ink-700">
              {['Wöchentliche Touren', 'Mengenrabatt', 'Sammelrechnung monatlich', 'Persönlicher Ansprechpartner'].map((x) => (
                <li key={x} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-gold-600" /> {x}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Discount code highlight */}
        <div className="mt-10 rounded-2xl border border-gold-200 bg-gradient-to-br from-gold-50 to-white p-6 md:p-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-navy-900">
                <Tag className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-gold-700">Aktion</p>
                <h3 className="text-xl font-extrabold text-navy-900">Spare bis zu 20% mit Code <span className="gold-text">FTW20</span></h3>
                <p className="mt-1 text-sm text-ink-600">Nur für kurze Zeit – einfach im Bestellformular eingeben.</p>
              </div>
            </div>
            <Link href="/auftrag" className="btn-primary text-sm">
              Jetzt anwenden <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Surcharges info */}
      <section className="bg-ink-50/50 py-16">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-extrabold text-navy-900 md:text-3xl">Zuschläge auf einen Blick</h2>
            <p className="mt-2 text-sm text-ink-500">Werden im Live-Preisrechner automatisch berücksichtigt.</p>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <Row label="Mindestpreis pro Auftrag" value="25 €" />
              <Row label="Standardpreis pro Adresse" value="25 €" />
              <Row label="Express-Zuschlag" value="+15 €" />
              <Row label="Kühltransport" value="+20 €" />
              <Row label="Schwer (über 10 kg)" value="+10 €" />
              <Row label="VAT (Mehrwertsteuer)" value="20 % inkl." />
            </div>
            <p className="mt-6 text-xs text-ink-400">
              Alle Preise inkl. 20% MwSt. Tatsächlicher Endpreis wird im Bestellformular live berechnet.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-ink-100 bg-white px-4 py-3">
      <span className="text-sm text-ink-600">{label}</span>
      <span className="text-sm font-bold text-navy-900">{value}</span>
    </div>
  );
}
