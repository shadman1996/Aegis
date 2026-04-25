"use client";
import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";

const tiers = [
  {
    name: "Intern",
    price: "Free",
    period: "30 days",
    desc: "Try your first AI employee. No card needed.",
    color: "#63DCB8",
    agents: 1,
    features: [
      "1 AI agent (your choice)",
      "Up to 3 team members",
      "Inspector compliance gate",
      "Email + WhatsApp notifications",
      "Community support",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Mid",
    price: "৳5,000",
    period: "/ month",
    desc: "For growing businesses replacing manual roles.",
    color: "#6366F1",
    agents: 5,
    features: [
      "5 AI agents (any combination)",
      "Up to 20 team members",
      "Inspector + audit trail",
      "WhatsApp + email + Slack",
      "IoT device connectivity",
      "Priority support",
      "Global payment methods",
    ],
    cta: "Hire 5 AI Employees",
    popular: true,
  },
  {
    name: "Senior",
    price: "৳15,000",
    period: "/ month",
    desc: "Full AI workforce for scaling companies.",
    color: "#F59E0B",
    agents: 15,
    features: [
      "15 AI agents",
      "Unlimited team members",
      "Advanced analytics (Nova)",
      "Custom AI knowledge base",
      "All integrations (IoT, ERP, CRM)",
      "Dedicated account agent",
      "SLA + 99.9% uptime",
      "White-label option",
    ],
    cta: "Build Full AI Team",
    popular: false,
  },
];

export default function NexaraPricing() {
  return (
    <section id="pricing" style={{ padding: "140px 24px", background: "#080D1C" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: 600, color: "#63DCB8", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>PRICING</p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, color: "#F1F5F9", letterSpacing: "-0.03em", marginBottom: 20 }}>
            Less than one employee&apos;s salary.<br />
            <span style={{ background: "linear-gradient(135deg, #63DCB8, #6366F1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              An entire AI workforce.
            </span>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", color: "#64748B", fontSize: "1rem", maxWidth: 440, margin: "0 auto" }}>
            Pay per agent. Cancel anytime. Works in 50+ countries with local payment methods.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                padding: 36,
                borderRadius: 24,
                border: tier.popular ? `1px solid ${tier.color}50` : "1px solid rgba(255,255,255,0.07)",
                background: tier.popular ? `linear-gradient(135deg, ${tier.color}08, rgba(99,102,241,0.08))` : "rgba(255,255,255,0.02)",
                position: "relative",
              }}
            >
              {tier.popular && (
                <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg, ${tier.color}, #6366F1)`, color: "#fff", fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 700, padding: "5px 16px", borderRadius: 999, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                  Most Popular
                </div>
              )}

              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: tier.color, marginBottom: 8 }}>{tier.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2.4rem", fontWeight: 800, color: "#F1F5F9" }}>{tier.price}</span>
                {tier.period && <span style={{ fontFamily: "'Inter', sans-serif", color: "#64748B", fontSize: "0.9rem" }}>{tier.period}</span>}
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#64748B", marginBottom: 28, lineHeight: 1.5 }}>{tier.desc}</p>

              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 999, background: tier.color + "14", border: `1px solid ${tier.color}30`, marginBottom: 28 }}>
                <Zap size={12} color={tier.color} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 600, color: tier.color }}>{tier.agents} AI Agent{tier.agents > 1 ? "s" : ""}</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                {tier.features.map((f) => (
                  <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <Check size={15} color={tier.color} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "#94A3B8" }}>{f}</span>
                  </div>
                ))}
              </div>

              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "13px 24px",
                  borderRadius: 12,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  background: tier.popular ? `linear-gradient(135deg, ${tier.color}, #6366F1)` : "transparent",
                  color: tier.popular ? "#fff" : tier.color,
                  border: tier.popular ? "none" : `1px solid ${tier.color}50`,
                  cursor: "pointer",
                }}
              >
                {tier.cta}
              </motion.a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginTop: 40, fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: "#475569" }}
        >
          All plans include Inspector compliance, audit trail, and 30-day free trial. No credit card needed to start.
        </motion.p>
      </div>
    </section>
  );
}
