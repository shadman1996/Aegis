"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "AI Agents", href: "#agents" },
  { label: "Platform", href: "#platform" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
  { label: "Partners", href: "#partners" },
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
          background: scrolled ? "rgba(10, 15, 30, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(99,220,184,0.12)" : "1px solid transparent",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo — click goes to top */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 38, height: 38, borderRadius: 10,
                background: "linear-gradient(135deg, #63DCB8, #6366F1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 20px rgba(99,220,184,0.3)",
              }}
            >
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: "0.9rem", color: "#0A0F1E" }}>N</span>
            </motion.div>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1.35rem",
              background: "linear-gradient(135deg, #63DCB8, #6366F1)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              letterSpacing: "-0.02em",
            }}>
              Nexara
            </span>
          </a>

          {/* Desktop Nav */}
          <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="hidden-mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  textDecoration: "none", color: "#94A3B8",
                  fontFamily: "'Inter', sans-serif", fontWeight: 500,
                  fontSize: "0.9rem", transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#63DCB8")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#94A3B8")}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <motion.a
              href="/login"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="hidden-mobile"
              style={{
                textDecoration: "none", color: "#94A3B8",
                fontFamily: "'Inter', sans-serif", fontWeight: 500,
                fontSize: "0.875rem", padding: "8px 16px",
                borderRadius: 8, transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#F9FAFB")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#94A3B8")}
            >
              Log In
            </motion.a>

            <motion.a
              href="#agents"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="hidden-mobile"
              style={{
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6,
                padding: "10px 20px", borderRadius: 10,
                background: "linear-gradient(135deg, #63DCB8, #6366F1)",
                color: "#0A0F1E", fontFamily: "'Inter', sans-serif",
                fontWeight: 700, fontSize: "0.875rem",
                boxShadow: "0 0 20px rgba(99,220,184,0.25)",
              }}
            >
              <Zap size={15} />
              Hire AI Employees
            </motion.a>

            {/* Mobile hamburger */}
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
              position: "fixed", top: 72, left: 0, right: 0, zIndex: 999,
              background: "rgba(10, 15, 30, 0.97)", backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(99,220,184,0.15)",
              padding: "24px", display: "flex", flexDirection: "column", gap: 20,
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  textDecoration: "none", color: "#E2E8F0",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600, fontSize: "1.1rem",
                  padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {link.label}
              </a>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 8 }}>
              <a href="/login" style={{
                textDecoration: "none", textAlign: "center", padding: "14px",
                borderRadius: 12, border: "1px solid rgba(99,220,184,0.2)",
                color: "#63DCB8", fontFamily: "'Inter', sans-serif", fontWeight: 600,
              }}>Log In</a>
              <a href="#agents" style={{
                textDecoration: "none", textAlign: "center", padding: "14px",
                borderRadius: 12, background: "linear-gradient(135deg, #63DCB8, #6366F1)",
                color: "#0A0F1E", fontFamily: "'Inter', sans-serif", fontWeight: 700,
              }}>
                <Zap size={16} style={{ display: "inline", marginRight: 6 }} />
                Hire AI Employees
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
