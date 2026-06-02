export function ProfileIcon(props: any) {
  const active = props?.stroke === "#4a9fd5";
  
  return (
    <div
      className="flex h-7 w-7 items-center justify-center rounded-full transition-opacity"
      style={{
        background: active
          ? "linear-gradient(135deg, #f5a623 0%, #e8a020 100%)"
          : "rgba(255,255,255,0.18)",
        opacity: active ? 1 : 0.55,
      }}
    >
      <svg
        className="h-4 w-4 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
      </svg>
    </div>
  );
}
