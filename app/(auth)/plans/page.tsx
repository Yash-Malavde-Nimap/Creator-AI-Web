"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { BottomNextButton } from "@/components/onboarding/OnboardingButtons";
import { PlanCard } from "@/components/plans/PlanCard";
import { ROUTES } from "@/constants/routes";
import { STORAGE_KEYS } from "@/constants/config";
import { useRegistrationStore } from "@/store/registration.store";
import { useAuthStore } from "@/store/auth.store";
import { capitalizeText, cn } from "@/lib/utils";
import { PlanId, PLANS } from "@/constants/constants";

type BillingCycle = "monthly" | "annually";

export default function PlansPage() {
  const router = useRouter();
  const { name, getData } = useRegistrationStore();
  const { setTokens, setUser } = useAuthStore();
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("");

  const displayName = name ? name.split(" ")[0] : "there";

  const handleProceed = () => {
    const plan = PLANS.find((p) => p.id === selectedPlan);
    const price =
      billing === "monthly" ? plan?.monthlyPrice : plan?.annualPrice;

    const payload = {
      ...getData(),
      plan: {
        id: selectedPlan,
        name: plan?.name,
        price,
        billing,
      },
    };

    // Placeholder token — will be replaced with real API response on plan purchase
    const placeholderToken = "placeholder_access_token";

    // Persist to localStorage via auth store
    setTokens({
      accessToken: placeholderToken,
      refreshToken: "",
      expiresIn: 86400,
    });

    const { name: userName, email: userEmail } = getData();
    setUser({
      id: "",
      name: userName,
      email: userEmail,
      role: "viewer",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Set cookie so the proxy can authenticate SSR requests
    document.cookie = `${STORAGE_KEYS.ACCESS_TOKEN}=${placeholderToken}; path=/; max-age=86400`;

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
          <h2 className="mt-1 text-center text-[22px] font-bold text-white">
            Choose Your Plan
          </h2>
          <p className="mt-2 text-center text-sm leading-relaxed text-white/60">
            Unlock powerful AI creation tools designed
            <br />
            for your content journey.
          </p>

          {/* Billing toggle */}
          <div className="mt-6 flex items-center gap-1">
            {(["monthly", "annually"] as BillingCycle[]).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBilling(cycle)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-semibold capitalize transition-all",
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
          <div className="mt-6 flex md:flex-row w-full md:w-screen md:px-20 flex-col gap-4">
            {PLANS.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                billing={billing}
                selected={selectedPlan === plan.id}
                onSelect={() => setSelectedPlan(plan.id as PlanId)}
              />
            ))}
          </div>
        </div>
      </div>

      <BottomNextButton active={!!selectedPlan} onClick={handleProceed}>
        Proceed to payment
      </BottomNextButton>
    </>
  );
}
