import { ServiceCard } from '@/components/ServiceCard';
import { ClientLogos } from '@/components/ClientLogos';

const SERVICE_KINDS = ['PACKAGE', 'FLOWERS', 'DOCUMENTS', 'MAGAZINES', 'STORE_PICKUP', 'EXPRESS', 'COOLING', 'BUSINESS'];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10 opacity-60" />
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Leistungen</span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-navy-900 md:text-5xl">
              Unsere <span className="gold-text">Premium-Services</span>
            </h1>
            <div className="gold-divider mx-auto mt-5" />
            <p className="mt-5 text-base text-ink-600 md:text-lg">
              Für jeden Transportbedarf in Wien und Europa die passende Lösung.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_KINDS.map((k) => <ServiceCard key={k} kind={k} />)}
          </div>
        </div>
      </section>
      <ClientLogos />
    </>
  );
}
