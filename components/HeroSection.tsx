"use client";

import { motion } from "framer-motion";
import { Sparkles, ChevronRight, ArrowDown, Layers } from "lucide-react";

const stats = [
  { value: "AIaaS",  label: "AI Employees as a Service" },
  { value: "$0",     label: "Hiring Cost" },
  { value: "24/7",   label: "Always Working" },
  { value: "4",      label: "Seniority Tiers" },
];

export default function HeroSection() {
  return (
    <section
      className="hero-bg mesh-grid"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 120,
        paddingBottom: 80,
        paddingLeft: 24,
        paddingRight: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <div className="animate-float" style={{ position:"absolute", top:"12%", left:"6%", width:340, height:340, borderRadius:"50%", background:"radial-gradient(circle, rgba(99,220,184,0.07) 0%, transparent 70%)", pointerEvents:"none" }} />
      <div className="animate-float" style={{ position:"absolute", bottom:"18%", right:"5%", width:420, height:420, borderRadius:"50%", background:"radial-gradient(circle, rgba(124,111,247,0.07) 0%, transparent 70%)", pointerEvents:"none", animationDelay:"2s" }} />

      <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center" }}>

        {/* Badge */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
          style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 18px", borderRadius:999, background:"rgba(99,220,184,0.08)", border:"1px solid rgba(99,220,184,0.25)", marginBottom:32 }}
        >
          <div className="animate-pulse-glow" style={{ width:8, height:8, borderRadius:"50%", background:"#63DCB8" }} />
          <span style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.78rem", fontWeight:600, color:"#63DCB8", letterSpacing:"0.08em", textTransform:"uppercase" }}>
            Custom Software Agency · AI Employee as a Service (AIaaS)
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.1 }}
          style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:"clamp(2.8rem, 6.5vw, 5.2rem)", fontWeight:800, lineHeight:1.06, letterSpacing:"-0.03em", color:"#F1F5F9", marginBottom:24 }}
        >
          Build Smarter.{" "}
          <span className="gradient-text-teal text-glow-teal">Hire Smarter.</span>
          <br />
          <span style={{ fontSize:"clamp(1.8rem, 4vw, 3.2rem)" }}>
            We Build It. Our AI Runs It.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.2 }}
          style={{ fontFamily:"'Inter', sans-serif", fontSize:"clamp(1rem, 2.5vw, 1.2rem)", fontWeight:400, color:"#94A3B8", lineHeight:1.75, maxWidth:700, margin:"0 auto 44px" }}
        >
          BengalBound is a{" "}
          <strong style={{ color:"#E2E8F0", fontWeight:600 }}>hybrid Custom Software Agency and AI Employee platform</strong>.
          We build your bespoke websites, apps, and enterprise software — then deploy a{" "}
          <strong style={{ color:"#63DCB8", fontWeight:600 }}>plug-and-play AI workforce</strong>{" "}
          to run, monitor, and grow them. One platform. Zero headcount.
        </motion.p>

        {/* Dual CTA */}
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.3 }}
          style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap", marginBottom:72 }}
        >
          <motion.a href="#roster" whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }} className="btn-primary glow-teal" id="hero-cta-hire">
            <Sparkles size={19} />
            Hire an AI Employee
            <ChevronRight size={17} />
          </motion.a>
          <motion.a href="#ecosystem" whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }} className="btn-secondary" id="hero-cta-platform">
            <Layers size={16} />
            Explore the Platform
          </motion.a>
          <motion.a href="#how-it-works" whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }} className="btn-secondary" id="hero-cta-how">
            <ArrowDown size={16} />
            Our Dev Services
          </motion.a>
        </motion.div>

        {/* Stats strip */}
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.5 }}
          style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))", gap:1, maxWidth:740, margin:"0 auto", background:"rgba(99,220,184,0.07)", borderRadius:16, border:"1px solid rgba(99,220,184,0.15)", overflow:"hidden" }}
        >
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 + i * 0.1 }}
              style={{ padding:"20px 16px", textAlign:"center", borderRight: i < stats.length - 1 ? "1px solid rgba(99,220,184,0.1)" : "none" }}
            >
              <div style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:"1.6rem", fontWeight:800, color:"#63DCB8", marginBottom:4 }}>{stat.value}</div>
              <div style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.72rem", color:"#64748B", fontWeight:500, textTransform:"uppercase", letterSpacing:"0.06em" }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
