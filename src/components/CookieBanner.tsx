'use client';

import { useEffect, useState } from 'react';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!document.cookie.includes('ftw-consent=1')) setVisible(true);
  }, []);

  function accept() {
    const oneYear = 60 * 60 * 24 * 365;
    document.cookie = `ftw-consent=1; max-age=${oneYear}; path=/; SameSite=Lax`;
    setVisible(false);
  }

  if (!visible) return null;
  return (
    <div className="fixed inset-x-2 bottom-2 z-50 mx-auto max-w-2xl rounded-2xl border border-ink-100 bg-white p-4 shadow-lg md:p-5">
      <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-ink-600">
          Wir verwenden ausschließlich technisch notwendige Cookies, damit die Seite funktioniert. Mehr in unserer Datenschutzerklärung.
        </p>
        <button onClick={accept} className="btn-primary text-sm">Verstanden</button>
      </div>
    </div>
  );
}
