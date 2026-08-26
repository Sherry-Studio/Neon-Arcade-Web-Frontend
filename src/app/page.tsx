import Link from "next/link";
import MagneticButton from "@/components/ui/MagneticButton";
import ScrollReveal from "@/components/ui/ScrollReveal";
import HorizontalScroll from "@/components/ui/HorizontalScroll";
import LiveCounter from "@/components/ui/LiveCounter";
import Timeline from "@/components/Timeline";
import { articles } from "@/lib/articles";

const discoverGames = [
  { n: "01", cat: "ACTION", title: "Cyber Runner", tagline: "Dash through neon-lit skylines.", gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)" },
  { n: "02", cat: "RACING", title: "Neon Drift", tagline: "Own every corner.", gradient: "linear-gradient(135deg, #2d1b2e 0%, #1a0a2e 55%, #16213e 100%)" },
  { n: "03", cat: "PUZZLE", title: "Grid Wars", tagline: "Outthink the grid.", gradient: "linear-gradient(135deg, #0f1f0f 0%, #1a2e1a 55%, #0a1a0a 100%)" },
  { n: "04", cat: "STEALTH", title: "Shadow Protocol", tagline: "Move unseen.", gradient: "linear-gradient(135deg, #14213d 0%, #1a1a2e 55%, #0a0a14 100%)" },
  { n: "05", cat: "ARCADE", title: "Pixel Blaster", tagline: "Retro firepower, modern edge.", gradient: "linear-gradient(135deg, #1f1a0a 0%, #2e1f0f 55%, #1a0f0a 100%)" },
];

export default function HomePage() {
  const vaultPreview = articles.slice(0, 2);

  return (
    <>
      {/* ─────────────────────────── SECTION 1 · HERO ─────────────────────────── */}
      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* Atmospheric background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 38%, rgba(37,99,235,0.16), transparent 70%)",
          }}
        />
        <div className="pointer-events-none absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-accent-violet/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-[12%] right-[12%] h-80 w-80 rounded-full bg-accent-green/10 blur-[130px]" />

        <div className="relative z-10 flex flex-col items-center">
          <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-text-secondary animate-fade-up">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
            Now Live
          </span>

          <h1 className="font-[family-name:var(--font-heading)] font-bold leading-[0.82] tracking-tight text-white">
            <span className="block overflow-hidden">
              <span
                className="text-gradient block animate-fade-up text-[clamp(3.75rem,17vw,14rem)]"
                style={{ animationDelay: "0.05s" }}
              >
                PLAY
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="text-gradient block animate-fade-up text-[clamp(3.75rem,17vw,14rem)]"
                style={{ animationDelay: "0.16s" }}
              >
                BEYOND.
              </span>
            </span>
          </h1>

          <p
            className="mt-8 max-w-md animate-fade-up text-base text-text-secondary sm:text-lg"
            style={{ animationDelay: "0.32s" }}
          >
            The web is your arcade. No downloads, no limits — just play.
          </p>

          <div className="mt-12 animate-fade-up" style={{ animationDelay: "0.44s" }}>
            <MagneticButton>
              <Link
                href="/games"
                className="group inline-flex items-center gap-3 bg-white px-10 py-4 text-sm font-medium uppercase tracking-[0.2em] text-black transition-colors duration-200 hover:bg-white/90"
              >
                Enter
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </MagneticButton>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted">Scroll</span>
          <span className="relative block h-12 w-px overflow-hidden bg-border">
            <span className="absolute left-0 top-0 h-4 w-px animate-[slide-in_1.6s_ease-in-out_infinite] bg-white" />
          </span>
        </div>
      </section>

      {/* ─────────────────────────── SECTION 2 · FEATURED ─────────────────────────── */}
      <section className="px-6 py-24 sm:px-10 md:py-32 lg:px-20">
        <ScrollReveal className="mb-10 flex items-end justify-between">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-text-muted">
            Featured
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-text-muted">01 / 05</span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Link
            href="/games"
            className="group relative block aspect-[16/10] w-full overflow-hidden md:aspect-[21/9]"
          >
            <div
              className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, #0f0c29 0%, #16213e 45%, #0f3460 100%)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 group-hover:from-black/70" />

            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
              <span className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-accent-blue">
                Action · Trending
              </span>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
                CYBER RUNNER
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-text-secondary md:text-base">
                Dash through neon-lit cityscapes in the endless runner that defined a generation of browser play.
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-white">
                Play now
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        </ScrollReveal>
      </section>

      {/* ─────────────────────────── SECTION 3 · DISCOVER ─────────────────────────── */}
      <section className="py-24 md:py-32">
        <ScrollReveal className="mb-12 px-6 sm:px-10 lg:px-20">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-white md:text-6xl">
            DISCOVER
          </h2>
          <p className="mt-3 text-sm text-text-secondary">
            Five worlds. One tab. Pick your grid.
          </p>
        </ScrollReveal>

        <div className="px-6 sm:px-10 lg:px-20">
          <HorizontalScroll>
            {discoverGames.map((game) => (
              <Link
                key={game.title}
                href="/games"
                className="group relative aspect-[3/4] w-[78vw] shrink-0 snap-start overflow-hidden sm:w-[360px]"
              >
                <div
                  className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ background: game.gradient }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/70">
                    {game.n} / {game.cat}
                  </span>
                  <div>
                    <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-white">
                      {game.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {game.tagline}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </HorizontalScroll>
        </div>
      </section>

      {/* ─────────────────────────── SECTION 4 · PLAYING NOW ─────────────────────────── */}
      <section className="border-y border-border px-6 py-24 sm:px-10 md:py-32 lg:px-20">
        <ScrollReveal className="mb-16 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-text-muted">
            Playing Now
          </span>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          <LiveCounter value={12842} label="Players Online" />
          <LiveCounter value={48920} label="Games Today" />
          <LiveCounter value={312} label="Live Matches" />
        </div>
      </section>

      {/* ─────────────────────────── SECTION 5 · EVOLUTION / TIMELINE ─────────────────────────── */}
      <section className="px-6 py-24 sm:px-10 md:py-32 lg:px-20">
        <ScrollReveal className="mb-16 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-white md:text-6xl">
            THE EVOLUTION OF PLAY
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-text-secondary">
            Half a century of games, distilled into seven moments.
          </p>
        </ScrollReveal>

        <Timeline />
      </section>

      {/* ─────────────────────────── SECTION 6 · THE VAULT ─────────────────────────── */}
      <section className="border-t border-border px-6 py-24 sm:px-10 md:py-32 lg:px-20">
        <ScrollReveal className="mb-12 flex items-end justify-between">
          <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-white md:text-6xl">
            THE VAULT
          </h2>
          <Link
            href="/vault"
            className="group hidden items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-text-secondary transition-colors hover:text-white sm:inline-flex"
          >
            Explore
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2">
          {vaultPreview.map((article, i) => (
            <ScrollReveal key={article.slug} delay={0.1 + i * 0.1}>
              <Link
                href={`/vault/${article.slug}`}
                className="group relative block overflow-hidden border border-border transition-colors duration-300 hover:border-white/10"
              >
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <div
                    className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ background: article.heroGradient }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <span className="mb-2 inline-block text-[10px] font-medium tracking-[0.25em] text-accent-blue">
                    {article.category}
                  </span>
                  <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-white md:text-2xl">
                    {article.title}
                  </h3>
                  <span className="mt-3 inline-block text-xs tracking-widest text-text-muted">
                    {article.readTime}
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <Link
          href="/vault"
          className="group mt-10 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-text-secondary transition-colors hover:text-white sm:hidden"
        >
          Explore the vault
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </section>

      {/* ─────────────────────────── SECTION 7 · FOOTER ─────────────────────────── */}
      <footer className="relative border-t border-border">
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-blue/40 to-transparent" />
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 sm:flex-row sm:px-10 lg:px-20">
          <span className="font-[family-name:var(--font-heading)] text-lg font-bold uppercase tracking-[0.15em] text-white">
            NEONARCADE
          </span>
          <nav className="flex items-center gap-8 text-xs font-medium uppercase tracking-[0.2em] text-text-secondary">
            <Link href="/games" className="transition-colors hover:text-white">Play</Link>
            <Link href="/vault" className="transition-colors hover:text-white">The Vault</Link>
            <Link href="/login" className="transition-colors hover:text-white">Sign In</Link>
          </nav>
          <p className="text-xs text-text-muted">&copy; 2026 NeonArcade</p>
        </div>
      </footer>
    </>
  );
}
