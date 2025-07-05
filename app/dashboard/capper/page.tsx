"use client";

import { useState, useEffect } from "react";

const tabs = ["Dashboard", "Profile", "Picks", "Leaderboard"];

export default function CapperDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-800 p-4 space-y-4">
        <h1 className="text-2xl font-bold text-indigo-400 mb-6">SocialPlayr</h1>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`block w-full text-left px-3 py-2 rounded-lg ${
              activeTab === tab
                ? "bg-indigo-500 text-white"
                : "hover:bg-gray-700 text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {activeTab === "Dashboard" && <Dashboard />}
        {activeTab === "Profile" && <Profile />}
        {activeTab === "Picks" && <Picks />}
        {activeTab === "Leaderboard" && <Leaderboard />}
      </main>
    </div>
  );
}

function Dashboard() {
  return <div className="text-3xl font-bold">Welcome, Capper!</div>;
}

function Profile() {
  const [bio, setBio] = useState("");
  const [price, setPrice] = useState("");
  const userId = "your_user_id_here"; // Replace with session user.id

  const saveProfile = async () => {
    await fetch("/api/capper/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bio, price: parseFloat(price), userId })
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Edit Profile</h2>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Your bio..."
        className="w-full p-2 rounded bg-gray-700"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Subscription Price"
        className="w-full p-2 rounded bg-gray-700"
      />
      <button
        onClick={saveProfile}
        className="px-4 py-2 bg-indigo-500 rounded hover:bg-indigo-600"
      >
        Save
      </button>
    </div>
  );
}

function Picks() {
  const [picks, setPicks] = useState([]);

  useEffect(() => {
    fetch("/api/capper/picks")
      .then((res) => res.json())
      .then((data) => setPicks(data.picks));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Picks</h2>
      <ul className="space-y-3">
        {picks.map((p) => (
          <li
            key={p.id}
            className="p-4 rounded bg-gray-800 border border-gray-700"
          >
            {p.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Leaderboard() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => setBoard(data.leaderboard));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Leaderboard (ROI)</h2>
      <ul className="space-y-3">
        {board.map((c, i) => (
          <li key={i} className="p-4 rounded bg-gray-800 border border-gray-700">
            <p className="font-semibold">
              #{i + 1} - {c.capperName}
            </p>
            <p className="text-gray-400">ROI: {c.roi}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
