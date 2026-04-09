"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { label: "AI Roster",   href: "#roster" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing",     href: "#pricing" },
  { label: "About",       href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "0 24px",
          transition: "all 0.3s ease",
          background: scrolled ? "rgba(4, 8, 15, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(99,220,184,0.12)"
            : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "linear-gradient(135deg, #63DCB8, #7C6FF7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Users size={20} color="#04080F" strokeWidth={2.5} />
            </motion.div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: "1.35rem",
                background: "linear-gradient(135deg, #63DCB8, #7C6FF7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.02em",
              }}
            >
              Bengal Bound
            </span>
          </a>

          {/* Desktop Nav */}
          <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="hidden-mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  textDecoration: "none",
                  color: "#94A3B8",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#63DCB8")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#94A3B8")}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <motion.a
              href="#roster"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary hidden-mobile"
              style={{ fontSize: "0.875rem", padding: "10px 22px" }}
            >
              <Sparkles size={15} />
              Browse AI Employees
            </motion.a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="show-mobile"
              style={{ background: "none", border: "none", cursor: "pointer", color: "#63DCB8", padding: 4 }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed",
              top: 72,
              left: 0,
              right: 0,
              zIndex: 999,
              background: "rgba(4, 8, 15, 0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(99,220,184,0.15)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  textDecoration: "none",
                  color: "#E2E8F0",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                }}
              >
                {link.label}
              </a>
            ))}
            <a href="#roster" className="btn-primary" style={{ textAlign: "center", justifyContent: "center" }}>
              <Sparkles size={15} />
              Browse AI Employees
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile   { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
