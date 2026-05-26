import { cn } from '@/lib/utils';
import { formatCompact } from '@/utils/formatters';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  prefix?: string;
  suffix?: string;
}

const colorConfig = {
  blue: {
    icon: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    badge: 'text-blue-600',
  },
  green: {
    icon: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    badge: 'text-green-600',
  },
  purple: {
    icon: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    badge: 'text-purple-600',
  },
  orange: {
    icon: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    badge: 'text-orange-600',
  },
  red: {
    icon: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    badge: 'text-red-600',
  },
};

function StatsCard({
  title,
  value,
  change,
  icon,
  color = 'blue',
  prefix,
  suffix,
}: StatsCardProps) {
  const colors = colorConfig[color];
  const isPositive = change !== undefined && change >= 0;
  const displayValue =
    typeof value === 'number' ? formatCompact(value) : value;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700/60 dark:bg-gray-900">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="mt-1.5 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {prefix && <span className="text-base font-semibold">{prefix}</span>}
            {displayValue}
            {suffix && <span className="ml-1 text-base font-semibold text-gray-500">{suffix}</span>}
          </p>
        </div>
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', colors.icon)}>
          {icon}
        </div>
      </div>

      {change !== undefined && (
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className={cn(
              'inline-flex items-center gap-0.5 text-xs font-medium',
              isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            )}
          >
            {isPositive ? (
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            )}
            {Math.abs(change)}%
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
        </div>
      )}
    </div>
  );
}

export { StatsCard };
