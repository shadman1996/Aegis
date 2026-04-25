"use client";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Tell us about your business",
    body: "Answer 6 questions. AI configures your perfect workspace — agents, layout, language, currency — automatically. No manual setup.",
    detail: ["Business type detected", "Agents pre-selected", "Dashboard configured", "Language & currency set"],
    color: "#63DCB8",
  },
  {
    num: "02",
    title: "Your AI team starts working",
    body: "Agents begin operating your business functions immediately. Every action is screened by Inspector — the world's only built-in AI compliance engine.",
    detail: ["24/7 autonomous operation", "Inspector gate on every action", "Approval queue for sensitive tasks", "Immutable audit trail"],
    color: "#6366F1",
  },
  {
    num: "03",
    title: "You watch. Approve. Grow.",
    body: "Get a morning briefing from your AI team. Approve anything sensitive with one tap. Scale to new markets, new agents, new languages — anytime.",
    detail: ["Daily AI briefing delivered", "One-tap approvals", "Add agents as you grow", "Works in 50+ countries"],
    color: "#F59E0B",
  },
];

export default function HowNexaraWorks() {
  return (
    <section id="platform" style={{ padding: "140px 24px", background: "#0A0F1E" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 96 }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "#63DCB8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>HOW IT WORKS</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, color: "#F1F5F9", letterSpacing: "-0.03em", marginBottom: 20 }}>
            From signup to AI workforce<br />in under 10 minutes.
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", color: "#64748B", fontSize: "1.05rem", maxWidth: 480, margin: "0 auto" }}>
            No engineers needed. No configuration manuals. No waiting.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2, position: "relative" }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{
                padding: 40,
                background: i === 1 ? "rgba(99,102,241,0.05)" : "transparent",
                border: `1px solid ${i === 1 ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.05)"}`,
                borderRadius: 24,
                position: "relative",
              }}
            >
              {/* Step number */}
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "4rem", fontWeight: 900, color: step.color + "20", lineHeight: 1, marginBottom: 24, letterSpacing: "-0.05em" }}>
                {step.num}
              </div>

              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.3rem", fontWeight: 700, color: "#F1F5F9", marginBottom: 16, lineHeight: 1.3 }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "#64748B", lineHeight: 1.7, marginBottom: 28 }}>
                {step.body}
              </p>

              {/* Detail items */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {step.detail.map((d) => (
                  <div key={d} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: step.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "#94A3B8", fontWeight: 500 }}>{d}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
