"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, CreditCard, Rocket, ChevronRight } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Browse the Roster",
    description:
      "Explore our growing lineup of AI employees — each one a domain specialist. Filter by department, task type, or price. Read their capability sheets just like a real job profile.",
    color: "#63DCB8",
    detail: "No commitment to browse. Every AI employee has a free trial or free-tier task.",
  },
  {
    step: "02",
    icon: CreditCard,
    title: "Subscribe or Pay-Per-Task",
    description:
      "Choose a monthly subscription for unlimited use, or pay only for what you need with our credit system. No annual lock-ins. Cancel any employee any time.",
    color: "#7C6FF7",
    detail: "Subscriptions include priority support. Credits roll over monthly. Zero hidden fees.",
  },
  {
    step: "03",
    icon: Rocket,
    title: "Deployed in Minutes",
    description:
      "Your AI employee is live and working within minutes of signing up. Connect your tools (calendar, CRM, phone line) via our guided setup wizard — no developer needed.",
    color: "#F59E0B",
    detail: "Average onboarding time: under 1 business day. Human support available if needed.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      className="section-pad"
      ref={ref}
      style={{
        background: "linear-gradient(180deg, var(--bb-bg) 0%, #070C18 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(124,111,247,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "4px 16px", borderRadius: 999,
            background: "rgba(124,111,247,0.08)",
            border: "1px solid rgba(124,111,247,0.22)",
            marginBottom: 20,
          }}>
            <Rocket size={13} color="#7C6FF7" />
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: "0.73rem",
              fontWeight: 600, color: "#7C6FF7", letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              Simple Onboarding
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            fontWeight: 800, color: "#F1F5F9",
            letterSpacing: "-0.025em",
            lineHeight: 1.12, marginBottom: 16,
          }}>
            From browsing to{" "}
            <span className="gradient-text-indigo">deployed</span>
            {" "}in 3 steps.
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            color: "#64748B", fontSize: "1.05rem",
            maxWidth: 520, margin: "0 auto", lineHeight: 1.75,
          }}>
            Hiring an AI employee is faster than posting a job listing. No interviews. No notice period.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 28,
          position: "relative",
        }}>
          {/* Connector line (desktop) */}
          <div style={{
            position: "absolute",
            top: 52,
            left: "16.5%",
            right: "16.5%",
            height: 1,
            background: "linear-gradient(90deg, rgba(99,220,184,0.2), rgba(124,111,247,0.2), rgba(245,158,11,0.2))",
            zIndex: 0,
          }} className="hidden-mobile" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
                className="glass border-animate"
                style={{
                  borderRadius: 20, padding: "36px 28px",
                  textAlign: "center", position: "relative", zIndex: 1,
                }}
              >
                {/* Step icon */}
                <div style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: `${step.color}12`,
                  border: `2px solid ${step.color}35`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px",
                  position: "relative",
                  boxShadow: `0 0 30px ${step.color}20`,
                }}>
                  <Icon size={28} color={step.color} strokeWidth={1.8} />
                  {/* Step number */}
                  <div style={{
                    position: "absolute", top: -10, right: -10,
                    width: 26, height: 26, borderRadius: "50%",
                    background: step.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 800, fontSize: "0.72rem", color: "#04080F",
                  }}>
                    {i + 1}
                  </div>
                </div>

                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.7rem", fontWeight: 700,
                  color: step.color, letterSpacing: "0.1em",
                  textTransform: "uppercase", marginBottom: 12,
                }}>
                  Step {step.step}
                </div>

                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700, fontSize: "1.25rem", color: "#F1F5F9",
                  marginBottom: 14, lineHeight: 1.3,
                }}>
                  {step.title}
                </h3>

                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem", color: "#94A3B8",
                  lineHeight: 1.7, marginBottom: 20,
                }}>
                  {step.description}
                </p>

                <div style={{
                  padding: "10px 14px", borderRadius: 10,
                  background: `${step.color}08`,
                  border: `1px solid ${step.color}20`,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.78rem", color: "#64748B",
                  lineHeight: 1.5,
                }}>
                  💡 {step.detail}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65 }}
          style={{ textAlign: "center", marginTop: 56 }}
        >
          <motion.a
            href="#roster"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary glow-teal"
            style={{ display: "inline-flex" }}
          >
            Meet Your First AI Employee
            <ChevronRight size={17} />
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
      `}</style>
    </section>
  );
}
