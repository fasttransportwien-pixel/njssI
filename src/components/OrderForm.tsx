'use client';

import { useEffect, useMemo, useState } from 'react';
import { Plus, Trash2, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { formatEuroCents, SERVICE_LABELS } from '@/lib/utils';

const SERVICE_KINDS = ['PACKAGE','FLOWERS','DOCUMENTS','MAGAZINES','STORE_PICKUP','EXPRESS','COOLING','BUSINESS'] as const;

interface Stop { address: string; contact?: string }
interface PriceSummary {
  subtotalGrossCents: number;
  discountCents: number;
  totalGrossCents: number;
  totalNetCents: number;
  totalVatCents: number;
  numAddresses: number;
  appliedDiscount: boolean;
  discountCodeAccepted: boolean;
}

export function OrderForm({ initialService }: { initialService?: string }) {
  const initial = initialService && (SERVICE_KINDS as readonly string[]).includes(initialService) ? initialService : 'PACKAGE';
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerCompany: '',
    serviceType: initial as typeof SERVICE_KINDS[number],
    goodsType: '',
    weightKg: '',
    isExpress: initial === 'EXPRESS',
    isCooling: initial === 'COOLING',
    pickupAddress: '',
    scheduledDate: '',
    scheduledTime: '',
    notes: '',
    discountCode: '',
    acceptedTerms: false,
    acceptedPrivacy: false,
  });

  const [stops, setStops] = useState<Stop[]>([{ address: '', contact: '' }]);
  const [summary, setSummary] = useState<PriceSummary | null>(null);
  const [pricingLoading, setPricingLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ orderNumber: string } | null>(null);

  const pricingDeps = useMemo(() => ({
    numAddresses: stops.filter((s) => s.address.trim().length > 0).length,
    weightKg: parseFloat(form.weightKg) || 0,
    isExpress: form.isExpress,
    isCooling: form.isCooling,
    discountCode: form.discountCode.trim() || null,
  }), [stops, form.weightKg, form.isExpress, form.isCooling, form.discountCode]);

  useEffect(() => {
    let cancelled = false;
    setPricingLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch('/api/pricing', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(pricingDeps),
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (!cancelled) setSummary(data);
      } catch {
        if (!cancelled) setSummary(null);
      } finally {
        if (!cancelled) setPricingLoading(false);
      }
    }, 350);
    return () => { cancelled = true; clearTimeout(t); };
  }, [pricingDeps]);

  function updateStop(i: number, patch: Partial<Stop>) {
    setStops((arr) => arr.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }
  function addStop() { setStops((a) => [...a, { address: '', contact: '' }]); }
  function removeStop(i: number) { setStops((a) => (a.length > 1 ? a.filter((_, idx) => idx !== i) : a)); }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.acceptedTerms) return setError('AGB-Zustimmung ist erforderlich.');
    if (!form.acceptedPrivacy) return setError('Datenschutz-Zustimmung ist erforderlich.');
    const validStops = stops.filter((s) => s.address.trim().length >= 3);
    if (validStops.length === 0) return setError('Mindestens eine Lieferadresse angeben.');

    setSubmitting(true);
    try {
      const payload = {
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        customerPhone: form.customerPhone,
        customerCompany: form.customerCompany || null,
        serviceType: form.serviceType,
        goodsType: form.goodsType || null,
        weightKg: form.weightKg ? parseFloat(form.weightKg) : null,
        isExpress: form.isExpress,
        isCooling: form.isCooling,
        pickupAddress: form.pickupAddress,
        pickupLat: null,
        pickupLng: null,
        scheduledDate: form.scheduledDate || new Date().toISOString().slice(0, 10),
        scheduledTime: form.scheduledTime || null,
        notes: form.notes || null,
        stops: validStops.map((s) => ({ address: s.address, lat: null, lng: null, contact: s.contact || null })),
        discountCode: form.discountCode.trim() || null,
        acceptedTerms: true as const,
        acceptedPrivacy: true as const,
      };
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || 'Submit failed');
      }
      const data = await res.json();
      setSuccess({ orderNumber: data.orderNumber });
    } catch (err: any) {
      setError(err.message || 'Etwas ist schiefgelaufen.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="card mx-auto max-w-2xl p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand-600" />
        <h2 className="mt-4 text-2xl font-extrabold text-ink-800">Vielen Dank!</h2>
        <p className="mt-3 text-sm text-ink-500">
          Deine Anfrage wurde erfolgreich übermittelt. Wir prüfen deine Bestellung und melden uns in Kürze.
        </p>
        <p className="mt-6 inline-block rounded-lg bg-ink-50 px-4 py-2 text-sm text-ink-800">
          Deine Referenz: <strong className="font-mono">{success.orderNumber}</strong>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-3">
      <div className="space-y-6 md:col-span-2">
        <fieldset className="card p-6">
          <legend className="px-2 text-sm font-bold uppercase tracking-wide text-brand-600">Logistik</legend>
          <div className="space-y-4">
            <div>
              <label className="label" htmlFor="pickup">Abholadresse</label>
              <input
                id="pickup"
                className="input"
                placeholder="Straße, Hausnummer, PLZ, Wien"
                required
                value={form.pickupAddress}
                onChange={(e) => setForm({ ...form, pickupAddress: e.target.value })}
              />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="label mb-0">Lieferadresse(n)</span>
                <button type="button" className="btn-ghost text-xs" onClick={addStop}>
                  <Plus className="h-4 w-4" /> Weitere Adresse hinzufügen
                </button>
              </div>
              <div className="space-y-3">
                {stops.map((s, i) => (
                  <div key={i} className="grid gap-2 rounded-xl border border-ink-100 p-3 sm:grid-cols-[1fr_auto]">
                    <div className="space-y-2">
                      <input
                        className="input"
                        placeholder="Lieferadresse eingeben"
                        value={s.address}
                        onChange={(e) => updateStop(i, { address: e.target.value })}
                      />
                      <input
                        className="input"
                        placeholder="Empfänger (optional)"
                        value={s.contact || ''}
                        onChange={(e) => updateStop(i, { contact: e.target.value })}
                      />
                    </div>
                    {stops.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStop(i)}
                        className="btn-ghost h-fit self-start text-xs text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" /> Entfernen
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="date">Datum</label>
                <input
                  id="date"
                  type="date"
                  className="input"
                  required
                  min={new Date().toISOString().slice(0, 10)}
                  value={form.scheduledDate}
                  onChange={(e) => setForm({ ...form, scheduledDate: e.target.value })}
                />
              </div>
              <div>
                <label className="label" htmlFor="time">Uhrzeit</label>
                <input
                  id="time"
                  type="time"
                  className="input"
                  value={form.scheduledTime}
                  onChange={(e) => setForm({ ...form, scheduledTime: e.target.value })}
                />
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="card p-6">
          <legend className="px-2 text-sm font-bold uppercase tracking-wide text-brand-600">Service</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="serviceType">Serviceart</label>
              <select
                id="serviceType"
                className="select"
                value={form.serviceType}
                onChange={(e) => setForm({ ...form, serviceType: e.target.value as any })}
              >
                {SERVICE_KINDS.map((k) => (
                  <option key={k} value={k}>{SERVICE_LABELS[k]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="weightKg">Gewicht (kg)</label>
              <input
                id="weightKg"
                type="number"
                step="0.1"
                min={0}
                className="input"
                value={form.weightKg}
                onChange={(e) => setForm({ ...form, weightKg: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="label" htmlFor="goods">Art der Ware</label>
              <input
                id="goods"
                className="input"
                placeholder="z. B. Dokumente, Blumen, Lebensmittel"
                value={form.goodsType}
                onChange={(e) => setForm({ ...form, goodsType: e.target.value })}
              />
            </div>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-ink-100 p-3">
              <input type="checkbox" checked={form.isExpress} onChange={(e) => setForm({ ...form, isExpress: e.target.checked })} className="h-4 w-4 accent-brand-600" />
              <span className="text-sm font-semibold text-ink-700">Express-Lieferung</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-ink-100 p-3">
              <input type="checkbox" checked={form.isCooling} onChange={(e) => setForm({ ...form, isCooling: e.target.checked })} className="h-4 w-4 accent-brand-600" />
              <span className="text-sm font-semibold text-ink-700">Kühltransport</span>
            </label>
          </div>
        </fieldset>

        <fieldset className="card p-6">
          <legend className="px-2 text-sm font-bold uppercase tracking-wide text-brand-600">Kontaktdaten</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="cn">Name</label>
              <input id="cn" className="input" required value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
            </div>
            <div>
              <label className="label" htmlFor="cc">Firma (optional)</label>
              <input id="cc" className="input" value={form.customerCompany} onChange={(e) => setForm({ ...form, customerCompany: e.target.value })} />
            </div>
            <div>
              <label className="label" htmlFor="ce">E-Mail</label>
              <input id="ce" type="email" className="input" required value={form.customerEmail} onChange={(e) => setForm({ ...form, customerEmail: e.target.value })} />
            </div>
            <div>
              <label className="label" htmlFor="cp">Telefonnummer</label>
              <input id="cp" type="tel" className="input" required value={form.customerPhone} onChange={(e) => setForm({ ...form, customerPhone: e.target.value })} />
            </div>
          </div>
        </fieldset>

        <fieldset className="card p-6">
          <legend className="px-2 text-sm font-bold uppercase tracking-wide text-brand-600">Zusatzinformationen</legend>
          <div className="space-y-4">
            <div>
              <label className="label" htmlFor="notes">Zusatzinformationen</label>
              <textarea id="notes" className="textarea" placeholder="Wichtige Hinweise, z. B. Stockwerk, Türcode, Lieferzeitfenster" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
            <div>
              <label className="label" htmlFor="dc">Rabattcode (optional)</label>
              <input
                id="dc"
                className="input uppercase"
                placeholder="FTW20"
                value={form.discountCode}
                onChange={(e) => setForm({ ...form, discountCode: e.target.value.toUpperCase() })}
              />
              <p className="help">Spare bis zu 20% mit dem Code FTW20</p>
              {form.discountCode && summary && (
                <p className={`help ${summary.discountCodeAccepted ? 'text-brand-700' : 'text-red-600'}`}>
                  {summary.discountCodeAccepted ? 'Rabattcode angewendet' : 'Rabattcode ungültig'}
                </p>
              )}
            </div>
            <div className="space-y-2 pt-2">
              <label className="flex items-start gap-3 text-sm text-ink-700">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-brand-600" checked={form.acceptedTerms} onChange={(e) => setForm({ ...form, acceptedTerms: e.target.checked })} />
                <span>Ich akzeptiere die AGB</span>
              </label>
              <label className="flex items-start gap-3 text-sm text-ink-700">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-brand-600" checked={form.acceptedPrivacy} onChange={(e) => setForm({ ...form, acceptedPrivacy: e.target.checked })} />
                <span>Ich akzeptiere die Datenschutzerklärung</span>
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      <aside className="space-y-4 md:col-span-1">
        <div className="card sticky top-24 p-6">
          <h3 className="text-base font-bold text-ink-800">Preisübersicht</h3>
          <div className="mt-4 space-y-2 text-sm">
            <Row label="Zwischensumme" value={summary ? formatEuroCents(summary.subtotalGrossCents) : '–'} />
            <Row label="Rabatt" value={summary ? `−${formatEuroCents(summary.discountCents)}` : '–'} accent />
            <div className="my-2 border-t border-ink-100" />
            <Row label="Gesamtpreis inkl. 20% MwSt" value={summary ? formatEuroCents(summary.totalGrossCents) : '–'} bold />
            <p className="pt-1 text-xs text-ink-400">
              Netto: {summary ? formatEuroCents(summary.totalNetCents) : '–'} · MwSt: {summary ? formatEuroCents(summary.totalVatCents) : '–'}
            </p>
          </div>
          <p className="mt-4 text-xs text-ink-500">
            {pricingLoading && <Loader2 className="inline h-3.5 w-3.5 animate-spin" />} inkl. 20% MwSt
          </p>
          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              {error}
            </div>
          )}
          <button type="submit" className="btn-primary mt-5 w-full" disabled={submitting}>
            {submitting ? 'Wird gesendet…' : 'Anfrage absenden'}
          </button>
        </div>
      </aside>
    </form>
  );
}

function Row({ label, value, bold, accent }: { label: string; value: string; bold?: boolean; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className={'text-ink-600 ' + (bold ? 'font-bold text-ink-800' : '')}>{label}</span>
      <span className={'tabular-nums ' + (bold ? 'text-xl font-extrabold text-brand-600' : accent ? 'text-brand-700 font-semibold' : 'font-semibold text-ink-800')}>
        {value}
      </span>
    </div>
  );
}
