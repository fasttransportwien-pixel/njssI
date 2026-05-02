'use client';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export function SignOutButton() {
  const router = useRouter();
  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  }
  return (
    <button onClick={logout} className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-ink-700 hover:text-ink-900">
      <LogOut className="h-3.5 w-3.5" /> Abmelden
    </button>
  );
}
