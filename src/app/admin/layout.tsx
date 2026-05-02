import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { LayoutDashboard, ListOrdered, FileText, Users } from 'lucide-react';
import { SignOutButton } from '@/components/admin/SignOutButton';
import { isAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const signedIn = await isAdmin();
  const items = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/orders', label: 'Bestellungen', icon: ListOrdered },
    { href: '/admin/invoices', label: 'Rechnungen', icon: FileText },
    { href: '/admin/customers', label: 'Kunden', icon: Users },
  ];

  return (
    <div className="min-h-[60vh] bg-ink-50/40">
      <div className="container-page grid gap-6 py-8 md:grid-cols-[240px_1fr]">
        <aside className="card h-fit p-4">
          <div className="px-2 pb-3"><Logo /></div>
          {signedIn ? (
            <>
              <nav className="space-y-1">
                {items.map(({ href, label, icon: Icon }) => (
                  <Link key={href} href={href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-ink-700 hover:bg-ink-100">
                    <Icon className="h-4 w-4 text-ink-400" /> {label}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 border-t border-ink-100 pt-3 text-xs text-ink-500">
                <SignOutButton />
              </div>
            </>
          ) : (
            <p className="px-3 py-2 text-xs text-ink-500">Bitte einloggen.</p>
          )}
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}
