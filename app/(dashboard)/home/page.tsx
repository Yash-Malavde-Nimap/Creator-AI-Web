'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { useRegistrationStore } from '@/store/registration.store';
import InstagramIcon from '@/components/common/svgs/SocialMedia/InstagramIcon';
import FacebookIcon from '@/components/common/svgs/SocialMedia/FacebookIcon';
import ThreadsIcon from '@/components/common/svgs/SocialMedia/ThreadsIcon';
import LinkedInIcon from '@/components/common/svgs/SocialMedia/LinkedInIcon';

/* ── Credit Left card ───────────────────────────────────────────────────── */

function CreditCard() {
  return (
    <div
      className="w-full rounded-2xl px-4 py-3"
      style={{
        background: 'rgba(16, 32, 72, 0.55)',
        border: '1.5px solid rgba(100, 150, 220, 0.2)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <p className="mb-2 text-xs font-medium text-white/50">Credit Left</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          {/* Image credits */}
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.75" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M21 15l-5-5L5 21" />
            </svg>
            <span className="text-lg font-bold text-white">156</span>
          </div>
          {/* Video credits */}
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
            </svg>
            <span className="text-lg font-bold text-white">87</span>
          </div>
        </div>
        {/* Add Alert button */}
        <button
          type="button"
          className="rounded-full px-4 py-1.5 text-xs font-semibold text-white/80 transition-colors hover:text-white"
          style={{
            background: 'rgba(10, 22, 55, 0.85)',
            border: '1.5px solid rgba(100, 150, 220, 0.22)',
          }}
        >
          Add Alert
        </button>
      </div>
    </div>
  );
}

/* ── Platform data ──────────────────────────────────────────────────────── */

const PLATFORM_TABS = [
  { id: 'instagram', name: 'Instagram', Icon: InstagramIcon, count: 24 },
  { id: 'facebook', name: 'Facebook', Icon: FacebookIcon, count: 13 },
  { id: 'threads', name: 'Threads', Icon: ThreadsIcon, count: 15 },
  { id: 'linkedin', name: 'LinkedIN', Icon: LinkedInIcon, count: 18 },
] as const;

type PlatformTabId = typeof PLATFORM_TABS[number]['id'];

/* ── Large platform tabs ────────────────────────────────────────────────── */

function LargePlatformTabs({
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
            background:
              active === id
                ? 'rgba(74, 159, 213, 0.18)'
                : 'rgba(16, 32, 72, 0.55)',
            border:
              active === id
                ? '1.5px solid rgba(74, 159, 213, 0.45)'
                : '1.5px solid rgba(100, 150, 220, 0.2)',
            minWidth: '80px',
          }}
        >
          <Icon size={36} />
          <span className="text-xs font-medium text-white/70">{name}</span>
          <span className="text-base font-bold text-white">{count}</span>
        </button>
      ))}
    </div>
  );
}

/* ── Compact platform tabs ──────────────────────────────────────────────── */

function CompactPlatformTabs({
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
          className="flex shrink-0 items-center gap-2 rounded-2xl px-3 py-2 transition-colors"
          style={{
            background:
              active === id
                ? 'rgba(74, 159, 213, 0.18)'
                : 'rgba(255, 255, 255, 0.07)',
            border:
              active === id
                ? '1.5px solid rgba(74, 159, 213, 0.45)'
                : '1.5px solid rgba(100, 150, 220, 0.15)',
          }}
        >
          <Icon size={26} />
          <span className="text-sm font-bold text-white">{count}</span>
        </button>
      ))}
    </div>
  );
}

/* ── Post content (highlights hashtags) ────────────────────────────────── */

function PostContent({ text }: { text: string }) {
  const paragraphs = text.split('\n').filter(Boolean);
  return (
    <div className="space-y-2">
      {paragraphs.map((para, pi) => {
        const parts = para.split(/(#\w+)/g);
        return (
          <p key={pi} className="text-sm leading-relaxed text-white/85">
            {parts.map((part, i) =>
              part.startsWith('#') ? (
                <span key={i} className="font-semibold text-[#4a9fd5]">
                  {part}
                </span>
              ) : (
                part
              )
            )}
          </p>
        );
      })}
    </div>
  );
}

/* ── Mock post image placeholder ────────────────────────────────────────── */

function PostImagePlaceholder({ variant }: { variant: 1 | 2 }) {
  const gradient =
    variant === 1
      ? 'linear-gradient(135deg, #1a1060 0%, #2d1b8e 40%, #6b21a8 70%, #c2410c 100%)'
      : 'linear-gradient(135deg, #0c1547 0%, #1e3a8a 50%, #1d4ed8 80%, #0369a1 100%)';
  return (
    <div
      className="mt-3 w-full rounded-2xl"
      style={{ background: gradient, aspectRatio: '16/9' }}
    />
  );
}

/* ── Mock data ──────────────────────────────────────────────────────────── */

const MOCK_POSTS = [
  {
    id: '1',
    text: "🚀 AI is no longer the future — it's the biggest competitive advantage today. The companies adopting AI now.\n#AI #Innovation #FutureOfWork #Tech",
    image: 1 as const,
    timestamp: 'Mon, 25 Jan 2026 : 03.25 PM',
  },
  {
    id: '2',
    text: "🤖 The smartest employee in your company might soon be an AI agent. From content to operations, automation is changing everything faster than expected.\n#ArtificialIntelligence #AI",
    image: 2 as const,
    timestamp: 'Mon, 25 Jan 2026 : 03.25 PM',
  },
  {
    id: '3',
    text: "🚀 AI is no longer the future — it's the biggest competitive advantage today. The companies adopting AI now. ⚡ Every industry is being rewritten by AI right now. The only question is: will you lead the change or react to it later?\n\nThe smartest companies are using it like an employee, analyst, designer, and growth engine combined. This shift will create the next generation of billion-dollar businesses. AI is no longer optional — it's infrastructure.\n\n#ArtificialIntelligence #Automation #TechTrends\n#Startup #AIRevolution #Create #Productivity",
    image: null,
    timestamp: 'Mon, 25 Jan 2026 : 03.25 PM',
  },
];

/* ── WhatsApp FAB ───────────────────────────────────────────────────────── */

function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[88px] right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform active:scale-95 hover:scale-105"
      style={{ background: '#25D366', boxShadow: '0 4px 20px rgba(37,211,102,0.4)' }}
      aria-label="WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function HomePage() {
  const { name } = useRegistrationStore();
  const displayName = name ? name.split(' ')[0] : '';

  const [scrolled, setScrolled] = useState(false);
  const [activePlatform, setActivePlatform] = useState<PlatformTabId>('instagram');
  const [timePeriod, setTimePeriod] = useState('Last 7 days');

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 90);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <>
      <div className="px-5 pt-12 md:px-56">
        {/* Greeting */}
        <h1 className="mb-4 text-[28px] font-bold text-white">Hey {displayName},</h1>

        {/* Credit Left card — collapses when scrolled */}
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: scrolled ? '0' : '110px',
            opacity: scrolled ? 0 : 1,
            marginBottom: scrolled ? '0' : '20px',
          }}
        >
          <CreditCard />
        </div>

        {/* Posts header */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-lg font-bold text-white">Posts</span>
          <button
            type="button"
            className="flex items-center gap-1 text-sm text-white/55"
            onClick={() =>
              setTimePeriod((p) =>
                p === 'Last 7 days' ? 'Last 30 days' : p === 'Last 30 days' ? 'All time' : 'Last 7 days'
              )
            }
          >
            {timePeriod}
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Platform tabs — switches between large and compact on scroll */}
        <div className="mb-5 transition-all duration-300 ease-in-out">
          {scrolled ? (
            <CompactPlatformTabs active={activePlatform} onSelect={setActivePlatform} />
          ) : (
            <LargePlatformTabs active={activePlatform} onSelect={setActivePlatform} />
          )}
        </div>

        {/* Post feed */}
        <div className="space-y-6 pb-6">
          {MOCK_POSTS.map((post) => (
            <div key={post.id}>
              <PostContent text={post.text} />
              {post.image && <PostImagePlaceholder variant={post.image} />}
              <p className="mt-2 text-xs text-white/35">{post.timestamp}</p>
            </div>
          ))}
        </div>
      </div>

      <WhatsAppFAB />
    </>
  );
}
