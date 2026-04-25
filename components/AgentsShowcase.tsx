"use client";
import { motion } from "framer-motion";

const agents = [
  { id: "concierge", name: "Concierge", role: "Lead Qualifier", emoji: "🎯", stat: "24/7 WhatsApp", color: "#63DCB8", desc: "Qualifies every lead the moment they message. Never misses a prospect." },
  { id: "serea", name: "Serea", role: "Social Media Manager", emoji: "📱", stat: "847 posts/month", color: "#6366F1", desc: "Creates, schedules and publishes content across all platforms autonomously." },
  { id: "iris", name: "Iris", role: "Email Manager", emoji: "📧", stat: "∞ emails/day", color: "#F59E0B", desc: "Drafts, personalises and sends every email. Follows up automatically." },
  { id: "finn", name: "Finn", role: "Financial Analyst", emoji: "💹", stat: "0 missed invoices", color: "#10B981", desc: "Generates invoices, chases payments and delivers monthly P&L reports." },
  { id: "hera", name: "Hera", role: "HR & Recruiter", emoji: "👥", stat: "CVs screened: ∞", color: "#EC4899", desc: "Screens CVs, schedules interviews, manages attendance and payroll." },
  { id: "rex", name: "Rex", role: "Cybersecurity Guard", emoji: "🛡️", stat: "30s threat response", color: "#EF4444", desc: "Monitors your entire digital footprint. Blocks threats before they land." },
  { id: "atlas", name: "Atlas", role: "Project Manager", emoji: "📋", stat: "0 missed deadlines", color: "#8B5CF6", desc: "Manages your team's tasks, tracks progress and unblocks bottlenecks." },
  { id: "nova", name: "Nova", role: "Data Scientist", emoji: "📊", stat: "Real-time insights", color: "#06B6D4", desc: "Analyses all your business data and surfaces what matters, when it matters." },
  { id: "oracle", name: "Oracle", role: "SEO Specialist", emoji: "🔍", stat: "Top rankings", color: "#F97316", desc: "Researches keywords, optimises content and builds authority automatically." },
  { id: "kai", name: "Kai", role: "DevOps Engineer", emoji: "⚙️", stat: "Self-healing infra", color: "#14B8A6", desc: "Monitors your servers, auto-fixes issues and keeps everything running." },
  { id: "sage", name: "Sage", role: "Legal Reviewer", emoji: "⚖️", stat: "40+ laws checked", color: "#A78BFA", desc: "Reviews contracts, flags risks and ensures legal compliance on every action." },
  { id: "flux", name: "Flux", role: "Supply Chain Manager", emoji: "🚚", stat: "GPS-tracked orders", color: "#34D399", desc: "Manages inventory, tracks deliveries and optimises your supply chain." },
];

export default function AgentsShowcase() {
  return (
    <section id="agents" style={{ padding: "120px 0", overflow: "hidden", background: "#080D1C" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", marginBottom: 64 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "#63DCB8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            YOUR AI WORKFORCE
          </p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, color: "#F1F5F9", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>
            30+ AI employees.<br />
            <span style={{ background: "linear-gradient(135deg, #63DCB8, #6366F1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Every job covered.
            </span>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.05rem", color: "#64748B", maxWidth: 520, lineHeight: 1.7 }}>
            Each agent is a specialist. They don&apos;t assist — they do the work.
            Supervised by Inspector, compliant by design.
          </p>
        </motion.div>
      </div>

      {/* Scrolling agent cards — two rows, opposing directions */}
      {[agents.slice(0, 6), agents.slice(6, 12)].map((row, rowIdx) => (
        <div key={rowIdx} style={{ marginBottom: rowIdx === 0 ? 20 : 0, overflow: "hidden" }}>
          <motion.div
            animate={{ x: rowIdx === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            style={{ display: "flex", gap: 20, width: "max-content" }}
          >
            {[...row, ...row].map((agent, i) => (
              <div
                key={`${agent.id}-${i}`}
                style={{
                  width: 260,
                  flexShrink: 0,
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid rgba(255,255,255,0.07)`,
                  borderRadius: 20,
                  padding: 24,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = agent.color + "50";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                }}
              >
                {/* Glow blob */}
                <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: agent.color + "18", filter: "blur(20px)", pointerEvents: "none" }} />

                {/* Avatar */}
                <div style={{ width: 48, height: 48, borderRadius: 14, background: agent.color + "18", border: `1px solid ${agent.color}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: 16 }}>
                  {agent.emoji}
                </div>

                {/* Name + role */}
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#F1F5F9", marginBottom: 4 }}>{agent.name}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: agent.color, fontWeight: 600, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>{agent.role}</div>

                {/* Description */}
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "#64748B", lineHeight: 1.6, marginBottom: 16 }}>{agent.desc}</p>

                {/* Live stat pill */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 999, background: agent.color + "14", border: `1px solid ${agent.color}30` }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: agent.color, boxShadow: `0 0 6px ${agent.color}` }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 600, color: agent.color }}>{agent.stat}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      ))}
    </section>
  );
}
