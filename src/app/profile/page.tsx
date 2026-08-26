"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-muted text-sm uppercase tracking-wide animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!session) return null;

  function handleSaveUsername() {
    if (newUsername.trim().length >= 3) {
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  const stats = [
    { label: "Games Played", value: "42" },
    { label: "High Score", value: "98,750" },
    { label: "Rank", value: "#7" },
  ];

  const recentActivity = [
    { game: "Cyber Runner", score: 12500, time: "2 hours ago" },
    { game: "Neon Drift", score: 8700, time: "5 hours ago" },
    { game: "Grid Wars", score: 15200, time: "1 day ago" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-6 mb-16"
      >
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-surface-elevated border border-border flex items-center justify-center shrink-0">
          <span className="text-text-muted text-2xl font-[family-name:var(--font-heading)]">
            {(session.user?.name || "?")[0].toUpperCase()}
          </span>
        </div>

        {/* Username */}
        <div>
          {editing ? (
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="bg-transparent border-b border-border py-2 text-2xl text-white font-[family-name:var(--font-heading)] focus:border-white focus:outline-none transition-colors duration-300"
                placeholder="New username"
                autoFocus
              />
              <button
                onClick={handleSaveUsername}
                className="text-accent-green hover:text-accent-green/80 transition-colors text-sm uppercase tracking-wide"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-[family-name:var(--font-heading)] font-bold tracking-tight text-white">
                {session.user?.name}
              </h1>
              <button
                onClick={() => {
                  setEditing(true);
                  setNewUsername(session.user?.name || "");
                }}
                className="text-text-muted hover:text-white transition-colors text-xs uppercase tracking-wide"
              >
                Edit
              </button>
            </div>
          )}

          {saved && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-accent-green text-sm mt-2"
            >
              Username updated!
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
            className="bg-surface-elevated border border-border p-6"
          >
            <div className="text-3xl font-[family-name:var(--font-heading)] font-bold text-white mb-1">
              {stat.value}
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-text-muted">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="border border-border p-6"
      >
        <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-white mb-6">
          Recent Activity
        </h2>
        <div className="space-y-0">
          {recentActivity.map((activity, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
              className="flex items-center justify-between py-4 border-b border-border last:border-0"
            >
              <span className="text-white text-sm">{activity.game}</span>
              <div className="flex items-center gap-4">
                <span className="text-text-secondary text-sm font-mono">{activity.score.toLocaleString()}</span>
                <span className="text-text-muted text-xs">{activity.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
