export function ProfileField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <p className="mb-1.5 text-sm font-medium text-white/70">{label}</p>
      {children}
    </div>
  );
}

export function ReadonlyInput({ value }: { value: string }) {
  return (
    <div
      className="flex w-full items-center rounded-full px-5 py-3.5 text-sm text-white"
      style={{
        background: "rgba(16, 34, 76, 0.65)",
        border: "1.5px solid rgba(100, 150, 220, 0.25)",
      }}
    >
      {value}
    </div>
  );
}
