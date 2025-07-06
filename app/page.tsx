"use client";

import Link from "next/link";
import { Trophy, Users, Eye } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Animated Counter
function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 1500; // ms
      const increment = Math.ceil(end / (duration / 30)); // ~30fps

      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(interval);
        }
        setCount(start);
      }, 30);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl font-extrabold text-white">
      {count.toLocaleString()}
    </span>
  );
}

// Testimonials Carousel
const testimonials = [
  {
    name: "Alex Johnson",
    quote:
      "I started with 0 followers, now I’m a top-10 capper on SocialPlayr. This platform rewards real skill.",
  },
  {
    name: "Samantha Lee",
    quote:
      "As a subscriber, I love seeing transparent ROI. No fluff, just results.",
  },
  {
    name: "Michael Chen",
    quote:
      "SocialPlayr helped me grow my subscriber base faster than I imagined.",
  },
];

function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  const testimonial = testimonials[index];

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="max-w-xl mx-auto text-center text-gray-300"
    >
      <p className="text-xl italic mb-2">“{testimonial.quote}”</p>
      <p className="font-semibold text-blue-400">— {testimonial.name}</p>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 font-sans overflow-x-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #3b82f6, transparent), radial-gradient(circle at 70% 70%, #8b5cf6, transparent)",
          opacity: 0.2,
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Hero Section */}
      <motion.header
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-[80vh] md:min-h-[60vh]"
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
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-8">
          SocialPlayr brings transparency to betting. For subscribers, track
          real performance. For cappers, no matter how new you are, prove
          yourself and grow your name.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Button href="/dashboard/capper" text="I’m a Capper" primary />
          <Button href="/dashboard/subscriber" text="I’m a Subscriber" />
        </div>
      </motion.header>

      {/* Features Section */}
      <section className="relative z-10 bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Why SocialPlayr?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 bg-gray-800 py-16">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          What People Are Saying
        </h2>
        <TestimonialsCarousel />
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-gray-400 py-6 text-center">
        © {new Date().getFullYear()} SocialPlayr. All rights reserved.
      </footer>
    </div>
  );
}

function Button({
  href,
  text,
  primary = false,
}: {
  href: string;
  text: string;
  primary?: boolean;
}) {
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
      "Subscribers see verified ROI, real picks, and real results—every time. No inflated stats.",
  },
  {
    Icon: Users,
    title: "Grow Your Name",
    description:
      "In a space dominated by big followings, SocialPlayr helps new cappers rise based on skill alone.",
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
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0px 8px 30px rgba(59, 130, 246, 0.3)" }}
      transition={{ type: "spring", stiffness: 200 }}
      className="flex flex-col bg-gray-700 rounded-2xl p-8 shadow-lg transition duration-300 min-h-[300px]"
    >
      <div className="flex justify-center items-center w-12 h-12 mb-4">
        <Icon className="w-full h-full text-blue-400" />
      </div>
      <div className="text-left">
        <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
          {title}
        </h3>
        <p className="text-gray-300 leading-snug">{description}</p>
      </div>
    </motion.div>
  );
}
