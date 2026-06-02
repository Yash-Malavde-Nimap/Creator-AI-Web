interface CurrentPlanCardProps {
  planName: string;
  imageCredits: number;
  videoCredits: number;
  onChangePlan: () => void;
}

export function CurrentPlanCard({
  planName,
  imageCredits,
  videoCredits,
  onChangePlan,
}: CurrentPlanCardProps) {
  return (
    <div
      className="w-full rounded-2xl px-4 py-3"
      style={{
        background: "rgba(16, 32, 72, 0.55)",
        border: "1.5px solid rgba(100, 150, 220, 0.2)",
      }}
    >
      <p className="mb-1.5 text-xs font-medium text-white/50">Current Plan</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-white">
          <span className="font-semibold">{planName}</span>
          <span className="text-white/30">|</span>
          <span className="text-xs text-white/55">Credits left</span>
          {/* Image credits */}
          <svg className="h-4 w-4 text-white/55" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.75" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M21 15l-5-5L5 21" />
          </svg>
          <span className="text-xs font-semibold text-white">{imageCredits}</span>
          {/* Video credits */}
          <svg className="h-4 w-4 text-white/55" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
          </svg>
          <span className="text-xs font-semibold text-white">{videoCredits}</span>
        </div>
        <button
          type="button"
          onClick={onChangePlan}
          className="text-sm font-semibold text-[#f5a623] hover:text-[#f7bb52]"
        >
          Change Plan
        </button>
      </div>
    </div>
  );
}
