'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg
      className={cn('h-6 w-6 transition-colors', active ? 'text-[#4a9fd5]' : 'text-white/45')}
      fill={active ? 'currentColor' : 'none'}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={active ? 0 : 1.75}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}

function HashIcon({ active }: { active: boolean }) {
  return (
    <svg
      className={cn('h-6 w-6 transition-colors', active ? 'text-[#4a9fd5]' : 'text-white/45')}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={active ? 2.5 : 1.75}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <div
      className="flex h-7 w-7 items-center justify-center rounded-full transition-opacity"
      style={{
        background: active
          ? 'linear-gradient(135deg, #f5a623 0%, #e8a020 100%)'
          : 'rgba(255,255,255,0.18)',
        opacity: active ? 1 : 0.55,
      }}
    >
      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
      </svg>
    </div>
  );
}

const NAV_ITEMS = [
  { href: ROUTES.HOME, label: 'Home', Icon: HomeIcon },
  { href: ROUTES.SOCIAL_MEDIA, label: 'Social Media', Icon: HashIcon },
  { href: ROUTES.PROFILE, label: 'Profile', Icon: ProfileIcon },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around px-4 pb-safe"
      style={{
        background: 'rgba(5, 13, 31, 0.92)',
        borderTop: '1px solid rgba(100, 150, 220, 0.15)',
        backdropFilter: 'blur(16px)',
        height: '64px',
      }}
    >
      {NAV_ITEMS.map(({ href, label, Icon }) => {
        const active = pathname === href || (href !== ROUTES.HOME && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-1 flex-col items-center justify-center gap-1 py-2"
          >
            <Icon active={active} />
            <span
              className={cn(
                'text-[11px] font-medium transition-colors',
                active ? 'text-[#4a9fd5]' : 'text-white/45'
              )}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
