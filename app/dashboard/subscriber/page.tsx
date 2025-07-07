"use client";

import { useState, useEffect } from "react";

const TEST_SUBSCRIBER_ID = "your_test_subscriber_id_here";

export default function SubscriberDashboard() {
  const [activeTab, setActiveTab] = useState("Feed");
  const tabs = ["Feed", "Subscriptions", "Discover"];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-800 p-4 space-y-4">
        <h1 className="text-2xl font-bold text-blue-400 mb-6">SocialPlayr</h1>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`block w-full text-left px-3 py-2 rounded-lg ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-700 text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {activeTab === "Feed" && <Feed />}
        {activeTab === "Subscriptions" && <Subscriptions />}
        {activeTab === "Discover" && <Discover />}
      </main>
    </div>
  );
}

function Feed() {
  const [picks, setPicks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/subscriber/feed")
      .then((res) => res.json())
      .then((data) => setPicks(data.picks || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-400">Loading feed...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Feed</h2>
      {picks.length === 0 ? (
        <p className="text-gray-400">No picks from subscribed cappers yet.</p>
      ) : (
        <ul className="space-y-3">
          {picks.map((p) => (
            <li
              key={p.id}
              className="p-4 rounded bg-gray-800 border border-gray-700"
            >
              <p className="font-semibold text-blue-400">{p.capperName}</p>
              <p className="text-gray-300">{p.content}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(p.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Subscriptions() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/subscriber/subscriptions")
      .then((res) => res.json())
      .then((data) => setSubs(data.subscriptions || []))
      .finally(() => setLoading(false));
  }, []);

  const handleUnsubscribe = async (capperId: string) => {
    await fetch("/api/subscriber/subscriptions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ capperId }),
    });
    setSubs((prev) => prev.filter((s) => s.capperId !== capperId));
  };

  if (loading) return <p className="text-gray-400">Loading subscriptions...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Subscriptions</h2>
      {subs.length === 0 ? (
        <p className="text-gray-400">You are not subscribed to any cappers.</p>
      ) : (
        <ul className="space-y-3">
          {subs.map((s) => (
            <li
              key={s.capperId}
              className="p-4 rounded bg-gray-800 border border-gray-700 flex justify-between items-center"
            >
              <span className="font-semibold text-blue-400">
                {s.capperName}
              </span>
              <button
                onClick={() => handleUnsubscribe(s.capperId)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-sm"
              >
                Unsubscribe
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Discover() {
  const [cappers, setCappers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/subscriber/discover")
      .then((res) => res.json())
      .then((data) => setCappers(data.cappers || []))
      .finally(() => setLoading(false));
  }, []);

  const handleSubscribe = async (capperId: string) => {
    await fetch("/api/subscriber/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ capperId }),
    });
    setCappers((prev) => prev.filter((c) => c.id !== capperId));
  };

  if (loading) return <p className="text-gray-400">Loading cappers...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Discover New Cappers</h2>
      {cappers.length === 0 ? (
        <p className="text-gray-400">
          No new cappers to discover. You’re following everyone!
        </p>
      ) : (
        <ul className="space-y-3">
          {cappers.map((c) => (
            <li
              key={c.id}
              className="p-4 rounded bg-gray-800 border border-gray-700 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-blue-400">{c.ownerName}</p>
                <p className="text-gray-300">{c.bio}</p>
              </div>
              <button
                onClick={() => handleSubscribe(c.id)}
                className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-sm"
              >
                Subscribe
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
