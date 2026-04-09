"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Terminal, Settings2, Users2, ExternalLink } from "lucide-react";

const pillars = [
  {
    id: "marketing",
    label: "bengalbound.com",
    name: "Marketing Site",
    icon: Globe,
    color: "#63DCB8",
    description:
      "The public storefront. Showcases our custom dev portfolio (Web, Mobile, Software), the AI Employee Job Portal, blog, and consultation booking. Every pixel is fully manageable via the Workspace Admin.",
    audience: "Public & Prospects",
    features: ["AI Job Portal", "Portfolio Showcase", "Consultation Booking", "Admin-Controlled Content"],
  },
  {
    id: "console",
    label: "console.bengalbound.io",
    name: "Console Admin",
    icon: Terminal,
    color: "#7C6FF7",
    description:
      "The client's command center. Hire and manage AI employees, assign tasks, track custom project progress, and monitor live app data via a dedicated API-driven dashboard — all in one place.",
    audience: "Clients",
    features: ["Hire & Manage AI Employees", "Project Tracking", "Live App Monitoring", "API Dashboard"],
  },
  {
    id: "workspace",
    label: "workspace.bengalbound.io",
    name: "Workspace Admin",
    icon: Settings2,
    color: "#F59E0B",
    description:
      "Our internal operations hub. The BengalBound team uses this to monitor every AI agent across all clients, manage dev projects, handle support tickets, and control the marketing site in real time.",
    audience: "BengalBound Team",
    features: ["AI Agent Monitoring", "Client Project Hub", "Support Tickets", "Marketing Site CMS"],
  },
  {
    id: "community",
    label: "community.bengalbound.com",
    name: "Community Site",
    icon: Users2,
    color: "#F43F5E",
    description:
      "A public forum for networking and troubleshooting. Clients, developers, and AI enthusiasts connect here. Serves as an organic lead magnet that funnels prospects into the platform.",
    audience: "Public Community",
    features: ["Networking Forum", "Troubleshooting Hub", "AI Discussions", "Lead Magnet"],
  },
];

export default function EcosystemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="ecosystem"
      className="section-pad"
      ref={ref}
      style={{
        background: "linear-gradient(180deg, #070C18 0%, var(--bb-bg) 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent orb */}
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:800, height:800, borderRadius:"50%", background:"radial-gradient(circle, rgba(99,220,184,0.04) 0%, transparent 70%)", pointerEvents:"none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ duration:0.6 }}
          style={{ textAlign:"center", marginBottom:72 }}
        >
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"4px 16px", borderRadius:999, background:"rgba(99,220,184,0.08)", border:"1px solid rgba(99,220,184,0.22)", marginBottom:20 }}>
            <Globe size={13} color="#63DCB8" />
            <span style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.73rem", fontWeight:600, color:"#63DCB8", letterSpacing:"0.1em", textTransform:"uppercase" }}>
              The Four Pillars
            </span>
          </div>
          <h2 style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:"clamp(2rem, 4.5vw, 3.2rem)", fontWeight:800, color:"#F1F5F9", letterSpacing:"-0.025em", lineHeight:1.12, marginBottom:16 }}>
            One Platform.{" "}
            <span className="gradient-text-teal">Four Powerful Hubs.</span>
          </h2>
          <p style={{ fontFamily:"'Inter', sans-serif", color:"#64748B", fontSize:"1.05rem", maxWidth:560, margin:"0 auto", lineHeight:1.75 }}>
            BengalBound operates on a high-security, multi-tenant architecture across four dedicated subdomains — each built for a distinct audience and purpose.
          </p>
        </motion.div>

        {/* Pillar cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(270px, 1fr))", gap:24 }}>
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity:0, y:40 }}
                animate={inView ? { opacity:1, y:0 } : {}}
                transition={{ duration:0.55, delay:0.1 + i * 0.1 }}
                className="glass border-animate"
                style={{ borderRadius:20, padding:"28px", position:"relative" }}
              >
                {/* Audience pill */}
                <div style={{ position:"absolute", top:18, right:18, padding:"3px 10px", borderRadius:999, background:`${pillar.color}12`, border:`1px solid ${pillar.color}28`, fontFamily:"'Inter', sans-serif", fontSize:"0.65rem", fontWeight:700, color:pillar.color, letterSpacing:"0.07em", textTransform:"uppercase" }}>
                  {pillar.audience}
                </div>

                {/* Icon */}
                <div style={{ width:52, height:52, borderRadius:14, background:`${pillar.color}12`, border:`1px solid ${pillar.color}28`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18, boxShadow:`0 0 24px ${pillar.color}18` }}>
                  <Icon size={24} color={pillar.color} strokeWidth={1.8} />
                </div>

                {/* Subdomain label */}
                <div style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.72rem", fontWeight:600, color:pillar.color, letterSpacing:"0.05em", marginBottom:6, display:"flex", alignItems:"center", gap:5 }}>
                  <ExternalLink size={11} color={pillar.color} />
                  {pillar.label}
                </div>

                <h3 style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:"1.15rem", color:"#F1F5F9", marginBottom:12, lineHeight:1.3 }}>
                  {pillar.name}
                </h3>

                <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.84rem", color:"#94A3B8", lineHeight:1.65, marginBottom:20 }}>
                  {pillar.description}
                </p>

                {/* Features */}
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {pillar.features.map((f) => (
                    <div key={f} style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:6, height:6, borderRadius:"50%", background:pillar.color, flexShrink:0 }} />
                      <span style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.8rem", color:"#64748B" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech stack bar */}
        <motion.div initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.7 }}
          style={{ marginTop:56, padding:"24px 32px", borderRadius:16, background:"rgba(99,220,184,0.04)", border:"1px solid rgba(99,220,184,0.12)", display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"center", gap:28 }}
        >
          <span style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.78rem", fontWeight:600, color:"#475569", textTransform:"uppercase", letterSpacing:"0.1em" }}>
            Powered by
          </span>
          {["Django", "Bootstrap 5", "TypeScript", "n8n Workflows", "NowPayments", "OTP Security", "Mailtrap"].map((tech) => (
            <div key={tech} style={{ padding:"5px 14px", borderRadius:8, background:"rgba(124,111,247,0.08)", border:"1px solid rgba(124,111,247,0.18)", fontFamily:"'Space Grotesk', sans-serif", fontSize:"0.78rem", fontWeight:600, color:"#7C6FF7" }}>
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
