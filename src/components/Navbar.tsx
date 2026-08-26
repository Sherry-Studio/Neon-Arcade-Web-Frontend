"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Avatar from "@/components/ui/Avatar";

const navLinks = [
  { href: "/games", label: "PLAY" },
  { href: "/games#discover", label: "DISCOVER" },
  { href: "/vault", label: "THE VAULT" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href.includes("#")) return pathname === href.split("#")[0];
    return pathname === href;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-bold text-white uppercase tracking-[0.15em] font-[family-name:var(--font-heading)]"
          >
            NEONARCADE
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group flex flex-col items-center"
                >
                  <span
                    className={`text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                      active ? "text-white" : "text-text-secondary hover:text-white"
                    }`}
                  >
                    {link.label}
                  </span>
                  {active && (
                    <span className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-white" />
                  )}
                </Link>
              );
            })}

            {session ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/profile"
                  className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-text-secondary hover:text-white transition-colors duration-300"
                >
                  <Avatar avatarId={session.user?.avatar} size={26} />
                  {session.user?.name}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-xs font-medium uppercase tracking-[0.2em] text-text-muted hover:text-white transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-text-secondary hover:text-white transition-colors duration-300"
              >
                <LogIn size={14} />
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-text-secondary hover:text-white transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu - full screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 top-0 bg-surface/98 backdrop-blur-xl z-40 flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-2xl font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-heading)] transition-colors duration-300 ${
                        active ? "text-white" : "text-text-secondary hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-8"
              >
                {session ? (
                  <div className="flex flex-col items-center gap-6">
                    <Link
                      href="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-text-secondary hover:text-white transition-colors"
                    >
                      <Avatar avatarId={session.user?.avatar} size={30} />
                      {session.user?.name}
                    </Link>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="text-sm font-medium uppercase tracking-[0.2em] text-text-muted hover:text-white transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-text-secondary hover:text-white transition-colors"
                  >
                    <LogIn size={16} />
                    Login
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
