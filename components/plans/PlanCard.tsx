import { cn } from '@/lib/utils';
import GreenCheckIcon from '@/components/common/svgs/GreenCheckIcon';

export interface PlanUsage {
  value: string;
  suffix: string;
}

export interface PlanCardData {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  currency: string;
  features: string[];
  usage: PlanUsage[];
}

interface PlanCardProps {
  plan: PlanCardData;
  billing: 'monthly' | 'annually';
  selected: boolean;
  onSelect: () => void;
}

export function PlanCard({ plan, billing, selected, onSelect }: PlanCardProps) {
  const price = billing === 'monthly' ? plan.monthlyPrice : plan.annualPrice;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn('sb-plan-card w-full rounded-2xl p-4 text-left', selected && 'selected')}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
              selected ? 'border-none' : 'border-white/40',
            )}
          >
            {selected && <GreenCheckIcon height="20" width="20" />}
          </div>
          <span className="text-sm font-bold tracking-wider text-white">{plan.name}</span>
        </div>

        <div className="text-right">
          <span className="text-base font-bold text-[#e8a020]">
            {plan.currency}{price.toFixed(2)}
          </span>
          <span className="ml-1 text-xs text-white/50">/ mo</span>
        </div>
      </div>

      {/* Features */}
      <div className="mt-3">
        <p className="mb-1.5 text-xs font-semibold text-white/80">Features</p>
        <ul className="space-y-1">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-white/65">
              <span className="mt-1 shrink-0 text-white/40">•</span>
              {f}
            </li>
          ))}
        </ul>

        <p className="mb-1.5 mt-3 text-xs font-semibold text-white/80">Included usage:</p>
        <ul className="space-y-1">
          {plan.usage.map((u, i) => (
            <li key={i} className="flex items-start gap-2 text-xs">
              <span className="mt-1 shrink-0 text-white/40">•</span>
              <span>
                <span className="font-semibold text-[#e8a020]">{u.value}</span>
                <span className="text-white/60">{u.suffix}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}
