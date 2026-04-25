"use client";
import { motion } from "framer-motion";

const footerLinks = {
  Platform: ["AI Agents", "Inspector", "Veritas KYB", "Integrations", "IoT Connectivity", "API Docs"],
  Company: ["About Bengal Bound", "Brand Vision", "Careers", "Press Kit", "Partners", "Contact"],
  Legal: ["Terms of Service", "Privacy Policy", "Data Processing", "Compliance", "Security"],
  Support: ["Documentation", "Developer Portal", "Status Page", "Community", "Contact Support"],
};

export default function NexaraFooter() {
  return (
    <footer style={{ background: "#060A17", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "80px 24px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Top section */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr repeat(4, auto)", gap: 48, marginBottom: 80, flexWrap: "wrap" }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, #63DCB8, #6366F1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: "0.85rem", color: "#0A0F1E" }}>N</span>
              </div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1.2rem", background: "linear-gradient(135deg, #63DCB8, #6366F1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Nexara
              </span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#475569", lineHeight: 1.7, maxWidth: 260, marginBottom: 24 }}>
              The world&apos;s first AI-as-Employee marketplace. Built by Bengal Bound Ltd, from Bangladesh, for the world.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {["🇧🇩", "🇸🇬", "🇦🇪", "🇬🇧", "🇺🇸"].map((flag) => (
                <span key={flag} style={{ fontSize: "1.1rem" }}>{flag}</span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#63DCB8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>{category}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#475569", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#94A3B8")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#475569")}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Inspector compliance banner */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ padding: "20px 28px", borderRadius: 14, background: "rgba(99,220,184,0.04)", border: "1px solid rgba(99,220,184,0.12)", display: "flex", alignItems: "center", gap: 16, marginBottom: 48, flexWrap: "wrap" }}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#63DCB8", boxShadow: "0 0 8px #63DCB8", flexShrink: 0 }} />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "#64748B", margin: 0 }}>
            <strong style={{ color: "#94A3B8" }}>Inspector Active:</strong> Every AI action on this platform is screened against 40+ global laws including GDPR, DPDPA, HIPAA, and Bangladesh&apos;s Digital Security Act. Fail-closed by design.
          </p>
        </motion.div>

        {/* Bottom */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "#334155" }}>
            © 2026 Bengal Bound Ltd. All rights reserved. Nexara is a product of Bengal Bound Ltd, registered in Bangladesh.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: "#334155" }}>
            Built with ♥ from Dhaka, Bangladesh 🇧🇩
          </p>
        </div>
      </div>
    </footer>
  );
}
