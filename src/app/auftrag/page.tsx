import { OrderForm } from '@/components/OrderForm';

export const dynamic = 'force-dynamic';

export default function OrderPage({ searchParams }: { searchParams: { service?: string } }) {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10 opacity-60" />
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow">Anfrage</span>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-navy-900 md:text-4xl">
            Anfrage <span className="gold-text">senden</span>
          </h1>
          <div className="gold-divider mx-auto mt-4" />
          <p className="mt-4 text-base text-ink-600">
            Kein Online-Zahlungssystem – wir prüfen jede Anfrage persönlich und melden uns kurzfristig zurück.
          </p>
        </div>
        <div className="mt-10">
          <OrderForm initialService={searchParams.service} />
        </div>
      </div>
    </section>
  );
}
