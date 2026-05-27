import { PlanCardData } from "@/components/plans/PlanCard";

export type PlanId = "starter" | "pro" | "business" | "";

export const PLANS: (PlanCardData & { id: PlanId })[] = [
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
