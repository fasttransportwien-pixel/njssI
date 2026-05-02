'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { STATUS_LABELS } from '@/lib/utils';

const STATUSES = ['RECEIVED', 'IN_REVIEW', 'CONFIRMED', 'IN_PROGRESS', 'DELIVERED', 'CANCELLED'] as const;

interface Props {
  orderId: string;
  currentStatus: string;
  currentAdminPriceEuros: string;
  currentNote: string;
  invoiceId: string | null;
  invoiceNumber: string | null;
}

export function OrderEditor({ orderId, currentStatus, currentAdminPriceEuros, currentNote, invoiceId, invoiceNumber }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [price, setPrice] = useState(currentAdminPriceEuros);
  const [note, setNote] = useState(currentNote);
  const [busy, setBusy] = useState<string | null>(null);
  const [invId, setInvId] = useState<string | null>(invoiceId);
  const [invNumber, setInvNumber] = useState<string | null>(invoiceNumber);

  async function patch() {
    setBusy('save');
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        status,
        adminPriceGrossEuros: price ? parseFloat(price) : undefined,
        adminNote: note || null,
      }),
    });
    setBusy(null);
    if (res.ok) router.refresh();
  }

  async function createInvoice() {
    setBusy('invoice');
    const res = await fetch(`/api/admin/orders/${orderId}/invoice`, { method: 'POST' });
    setBusy(null);
    if (res.ok) {
      const data = await res.json();
      setInvId(data.id);
      setInvNumber(data.invoiceNumber);
      router.refresh();
    }
  }

  return (
    <div className="card space-y-4 p-5">
      <h2 className="text-sm font-bold uppercase tracking-wide text-brand-600">Status & Preis</h2>
      <div className="grid gap-3">
        <div>
          <label className="label">Status</label>
          <select className="select" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Preis anpassen (€ inkl. MwSt)</label>
          <input className="input" type="number" step="0.01" min={0} placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label className="label">Interne Notiz</label>
          <textarea className="textarea" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
      </div>
      <button onClick={patch} disabled={!!busy} className="btn-primary w-full text-sm">
        {busy === 'save' ? '…' : 'Speichern'}
      </button>

      <div className="border-t border-ink-100 pt-3">
        <h3 className="text-sm font-bold uppercase tracking-wide text-brand-600">Rechnung</h3>
        {invId ? (
          <div className="mt-2 flex items-center justify-between gap-3">
            <span className="font-mono text-xs text-ink-700">{invNumber}</span>
            <a href={`/api/invoices/${invId}/pdf`} target="_blank" rel="noreferrer" className="btn-primary text-sm">
              PDF herunterladen
            </a>
          </div>
        ) : (
          <button onClick={createInvoice} disabled={!!busy} className="btn-primary mt-2 w-full text-sm">
            {busy === 'invoice' ? '…' : 'Rechnung erstellen'}
          </button>
        )}
      </div>
    </div>
  );
}
