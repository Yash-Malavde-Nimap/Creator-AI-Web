"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import HomeIcon from "../common/svgs/BottomBar/HomeIcon";
import HashtagIcon from "../common/svgs/BottomBar/HashtagIcon";
import { ProfileIcon } from "../common/svgs/BottomBar/ProfileIcon";

const NAV_ITEMS = [
  { href: ROUTES.HOME, label: "Home", Icon: HomeIcon },
  { href: ROUTES.SOCIAL_MEDIA, label: "Social Media", Icon: HashtagIcon },
  { href: ROUTES.PROFILE, label: "Profile", Icon: ProfileIcon },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around px-4 md:px-72 pb-safe"
      style={{
        background: `linear-gradient(to top,  rgba(11, 24, 54, 1) 35%, rgba(11, 24, 54, 0.7) 55%, rgba(9, 18, 38, 0) 100%)`,
        // borderTop: '1px solid rgba(100, 150, 220, 0.15)',
        // backdropFilter: 'blur(16px)',
        height: "84px",
      }}
    >
      {NAV_ITEMS.map(({ href, label, Icon }) => {
        const active =
          pathname === href ||
          (href !== ROUTES.HOME && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-1 flex-col items-center justify-center gap-1 py-2"
          >
            <Icon stroke={active ? "#4a9fd5" : "white"} />
            <span
              className={cn(
                "text-[11px] font-medium transition-colors",
                active ? "text-[#4a9fd5]" : "text-white/45",
              )}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
