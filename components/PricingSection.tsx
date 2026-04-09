"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Zap, Building2, ChevronRight, GraduationCap } from "lucide-react";

const tiers = [
  {
    id: "intern",
    name: "Intern",
    emoji: "🎓",
    price: "Free",
    period: "",
    description: "Trial access. Test drive any AI employee before committing.",
    color: "#64748B",
    highlight: false,
    badge: "Always Free",
    features: [
      "Access to 1 AI Employee",
      "Limited token capacity",
      "Basic task execution",
      "Community support",
      "No credit card required",
    ],
    cta: "Start Free",
  },
  {
    id: "entry",
    name: "Entry Level",
    emoji: "⚡",
    price: "$49",
    period: "/mo",
    description: "Standard tasks and moderate token limits. Great for small teams.",
    color: "#63DCB8",
    highlight: false,
    badge: null,
    features: [
      "1 AI Employee (your choice)",
      "Moderate token capacity",
      "Standard task execution",
      "Email support (< 24 hr)",
      "Console dashboard access",
      "Cancel anytime",
    ],
    cta: "Hire at Entry Level",
  },
  {
    id: "mid",
    name: "Mid Level",
    emoji: "🚀",
    price: "$129",
    period: "/mo",
    description: "Advanced logic and high token limits. Up to 3 AI employees.",
    color: "#7C6FF7",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Up to 3 AI Employees",
      "High token capacity",
      "Advanced multi-step logic (n8n)",
      "Priority support (< 4 hr)",
      "Cross-employee workflows",
      "Full analytics dashboard",
    ],
    cta: "Hire at Mid Level",
  },
  {
    id: "senior",
    name: "Senior Level",
    emoji: "👑",
    price: "$299",
    period: "/mo",
    description: "Enterprise-grade performance with maximum priority and all employees.",
    color: "#F59E0B",
    highlight: false,
    badge: "Enterprise",
    features: [
      "All AI Employees (current + upcoming)",
      "Maximum token capacity",
      "Enterprise-grade performance",
      "Dedicated account manager",
      "Custom AI training on your data",
      "SLA-backed uptime + OTP security",
      "White-label & API access",
    ],
    cta: "Go Senior",
  },
];

const devServices = [
  { label: "Custom Website", price: "from $1,500" },
  { label: "Web Application", price: "from $4,000" },
  { label: "Mobile App (iOS + Android)", price: "from $6,000" },
  { label: "Enterprise Software", price: "Custom quote" },
];

export default function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="section-pad" ref={ref}
      style={{ background: "linear-gradient(180deg, #070C18 0%, var(--bb-bg) 100%)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6 }}
          style={{ textAlign:"center", marginBottom:64 }}
        >
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"4px 14px", borderRadius:999, background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.22)", marginBottom:20 }}>
            <GraduationCap size={13} color="#F59E0B" />
            <span style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.73rem", fontWeight:600, color:"#F59E0B", letterSpacing:"0.1em", textTransform:"uppercase" }}>
              AI Employee Seniority Tiers
            </span>
          </div>
          <h2 style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:"clamp(2rem, 4.5vw, 3.2rem)", fontWeight:800, color:"#F1F5F9", letterSpacing:"-0.025em", lineHeight:1.12, marginBottom:16 }}>
            Start free as an Intern.{" "}
            <span className="gradient-text-teal">Scale to Senior.</span>
          </h2>
          <p style={{ fontFamily:"'Inter', sans-serif", color:"#64748B", fontSize:"1.05rem", maxWidth:560, margin:"0 auto", lineHeight:1.75 }}>
            Every AI employee has four seniority levels — each unlocking more intelligence, token capacity, and workload priority.
            Start on the Intern tier free, upgrade anytime.
          </p>
        </motion.div>

        {/* Tier Cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(248px, 1fr))", gap:20, alignItems:"start", marginBottom:72 }}>
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              id={`tier-${tier.id}`}
              initial={{ opacity:0, y:40 }}
              animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.6, delay:0.15 + i * 0.1 }}
              whileHover={{ y:-6, transition:{ duration:0.2 } }}
              className={tier.highlight ? "glass-strong" : "glass border-animate"}
              style={{ borderRadius:20, padding:"32px 26px", position:"relative", overflow:"hidden", border: tier.highlight ? `1px solid ${tier.color}50` : undefined, boxShadow: tier.highlight ? `0 0 48px ${tier.color}18` : undefined }}
            >
              {tier.badge && (
                <div style={{ position:"absolute", top:16, right:16, padding:"4px 10px", borderRadius:999, background:`${tier.color}16`, border:`1px solid ${tier.color}35`, fontFamily:"'Inter', sans-serif", fontSize:"0.67rem", fontWeight:700, color:tier.color, letterSpacing:"0.06em" }}>
                  {tier.badge}
                </div>
              )}

              <div style={{ fontSize:"2rem", marginBottom:16 }}>{tier.emoji}</div>

              <h3 style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:"1.1rem", color:"#F1F5F9", marginBottom:6 }}>{tier.name}</h3>
              <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.82rem", color:"#64748B", lineHeight:1.55, marginBottom:20 }}>{tier.description}</p>

              <div style={{ marginBottom:24 }}>
                <span style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:800, fontSize:"2.4rem", color:tier.color, lineHeight:1 }}>{tier.price}</span>
                {tier.period && <span style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.85rem", color:"#64748B", marginLeft:5 }}>{tier.period}</span>}
              </div>

              <ul style={{ listStyle:"none", padding:0, margin:"0 0 28px", display:"flex", flexDirection:"column", gap:10 }}>
                {tier.features.map((f) => (
                  <li key={f} style={{ display:"flex", alignItems:"flex-start", gap:10, fontFamily:"'Inter', sans-serif", fontSize:"0.84rem", color:"#94A3B8", lineHeight:1.4 }}>
                    <Check size={14} color={tier.color} style={{ flexShrink:0, marginTop:2 }} />
                    {f}
                  </li>
                ))}
              </ul>

              <motion.a href="#" whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"13px 20px", borderRadius:12, textDecoration:"none", fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:"0.9rem", background: tier.highlight ? `linear-gradient(135deg, ${tier.color}, #63DCB8)` : "transparent", color: tier.highlight ? "#04080F" : tier.color, border: tier.highlight ? "none" : `1px solid ${tier.color}50`, transition:"all 0.2s ease" }}
              >
                {tier.cta}
                <ChevronRight size={16} />
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Custom Dev Services */}
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.7 }}>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"4px 14px", borderRadius:999, background:"rgba(124,111,247,0.08)", border:"1px solid rgba(124,111,247,0.22)", marginBottom:14 }}>
              <Building2 size={13} color="#7C6FF7" />
              <span style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.73rem", fontWeight:600, color:"#7C6FF7", letterSpacing:"0.1em", textTransform:"uppercase" }}>Custom Development</span>
            </div>
            <h3 style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:"1.4rem", color:"#F1F5F9", marginBottom:8 }}>
              Need a bespoke build? We handle that too.
            </h3>
            <p style={{ fontFamily:"'Inter', sans-serif", color:"#64748B", fontSize:"0.9rem", maxWidth:480, margin:"0 auto" }}>
              Custom websites, apps, and software — built by our team and monitored forever via your Console dashboard.
            </p>
          </div>

          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:16 }}>
            {devServices.map((s) => (
              <div key={s.label} style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 24px", borderRadius:14, background:"rgba(124,111,247,0.06)", border:"1px solid rgba(124,111,247,0.15)" }}>
                <Zap size={16} color="#7C6FF7" />
                <div>
                  <div style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:"0.9rem", color:"#E2E8F0" }}>{s.label}</div>
                  <div style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.78rem", color:"#7C6FF7", fontWeight:600 }}>{s.price}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay:0.95 }}
          style={{ textAlign:"center", marginTop:40, fontFamily:"'Inter', sans-serif", fontSize:"0.87rem", color:"#475569" }}
        >
          <span style={{ color:"#10B981", fontWeight:600 }}>✓</span>{" "}
          Intern tier always free — no credit card needed. ·{" "}
          <strong style={{ color:"#63DCB8" }}>Upgrade or downgrade any employee anytime.</strong>{" "}
          · Payments via NowPayments (global).
        </motion.div>
      </div>
    </section>
  );
}
