import InstagramIcon from '@/components/common/svgs/SocialMedia/InstagramIcon';
import FacebookIcon from '@/components/common/svgs/SocialMedia/FacebookIcon';
import ThreadsIcon from '@/components/common/svgs/SocialMedia/ThreadsIcon';
import LinkedInIcon from '@/components/common/svgs/SocialMedia/LinkedInIcon';
import XIcon from '@/components/common/svgs/SocialMedia/XIcon';

export const PLATFORM_TABS = [
  { id: 'instagram', name: 'Instagram', Icon: InstagramIcon, count: 24 },
  { id: 'facebook',  name: 'Facebook',  Icon: FacebookIcon,  count: 13 },
  { id: 'threads',   name: 'Threads',   Icon: ThreadsIcon,   count: 15 },
  { id: 'linkedin',  name: 'LinkedIN',  Icon: LinkedInIcon,  count: 18 },
  { id: 'x',         name: 'X',         Icon: XIcon,         count: 18 },
] as const;

export type PlatformTabId = typeof PLATFORM_TABS[number]['id'];

const ACTIVE_STYLE = `
  linear-gradient(277.08deg, #290E08 0%, #031E54 100%) padding-box,
  linear-gradient(97.92deg, #412E2B 0%, #868FA9 50%, #412E2B 100%) border-box
`.trim();

const INACTIVE_STYLE = `
  linear-gradient(#0A152F, #0A152F) padding-box,
  linear-gradient(88.76deg, #4A76CF 0%, #9ABBFF 100%) border-box
`.trim();

/* ── Large tabs (shown when not scrolled) ────────────────────────────────── */

export function LargePlatformTabs({
  active,
  onSelect,
}: {
  active: PlatformTabId;
  onSelect: (id: PlatformTabId) => void;
}) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {PLATFORM_TABS.map(({ id, name, Icon, count }) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          className="flex shrink-0 flex-col items-center gap-1.5 rounded-2xl px-4 py-3 transition-colors"
          style={{
            minWidth: '80px',
            border: active === id ? '2px solid transparent' : '0.5px solid transparent',
            background: active === id ? ACTIVE_STYLE : INACTIVE_STYLE,
          }}
        >
          <Icon height={50} />
          <span className="text-xs font-medium text-white/70">{name}</span>
          <span className="text-base font-bold text-white">{count}</span>
        </button>
      ))}
    </div>
  );
}

/* ── Compact tabs (shown when scrolled) ─────────────────────────────────── */

export function CompactPlatformTabs({
  active,
  onSelect,
}: {
  active: PlatformTabId;
  onSelect: (id: PlatformTabId) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {PLATFORM_TABS.map(({ id, Icon, count }) => (
        <button
          key={id}
          type="button"
          onClick={() => onSelect(id)}
          className="flex shrink-0 items-center justify-start rounded-2xl px-3 py-2 transition-colors"
          style={{
            border: active === id ? '2px solid transparent' : '0.5px solid transparent',
            background: active === id ? ACTIVE_STYLE : INACTIVE_STYLE,
          }}
        >
          <Icon height={35} />
          <span className="text-sm font-bold text-white">{count}</span>
        </button>
      ))}
    </div>
  );
}
