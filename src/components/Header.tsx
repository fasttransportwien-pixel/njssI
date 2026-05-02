'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/', label: 'Startseite' },
  { href: '/leistungen', label: 'Leistungen' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/preise', label: 'Preise' },
  { href: '/kontakt', label: 'Kontakt' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || '/';
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/95 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:rounded focus:bg-gold-500 focus:px-3 focus:py-1 focus:text-navy-900"
      >
        Zum Inhalt springen
      </a>
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" aria-label="FTW – Startseite" className="flex items-center gap-2">
          <Logo />
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-7">
          {NAV.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={cn('nav-link', isActive(it.href) && 'active')}
            >
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {/* WhatsApp icon (optional, lightweight inline SVG) */}
          <a
            href="https://wa.me/436764507663"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-700 hover:border-gold-500 hover:text-gold-600 transition"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M19.05 4.91A10 10 0 0 0 4.1 18.36L3 22l3.73-1.07A10 10 0 1 0 19.05 4.91Zm-7 16.13a8 8 0 0 1-4.06-1.11l-.29-.18-2.21.63.63-2.16-.19-.29A8 8 0 1 1 12 21Zm4.6-5.91c-.25-.13-1.49-.74-1.72-.82s-.4-.13-.57.13-.65.82-.79.99-.29.19-.54.06a6.6 6.6 0 0 1-1.94-1.2 7.27 7.27 0 0 1-1.34-1.66c-.14-.25 0-.38.11-.51s.25-.29.37-.43a1.7 1.7 0 0 0 .25-.41.46.46 0 0 0 0-.43c-.06-.13-.57-1.36-.78-1.86s-.41-.42-.57-.43h-.49a.94.94 0 0 0-.68.32 2.85 2.85 0 0 0-.89 2.12 4.94 4.94 0 0 0 1.04 2.64 11.31 11.31 0 0 0 4.34 3.81c.6.26 1.07.41 1.43.53a3.46 3.46 0 0 0 1.58.1 2.6 2.6 0 0 0 1.71-1.21 2.13 2.13 0 0 0 .15-1.21c-.07-.11-.23-.17-.48-.3Z"/>
            </svg>
          </a>
          <Link href="/auftrag" className="btn-primary text-sm">Anfrage senden</Link>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-ink-700 hover:bg-ink-50 md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={cn('border-t border-ink-100 bg-white md:hidden', open ? 'block' : 'hidden')}>
        <div className="container-page py-3">
          <nav className="flex flex-col">
            {NAV.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className={cn(
                  'rounded-md px-2 py-2.5 text-sm font-semibold',
                  isActive(it.href) ? 'text-navy-900 bg-gold-50' : 'text-ink-700 hover:bg-ink-50',
                )}
                onClick={() => setOpen(false)}
              >
                {it.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex justify-end">
            <Link href="/auftrag" className="btn-primary text-sm" onClick={() => setOpen(false)}>
              Anfrage senden
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
