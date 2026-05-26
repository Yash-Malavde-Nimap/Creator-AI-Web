'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { BottomNextButton } from '@/components/onboarding/OnboardingButtons';
import { ROUTES } from '@/constants/routes';
import { useRegistrationStore } from '@/store/registration.store';
import { cn } from '@/lib/utils';

type BillingCycle = 'monthly' | 'annually';
type PlanId = 'starter' | 'pro' | 'business';

interface PlanFeature {
  text: string;
  highlight?: boolean;
}

interface Plan {
  id: PlanId;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  currency: string;
  features: PlanFeature[];
  usage: PlanFeature[];
}

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'STARTER',
    monthlyPrice: 24.99,
    annualPrice: 19.99,
    currency: '€',
    features: [
      { text: 'WhatsApp integration' },
      { text: 'AI content & image generation' },
      { text: 'Prohibited words check (for posts)' },
      { text: 'Publishing channels: Instagram, LinkedIn, X, Threads' },
      { text: 'Unlimited AI text generation (captions/post text/#)' },
      { text: 'Unlimited post scheduling' },
      { text: 'Ideal for freelancers & micro-businesses' },
    ],
    usage: [
      { text: '40 Images/mo', highlight: true },
      { text: ' (from user gallery OR AI-generated)' },
      { text: '15 Videos/mo', highlight: true },
      { text: ' (from user gallery)' },
    ],
  },
  {
    id: 'pro',
    name: 'PRO',
    monthlyPrice: 59.99,
    annualPrice: 47.99,
    currency: '€',
    features: [{ text: 'Same as Starter' }],
    usage: [
      { text: '150 Images/mo', highlight: true },
      { text: ' (from user gallery OR AI-generated)' },
      { text: '30 Videos/mo', highlight: true },
      { text: ' (from user gallery)' },
    ],
  },
  {
    id: 'business',
    name: 'BUSINESS',
    monthlyPrice: 99.99,
    annualPrice: 79.99,
    currency: '€',
    features: [{ text: 'Same as Pro' }],
    usage: [
      { text: '300 Images/mo', highlight: true },
      { text: ' (from user gallery OR AI-generated)' },
      { text: '90 Videos/mo', highlight: true },
      { text: ' (from user gallery)' },
    ],
  },
];

export default function PlansPage() {
  const router = useRouter();
  const { name } = useRegistrationStore();
  const [billing, setBilling] = useState<BillingCycle>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('starter');

  const displayName = name ? name.split(' ')[0] : 'there';

  const handleProceed = () => {
    // Navigate to payment (placeholder for now)
    router.push(ROUTES.HOME);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center px-5 pb-28 pt-12">
        <div className="flex w-full max-w-sm flex-col items-center">
          {/* Greeting */}
          <h1 className="text-center text-[28px] font-extrabold text-white">
            Hey {displayName},
          </h1>

          {/* Sub-heading */}
          <h2 className="mt-1 text-center text-[22px] font-bold text-white">Choose Your Plan</h2>
          <p className="mt-2 text-center text-sm leading-relaxed text-white/60">
            Unlock powerful AI creation tools designed
            <br />
            for your content journey.
          </p>

          {/* Billing toggle */}
          <div
            className="mt-6 flex items-center gap-0 rounded-full p-1"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1.5px solid rgba(255,255,255,0.14)',
            }}
          >
            {(['monthly', 'annually'] as BillingCycle[]).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBilling(cycle)}
                className={cn(
                  'rounded-full px-5 py-2 text-sm font-semibold capitalize transition-all duration-200',
                  billing === cycle
                    ? 'bg-white text-[#050d1f] shadow'
                    : 'text-white/70 hover:text-white'
                )}
              >
                {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
              </button>
            ))}
          </div>

          {/* Plan cards */}
          <div className="mt-6 flex md:flex-row w-full flex-col gap-4">
            {PLANS.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                billing={billing}
                selected={selectedPlan === plan.id}
                onSelect={() => setSelectedPlan(plan.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <BottomNextButton onClick={handleProceed}>Proceed to payment</BottomNextButton>
    </>
  );
}

/* ── Plan card ──────────────────────────────────────────────────────────────── */
function PlanCard({
  plan,
  billing,
  selected,
  onSelect,
}: {
  plan: Plan;
  billing: BillingCycle;
  selected: boolean;
  onSelect: () => void;
}) {
  const price = billing === 'monthly' ? plan.monthlyPrice : plan.annualPrice;

  // Split usage into pairs: [highlight text, suffix text]
  const usagePairs: Array<{ value: string; suffix: string }> = [];
  for (let i = 0; i < plan.usage.length; i += 2) {
    usagePairs.push({
      value: plan.usage[i].text,
      suffix: plan.usage[i + 1]?.text ?? '',
    });
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn('sb-plan-card w-full rounded-2xl p-4 text-left flex-1', selected && 'selected')}
    >
      {/* Card header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Radio */}
          <div
            className={cn(
              'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
              selected
                ? 'border-[#4a9fd5]'
                : 'border-white/40'
            )}
          >
            {selected && (
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: 'linear-gradient(135deg, #4a9fd5, #e8a020)' }}
              />
            )}
          </div>
          <span className="text-sm font-bold tracking-wider text-white">{plan.name}</span>
        </div>

        {/* Price */}
        <div className="text-right">
          <span className="text-base font-bold text-[#e8a020]">
            {plan.currency}{price.toFixed(2)}
          </span>
          <span className="ml-1 text-xs text-white/50">/ mo</span>
        </div>
      </div>

      {/* Features */}
      <div className="mt-3 pl-8">
        <p className="mb-1.5 text-xs font-semibold text-white/80">Features</p>
        <ul className="space-y-1">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-white/65">
              <span className="mt-1 shrink-0 text-white/40">•</span>
              {f.text}
            </li>
          ))}
        </ul>

        {/* Usage */}
        <p className="mb-1.5 mt-3 text-xs font-semibold text-white/80">Included usage:</p>
        <ul className="space-y-1">
          {usagePairs.map((pair, i) => (
            <li key={i} className="flex items-start gap-2 text-xs">
              <span className="mt-1 shrink-0 text-white/40">•</span>
              <span>
                <span className="font-semibold text-[#e8a020]">{pair.value}</span>
                <span className="text-white/60">{pair.suffix}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}
