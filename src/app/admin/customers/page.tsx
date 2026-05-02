import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/admin-guard';

export const dynamic = 'force-dynamic';

export default async function CustomersPage() {
  await requireAdmin();

  let grouped: any[] = [];
  let dbError = false;
  try {
    grouped = await prisma.order.groupBy({
      by: ['customerEmail', 'customerName'],
      _count: { _all: true },
      _sum: { totalGrossCents: true, adminPriceCents: true },
      orderBy: { _count: { customerEmail: 'desc' } },
      take: 200,
    });
  } catch (e) {
    console.error('Customers query failed:', e);
    dbError = true;
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-extrabold text-ink-800">Kunden</h1>
      {dbError ? (
        <div className="card p-6 text-sm text-ink-600">Datenbank nicht erreichbar.</div>
      ) : (
        <div className="card overflow-hidden">
          <table className="min-w-full divide-y divide-ink-100 text-sm">
            <thead className="bg-ink-50/60 text-left text-xs font-bold uppercase text-ink-500">
              <tr>
                <th className="px-5 py-3">Kunde</th>
                <th className="px-5 py-3">E-Mail</th>
                <th className="px-5 py-3 text-right">Aufträge</th>
                <th className="px-5 py-3 text-right">Umsatz</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {grouped.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-10 text-center text-ink-400">Keine Kunden.</td></tr>
              ) : grouped.map((g, i) => {
                const sum = (g._sum.adminPriceCents ?? 0) || (g._sum.totalGrossCents ?? 0);
                return (
                  <tr key={`${g.customerEmail}-${i}`} className="hover:bg-ink-50">
                    <td className="px-5 py-3 font-semibold text-ink-800">{g.customerName}</td>
                    <td className="px-5 py-3 text-ink-500">{g.customerEmail}</td>
                    <td className="px-5 py-3 text-right tabular-nums">{g._count._all}</td>
                    <td className="px-5 py-3 text-right font-semibold tabular-nums">{(sum / 100).toFixed(2)} €</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
