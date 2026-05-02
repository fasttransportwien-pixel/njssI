import { Zap, ShieldCheck, Globe2, Headphones } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: 'Express in unter 90 Minuten',
    body: 'Pünktlich ans Ziel – ohne Umwege.',
  },
  {
    icon: ShieldCheck,
    title: 'Versicherter Transport',
    body: 'Ihre Ware ist bei uns in sicheren Händen.',
  },
  {
    icon: Globe2,
    title: 'Europaweite Direktfahrten',
    body: 'Direkt, schnell und zuverlässig in ganz Europa.',
  },
  {
    icon: Headphones,
    title: '24/7 erreichbar',
    body: 'Wir sind jederzeit für Sie da.',
  },
];

export function FeatureGrid() {
  return (
    <section className="container-page relative py-16 md:py-20">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <div key={title} className="card-feature group">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gold-100 to-gold-50 ring-1 ring-gold-200">
              <Icon className="h-5 w-5 text-gold-600" strokeWidth={2.2} />
            </div>
            <h3 className="text-base font-bold text-navy-900">{title}</h3>
            <p className="mt-2 text-sm text-ink-500">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
