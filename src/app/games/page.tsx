"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "@/components/ui/Heading";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GameShowcase from "@/components/ui/GameShowcase";

const categories = [
  { label: "ALL", key: "All" },
  { label: "01 / ACTION", key: "Action" },
  { label: "02 / RACING", key: "Racing" },
  { label: "03 / PUZZLE", key: "Puzzle" },
  { label: "04 / SPORTS", key: "Sports" },
] as const;

const allGames = [
  { title: "Cyber Runner", genre: "Action", tagline: "Dash through neon-lit cityscapes", category: "Action" },
  { title: "Neon Drift", genre: "Racing", tagline: "Master the art of drifting", category: "Racing" },
  { title: "Pixel Blaster", genre: "Action", tagline: "Retro-inspired shoot-em-up", category: "Action" },
  { title: "Grid Wars", genre: "Puzzle", tagline: "Strategic grid-based combat", category: "Puzzle" },
  { title: "Shadow Protocol", genre: "Action", tagline: "Stealth missions in the dark", category: "Action" },
  { title: "Quantum Break", genre: "Puzzle", tagline: "Bend time, solve the impossible", category: "Puzzle" },
  { title: "Velocity X", genre: "Racing", tagline: "Pure speed, zero limits", category: "Racing" },
  { title: "Neural Link", genre: "Strategy", tagline: "Connect minds, conquer worlds", category: "Sports" },
];

export default function GamesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredGames = activeCategory === "All"
    ? allGames
    : allGames.filter((g) => g.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 md:mb-24"
      >
        <Heading level={1} className="mb-4">ALL GAMES</Heading>
        <p className="text-text-muted text-sm tracking-wide">
          {filteredGames.length} GAME{filteredGames.length !== 1 ? "S" : ""}
        </p>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex gap-6 md:gap-8 mb-16 md:mb-20 overflow-x-auto pb-2 scrollbar-hide"
      >
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`relative text-xs uppercase tracking-[0.2em] whitespace-nowrap pb-2 transition-colors duration-300 ${
              activeCategory === cat.key
                ? "text-white"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            {cat.label}
            {activeCategory === cat.key && (
              <motion.span
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-px bg-white"
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Games List - Editorial Layout */}
      <div className="space-y-16 md:space-y-24">
        <AnimatePresence mode="popLayout">
          {filteredGames.map((game, i) => (
            <ScrollReveal key={game.title} delay={i * 0.08}>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
                i % 2 === 1 ? "md:direction-rtl" : ""
              }`}>
                {/* Image */}
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <GameShowcase
                    title={game.title}
                    genre={game.genre}
                    tagline={game.tagline}
                    index={i}
                  />
                </div>

                {/* Text */}
                <div className={`flex flex-col gap-4 ${i % 2 === 1 ? "md:order-1 md:text-right" : ""}`}>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted">
                    {game.genre}
                  </span>
                  <h3 className="font-[family-name:var(--font-heading)] font-bold text-3xl md:text-4xl text-white tracking-tight">
                    {game.title}
                  </h3>
                  <p className="text-text-secondary text-base leading-relaxed max-w-md">
                    {game.tagline}
                  </p>
                  <a
                    href="#"
                    className="group/link inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-text-muted hover:text-white transition-colors duration-300 mt-2"
                  >
                    PLAY
                    <span className="transition-transform duration-300 group-hover/link:translate-x-1">&rarr;</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filteredGames.length === 0 && (
        <div className="text-center py-24">
          <p className="text-text-muted text-sm uppercase tracking-wide">No games in this category</p>
        </div>
      )}
    </div>
  );
}
