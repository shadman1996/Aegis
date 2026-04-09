"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MessageSquare, ShieldCheck, BarChart3, HeadphonesIcon,
  Target, FileText, TrendingUp, Search, Bot, ChevronRight,
  Check, Code2, Gavel, Phone, UserPlus, DollarSign,
  ClipboardList, Inbox, Users, Calendar, Home, ShoppingCart, Globe,
} from "lucide-react";

// ── Complete AI Workforce — all current & planned modules ─────────
const employees = [
  {
    id: "serea",
    name: "Serea",
    role: "Social Media Moderator",
    department: "Community & Brand",
    icon: MessageSquare,
    color: "#63DCB8",
    available: true,
    badge: "Live Now",
    description: "Handles community engagement, content safety filtering, customer support, and real-time sentiment crisis monitoring across all your social channels — 24/7 without fatigue.",
    skills: ["Community Engagement", "Content Safety", "Customer Support", "Sentiment Monitoring"],
    humanCost: "৳15,000–৳30,000 /mo",
    aiCost: "৳2,000 /mo",
    saving: "87%+",
  },
  {
    id: "lead-hunter",
    name: "Lead Hunter",
    role: "AI Lead Generator",
    department: "Sales",
    icon: Target,
    color: "#7C6FF7",
    available: false,
    badge: "Coming Soon",
    description: "Monitors social signals and web data to surface 20+ ready-to-buy B2B leads daily — delivered straight to your CRM before your human team even starts their day.",
    skills: ["Social Signal Monitoring", "B2B Lead Scoring", "CRM Sync", "Daily Lead Reports"],
    humanCost: "৳25,000–৳40,000 /mo",
    aiCost: "৳2,000 /mo",
    saving: "92%+",
  },
  {
    id: "concierge",
    name: "Concierge",
    role: "AI Client Concierge",
    department: "Sales & Support",
    icon: HeadphonesIcon,
    color: "#F43F5E",
    available: false,
    badge: "Coming Soon",
    description: "A 24/7 WhatsApp/Web agent that qualifies inbound leads, answers FAQs, and books meetings directly into your CEO's calendar — zero manual follow-up required.",
    skills: ["WhatsApp Integration", "Lead Qualification", "Calendar Booking", "24/7 Availability"],
    humanCost: "৳12,000–৳20,000 /mo",
    aiCost: "৳2,000 /mo",
    saving: "83%+",
  },
  {
    id: "content-architect",
    name: "Content Architect",
    role: "AI Content Specialist",
    department: "Marketing",
    icon: FileText,
    color: "#F59E0B",
    available: false,
    badge: "Coming Soon",
    description: "Researches trending topics and generates a full month's worth of SEO-optimized blog posts, social captions, email sequences, and high-conversion ad copy — in your brand voice.",
    skills: ["SEO Blog Posts", "Ad Copy", "Email Sequences", "Social Captions"],
    humanCost: "৳20,000–৳35,000 /mo",
    aiCost: "৳2,000 /mo",
    saving: "90%+",
  },
  {
    id: "ad-optimizer",
    name: "Ad Optimizer",
    role: "Performance Marketer",
    department: "Paid Media",
    icon: TrendingUp,
    color: "#10B981",
    available: false,
    badge: "Coming Soon",
    description: "Real-time monitoring of your Meta and Google Ads — automatically pauses low-performing creatives, reallocates budget to winners, and sends you daily performance briefs.",
    skills: ["Meta Ads", "Google Ads", "Budget Optimization", "Daily Briefs"],
    humanCost: "৳30,000–৳50,000 /mo",
    aiCost: "৳2,000 /mo",
    saving: "93%+",
  },
  {
    id: "reporting-bot",
    name: "Reporting Bot",
    role: "AI Analyst & Reporter",
    department: "Business Intelligence",
    icon: BarChart3,
    color: "#8B5CF6",
    available: false,
    badge: "Coming Soon",
    description: "Scans all client data weekly and auto-generates professional ROI reports in PDF and slide format — ready to send directly to your clients without any manual formatting.",
    skills: ["PDF Report Generation", "ROI Analysis", "Weekly Automation", "Slide Decks"],
    humanCost: "৳30,000–৳50,000 /mo",
    aiCost: "৳2,000 /mo",
    saving: "93%+",
  },
  {
    id: "rex",
    name: "Rex",
    role: "AI Security Analyst",
    department: "Cybersecurity · Aegis Module",
    icon: ShieldCheck,
    color: "#7C6FF7",
    available: false,
    badge: "Aegis Module",
    description: "Powered by the Aegis module — scans your infrastructure for vulnerabilities, generates plain-English remediation reports, and auto-fixes through a Zero-Breakage digital twin simulation. You pay nothing if the simulation fails.",
    skills: ["Network Scanning", "AI Remediation", "Zero-Breakage Sim", "Compliance Reports"],
    humanCost: "৳30,000–৳50,000 /mo",
    aiCost: "Free to scan",
    saving: "Credits to fix",
  },
  {
    id: "oracle",
    name: "Oracle",
    role: "AI SEO Specialist",
    department: "Search & Visibility",
    icon: Search,
    color: "#63DCB8",
    available: false,
    badge: "Coming Soon",
    description: "Performs full technical SEO audits, builds keyword strategies, tracks rankings daily, and automatically fixes on-page issues — so your clients rank higher with zero manual effort.",
    skills: ["Technical SEO Audits", "Keyword Research", "Rank Tracking", "On-Page Fixes"],
    humanCost: "৳30,000–৳50,000 /mo",
    aiCost: "৳2,000 /mo",
    saving: "93%+",
  },
  {
    id: "aria",
    name: "Aria",
    role: "AI Voice Receptionist",
    department: "Front Desk",
    icon: Phone,
    color: "#F43F5E",
    available: false,
    badge: "Coming Soon",
    description: "Answers every inbound call in your brand's voice — books appointments, filters spam, syncs your calendar, and sends SMS/email confirmations. Never on sick leave. Never misses a call.",
    skills: ["Call Handling", "Appointment Booking", "Spam Filtering", "SMS/Email Alerts"],
    humanCost: "৳15,000–৳25,000 /mo",
    aiCost: "৳2,000 /mo",
    saving: "87%+",
  },
  {
    id: "kai",
    name: "Kai",
    role: "AI DevOps Engineer",
    department: "Engineering",
    icon: Code2,
    color: "#F59E0B",
    available: false,
    badge: "Coming Soon",
    description: "Monitors CI/CD pipelines, auto-rolls back failed deployments, optimizes Docker images, and generates infrastructure-as-code patches — so your dev team focuses on features, not fires.",
    skills: ["CI/CD Monitoring", "Auto-Rollback", "Docker Optimization", "IaC Patches"],
    humanCost: "৳50,000–৳80,000 /mo",
    aiCost: "৳2,000 /mo",
    saving: "96%+",
  },
  {
    id: "sage",
    name: "Sage",
    role: "AI Legal Document Reviewer",
    department: "Legal & Compliance",
    icon: Gavel,
    color: "#10B981",
    available: false,
    badge: "Coming Soon",
    description: "Reviews contracts, NDAs, and compliance documents in minutes. Flags risky clauses, summarizes obligations, and compares against your internal templates — no lawyer on retainer needed.",
    skills: ["Contract Review", "Risk Flagging", "Clause Comparison", "Compliance Checks"],
    humanCost: "৳60,000–৳1,00,000 /mo",
    aiCost: "৳2,000 /mo",
    saving: "97%+",
  },
  // ── Future Modules ────────────────────────────────────────────────
  {
    id: "hera",
    name: "Hera",
    role: "AI HR & Recruitment Manager",
    department: "Human Resources · Future Module",
    icon: UserPlus,
    color: "#F43F5E",
    available: false,
    badge: "Future Module",
    description: "Screens CVs, schedules interviews, sends offer letters, and onboards new hires — end-to-end recruitment automation so your HR team focuses on culture, not admin.",
    skills: ["CV Screening", "Interview Scheduling", "Offer Letters", "Employee Onboarding"],
    humanCost: "৳25,000–৳45,000 /mo",
    aiCost: "৳2,000 /mo",
    saving: "91%+",
  },
  {
    id: "finn",
    name: "Finn",
    role: "AI Finance & Bookkeeper",
    department: "Finance · Future Module",
    icon: DollarSign,
    color: "#10B981",
    available: false,
    badge: "Future Module",
    description: "Categorizes expenses, reconciles accounts, generates monthly P&L summaries, and flags anomalies before your accountant even opens their laptop. Always audit-ready.",
    skills: ["Expense Categorization", "Account Reconciliation", "P&L Reports", "Anomaly Alerts"],
    humanCost: "৳30,000–৳50,000 /mo",
    aiCost: "৳2,000 /mo",
    saving: "93%+",
  },
  {
    id: "plex",
    name: "Plex",
    role: "AI Project Manager",
    department: "Operations · Future Module",
    icon: ClipboardList,
    color: "#7C6FF7",
    available: false,
    badge: "Future Module",
    description: "Tracks tasks across Jira, Notion, and Asana, sends deadline reminders, auto-generates weekly status reports, and flags blockers before they delay delivery.",
    skills: ["Task Tracking", "Deadline Alerts", "Status Reports", "Blocker Detection"],
    humanCost: "৳35,000–৳55,000 /mo",
    aiCost: "৳2,000 /mo",
    saving: "94%+",
  },
  {
    id: "iris",
    name: "Iris",
    role: "AI Email Manager",
    department: "Communications · Future Module",
    icon: Inbox,
    color: "#63DCB8",
    available: false,
    badge: "Future Module",
    description: "Triages your inbox, drafts replies in your tone, unsubscribes from spam, flags urgent emails, and archives everything else — achieving inbox zero automatically, every day.",
    skills: ["Inbox Triage", "Reply Drafting", "Spam Removal", "Priority Flagging"],
    humanCost: "৳15,000–৳25,000 /mo",
    aiCost: "৳2,000 /mo",
    saving: "87%+",
  },
  {
    id: "crux",
    name: "Crux",
    role: "AI CRM Manager",
    department: "Sales Operations · Future Module",
    icon: Users,
    color: "#F59E0B",
    available: false,
    badge: "Future Module",
    description: "Keeps your CRM clean and current — logs every interaction, updates contact records, segments leads by intent score, and triggers follow-up sequences at the perfect moment.",
    skills: ["CRM Data Entry", "Lead Segmentation", "Follow-up Automation", "Pipeline Reporting"],
    humanCost: "৳20,000–৳35,000 /mo",
    aiCost: "৳2,000 /mo",
    saving: "90%+",
  },
  {
    id: "nova-health",
    name: "MediBook",
    role: "AI Healthcare Scheduler",
    department: "Healthcare · Future Module",
    icon: Calendar,
    color: "#F43F5E",
    available: false,
    badge: "Future Module",
    description: "Manages patient appointment scheduling, sends reminders, handles cancellations and rescheduling, and syncs with clinic management systems — reducing no-shows by up to 40%.",
    skills: ["Appointment Booking", "Patient Reminders", "Cancellation Handling", "Clinic System Sync"],
    humanCost: "৳15,000–৳25,000 /mo",
    aiCost: "৳2,000 /mo",
    saving: "87%+",
  },
  {
    id: "realt",
    name: "Realt",
    role: "AI Real Estate Assistant",
    department: "Real Estate · Future Module",
    icon: Home,
    color: "#63DCB8",
    available: false,
    badge: "Future Module",
    description: "Qualifies buyer/tenant inquiries, schedules property viewings, sends listing updates, and drafts offer summaries — so agents close more deals with less admin work.",
    skills: ["Lead Qualification", "Viewing Scheduling", "Listing Updates", "Offer Summaries"],
    humanCost: "৳20,000–৳35,000 /mo",
    aiCost: "৳2,000 /mo",
    saving: "90%+",
  },
  {
    id: "merch",
    name: "Merch",
    role: "AI E-commerce Manager",
    department: "E-commerce · Future Module",
    icon: ShoppingCart,
    color: "#8B5CF6",
    available: false,
    badge: "Future Module",
    description: "Monitors inventory levels, updates product listings, handles order tracking queries, identifies best-selling trends, and auto-adjusts pricing based on competitor data.",
    skills: ["Inventory Monitoring", "Listing Management", "Order Support", "Price Optimization"],
    humanCost: "৳25,000–৳40,000 /mo",
    aiCost: "৳2,000 /mo",
    saving: "92%+",
  },
  {
    id: "babel",
    name: "Babel",
    role: "AI Translation Specialist",
    department: "Localization · Future Module",
    icon: Globe,
    color: "#F59E0B",
    available: false,
    badge: "Future Module",
    description: "Translates documents, website copy, support tickets, and marketing materials across 50+ languages with brand-voice consistency — enabling true global expansion overnight.",
    skills: ["50+ Languages", "Brand-Voice Translation", "Document Localization", "Real-Time Support"],
    humanCost: "৳20,000–৳40,000 /mo",
    aiCost: "৳2,000 /mo",
    saving: "90%+",
  },
];

export default function AIRoster() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="roster" className="section-pad" ref={ref} style={{ background: "var(--bb-bg)" }}>
      <div style={{ maxWidth: 1260, margin: "0 auto" }}>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6 }} style={{ textAlign:"center", marginBottom:56 }}
        >
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"4px 16px", borderRadius:999, background:"rgba(99,220,184,0.08)", border:"1px solid rgba(99,220,184,0.22)", marginBottom:20 }}>
            <Bot size={13} color="#63DCB8" />
            <span style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.73rem", fontWeight:600, color:"#63DCB8", letterSpacing:"0.1em", textTransform:"uppercase" }}>
              AI Workforce · Job Portal · 20 Specialists
            </span>
          </div>
          <h2 style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:"clamp(2rem, 4.5vw, 3.2rem)", fontWeight:800, color:"#F1F5F9", letterSpacing:"-0.025em", marginBottom:16, lineHeight:1.12 }}>
            Your Full AI Department.{" "}
            <span className="gradient-text-teal">Zero Salaries.</span>
          </h2>
          <p style={{ fontFamily:"'Inter', sans-serif", color:"#64748B", fontSize:"1.05rem", maxWidth:660, margin:"0 auto", lineHeight:1.75 }}>
            Every role your business needs — from social media to cybersecurity, legal to healthcare.
            Each AI employee works <strong style={{ color:"#E2E8F0" }}>168 hours/week</strong> at a fraction of the human cost.
            New employees added every quarter.
          </p>

          {/* Tier legend */}
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:10, marginTop:24 }}>
            {[
              { tier:"Entry", desc:"Standard tasks", color:"#63DCB8" },
              { tier:"Mid", desc:"Advanced logic", color:"#7C6FF7" },
              { tier:"Senior", desc:"Strategic lead", color:"#F59E0B" },
            ].map((t) => (
              <div key={t.tier} style={{ display:"flex", alignItems:"center", gap:7, padding:"5px 14px", borderRadius:8, background:`${t.color}10`, border:`1px solid ${t.color}25` }}>
                <div style={{ width:7, height:7, borderRadius:"50%", background:t.color }} />
                <span style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:"0.78rem", fontWeight:700, color:t.color }}>{t.tier}</span>
                <span style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.72rem", color:"#475569" }}>— {t.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Employee Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(340px, 1fr))", gap:24, marginBottom:80 }}>
          {employees.map((emp, i) => {
            const Icon = emp.icon;
            const isAegis = emp.id === "rex";
            return (
              <motion.div key={emp.id} id={`employee-${emp.id}`}
                initial={{ opacity:0, y:40 }} animate={inView ? { opacity:1, y:0 } : {}}
                transition={{ duration:0.55, delay:0.05 + i * 0.05 }}
                className="glass employee-card border-animate"
                style={{ borderRadius:20, padding:"28px", position:"relative", opacity: emp.available ? 1 : 0.8,
                  ...(isAegis ? { border:"1px solid rgba(124,111,247,0.3)", boxShadow:"0 0 30px rgba(124,111,247,0.1)" } : {})
                }}
              >
                {/* Badge */}
                <div style={{ position:"absolute", top:18, right:18, padding:"3px 10px", borderRadius:999,
                  background: emp.available ? "rgba(16,185,129,0.12)" : emp.badge === "Aegis Module" ? "rgba(124,111,247,0.15)" : emp.badge === "Future Module" ? "rgba(245,158,11,0.12)" : "rgba(100,116,139,0.12)",
                  border: emp.available ? "1px solid rgba(16,185,129,0.3)" : emp.badge === "Aegis Module" ? "1px solid rgba(124,111,247,0.35)" : emp.badge === "Future Module" ? "1px solid rgba(245,158,11,0.3)" : "1px solid rgba(100,116,139,0.22)",
                  fontFamily:"'Inter', sans-serif", fontSize:"0.65rem", fontWeight:700,
                  color: emp.available ? "#10B981" : emp.badge === "Aegis Module" ? "#7C6FF7" : emp.badge === "Future Module" ? "#F59E0B" : "#64748B",
                  letterSpacing:"0.07em", textTransform:"uppercase"
                }}>
                  {emp.badge}
                </div>

                {/* Header */}
                <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:16 }}>
                  <div style={{ width:52, height:52, borderRadius:14, background:`${emp.color}14`, border:`1px solid ${emp.color}28`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Icon size={24} color={emp.color} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:800, fontSize:"1.12rem", color:"#F1F5F9", marginBottom:2 }}>{emp.name}</div>
                    <div style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.76rem", color:emp.color, fontWeight:600 }}>{emp.role}</div>
                    <div style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.7rem", color:"#475569", marginTop:2 }}>Dept: {emp.department}</div>
                  </div>
                </div>

                {emp.available && (
                  <div style={{ marginBottom:14 }}>
                    <span className="status-available"><span className="status-dot" />Available Now</span>
                  </div>
                )}

                <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.84rem", color:"#94A3B8", lineHeight:1.65, marginBottom:18 }}>{emp.description}</p>

                {/* Skills */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:18 }}>
                  {emp.skills.map((s) => (
                    <div key={s} style={{ display:"flex", alignItems:"center", gap:5, padding:"4px 10px", borderRadius:8, background:`${emp.color}0D`, border:`1px solid ${emp.color}22` }}>
                      <Check size={11} color={emp.color} />
                      <span style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.72rem", color:"#94A3B8", fontWeight:500 }}>{s}</span>
                    </div>
                  ))}
                </div>

                {/* Cost comparison */}
                <div style={{ display:"flex", gap:10, marginBottom:18, flexWrap:"wrap" }}>
                  <div style={{ padding:"7px 12px", borderRadius:8, background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.18)", fontFamily:"'Inter', sans-serif", fontSize:"0.74rem", color:"#94A3B8" }}>
                    👤 Human: <span style={{ color:"#EF4444", fontWeight:600, textDecoration:"line-through" }}>{emp.humanCost}</span>
                  </div>
                  <div style={{ padding:"7px 12px", borderRadius:8, background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.2)", fontFamily:"'Inter', sans-serif", fontSize:"0.74rem", color:"#94A3B8" }}>
                    🤖 AI: <span style={{ color:"#10B981", fontWeight:700 }}>{emp.aiCost}</span>
                    {emp.saving !== "Credits to fix" && <span style={{ color:"#10B981", fontWeight:700, marginLeft:6 }}>· Save {emp.saving}</span>}
                  </div>
                </div>

                {/* CTA footer */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:16, borderTop:"1px solid rgba(99,220,184,0.08)" }}>
                  <div style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.75rem", color:"#475569" }}>Entry → Mid → Senior</div>
                  <motion.a href={emp.available ? "#pricing" : "#"}
                    whileHover={emp.available ? { scale:1.05 } : {}} whileTap={emp.available ? { scale:0.97 } : {}}
                    style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"10px 18px", borderRadius:10, fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:"0.84rem", textDecoration:"none",
                      background: emp.available ? `linear-gradient(135deg, ${emp.color}, #7C6FF7)` : "rgba(100,116,139,0.12)",
                      color: emp.available ? "#04080F" : "#475569",
                      cursor: emp.available ? "pointer" : "not-allowed",
                      border: emp.available ? "none" : "1px solid rgba(100,116,139,0.18)"
                    }}
                  >
                    {emp.available ? "Hire Now" : "Notify Me"}
                    <ChevronRight size={15} />
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Savings comparison table */}
        <motion.div initial={{ opacity:0, y:30 }} animate={inView ? { opacity:1, y:0 } : {}} transition={{ delay:0.5 }}
          style={{ borderRadius:20, padding:"36px", background:"rgba(9,14,26,0.8)", border:"1px solid rgba(99,220,184,0.14)", marginBottom:48 }}
        >
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <h3 style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:800, fontSize:"1.5rem", color:"#F1F5F9", marginBottom:8 }}>
              Human Department vs. AI Superteam
            </h3>
            <p style={{ fontFamily:"'Inter', sans-serif", fontSize:"0.88rem", color:"#64748B" }}>
              Based on entry-level executive salaries in Bangladesh
            </p>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"'Inter', sans-serif", fontSize:"0.84rem" }}>
              <thead>
                <tr style={{ borderBottom:"1px solid rgba(99,220,184,0.15)" }}>
                  {["Role", "Human Cost /mo", "AI Agent Cost /mo", "Agency Saving"].map((h) => (
                    <th key={h} style={{ padding:"12px 16px", textAlign:"left", fontFamily:"'Space Grotesk', sans-serif", fontSize:"0.75rem", fontWeight:700, color:"#64748B", textTransform:"uppercase", letterSpacing:"0.07em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { role:"Lead Generator", human:"৳25,000–৳40,000", ai:"৳2,000", save:"92%+" },
                  { role:"Content Writer", human:"৳20,000–৳35,000", ai:"৳2,000", save:"90%+" },
                  { role:"Social Media Mgr", human:"৳15,000–৳30,000", ai:"৳2,000", save:"87%+" },
                  { role:"SEO Specialist", human:"৳30,000–৳50,000", ai:"৳2,000", save:"93%+" },
                  { role:"Customer Support", human:"৳12,000–৳20,000", ai:"৳2,000", save:"83%+" },
                ].map((row, i) => (
                  <tr key={row.role} style={{ borderBottom:"1px solid rgba(99,220,184,0.07)", background: i % 2 === 0 ? "transparent" : "rgba(99,220,184,0.02)" }}>
                    <td style={{ padding:"14px 16px", color:"#E2E8F0", fontWeight:500 }}>{row.role}</td>
                    <td style={{ padding:"14px 16px", color:"#EF4444", textDecoration:"line-through" }}>{row.human}</td>
                    <td style={{ padding:"14px 16px", color:"#10B981", fontWeight:700 }}>{row.ai}</td>
                    <td style={{ padding:"14px 16px" }}>
                      <span style={{ padding:"3px 10px", borderRadius:6, background:"rgba(16,185,129,0.12)", border:"1px solid rgba(16,185,129,0.25)", color:"#10B981", fontWeight:700, fontSize:"0.8rem" }}>{row.save}</span>
                    </td>
                  </tr>
                ))}
                <tr style={{ background:"rgba(99,220,184,0.06)", borderTop:"2px solid rgba(99,220,184,0.2)" }}>
                  <td style={{ padding:"16px", fontFamily:"'Space Grotesk', sans-serif", fontWeight:800, color:"#F1F5F9" }}>TOTAL (5-Agent Bundle)</td>
                  <td style={{ padding:"16px", color:"#EF4444", fontWeight:700, textDecoration:"line-through" }}>৳1,02,000–৳1,75,000</td>
                  <td style={{ padding:"16px", color:"#10B981", fontWeight:800, fontSize:"1rem" }}>৳10,000</td>
                  <td style={{ padding:"16px" }}>
                    <span style={{ padding:"5px 14px", borderRadius:8, background:"rgba(16,185,129,0.15)", border:"1px solid rgba(16,185,129,0.3)", color:"#10B981", fontWeight:800, fontSize:"0.9rem" }}>Save ৳1.5L+/mo</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.p initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay:0.8 }}
          style={{ textAlign:"center", fontFamily:"'Inter', sans-serif", fontSize:"0.87rem", color:"#475569", lineHeight:1.7 }}
        >
          ✦ Bundle all 5 core agents for <strong style={{ color:"#63DCB8" }}>৳25,000/mo</strong> — saving you over ৳1.5 Lakh every month.
          &nbsp;·&nbsp; Powered by <strong style={{ color:"#7C6FF7" }}>n8n multi-step AI workflows</strong>.
          &nbsp;·&nbsp; New employees added every quarter.
        </motion.p>
      </div>
    </section>
  );
}
