"use client";

import { useState, useEffect } from "react";

const tabs = ["Feed", "Subscriptions", "Leaderboard", "Profile"];

export default function SubscriberDashboard() {
  const [activeTab, setActiveTab] = useState("Feed");

  return (
    <div className="flex min-h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 space-y-4">
        <h1 className="text-3xl font-bold text-indigo-400 mb-8">SocialPlayr</h1>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition ${
              activeTab === tab
                ? "bg-indigo-500 text-white"
                : "hover:bg-gray-700 text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeTab === "Feed" && <Feed />}
        {activeTab === "Subscriptions" && <Subscriptions />}
        {activeTab === "Leaderboard" && <Leaderboard />}
        {activeTab === "Profile" && <Profile />}
      </main>
    </div>
  );
}

function Feed() {
  const [picks, setPicks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/subscriber/feed")
      .then((res) => res.json())
      .then((data) => {
        if (data?.picks && Array.isArray(data.picks)) {
          setPicks(data.picks);
        } else {
          console.warn("Unexpected API response:", data);
          setPicks([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch feed:", err);
        setError(true);
        setPicks([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-400">Loading feed...</p>;
  if (error)
    return <p className="text-red-400">Failed to load feed. Try again later.</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-indigo-400">Your Feed</h2>
      {picks.length === 0 ? (
        <p className="text-gray-400">No picks yet. Subscribe to cappers to see their picks.</p>
      ) : (
        <ul className="space-y-4">
          {picks.map((pick) => (
            <li
              key={pick.id}
              className="p-4 rounded-xl bg-gray-800 border border-gray-700 hover:bg-gray-700 transition"
            >
              <p className="text-lg font-semibold">{pick.content}</p>
              <p className="text-gray-400 text-sm">by {pick.capperName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Subscriptions() {
  const [subs, setSubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/subscriber/subscriptions")
      .then((res) => res.json())
      .then((data) => {
        if (data?.subscriptions && Array.isArray(data.subscriptions)) {
          setSubs(data.subscriptions);
        } else {
          console.warn("Unexpected API response:", data);
          setSubs([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch subscriptions:", err);
        setError(true);
        setSubs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-400">Loading subscriptions...</p>;
  if (error)
    return <p className="text-red-400">Failed to load subscriptions. Try again later.</p>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-indigo-400">Your Subscriptions</h2>
      {subs.length === 0 ? (
        <p className="text-gray-400">You’re not subscribed to any cappers yet.</p>
      ) : (
        <ul className="space-y-4">
          {subs.map((sub) => (
            <li
              key={sub.id}
              className="p-4 rounded-xl bg-gray-800 border border-gray-700 hover:bg-gray-700 transition"
            >
              <p className="text-lg font-semibold">{sub.capperName}</p>
              <p className="text-gray-400">{sub.bio}</p>
              <p className="text-indigo-400 mt-1 font-medium">${sub.price}/month</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Leaderboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-indigo-400">Leaderboard</h2>
      <p className="text-gray-400">Leaderboard coming soon...</p>
    </div>
  );
}

function Profile() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-indigo-400">Profile</h2>
      <p className="text-gray-400">Profile management coming soon...</p>
    </div>
  );
}
