export function ProfileAvatar({ initial }: { initial: string }) {
  return (
    <div className="mb-6 flex flex-col items-center">
      <div
        className="flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold text-white shadow-lg"
        style={{
          background: "linear-gradient(135deg, #f5a623 0%, #e8a020 50%, #dc2743 100%)",
          boxShadow: "0 4px 24px rgba(245,166,35,0.35)",
        }}
      >
        {initial}
      </div>
      <button
        type="button"
        className="mt-2 text-sm font-semibold text-[#f5a623] hover:text-[#f7bb52]"
      >
        Edit
      </button>
    </div>
  );
}
