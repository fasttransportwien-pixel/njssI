import Link from 'next/link';
import { ArrowRight, ShieldCheck, Heart, Truck, Users, Star } from 'lucide-react';
import { StatsBlock } from '@/components/StatsBlock';

export const metadata = {
  title: 'Über uns – Fast Transport Wien',
  description:
    'Fast Transport Wien E.U. – professionelle Express-Transporte, höchste Zuverlässigkeit und persönlicher Service in Wien und ganz Europa.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10 opacity-60" />
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-eyebrow">Über uns</span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-navy-900 md:text-5xl">
              Mehr als Lieferung – ein <span className="gold-text">Premium Service.</span>
            </h1>
            <div className="gold-divider mx-auto mt-5" />
            <p className="mt-6 text-base leading-relaxed text-ink-600 md:text-lg">
              Fast Transport Wien E.U. steht für professionelle Express-Transporte, höchste
              Zuverlässigkeit und persönlichen Service. Vom Kurier-Paket bis zur europaweiten
              Direktfahrt – wir liefern, wenn Pünktlichkeit zählt.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-ink-50/50 py-20">
        <div className="container-page grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="section-eyebrow">Unsere Geschichte</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-900 md:text-4xl">
              Wiener Wurzeln, europäischer Anspruch.
            </h2>
            <div className="gold-divider mt-4" />
            <p className="mt-5 text-base leading-relaxed text-ink-600">
              Was als persönlicher Kurierdienst in Wien begann, ist heute ein verlässlicher
              Partner für Privatkunden, Boutiquen, Verlage, Floristen und Eventagenturen.
              Wir lieben es, Dinge schnell und sicher von A nach B zu bringen.
            </p>
            <p className="mt-3 text-base leading-relaxed text-ink-600">
              Jede Anfrage wird von uns persönlich geprüft. Kein Callcenter, keine
              Warteschleife – direkt mit dem Inhaber.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/auftrag" className="btn-primary text-sm">
                Anfrage senden <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/kontakt" className="btn-secondary text-sm">Kontakt aufnehmen</Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: ShieldCheck, title: 'Versichert', body: 'Jede Sendung versichert.' },
              { icon: Truck, title: 'Eigene Flotte', body: 'Saubere, gewartete Fahrzeuge.' },
              { icon: Heart, title: 'Persönlich', body: 'Direkt mit dem Inhaber.' },
              { icon: Users, title: 'Erfahrung', body: 'Stammkunden seit Jahren.' },
            ].map((c) => (
              <div key={c.title} className="card-feature">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gold-50 ring-1 ring-gold-200">
                  <c.icon className="h-5 w-5 text-gold-600" strokeWidth={2.2} />
                </div>
                <h3 className="text-sm font-bold text-navy-900">{c.title}</h3>
                <p className="mt-1 text-sm text-ink-500">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Unsere Werte</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-900 md:text-4xl">
              Worauf wir bestehen.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { icon: Star,        title: 'Pünktlichkeit',  body: 'Unser höchstes Versprechen.' },
              { icon: ShieldCheck, title: 'Sorgfalt',       body: 'Jedes Paket bekommt unsere volle Aufmerksamkeit.' },
              { icon: Heart,       title: 'Persönlichkeit', body: 'Sie sprechen direkt mit uns – immer.' },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="card-feature text-center">
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gold-100 to-gold-50 ring-1 ring-gold-200">
                  <Icon className="h-5 w-5 text-gold-600" strokeWidth={2.2} />
                </div>
                <h3 className="text-base font-bold text-navy-900">{title}</h3>
                <p className="mt-2 text-sm text-ink-500">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsBlock />

      {/* CTA */}
      <section className="container-page pb-20">
        <div className="bg-navy-pattern relative overflow-hidden rounded-3xl p-10 text-white md:p-14">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-gold-300 via-gold-500 to-gold-700" />
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-extrabold md:text-4xl">Bereit für Ihre nächste Lieferung?</h2>
              <p className="mt-3 max-w-xl text-white/70">
                Anfrage in unter 2 Minuten – Preis sofort sichtbar.
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
    </>
  );
}
