'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j?.error === 'admin not configured' ? 'Admin nicht konfiguriert. ADMIN_EMAIL/ADMIN_PASSWORD setzen.' : 'Falsche Zugangsdaten');
        setLoading(false);
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Etwas ist schiefgelaufen.');
      setLoading(false);
    }
  }

  return (
    <section className="container-page py-16 md:py-24">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-extrabold text-ink-800">Admin Login</h1>
        <form onSubmit={onSubmit} className="mt-6 card space-y-4 p-6">
          <div>
            <label className="label" htmlFor="e">E-Mail</label>
            <input id="e" type="email" className="input" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="p">Passwort</label>
            <input id="p" type="password" className="input" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? '…' : 'Anmelden'}
          </button>
        </form>
      </div>
    </section>
  );
}
