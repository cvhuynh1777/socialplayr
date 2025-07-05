"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight, Trophy } from "lucide-react";

interface LeaderboardEntry {
  capperName: string;
  roi: number;
  totalWagered: number;
  totalPayout: number;
}

export default function LeaderboardPage() {
  const [board, setBoard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await fetch("/api/leaderboard");
        const data = await res.json();
        setBoard(data.leaderboard || []);
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
      }
    };

    fetchBoard();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      <h1 className="text-4xl font-extrabold text-white mb-6">
        🏆 SocialPlayr Leaderboard
      </h1>
      <p className="text-gray-400 mb-8">
        See which cappers are crushing it this season
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {board.map((c, idx) => (
          <div
            key={idx}
            className="bg-gray-800 rounded-2xl p-6 shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-gray-700 relative"
          >
            {/* Trophy for Top 3 */}
            {idx < 3 && (
              <div className="absolute -top-3 -left-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2">
                <Trophy className="text-white w-6 h-6" />
              </div>
            )}

            <h2 className="text-xl font-bold text-white mb-2">
              #{idx + 1} - {c.capperName}
            </h2>

            <div className="flex items-center space-x-2 mb-1">
              <p
                className={`text-lg font-semibold ${
                  c.roi >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                ROI: {c.roi}%
              </p>
              {c.roi >= 0 ? (
                <ArrowUpRight className="w-5 h-5 text-green-400" />
              ) : (
                <ArrowDownRight className="w-5 h-5 text-red-400" />
              )}
            </div>

            <p className="text-gray-300">
              Total Wagered:{" "}
              <span className="font-medium text-white">${c.totalWagered}</span>
            </p>
            <p className="text-gray-300">
              Total Payout:{" "}
              <span className="font-medium text-white">${c.totalPayout}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
