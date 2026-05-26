import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
  rounded?: boolean;
  circle?: boolean;
}

function Skeleton({ lines = 1, rounded = false, circle = false, className, ...props }: SkeletonProps) {
  if (lines === 1) {
    return (
      <div
        className={cn(
          'animate-pulse bg-gray-200 dark:bg-gray-700',
          circle ? 'rounded-full' : rounded ? 'rounded-lg' : 'rounded',
          className
        )}
        {...props}
      />
    );
  }

  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          style={{ width: i === lines - 1 ? '75%' : '100%' }}
          className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
        />
      ))}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-4 flex items-center gap-3">
        <Skeleton circle className="h-10 w-10" />
        <div className="flex-1">
          <Skeleton className="mb-2 h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <Skeleton lines={3} />
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-3 flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton circle className="h-8 w-8" />
      </div>
      <Skeleton className="mb-2 h-8 w-20" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

export { CardSkeleton, Skeleton, StatCardSkeleton };
