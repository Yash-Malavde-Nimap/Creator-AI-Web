'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import InstagramIcon from '@/components/common/svgs/SocialMedia/InstagramIcon';
import FacebookIcon from '@/components/common/svgs/SocialMedia/FacebookIcon';
import ThreadsIcon from '@/components/common/svgs/SocialMedia/ThreadsIcon';
import LinkedInIcon from '@/components/common/svgs/SocialMedia/LinkedInIcon';
import XIcon from '@/components/common/svgs/SocialMedia/XIcon';

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
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
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
        // background: 'rgba(16, 32, 72, 0.55)',
        border: '1.5px solid #779CE9',
        backdropFilter: 'blur(4px)',
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-white">{name}</span>
        {connected && <Toggle checked={enabled} onChange={onToggle} />}
      </div>

      {/* Body row */}
      <div className="mt-3 flex items-center gap-3 bg-[#0A152F] " style={{
        border:"1px solid #9ABBFF",
        padding:"0.5rem 0",
        paddingRight:"1rem",
        borderRadius:"50px"
      }}>
        <Icon height="40" />
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
              placeholder="Username"
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
      <div className="flex min-h-screen flex-col px-5 pt-5">
        {/* Title */}
        <h1 className="mb-5 text-xl font-bold text-[#D7E2FF]">
          # Social Media
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
