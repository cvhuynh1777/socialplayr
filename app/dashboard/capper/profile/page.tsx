"use client";

import { useState } from "react";
import Sidebar from "../Sidebar";

export default function ProfilePage() {
  const [bio, setBio] = useState("");
  const [price, setPrice] = useState("");
  const capperId = "cmcqr7ros005rw89khqx5uqvr"; // your Capper ID

  const saveProfile = async () => {
    const res = await fetch("/api/capper/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bio, price: parseFloat(price), capperId }),
    });

    if (res.ok) {
      alert("Profile updated!");
    } else {
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-4xl font-bold mb-6 text-white">Edit Profile</h2>
        <div className="space-y-4">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Your bio..."
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Subscription Price"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={saveProfile}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 transition rounded-lg text-white font-semibold shadow-lg"
          >
            Save
          </button>
        </div>
      </main>
    </div>
  );
}
