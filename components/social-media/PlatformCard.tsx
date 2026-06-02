import GreenCheckIcon from "@/components/common/svgs/GreenCheckIcon";

export interface Platform {
  id: string;
  name: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  authPath: string | null;
  statusPath: string | null;
}

export interface PlatformState {
  connected: boolean;
  username: string;
  enabled: boolean;
}

interface PlatformCardProps {
  platform: Platform;
  state: PlatformState;
  onToggle: () => void;
  onChange: () => void;
}

export function PlatformCard({ platform, state, onToggle, onChange }: PlatformCardProps) {
  const { Icon, name } = platform;
  const { connected, username } = state;

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
        <p className="flex items-center gap-2 text-base font-semibold text-white">
          {name}
          {connected && <GreenCheckIcon />}
        </p>
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
              className="cursor-pointer text-sm font-semibold text-[#f5a623] hover:text-[#f7bb52]"
            >
              Disconnect
            </button>
          </>
        ) : (
          <>
            <div className="flex-1" />
            <a
              href={platform.authPath ?? "#"}
              className="text-sm font-semibold text-[#f5a623] hover:text-[#f7bb52]"
            >
              Connect
            </a>
          </>
        )}
      </div>
    </div>
  );
}
