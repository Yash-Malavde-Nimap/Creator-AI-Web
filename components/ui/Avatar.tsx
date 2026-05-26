import Image from 'next/image';

import { cn } from '@/lib/utils';
import { getInitials } from '@/utils/helpers';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeClasses: Record<AvatarSize, { wrapper: string; text: string; image: number }> = {
  xs: { wrapper: 'h-6 w-6', text: 'text-[10px]', image: 24 },
  sm: { wrapper: 'h-8 w-8', text: 'text-xs', image: 32 },
  md: { wrapper: 'h-10 w-10', text: 'text-sm', image: 40 },
  lg: { wrapper: 'h-12 w-12', text: 'text-base', image: 48 },
  xl: { wrapper: 'h-16 w-16', text: 'text-xl', image: 64 },
};

function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  const sizes = sizeClasses[size];
  const initials = name ? getInitials(name) : '?';

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full overflow-hidden',
        'bg-primary-100 dark:bg-primary-900/30',
        sizes.wrapper,
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={name ?? 'Avatar'}
          width={sizes.image}
          height={sizes.image}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className={cn('font-semibold text-primary-700 dark:text-primary-300', sizes.text)}>
          {initials}
        </span>
      )}
    </span>
  );
}

export { Avatar };
