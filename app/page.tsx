"use client";

import Link from "next/link";
import { Trophy, BarChart3, Users, Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 font-sans">
      {/* Hero Section */}
      <motion.header
        className="flex flex-col items-center justify-center flex-1 text-center px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-4 text-white drop-shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          Follow Sharp. Bet Quick.{" "}
          <motion.span
            className="text-blue-400 inline-block"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          >
            Win Big.
          </motion.span>
        </motion.h1>
        <motion.p
          className="text-gray-300 text-lg md:text-xl max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          SocialPlayr brings transparency to betting. For subscribers, track real performance. For cappers, no matter how new you are, prove yourself and grow your name.
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
        >
          <Button href="/dashboard/capper" text="I’m a Capper" primary />
          <Button href="/dashboard/subscriber" text="I’m a Subscriber" />
        </motion.div>
      </motion.header>

      {/* Features Section */}
      <section className="bg-gray-800 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Why SocialPlayr?
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                className="flex"
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center">
        © {new Date().getFullYear()} SocialPlayr. All rights reserved.
      </footer>
    </div>
  );
}

function Button({ href, text, primary = false }: { href: string; text: string; primary?: boolean }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link
        href={href}
        className={`px-8 py-4 rounded-xl text-xl font-semibold shadow-lg transition ${
          primary
            ? "bg-blue-500 hover:bg-blue-600 text-white"
            : "bg-gray-700 hover:bg-gray-800 text-white"
        }`}
      >
        {text}
      </Link>
    </motion.div>
  );
}

const features = [
  {
    Icon: Eye,
    title: "True Transparency",
    description:
      "No inflated stats. Subscribers see verified ROI, real picks, and real results—every time.",
  },
  {
    Icon: Users,
    title: "Grow Your Name",
    description:
      "In an industry dominated by big followings, SocialPlayr helps new cappers shine based on skill alone.",
  },
  {
    Icon: BarChart3,
    title: "Track Performance",
    description:
      "Analyze your betting trends to refine your strategy and maximize ROI.",
  },
  {
    Icon: Trophy,
    title: "Climb the Leaderboard",
    description:
      "Top performers get noticed. Build your subscriber base as you prove your edge.",
  },
];

function FeatureCard({ Icon, title, description }: any) {
  return (
    <div className="flex flex-col justify-between bg-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] transition duration-300">
      <Icon className="w-12 h-12 text-blue-400 mb-4" />
      <div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
}
