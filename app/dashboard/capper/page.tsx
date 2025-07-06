"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function DashboardPage() {
  const [data, setData] = useState<{
    activePicks: number;
    avgConfidence: string;
    subscribers: number;
    totalRevenue: number;
    recentPicks: { id: string; content: string }[];
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/capper/dashboard");
      const result = await res.json();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-4xl font-bold mb-6 text-white">
          Welcome back, Capper!
        </h2>

        {!data ? (
          <p className="text-gray-400 text-lg">Loading dashboard...</p>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard title="Active Picks" value={data.activePicks} />
              <StatCard title="Avg Confidence" value={data.avgConfidence} />
              <StatCard title="Subscribers" value={data.subscribers} />
              <StatCard
                title="Total Revenue"
                value={`$${data.totalRevenue}`}
              />
            </div>

            {/* Recent Picks */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blue-400">
                Recent Picks
              </h3>
              {data.recentPicks?.length > 0 ? (
                <ul className="space-y-3">
                  {data.recentPicks.map((pick) => (
                    <li
                      key={pick.id}
                      className="p-4 bg-gray-800 rounded-xl border border-gray-700 hover:bg-gray-700 transition"
                    >
                      {pick.content}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No recent picks found.</p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md hover:bg-gray-700 transition">
      <p className="text-blue-300 text-sm mb-1">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
