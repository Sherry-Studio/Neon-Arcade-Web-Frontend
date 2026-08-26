"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import ScrollReveal from "@/components/ui/ScrollReveal";
import HorizontalScroll from "@/components/ui/HorizontalScroll";
import LiveCounter from "@/components/ui/LiveCounter";

/* ─── Animation variants ─── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2 } },
};

/* ─── Data ─── */
const discoverGames = [
  { title: "Cyber Runner", genre: "ACTION", gradient: "linear-gradient(160deg, #0f172a 0%, #1e1b4b 50%, #0c0a1a 100%)" },
  { title: "Neon Drift", genre: "RACING", gradient: "linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0a0a1a 100%)" },
  { title: "Pixel Blaster", genre: "ACTION", gradient: "linear-gradient(160deg, #0f1f0f 0%, #1a2e1a 50%, #0a0f0a 100%)" },
  { title: "Grid Wars", genre: "PUZZLE", gradient: "linear-gradient(160deg, #1f1a0a 0%, #2e1f0f 50%, #0f0a05 100%)" },
  { title: "Shadow Protocol", genre: "STRATEGY", gradient: "linear-gradient(160deg, #1a0a1a 0%, #2e1a2e 50%, #0a050a 100%)" },
  { title: "Quantum Break", genre: "ACTION", gradient: "linear-gradient(160deg, #0a1a2e 0%, #1a2e3e 50%, #050a0f 100%)" },
];

const categories = ["01 / ACTION", "02 / RACING", "03 / PUZZLE", "04 / STRATEGY"];

const vaultArticles = [
  {
    category: "GAME HISTORY",
    title: "The Rise of Browser Gaming",
    excerpt: "How web technologies evolved from simple Flash games to powering console-quality experiences that rival native applications.",
  },
  {
    category: "CULTURE",
    title: "Designing for the Infinite Canvas",
    excerpt: "Inside the studios pushing boundaries with generative art, procedural worlds, and the philosophy of emergent game design.",
  },
];

/* ─── Component ─── */
export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.96]);

  return (
    <PageTransition>
      {/* ═══════════ SECTION 1 — Cinematic Hero ═══════════ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      >
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(37,99,235,0.04) 0%, rgba(124,58,237,0.03) 40%, transparent 70%)",
          }}
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          <motion.h1
            variants={fadeUp}
            className="font-[family-name:var(--font-heading)] font-bold tracking-tighter leading-none text-text-primary"
            style={{ fontSize: "clamp(4rem, 12vw, 12rem)" }}
          >
            PLAY
            <br />
            BEYOND.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-lg tracking-wide text-text-secondary font-light"
          >
            The web is your arcade.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 flex justify-center">
            <Link href="/games">
              <MagneticButton>
                <Button variant="solid" size="lg" className="gap-3">
                  ENTER <ArrowRight size={16} />
                </Button>
              </MagneticButton>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown size={18} className="text-text-muted" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ═══════════ SECTION 2 — Featured Game ═══════════ */}
      <section className="relative py-32 md:py-40 px-6">
        <ScrollReveal>
          {/* Label */}
          <div className="max-w-7xl mx-auto mb-8">
            <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-text-muted flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
              Featured
            </span>
          </div>

          {/* Showcase */}
          <div className="max-w-7xl mx-auto">
            <div className="group relative overflow-hidden cursor-pointer aspect-video lg:aspect-[21/9] transition-all duration-700 ease-out">
              {/* Placeholder gradient image */}
              <div
                className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                style={{
                  background:
                    "linear-gradient(135deg, #0a0f1e 0%, #111827 25%, #1e1b4b 55%, #0f172a 80%, #030712 100%)",
                }}
              />
              {/* Atmosphere overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16">
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-[10px] font-medium uppercase tracking-[0.25em] text-text-secondary mb-3"
                >
                  Racing · Multiplayer
                </motion.span>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
                >
                  NEON RUSH
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-text-secondary mt-2 text-base md:text-lg max-w-md"
                >
                  Drive without limits.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="mt-6"
                >
                  <Button variant="outline" size="md" className="gap-2">
                    PLAY <ArrowRight size={14} />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════ SECTION 3 — Discover ═══════════ */}
      <section className="py-32 md:py-40">
        <ScrollReveal className="px-6 max-w-7xl mx-auto mb-12">
          <Heading level={2} className="tracking-tighter">
            DISCOVER
          </Heading>
          <p className="mt-4 text-text-muted text-sm max-w-md">
            Browse our curated collection of browser-based games.
          </p>
        </ScrollReveal>

        {/* Category labels */}
        <ScrollReveal className="px-6 max-w-7xl mx-auto mb-8" delay={0.1}>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {categories.map((cat) => (
              <span
                key={cat}
                className="text-[10px] font-medium uppercase tracking-[0.25em] text-text-muted"
              >
                {cat}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* Horizontal game cards */}
        <div className="pl-6 md:pl-[calc((100vw-80rem)/2+1.5rem)]">
          <HorizontalScroll>
            {discoverGames.map((game) => (
              <div
                key={game.title}
                className="group relative min-w-[280px] md:min-w-[320px] aspect-[3/4] snap-start overflow-hidden cursor-pointer flex-shrink-0"
              >
                {/* Gradient bg */}
                <div
                  className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  style={{ background: game.gradient }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-text-muted mb-2">
                    {game.genre}
                  </span>
                  <h4 className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-white">
                    {game.title}
                  </h4>
                </div>

                {/* Hover border */}
                <div className="absolute inset-0 border border-white/0 transition-colors duration-300 group-hover:border-white/[0.06]" />
              </div>
            ))}
          </HorizontalScroll>
        </div>
      </section>

      {/* ═══════════ SECTION 4 — Playing Now ═══════════ */}
      <section className="py-32 md:py-40 bg-surface-elevated">
        <ScrollReveal className="px-6 max-w-4xl mx-auto text-center">
          <LiveCounter value={12842} label="Players Online" />

          <div className="mt-16">
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-text-muted">
              Most Played Right Now
            </span>
            <p className="mt-3 font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold tracking-tight text-white">
              CYBER RUNNER
            </p>
          </div>

          {/* Accent line */}
          <div className="flex justify-center mt-12">
            <div className="w-8 h-px bg-accent-violet" />
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════ SECTION 5 — The Vault ═══════════ */}
      <section className="py-32 md:py-40 px-6">
        <ScrollReveal className="max-w-7xl mx-auto">
          <Heading level={2} className="tracking-tighter">
            THE VAULT
          </Heading>
          <p className="mt-4 text-text-muted text-sm max-w-md">
            Gaming culture, history, and stories.
          </p>
        </ScrollReveal>

        <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {vaultArticles.map((article, i) => (
            <ScrollReveal key={article.title} delay={i * 0.12}>
              <article className="group relative border border-border hover:border-white/10 transition-colors duration-500 p-8 md:p-10 cursor-pointer bg-surface-card">
                <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-text-muted">
                  {article.category}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold tracking-tight text-white">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary max-w-lg">
                  {article.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 mt-6 text-xs font-medium uppercase tracking-[0.2em] text-text-muted transition-colors duration-300 group-hover:text-white">
                  READ STORY <ArrowRight size={12} />
                </span>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="max-w-7xl mx-auto mt-12 text-center" delay={0.2}>
          <Link
            href="/vault"
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-text-muted hover:text-white transition-colors duration-300"
          >
            Explore the Vault <ArrowRight size={12} />
          </Link>
        </ScrollReveal>
      </section>

      {/* ═══════════ SECTION 6 — Footer ═══════════ */}
      <footer className="border-t border-border py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <span className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-widest text-text-muted">
            NEONARCADE
          </span>

          {/* Nav */}
          <nav className="flex items-center gap-8">
            {["Play", "Discover", "The Vault"].map((item) => (
              <Link
                key={item}
                href={item === "Play" ? "/games" : item === "The Vault" ? "/vault" : "/games"}
                className="text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted hover:text-white transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <span className="text-[11px] text-text-muted tracking-wide">
            &copy; 2026 NeonArcade
          </span>
        </div>
      </footer>
    </PageTransition>
  );
}
