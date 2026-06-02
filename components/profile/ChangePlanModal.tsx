"use client";

import { useState } from "react";

import { capitalizeText, cn } from "@/lib/utils";
import { PlanCard, type PlanCardData } from "@/components/plans/PlanCard";

type BillingCycle = "monthly" | "annually";
export type PlanId = "starter" | "pro" | "business";

const PLANS: (PlanCardData & { id: PlanId })[] = [
  {
    id: "starter",
    name: "STARTER",
    monthlyPrice: 24.99,
    annualPrice: 19.99,
    currency: "€",
    features: [
      "WhatsApp integration",
      "AI content & image generation",
      "Prohibited words check (for posts)",
      "Publishing channels: Instagram, LinkedIn, X, Threads",
      "Unlimited AI text generation (captions/post text/#)",
      "Unlimited post scheduling",
      "Ideal for freelancers & micro-businesses",
    ],
    usage: [
      { value: "40 Images/mo", suffix: " (from user gallery OR AI-generated)" },
      { value: "15 Videos/mo", suffix: " (from user gallery)" },
    ],
  },
  {
    id: "pro",
    name: "PRO",
    monthlyPrice: 59.99,
    annualPrice: 47.99,
    currency: "€",
    features: ["Same as Starter"],
    usage: [
      { value: "150 Images/mo", suffix: " (from user gallery OR AI-generated)" },
      { value: "30 Videos/mo", suffix: " (from user gallery)" },
    ],
  },
  {
    id: "business",
    name: "BUSINESS",
    monthlyPrice: 99.99,
    annualPrice: 79.99,
    currency: "€",
    features: ["Same as Pro"],
    usage: [
      { value: "300 Images/mo", suffix: " (from user gallery OR AI-generated)" },
      { value: "90 Videos/mo", suffix: " (from user gallery)" },
    ],
  },
];

interface ChangePlanModalProps {
  currentPlanId: PlanId;
  onClose: () => void;
}

export function ChangePlanModal({ currentPlanId, onClose }: ChangePlanModalProps) {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [selectedPlan, setSelectedPlan] = useState<PlanId>(currentPlanId);

  const isDifferent = selectedPlan !== currentPlanId;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
      style={{ background: "#050d1f" }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 flex items-center px-5 md:px-96 pt-12 pb-2"
        style={{ background: "#050d1f" }}
      >
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:text-white"
          style={{ background: "rgba(255,255,255,0.08)" }}
          aria-label="Close"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center px-5 md:px-96 pb-4">
        <h2 className="text-center text-[22px] font-bold text-white">Choose Your Plan</h2>
        <p className="mt-1.5 text-center text-sm leading-relaxed text-white/55">
          Unlock powerful AI creation tools designed
          <br />
          for your content journey.
        </p>

        {/* Billing toggle */}
        <div className="mt-5 flex items-center rounded-full">
          {(["monthly", "annually"] as BillingCycle[]).map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBilling(cycle)}
              className={cn(
                "rounded-full cursor-pointer px-5 py-2 text-sm font-semibold capitalize transition-all",
                billing === cycle
                  ? "border border-[#D7E2FF] text-[#D7E2FF] shadow"
                  : "text-[#D7E2FF]",
              )}
            >
              {capitalizeText(cycle)}
            </button>
          ))}
        </div>

        {/* Plan cards */}
        <div className="mt-5 flex w-full flex-col gap-3">
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

        <p className="mt-5 text-center text-xs leading-relaxed text-white/40">
          Once you upgrade/downgrade, you cannot
          <br />
          upgrade/downgrade again for the next 1 month
        </p>
      </div>

      {/* Sticky bottom button */}
      <div
        className="sticky bottom-0 px-5 md:px-96 pb-8 pt-3"
        style={{ background: "#050d1f" }}
      >
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "w-full rounded-full py-4 text-base font-bold text-white transition-opacity active:scale-[0.98]",
            isDifferent ? "sb-btn-gradient" : "sb-btn-dark",
          )}
        >
          Proceed to payment
        </button>
      </div>
    </div>
  );
}
