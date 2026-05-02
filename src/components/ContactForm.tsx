'use client';

import { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="card flex flex-col gap-4 p-6">
      <div>
        <label className="label" htmlFor="cname">Dein Name</label>
        <input id="cname" className="input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div>
        <label className="label" htmlFor="cemail">Deine E-Mail</label>
        <input id="cemail" type="email" className="input" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div>
        <label className="label" htmlFor="cmessage">Deine Nachricht</label>
        <textarea id="cmessage" className="textarea" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      </div>
      <button type="submit" className="btn-primary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Wird gesendet…' : 'Nachricht senden'}
      </button>
      {status === 'success' && <p className="text-sm text-brand-700">Danke! Wir melden uns in Kürze.</p>}
      {status === 'error' && <p className="error-text">Etwas ist schiefgelaufen. Bitte versuche es erneut.</p>}
    </form>
  );
}
