import { STATUS_LABELS } from '@/lib/utils';

const cls: Record<string, string> = {
  RECEIVED: 'pill pill-received',
  IN_REVIEW: 'pill pill-review',
  CONFIRMED: 'pill pill-confirmed',
  IN_PROGRESS: 'pill pill-progress',
  DELIVERED: 'pill pill-delivered',
  CANCELLED: 'pill pill-cancelled',
};

export function StatusPill({ status }: { status: string }) {
  return <span className={cls[status] || 'pill pill-received'}>{STATUS_LABELS[status] || status}</span>;
}
