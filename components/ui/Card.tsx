import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
  hoverable?: boolean;
}

interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
};

function Card({ padding = 'md', bordered = true, hoverable = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl bg-white dark:bg-gray-900',
        'shadow-sm',
        bordered && 'border border-gray-200 dark:border-gray-700/60',
        hoverable && 'transition-shadow hover:shadow-md cursor-pointer',
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardHeader({ className, children, ...props }: CardSectionProps) {
  return (
    <div className={cn('mb-4 flex items-center justify-between', className)} {...props}>
      {children}
    </div>
  );
}

function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-base font-semibold text-gray-900 dark:text-gray-100', className)} {...props}>
      {children}
    </h3>
  );
}

function CardContent({ className, children, ...props }: CardSectionProps) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ className, children, ...props }: CardSectionProps) {
  return (
    <div className={cn('mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800', className)} {...props}>
      {children}
    </div>
  );
}

export { Card, CardContent, CardFooter, CardHeader, CardTitle };
