import { cn } from '@/lib/utils';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  className?: string;
}

export function Select({ value, onChange, options, className }: SelectProps) {
  return (
    <div className={cn('relative inline-flex items-center gap-1', className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-transparent pr-4 text-inherit focus:outline-none cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#0A152F] text-white">
            {opt.label}
          </option>
        ))}
      </select>
      {/* Chevron */}
      <svg
        className="pointer-events-none absolute right-0 h-3.5 w-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
