/**
 * Customer logos strip — "VERTRAUEN SIE AUF ERFAHRUNG".
 *
 * Logo files are served from /public/logos/<name>.svg.
 * To replace with official brand assets, simply overwrite these files —
 * see /public/logos/README.md for instructions.
 */

const LOGOS = [
  { name: 'Wolt',           src: '/logos/wolt.svg' },
  { name: 'Medien für Med', src: '/logos/media-fuer-med.svg' },
  { name: 'Bloomways',      src: '/logos/bloomways.svg' },
  { name: 'Radkurier24',    src: '/logos/radkurier24.svg' },
  { name: 'Blumenbar',      src: '/logos/blumenbar.svg' },
];

export function ClientLogos() {
  return (
    <section className="border-t border-ink-100 bg-white py-16">
      <div className="container-page">
        <p className="text-center text-xs font-bold uppercase tracking-[0.28em] text-ink-400">
          Vertrauen sie auf Erfahrung
        </p>
        <div className="mx-auto mt-3 h-[2px] w-12 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

        <ul className="mt-10 grid grid-cols-2 items-center gap-x-10 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
          {LOGOS.map((L) => (
            <li key={L.name} className="flex h-16 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={L.src}
                alt={L.name}
                title={L.name}
                className="max-h-14 max-w-[160px] object-contain transition hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
