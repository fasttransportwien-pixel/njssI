import { redirect } from 'next/navigation';
import { isAdmin } from './auth';

/** Redirects to /admin/login if not authenticated. Use at the top of admin server pages. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect('/admin/login');
}
