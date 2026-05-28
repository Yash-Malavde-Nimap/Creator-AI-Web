"use client";

import { useEffect, useState } from "react";

import InstagramIcon from "@/components/common/svgs/SocialMedia/InstagramIcon";
import FacebookIcon from "@/components/common/svgs/SocialMedia/FacebookIcon";
import ThreadsIcon from "@/components/common/svgs/SocialMedia/ThreadsIcon";
import LinkedInIcon from "@/components/common/svgs/SocialMedia/LinkedInIcon";
import XIcon from "@/components/common/svgs/SocialMedia/XIcon";
import { Toggle } from "@/components/ui/Toggle";
import { toast } from "@/lib/toast";
import GreenCheckIcon from "@/components/common/svgs/GreenCheckIcon";

/* ── Platform data ──────────────────────────────────────────────────────── */

type PlatformId = "instagram" | "facebook" | "threads" | "linkedin" | "x";

interface Platform {
  id: PlatformId;
  name: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  /** Backend OAuth start path — null means not yet supported */
  authPath: string | null;
  /** Backend status check path — null means not yet supported */
  statusPath: string | null;
}

const PLATFORMS: Platform[] = [
  {
    id: "instagram",
    name: "Instagram",
    Icon: InstagramIcon,
    authPath: "/api/auth/instagram",
    statusPath: "/api/social/instagram/status",
  },
  {
    id: "facebook",
    name: "Facebook",
    Icon: FacebookIcon,
    authPath: "/api/auth/facebook",
    statusPath: "/api/social/facebook/status",
  },
  {
    id: "threads",
    name: "Threads",
    Icon: ThreadsIcon,
    authPath: "/api/auth/threads",
    statusPath: "/api/social/threads/status",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    Icon: LinkedInIcon,
    authPath: "/api/auth/linkedin",
    statusPath: "/api/social/linkedin/status",
  },
  {
    id: "x",
    name: "X",
    Icon: XIcon,
    authPath: "/api/auth/x",
    statusPath: "/api/social/x/status",
  },
];

interface PlatformState {
  connected: boolean;
  username: string;
  enabled: boolean;
}

const INITIAL_CONNECTIONS: Record<PlatformId, PlatformState> = {
  instagram: { connected: false, username: "", enabled: false },
  facebook: { connected: false, username: "", enabled: false },
  threads: { connected: false, username: "", enabled: false },
  linkedin: { connected: false, username: "", enabled: false },
  x: { connected: false, username: "", enabled: false },
};

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
        border: "1.5px solid #779CE9",
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold text-white flex items-center gap-2">
          {name}
          {connected && <GreenCheckIcon />}
        </p>
        {/* {connected && <Toggle checked={enabled} onChange={onToggle} />} */}
      </div>

      {/* Body row */}
      <div
        className="mt-3 flex items-center gap-3 bg-[#0A152F]"
        style={{
          border: "1px solid #9ABBFF",
          padding: "0.5rem 0",
          paddingRight: "1rem",
          borderRadius: "50px",
        }}
      >
        <Icon height="40" />
        {connected ? (
          <>
            <span className="flex-1 text-sm text-white/70">@{username}</span>
            <button
              type="button"
              onClick={onChange}
              className="text-sm cursor-pointer font-semibold text-[#f5a623] hover:text-[#f7bb52]"
            >
              Disconnect
            </button>
          </>
        ) : (
          <>
            <div className="flex-1" />
            <button
              type="button"
              onClick={onConnect}
              className="text-sm cursor-pointer font-semibold text-[#f5a623] hover:text-[#f7bb52]"
            >
              Connect
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function SocialMediaPage() {
  const [connections, setConnections] =
    useState<Record<PlatformId, PlatformState>>(INITIAL_CONNECTIONS);

  const checkStatus = async () => {
    for (const p of PLATFORMS) {
      try {
        const res = await fetch(p?.statusPath);
        if (!res.ok) continue;
        const data = await res.json();
        if (!data.connected) continue;
        setConnections((prev) => ({
          ...prev,
          [p.id]: {
            connected: true,
            username: data.username ?? "",
            enabled: true,
          },
        }));
      } catch {
        // status endpoint not reachable — skip silently
      }
    }
  };

  /* Check connection status for all platforms on mount */
  useEffect(() => {
    checkStatus();

    // Detect OAuth callback — our callback route redirects back with ?connected=true
    const params = new URLSearchParams(window.location.search);
    if (params.get("connected") === "true") {
      const platform = params.get("platform") ?? "";
      const label =
        PLATFORMS.find((p) => p.id === platform)?.name ?? "Platform";
      toast.success(`${label} connected successfully!`);
      window.history.replaceState({}, "", window.location.pathname);
    } else if (params.get("error")) {
      const platformLabel =
        PLATFORMS.find((p) => p.id === params.get("platform"))?.name ?? "";
      const errorMap: Record<string, string> = {
        not_configured:
          `${platformLabel} credentials are not set up yet.`.trim(),
        oauth_denied: "Connection cancelled.",
        state_mismatch: "Security check failed. Please try again.",
        token_failed: "Could not retrieve access token. Please try again.",
        missing_verifier: "PKCE verifier missing. Please try again.",
        callback_failed: "OAuth callback failed. Please try again.",
        unknown_platform: "Unknown platform.",
      };
      const msg =
        errorMap[params.get("error")!] ??
        "Connection failed. Please try again.";
      toast.error(msg);
      window.history.replaceState({}, "", window.location.pathname);
    }

    // When window.location.href is used to navigate away, browsers may restore
    // this page from bfcache on back-navigation. bfcache preserves the DOM but
    // skips React re-hydration, leaving event handlers unresponsive. Force a
    // reload so the page is fully re-initialized.
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) window.location.reload();
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  /* Start OAuth flow — navigates to our Next.js API route which redirects to the provider */
  const handleConnect = (platform: Platform) => {
    toast.loading(`Redirecting to ${platform.name}…`);
    window.location.href = platform.authPath;
  };

  /* Revoke current token at the provider, then start a fresh OAuth flow */
  const handleChange = async (platform: Platform) => {
    toast.loading(`Disconnecting from ${platform.name}…`);
    try {
      await fetch(`/api/auth/${platform.id}/revoke`, { method: 'POST' });
    } catch {
      // If revoke request fails, proceed anyway — cookies will be cleared server-side on next connect
    }
    window.location.href = `${platform.authPath}?change=true`;
  };

  /* Toggle enabled/disabled locally */
  const handleToggle = (id: PlatformId) => {
    setConnections((prev) => ({
      ...prev,
      [id]: { ...prev[id], enabled: !prev[id].enabled },
    }));
  };

  return (
    <div className="flex min-h-screen flex-col px-5 md:px-60 pt-5">
      <h1 className="mb-5 text-xl font-bold text-[#D7E2FF]"># Social Media</h1>

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
  );
}
