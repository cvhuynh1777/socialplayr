"use client";

import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";

export default function LeaderboardPage() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => setBoard(data.leaderboard));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-4xl font-bold mb-6 text-white">
          Leaderboard (ROI)
        </h2>
        <ul className="space-y-3">
          {board.map((c, i) => (
            <li
              key={i}
              className="p-4 bg-gray-800 rounded-xl border border-gray-700 hover:bg-gray-700 transition"
            >
              <p className="font-semibold text-blue-300">
                #{i + 1} - {c.capperName}
              </p>
              <p className="text-gray-400">ROI: {c.roi}%</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
