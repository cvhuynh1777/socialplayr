"use client";

import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";

export default function PicksPage() {
  const [picks, setPicks] = useState([]);

  useEffect(() => {
    fetch("/api/capper/picks")
      .then((res) => res.json())
      .then((data) => setPicks(data.picks));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-4xl font-bold mb-6 text-white">Your Picks</h2>
        <ul className="space-y-3">
          {picks.map((p) => (
            <li
              key={p.id}
              className="p-4 bg-gray-800 rounded-xl border border-gray-700 hover:bg-gray-700 transition"
            >
              {p.content}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
