import { Users, Truck, Star } from 'lucide-react';

const STATS = [
  { icon: Users,  value: '1000+', label: 'Zufriedene Kunden' },
  { icon: Truck,  value: '5000+', label: 'Erfolgreiche Lieferungen' },
  { icon: Star,   value: 'Top',   label: 'bewertet in Wien' },
];

export function StatsBlock() {
  return (
    <section className="container-page py-16 md:py-20">
      <div className="grid gap-5 sm:grid-cols-3">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} className="card-feature flex flex-col items-center text-center">
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-100 to-gold-50 ring-1 ring-gold-200">
              <Icon className="h-6 w-6 text-gold-600" strokeWidth={2.2} />
            </div>
            <div className="text-4xl font-extrabold tracking-tight text-navy-900">{value}</div>
            <div className="mt-1 text-sm font-semibold text-ink-600">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
