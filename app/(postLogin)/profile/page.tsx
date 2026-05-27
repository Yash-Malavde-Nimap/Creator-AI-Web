"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { STORAGE_KEYS } from "@/constants/config";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useRegistrationStore } from "@/store/registration.store";
import { PlanCard, type PlanCardData } from "@/components/plans/PlanCard";

/* ── Plan data ──────────────────────────────────────────────────────────── */

type BillingCycle = "monthly" | "annually";
type PlanId = "starter" | "pro" | "business";

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
      {
        value: "150 Images/mo",
        suffix: " (from user gallery OR AI-generated)",
      },
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
      {
        value: "300 Images/mo",
        suffix: " (from user gallery OR AI-generated)",
      },
      { value: "90 Videos/mo", suffix: " (from user gallery)" },
    ],
  },
];

/* ── Change Plan modal ──────────────────────────────────────────────────── */

function ChangePlanModal({
  currentPlanId,
  onClose,
}: {
  currentPlanId: PlanId;
  onClose: () => void;
}) {
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
        className="sticky top-0 z-10 flex items-center px-5 pt-12 pb-2"
        style={{ background: "#050d1f" }}
      >
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:text-white"
          style={{ background: "rgba(255,255,255,0.08)" }}
          aria-label="Close"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center px-5 pb-4">
        <h2 className="text-center text-[22px] font-bold text-white">
          Choose Your Plan
        </h2>
        <p className="mt-1.5 text-center text-sm leading-relaxed text-white/55">
          Unlock powerful AI creation tools designed
          <br />
          for your content journey.
        </p>

        {/* Billing toggle */}
        <div
          className="mt-5 flex items-center rounded-full p-1"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1.5px solid rgba(255,255,255,0.14)",
          }}
        >
          {(["monthly", "annually"] as BillingCycle[]).map((cycle) => (
            <button
              key={cycle}
              type="button"
              onClick={() => setBilling(cycle)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold capitalize transition-all duration-200",
                billing === cycle
                  ? "bg-white text-[#050d1f] shadow"
                  : "text-white/70 hover:text-white",
              )}
            >
              {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
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

        {/* Disclaimer */}
        <p className="mt-5 text-center text-xs leading-relaxed text-white/40">
          Once you upgrade/downgrade, you cannot
          <br />
          upgrade/downgrade again for the next 1 month
        </p>
      </div>

      {/* Sticky bottom button */}
      <div
        className="sticky bottom-0 px-5 pb-8 pt-3"
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

/* ── Profile read-only field ────────────────────────────────────────────── */

function ProfileField({
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

function ReadonlyInput({ value }: { value: string }) {
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

/* ── Page ───────────────────────────────────────────────────────────────── */

const CURRENT_PLAN_ID: PlanId = "pro";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { name, email, phone, countryCode } = useRegistrationStore();

  const displayName = user?.name ?? name ?? "John Peter Smith";
  const displayEmail = user?.email ?? email ?? "johnsmith@gmail.com";
  const displayPhone = phone ?? "8679 978 567";
  const displayCode = countryCode ?? "+1";
  const initial = displayName.charAt(0).toUpperCase();

  const [showChangePlan, setShowChangePlan] = useState(false);

  const handleLogout = () => {
    logout();
    authService.clearSession();
    // Clear auth cookie so proxy redirects correctly
    document.cookie = `${STORAGE_KEYS.ACCESS_TOKEN}=; path=/; max-age=0`;
    router.push(ROUTES.WELCOME);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col px-5 pt-12">
        {/* Title */}
        <h1 className="mb-6 text-xl font-bold text-white">Profile</h1>

        {/* Avatar */}
        <div className="mb-6 flex flex-col items-center">
          <div
            className="flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold text-white shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, #f5a623 0%, #e8a020 50%, #dc2743 100%)",
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

        {/* Form fields */}
        <div className="flex w-full flex-col gap-4">
          <ProfileField label="Name">
            <ReadonlyInput value={displayName} />
          </ProfileField>

          <ProfileField label="Email ID">
            <ReadonlyInput value={displayEmail} />
          </ProfileField>

          <ProfileField label="Mobile">
            <div
              className="flex w-full items-center gap-2 rounded-full px-5 py-3.5 text-sm text-white"
              style={{
                background: "rgba(16, 34, 76, 0.65)",
                border: "1.5px solid rgba(100, 150, 220, 0.25)",
              }}
            >
              <span className="flex items-center gap-1 border-r border-white/20 pr-3 text-white/80">
                {displayCode}
                <svg
                  className="h-3 w-3 opacity-50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
              <span>{displayPhone}</span>
            </div>
          </ProfileField>

          {/* Current Plan */}
          <div
            className="w-full rounded-2xl px-4 py-3"
            style={{
              background: "rgba(16, 32, 72, 0.55)",
              border: "1.5px solid rgba(100, 150, 220, 0.2)",
            }}
          >
            <p className="mb-1.5 text-xs font-medium text-white/50">
              Current Plan
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-white">
                <span className="font-semibold">Pro</span>
                <span className="text-white/30">|</span>
                <span className="text-xs text-white/55">Credits left</span>
                <svg
                  className="h-4 w-4 text-white/55"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="1.75" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.75"
                    d="M21 15l-5-5L5 21"
                  />
                </svg>
                <span className="text-xs font-semibold text-white">156</span>
                <svg
                  className="h-4 w-4 text-white/55"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.75"
                    d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                  />
                </svg>
                <span className="text-xs font-semibold text-white">87</span>
              </div>
              <button
                type="button"
                onClick={() => setShowChangePlan(true)}
                className="text-sm font-semibold text-[#f5a623] hover:text-[#f7bb52]"
              >
                Change Plan
              </button>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold text-red-400 transition-opacity hover:opacity-80"
          style={{
            background: "rgba(16, 32, 72, 0.55)",
            border: "1.5px solid rgba(200, 60, 60, 0.25)",
          }}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>

      {/* Change Plan modal */}
      {showChangePlan && (
        <ChangePlanModal
          currentPlanId={CURRENT_PLAN_ID}
          onClose={() => setShowChangePlan(false)}
        />
      )}
    </>
  );
}
