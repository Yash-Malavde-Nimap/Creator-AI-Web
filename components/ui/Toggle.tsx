interface ToggleProps {
  checked: boolean;
  onChange: () => void;
}

export function Toggle({ checked, onChange }: ToggleProps) {
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
