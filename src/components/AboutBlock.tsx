import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function AboutBlock() {
  return (
    <section className="bg-ink-50/50 py-20">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-eyebrow">Unser Versprechen</span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-navy-900 md:text-4xl">
            Mehr als Lieferung – ein <span className="gold-text">Premium Service.</span>
          </h2>
          <div className="gold-divider mx-auto mt-5" />
          <p className="mt-5 text-base leading-relaxed text-ink-600 md:text-lg">
            Fast Transport Wien steht für professionelle Express-Transporte, höchste
            Zuverlässigkeit und persönlichen Service.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/ueber-uns" className="btn-secondary text-sm">
              Mehr über uns <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
