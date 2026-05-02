import { cn } from '@/lib/utils';

/**
 * FTW logo:
 *  - "F" letter with a stylized wing/arrow shape above (matches the official FTW mark)
 *  - No outer circle (per branding spec)
 *  - Symbol in gold, "FTW" wordmark in black/navy
 */
export function Logo({
  className,
  withWordmark = true,
  variant = 'light',
  size = 'md',
}: {
  className?: string;
  withWordmark?: boolean;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}) {
  const dim = size === 'sm' ? 'h-9 w-9' : size === 'lg' ? 'h-14 w-14' : 'h-11 w-11';
  const wordCls = variant === 'dark' ? 'text-white' : 'text-navy-900';
  const subCls = variant === 'dark' ? 'text-gold-300' : 'text-gold-600';

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {/* Gold "F + wing/arrow" symbol — no outer circle */}
      <svg viewBox="0 0 100 100" className={cn(dim, 'flex-shrink-0')} aria-hidden="true">
        <defs>
          <linearGradient id="ftwGold" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="55%" stopColor="#e5c97d" />
            <stop offset="100%" stopColor="#c9a961" />
          </linearGradient>
        </defs>
        <g fill="url(#ftwGold)">
          {/* Wing / arrow swoosh on top of the F */}
          <path d="
            M 18 28
            L 56 28
            L 70 18
            L 80 22
            L 62 36
            L 18 36
            Z
          "/>
          {/* F vertical stroke */}
          <rect x="18" y="36" width="14" height="48" rx="2"/>
          {/* F middle horizontal stroke */}
          <rect x="32" y="52" width="28" height="11" rx="2"/>
          {/* Subtle highlight stripe along the wing */}
          <path d="M 24 30 L 60 30 L 66 26 L 70 28 L 60 34 L 24 34 Z" opacity="0.35" fill="#fff"/>
        </g>
      </svg>

      {withWordmark && (
        <div className="flex flex-col leading-none">
          <span className={cn('text-lg font-extrabold tracking-tight', wordCls)}>FTW</span>
          <span className={cn('mt-1 text-[10px] font-semibold uppercase tracking-[0.2em]', subCls)}>
            Fast Transport
          </span>
        </div>
      )}
    </div>
  );
}
