'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

/* ── Platform icons ─────────────────────────────────────────────────────── */

function InstagramIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <defs>
        <linearGradient id="ig" x1="0" y1="38" x2="38" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f09433" />
          <stop offset="0.25" stopColor="#e6683c" />
          <stop offset="0.5" stopColor="#dc2743" />
          <stop offset="0.75" stopColor="#cc2366" />
          <stop offset="1" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect width="38" height="38" rx="10" fill="url(#ig)" />
      <rect x="10" y="10" width="18" height="18" rx="5" stroke="white" strokeWidth="1.75" fill="none" />
      <circle cx="19" cy="19" r="4.5" stroke="white" strokeWidth="1.75" fill="none" />
      <circle cx="25.5" cy="12.5" r="1.25" fill="white" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <circle cx="19" cy="19" r="19" fill="#1877F2" />
      <path
        d="M21 12.5h2.5V9.3C23 9.2 21.8 9 20.5 9c-2.7 0-4.5 1.7-4.5 4.8V17H13v3.5h3v9h3.5v-9H22l.5-3.5h-3.5v-2.7c0-1 .3-1.8 1.5-1.8H21z"
        fill="white"
      />
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <circle cx="19" cy="19" r="19" fill="#1a1a1a" />
      <path
        d="M24.5 17.8c-.2-.1-.4-.2-.6-.3-.4-2.3-2.1-3.5-4.5-3.5-1.6 0-2.9.7-3.7 1.9l1.3.9c.6-.9 1.4-1.3 2.5-1.3 1.1 0 1.9.5 2.4 1.2-.6-.1-1.2-.1-1.9-.1-2.3 0-4 1.2-4 3 0 .9.4 1.6 1.1 2.1.6.4 1.4.6 2.3.6 1.1 0 2-.4 2.7-1.1.5-.5.8-1.2.9-2 .4.2.6.5.6.9 0 1.7-2.2 2.9-4.5 2.9-3.3 0-5.5-2-5.5-5s2.2-5 5.5-5c2.4 0 4.2.9 5.3 2.6l1.4-.9c-1.4-2.1-3.7-3.2-6.7-3.2-4 0-7 2.6-7 6.5s3 6.5 7 6.5c3.5 0 6-2 6-5 0-.9-.4-1.7-1.1-2.2z"
        fill="white"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <rect width="38" height="38" rx="9" fill="#0077B5" />
      <rect x="10" y="15" width="4" height="13" fill="white" />
      <circle cx="12" cy="11.5" r="2.5" fill="white" />
      <path d="M17 15h3.8v1.8c.7-1.2 2-2 3.7-2 3 0 4.5 1.8 4.5 5.2V28H25v-7.5c0-1.7-.7-2.5-2-2.5s-2.2 1-2.2 2.8V28H17V15z" fill="white" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <circle cx="19" cy="19" r="19" fill="#000000" />
      <path
        d="M21.3 17.4L27.5 10h-1.5l-5.4 6.3L16 10h-5l6.5 9.5L11 28h1.5l5.7-6.6 4.6 6.6H28l-6.7-10.6zm-2 2.3l-.7-.9-5.3-7.6h2.3l4.2 6 .7.9 5.5 7.9h-2.3l-4.4-6.3z"
        fill="white"
      />
    </svg>
  );
}

/* ── Toggle switch ──────────────────────────────────────────────────────── */

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className="relative inline-flex h-[26px] w-[46px] shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200"
      style={{
        background: checked
          ? 'linear-gradient(90deg, #4a9fd5 0%, #3ab5c0 100%)'
          : 'rgba(255,255,255,0.2)',
      }}
    >
      <span
        className="inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow transition-transform duration-200"
        style={{ transform: checked ? 'translateX(22px)' : 'translateX(3px)' }}
      />
    </button>
  );
}

/* ── Platform data ──────────────────────────────────────────────────────── */

type PlatformId = 'instagram' | 'facebook' | 'threads' | 'linkedin' | 'x';

interface Platform {
  id: PlatformId;
  name: string;
  Icon: React.FC;
}

const PLATFORMS: Platform[] = [
  { id: 'instagram', name: 'Instagram', Icon: InstagramIcon },
  { id: 'facebook', name: 'Facebook', Icon: FacebookIcon },
  { id: 'threads', name: 'Threads', Icon: ThreadsIcon },
  { id: 'linkedin', name: 'LinkedIN', Icon: LinkedInIcon },
  { id: 'x', name: 'X', Icon: XIcon },
];

interface PlatformState {
  connected: boolean;
  username: string;
  enabled: boolean;
}

/* ── Platform card ──────────────────────────────────────────────────────── */

function PlatformCard({
  platform,
  state,
  onConnect,
  onToggle,
  onChange,
}: {
  platform: Platform;
  state: PlatformState;
  onConnect: () => void;
  onToggle: () => void;
  onChange: () => void;
}) {
  const { Icon, name } = platform;
  const { connected, username, enabled } = state;

  return (
    <div
      className="w-full rounded-2xl p-4"
      style={{
        background: 'rgba(16, 32, 72, 0.55)',
        border: '1.5px solid rgba(100, 150, 220, 0.2)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-white">{name}</span>
        {connected && <Toggle checked={enabled} onChange={onToggle} />}
      </div>

      {/* Body row */}
      <div className="mt-3 flex items-center gap-3">
        <Icon />
        {connected ? (
          <>
            <span className="flex-1 text-sm text-white/70">@{username}</span>
            <button
              type="button"
              onClick={onChange}
              className="text-sm font-semibold text-[#f5a623] hover:text-[#f7bb52]"
            >
              Change
            </button>
          </>
        ) : (
          <>
            <div className="flex-1" />
            <button
              type="button"
              onClick={onConnect}
              className="text-sm font-semibold text-[#f5a623] hover:text-[#f7bb52]"
            >
              Connect
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Connect / Change modal ─────────────────────────────────────────────── */

interface ModalState {
  platformId: PlatformId;
  platformName: string;
  currentUsername: string;
}

function ConnectModal({
  modal,
  onClose,
  onSubmit,
}: {
  modal: ModalState;
  onClose: () => void;
  onSubmit: (username: string) => void;
}) {
  const [value, setValue] = useState(modal.currentUsername);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.replace(/^@/, '').trim();
    if (trimmed) onSubmit(trimmed);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60"
        style={{ backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl px-6 pb-10 pt-5"
        style={{
          background: 'rgba(8, 18, 45, 0.98)',
          border: '1.5px solid rgba(100, 150, 220, 0.2)',
          borderBottom: 'none',
        }}
      >
        {/* Handle */}
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-white/20" />

        <h2 className="mb-5 text-center text-lg font-bold text-white">
          {modal.currentUsername ? 'Change' : 'Connect'} {modal.platformName}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/50">
              @
            </span>
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="username"
              className="sb-input w-full rounded-2xl py-3 pl-8 pr-4 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={!value.replace(/^@/, '').trim()}
            className="sb-btn-gradient w-full rounded-2xl py-3 text-sm font-bold text-white disabled:opacity-40"
          >
            {modal.currentUsername ? 'Update' : 'Connect'}
          </button>
        </form>
      </div>
    </>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */

const INITIAL_CONNECTIONS: Record<PlatformId, PlatformState> = {
  instagram: { connected: false, username: '', enabled: false },
  facebook: { connected: false, username: '', enabled: false },
  threads: { connected: false, username: '', enabled: false },
  linkedin: { connected: false, username: '', enabled: false },
  x: { connected: false, username: '', enabled: false },
};

export default function SocialMediaPage() {
  const [connections, setConnections] =
    useState<Record<PlatformId, PlatformState>>(INITIAL_CONNECTIONS);
  const [modal, setModal] = useState<ModalState | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  };

  const handleConnect = (platform: Platform) => {
    setModal({ platformId: platform.id, platformName: platform.name, currentUsername: '' });
  };

  const handleChange = (platform: Platform) => {
    setModal({
      platformId: platform.id,
      platformName: platform.name,
      currentUsername: connections[platform.id].username,
    });
  };

  const handleToggle = (id: PlatformId) => {
    setConnections((prev) => ({
      ...prev,
      [id]: { ...prev[id], enabled: !prev[id].enabled },
    }));
  };

  const handleModalSubmit = (username: string) => {
    if (!modal) return;
    const { platformId, platformName } = modal;
    setConnections((prev) => ({
      ...prev,
      [platformId]: { connected: true, username, enabled: true },
    }));
    showToast(`${platformName} details updated successfully`);
    setModal(null);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col px-5 pt-14">
        {/* Title */}
        <h1 className="mb-5 text-xl font-bold text-white">
          <span className="text-white/50"># </span>Social Media
        </h1>

        {/* Platform cards */}
        <div className="flex flex-col gap-4">
          {PLATFORMS.map((platform) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              state={connections[platform.id]}
              onConnect={() => handleConnect(platform)}
              onToggle={() => handleToggle(platform.id)}
              onChange={() => handleChange(platform)}
            />
          ))}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={cn(
            'pointer-events-none fixed left-1/2 top-6 z-50 -translate-x-1/2 whitespace-nowrap rounded-2xl px-5 py-2.5 text-sm font-medium text-white shadow-lg',
            'transition-all duration-300'
          )}
          style={{
            background: 'linear-gradient(90deg, #3a7fc1 0%, #4a9fd5 100%)',
            boxShadow: '0 4px 24px rgba(74,159,213,0.35)',
          }}
        >
          {toast}
        </div>
      )}

      {/* Connect / Change modal */}
      {modal && (
        <ConnectModal
          modal={modal}
          onClose={() => setModal(null)}
          onSubmit={handleModalSubmit}
        />
      )}
    </>
  );
}
