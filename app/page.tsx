"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-gray-900 to-black">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          Welcome to <span className="text-indigo-400">SocialPlayr</span>
        </h1>
        <p className="text-gray-300 text-lg">
          Follow Sharp. Bet Quick. Win Big.
        </p>
        <div className="flex justify-center space-x-6 mt-8">
          <Link
            href="/dashboard/capper"
            className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-lg text-xl transition"
          >
            I’m a Capper
          </Link>
          <Link
            href="/dashboard/subscriber"
            className="px-8 py-4 bg-gray-700 hover:bg-gray-800 text-white rounded-lg shadow-lg text-xl transition"
          >
            I’m a Subscriber
          </Link>
        </div>
      </div>
    </div>
  );
}
