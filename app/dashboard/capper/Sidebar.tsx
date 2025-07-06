"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "Dashboard", href: "/dashboard/capper" },
  { name: "Profile", href: "/dashboard/capper/profile" },
  { name: "Picks", href: "/dashboard/capper/picks" },
  { name: "Leaderboard", href: "/dashboard/capper/leaderboard" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-800 p-6 space-y-4 shadow-lg">
      <h1 className="text-3xl font-bold text-blue-400 mb-8 tracking-tight">
        SocialPlayr
      </h1>
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          href={tab.href}
          className={`block w-full text-left px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
            pathname === tab.href
              ? "bg-blue-500 text-white shadow-md"
              : "text-blue-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          {tab.name}
        </Link>
      ))}
    </aside>
  );
}
