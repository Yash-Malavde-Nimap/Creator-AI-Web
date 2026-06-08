"use client";

import { useEffect, useState } from "react";

import InstagramIcon from "@/components/common/svgs/SocialMedia/InstagramIcon";
import FacebookIcon from "@/components/common/svgs/SocialMedia/FacebookIcon";
import ThreadsIcon from "@/components/common/svgs/SocialMedia/ThreadsIcon";
import LinkedInIcon from "@/components/common/svgs/SocialMedia/LinkedInIcon";
import XIcon from "@/components/common/svgs/SocialMedia/XIcon";
import { toast } from "@/lib/toast";
import {
  PlatformCard,
  type Platform,
  type PlatformState,
} from "@/components/social-media/PlatformCard";

/* ── Platform data ──────────────────────────────────────────────────────── */

type PlatformId = "instagram" | "facebook" | "threads" | "linkedin" | "x";

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

const INITIAL_CONNECTIONS: Record<PlatformId, PlatformState> = {
  instagram: { connected: false, username: "", enabled: false },
  facebook: { connected: false, username: "", enabled: false },
  threads: { connected: false, username: "", enabled: false },
  linkedin: { connected: false, username: "", enabled: false },
  x: { connected: false, username: "", enabled: false },
};

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function SocialMediaPage() {
  const [connections, setConnections] =
    useState<Record<PlatformId, PlatformState>>(INITIAL_CONNECTIONS);

  const checkStatus = async () => {
    for (const p of PLATFORMS) {
      try {
        const res = await fetch(p.statusPath!);
        if (!res.ok) continue;
        const data = await res.json();
        if (!data.connected) continue;
        setConnections((prev) => ({
          ...prev,
          [p.id as PlatformId]: {
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

  useEffect(() => {
    document.body.style.pointerEvents = "";
    toast.dismiss();
    checkStatus();

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
      toast.error(
        errorMap[params.get("error")!] ??
          "Connection failed. Please try again.",
      );
      window.history.replaceState({}, "", window.location.pathname);
    }

    const noop = () => {};
    window.addEventListener("unload", noop);

    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        toast.dismiss();
        window.location.reload();
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("unload", noop);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  const handleChange = async (platform: Platform) => {
    toast.dismiss();
    toast.loading(`Disconnecting from ${platform.name}…`);
    try {
      await fetch(`/api/auth/${platform.id}/revoke`, { method: "POST" });
    } catch {
      // revoke failed — proceed anyway
    }
    window.location.href = `${platform.authPath}?change=true`;
  };

  const handleToggle = (id: PlatformId) => {
    setConnections((prev) => ({
      ...prev,
      [id]: { ...prev[id], enabled: !prev[id].enabled },
    }));
  };

  return (
    <div className="flex min-h-screen flex-col px-5 md:px-96 pt-5 ">
      <h1 className="mb-5 text-xl font-bold text-[#D7E2FF]"># Social Media</h1>

      <div className="flex flex-col gap-4">
        {PLATFORMS.map((platform) => (
          <PlatformCard
            key={platform.id}
            platform={platform}
            state={connections[platform.id as PlatformId]}
            onToggle={() => handleToggle(platform.id as PlatformId)}
            onChange={() => handleChange(platform)}
          />
        ))}
      </div>
    </div>
  );
}
