import Link from 'next/link';
import { Logo } from './Logo';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy-pattern relative text-white">
      {/* gold top accent */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent" />

      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo variant="dark" />
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
            Schnell. Sicher. Zuverlässig.<br />
            Ihr Premium-Partner für Express-Transporte in Wien und ganz Europa.
          </p>

          <ul className="mt-6 space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold-400" /> Walter/Jurmann/Gasse 5A/4/16, 1230 Wien
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold-400" />
              <a href="tel:+436764507663" className="hover:text-gold-300">+43 676 4507663</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold-400" />
              <a href="mailto:fasttransportwien@gmail.com" className="hover:text-gold-300">fasttransportwien@gmail.com</a>
            </li>
          </ul>
          <p className="mt-3 text-xs text-white/40">UID: ATU82169528</p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400">Service</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><Link className="hover:text-white" href="/leistungen">Leistungen</Link></li>
            <li><Link className="hover:text-white" href="/preise">Preise</Link></li>
            <li><Link className="hover:text-white" href="/auftrag">Anfrage senden</Link></li>
            <li><Link className="hover:text-white" href="/kontakt">Kontakt</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-gold-400">Rechtliches</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><Link className="hover:text-white" href="/impressum">Impressum</Link></li>
            <li><Link className="hover:text-white" href="/datenschutz">Datenschutz</Link></li>
            <li><Link className="hover:text-white" href="/agb">AGB</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-4 text-xs text-white/50 md:flex-row">
          <span>© {new Date().getFullYear()} Fast Transport Wien E.U. · Alle Rechte vorbehalten.</span>
          <span className="text-white/40">Made in Vienna · ATU82169528</span>
        </div>
      </div>
    </footer>
  );
}
