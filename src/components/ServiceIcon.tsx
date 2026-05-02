import { Package, Flower2, FileText, Newspaper, ShoppingBag, Zap, Snowflake, Building2, type LucideIcon } from 'lucide-react';

const map: Record<string, LucideIcon> = {
  PACKAGE: Package,
  FLOWERS: Flower2,
  DOCUMENTS: FileText,
  MAGAZINES: Newspaper,
  STORE_PICKUP: ShoppingBag,
  EXPRESS: Zap,
  COOLING: Snowflake,
  BUSINESS: Building2,
};

export function ServiceIcon({ kind, className }: { kind: string; className?: string }) {
  const Icon = map[kind] || Package;
  return <Icon className={className} aria-hidden="true" />;
}
