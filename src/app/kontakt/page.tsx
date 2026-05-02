import { Phone, Mail, MapPin } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20">
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10 opacity-60" />
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-eyebrow">Kontakt</span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-navy-900 md:text-5xl">
            Wir hören <span className="gold-text">zu.</span>
          </h1>
          <div className="gold-divider mx-auto mt-5" />
          <p className="mt-4 text-base text-ink-600 md:text-lg">
            Schreiben Sie uns – wir antworten persönlich und schnell.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="card p-6">
            <ul className="space-y-5 text-sm text-ink-700">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gold-100 to-gold-50 ring-1 ring-gold-200 text-gold-600">
                  <Phone className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-ink-400">Telefon</span>
                  <a href="tel:+436764507663" className="font-semibold text-navy-900 hover:text-gold-700">
                    +43 676 4507663
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gold-100 to-gold-50 ring-1 ring-gold-200 text-gold-600">
                  <Mail className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-ink-400">E-Mail</span>
                  <a href="mailto:fasttransportwien@gmail.com" className="font-semibold text-navy-900 hover:text-gold-700">
                    fasttransportwien@gmail.com
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gold-100 to-gold-50 ring-1 ring-gold-200 text-gold-600">
                  <MapPin className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-ink-400">Adresse</span>
                  <span className="font-semibold text-navy-900">Walter/Jurmann/Gasse 5A/4/16, 1230 Wien</span>
                </span>
              </li>
            </ul>
            <div className="gold-line mt-6" />
            <p className="mt-4 text-xs text-ink-500">
              UID-Nummer: ATU82169528 · Mitglied der Wirtschaftskammer Wien
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
