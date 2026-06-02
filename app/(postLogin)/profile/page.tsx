"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { STORAGE_KEYS } from "@/constants/config";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useRegistrationStore } from "@/store/registration.store";
import { ProfileAvatar } from "@/components/profile/ProfileAvatar";
import { ProfileField, ReadonlyInput } from "@/components/profile/ProfileField";
import { CurrentPlanCard } from "@/components/profile/CurrentPlanCard";
import {
  ChangePlanModal,
  type PlanId,
} from "@/components/profile/ChangePlanModal";

const CURRENT_PLAN_ID: PlanId = "pro";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { name, email, phone, countryCode } = useRegistrationStore();

  const displayName = user?.name ?? name ?? "John Peter Smith";
  const displayEmail = user?.email ?? email ?? "johnsmith@gmail.com";
  const displayPhone = phone ?? "8679 978 567";
  const displayCode = countryCode ?? "+1";
  const initial = displayName.charAt(0).toUpperCase() ?? "A";

  const [showChangePlan, setShowChangePlan] = useState(false);

  const handleLogout = () => {
    logout();
    authService.clearSession();
    document.cookie = `${STORAGE_KEYS.ACCESS_TOKEN}=; path=/; max-age=0`;
    router.push(ROUTES.WELCOME);
  };

  return (
    <>
      <div className="flex min-h-screen flex-col px-5 md:px-96 pt-12">
        <h1 className="mb-6 text-xl font-bold text-white">Profile</h1>

        <ProfileAvatar initial={initial} />

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

          <CurrentPlanCard
            planName="Pro"
            imageCredits={156}
            videoCredits={87}
            onChangePlan={() => setShowChangePlan(true)}
          />
        </div>

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

      {showChangePlan && (
        <ChangePlanModal
          currentPlanId={CURRENT_PLAN_ID}
          onClose={() => setShowChangePlan(false)}
        />
      )}
    </>
  );
}
