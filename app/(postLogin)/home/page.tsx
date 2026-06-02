"use client";

import { useEffect, useState } from "react";

import { authService } from "@/services/auth.service";
import WhatsAppIcon from "@/components/common/svgs/WhatsAppIcon";
import { CreditCard } from "@/components/home/CreditCard";
import {
  LargePlatformTabs,
  CompactPlatformTabs,
  type PlatformTabId,
} from "@/components/home/PlatformTabs";
import { PostContent } from "@/components/home/PostContent";
import { PostImagePlaceholder } from "@/components/home/PostImagePlaceholder";
import { CustomSelect } from "@/components/ui/CustomSelect";

/* ── Mock data ──────────────────────────────────────────────────────────── */

const MOCK_POSTS = [
  {
    id: "1",
    text: "🚀 AI is no longer the future — it's the biggest competitive advantage today. The companies adopting AI now.\n#AI #Innovation #FutureOfWork #Tech",
    images: [
      "https://images.pexels.com/photos/2204880/pexels-photo-2204880.jpeg",
      "https://images.pexels.com/photos/37875596/pexels-photo-37875596.jpeg",
      "https://images.pexels.com/photos/9962722/pexels-photo-9962722.jpeg",
    ] as string[],
    fallbackIndex: 0,
    timestamp: "Mon, 25 Jan 2026 : 03.25 PM",
  },
  {
    id: "2",
    text: "🤖 The smartest employee in your company might soon be an AI agent. From content to operations, automation is changing everything faster than expected.\n#ArtificialIntelligence #AI",
    images: [] as string[],
    fallbackIndex: 1,
    timestamp: "Mon, 25 Jan 2026 : 03.25 PM",
  },
  {
    id: "3",
    text: "🚀 AI is no longer the future — it's the biggest competitive advantage today. The companies adopting AI now. ⚡ Every industry is being rewritten by AI right now. The only question is: will you lead the change or react to it later?\n\nThe smartest companies are using it like an employee, analyst, designer, and growth engine combined. This shift will create the next generation of billion-dollar businesses. AI is no longer optional — it's infrastructure.\n\n#ArtificialIntelligence #Automation #TechTrends\n#Startup #AIRevolution #Create #Productivity",
    images: [] as string[],
    fallbackIndex: 0,
    timestamp: "Mon, 25 Jan 2026 : 03.25 PM",
  },
];

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function HomePage() {
  const storedUser = authService.getStoredUser();
  const displayName = storedUser?.name ? storedUser.name.split(" ")[0] : "User";

  const [scrolled, setScrolled] = useState(false);
  const [activePlatform, setActivePlatform] =
    useState<PlatformTabId>("instagram");
  const [timePeriod, setTimePeriod] = useState("all");

  const handleDateRange = (value: any) => {
    setTimePeriod(value);
  };

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 90);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <>
      <div className="px-5 pt-12 md:px-96">
        {/* Greeting */}
        <h1 className="mb-4 text-[28px] font-bold text-white">
          Hey {displayName},
        </h1>

        {/* Credit Left card — collapses when scrolled */}
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: scrolled ? "0" : "110px",
            opacity: scrolled ? 0 : 1,
            marginBottom: scrolled ? "0" : "20px",
          }}
        >
          <CreditCard imageCount={123} videoCount={123} />
        </div>

        {/* Posts header */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-lg font-bold text-white">Posts</span>
          <CustomSelect
            value={timePeriod}
            onChange={handleDateRange}
            options={[
              { label: "Last 7 days", value: "7" },
              { label: "Last 30 days", value: "30" },
              { label: "All time", value: "all" },
            ]}
            className="w-32"
            variant="outlined"
          />
        </div>

        {/* Platform tabs — switches between large and compact on scroll */}
        <div className="mb-5 transition-all duration-300 ease-in-out">
          {scrolled ? (
            <CompactPlatformTabs
              active={activePlatform}
              onSelect={setActivePlatform}
            />
          ) : (
            <LargePlatformTabs
              active={activePlatform}
              onSelect={setActivePlatform}
            />
          )}
        </div>

        {/* Post feed */}
        <div className="space-y-6 pb-6">
          {MOCK_POSTS.map((post) => (
            <div key={post.id}>
              <PostContent text={post.text} />
              <PostImagePlaceholder
                urls={post.images}
                fallbackIndex={post.fallbackIndex}
              />
              <p className="mt-2 text-xs text-[#6579A4]">{post.timestamp}</p>
            </div>
          ))}
        </div>
      </div>

      <WhatsAppIcon />
    </>
  );
}
