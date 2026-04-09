"use client";

import { motion } from "framer-motion";
import { Users, Globe, ExternalLink, GitBranch, Mail } from "lucide-react";

const footerLinks = {
  "AI Employees": [
    { label: "Aria — Receptionist", href: "#roster" },
    { label: "Rex — Security Analyst", href: "#roster" },
    { label: "Nova — Data Analyst", href: "#roster" },
    { label: "Max — Support Agent", href: "#roster" },
    { label: "View All", href: "#roster" },
  ],
  "Platform": [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Integrations", href: "#" },
    { label: "Security", href: "#" },
    { label: "API Docs", href: "#" },
  ],
  "Company": [
    { label: "About Us", href: "#about" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Partners", href: "#" },
  ],
};

const socials = [
  { icon: Globe,        href: "#", label: "Website" },
  { icon: ExternalLink, href: "#", label: "LinkedIn" },
  { icon: GitBranch,    href: "#", label: "GitHub" },
  { icon: Mail,         href: "#", label: "Email" },
];

const trust = ["SOC 2 Aligned", "GDPR Ready", "99.9% Uptime SLA", "Firebase Auth", "Cloud Run Hosted"];

export default function Footer() {
  return (
    <footer
      id="about"
      style={{
        background: "#04080F",
        borderTop: "1px solid rgba(99,220,184,0.1)",
        padding: "80px 24px 40px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Top grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 48,
          marginBottom: 64,
        }}>
          {/* Brand column */}
          <div>
            <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 20 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "linear-gradient(135deg, #63DCB8, #7C6FF7)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Users size={18} color="#04080F" strokeWidth={2.5} />
              </div>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800, fontSize: "1.25rem",
                background: "linear-gradient(135deg, #63DCB8, #7C6FF7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Bengal Bound
              </span>
            </a>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.875rem", color: "#64748B",
              lineHeight: 1.75, maxWidth: 280, marginBottom: 24,
            }}>
              The AI employee marketplace. Hire intelligent AI workers for every department —
              from your front desk to your server room. No salary. No headcount.
            </p>

            {/* Socials */}
            <div style={{ display: "flex", gap: 12 }}>
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    whileHover={{ scale: 1.15, y: -2 }}
                    style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: "rgba(99,220,184,0.07)",
                      border: "1px solid rgba(99,220,184,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#64748B",
                      transition: "color 0.2s ease, border-color 0.2s ease",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#63DCB8";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,220,184,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#64748B";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,220,184,0.15)";
                    }}
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700, fontSize: "0.85rem",
                color: "#E2E8F0", marginBottom: 20,
                textTransform: "uppercase", letterSpacing: "0.06em",
              }}>
                {section}
              </div>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        textDecoration: "none",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.875rem", color: "#64748B",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#63DCB8")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#64748B")}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 12,
          justifyContent: "center", marginBottom: 40,
        }}>
          {trust.map((t) => (
            <div key={t} style={{
              padding: "6px 14px", borderRadius: 8,
              background: "rgba(99,220,184,0.05)",
              border: "1px solid rgba(99,220,184,0.12)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.72rem", fontWeight: 600,
              color: "#475569", letterSpacing: "0.05em",
            }}>
              ✦ {t}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 16,
          paddingTop: 24,
          borderTop: "1px solid rgba(99,220,184,0.08)",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.8rem", color: "#334155",
        }}>
          <span>© 2026 Bengal Bound, Inc. · Minnetonka, Minnesota, US</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item) => (
              <a
                key={item}
                href="#"
                style={{ textDecoration: "none", color: "#334155", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#63DCB8")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#334155")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 540px) {
          footer > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
