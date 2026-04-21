"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Shield, Users, Zap, TrendingUp, Activity,
  Clock, CheckCircle2, XCircle,
  Bell, Settings, ChevronUp, ChevronDown, Eye, Download,
  Globe, CreditCard, HeartHandshake, RefreshCw, LogOut
} from "lucide-react";

const SESSION_KEY = "aegis_admin_session";

// ─── Mock Data ──────────────────────────────────────────────────
const kpis = [
  { id: "users",   label: "Total Users",       value: "1,284",  delta: "+12.4%", up: true,  icon: Users,        color: "#00D8FF" },
  { id: "scans",   label: "Scans Today",        value: "342",    delta: "+8.1%",  up: true,  icon: Globe,        color: "#8B5CF6" },
  { id: "credits", label: "Credits Sold (MoM)", value: "$9,840", delta: "+21.3%", up: true,  icon: CreditCard,   color: "#10B981" },
  { id: "tickets", label: "Open SOC Tickets",   value: "7",      delta: "-2",     up: false, icon: HeartHandshake, color: "#F59E0B" },
];

const recentScans = [
  { id: "SC-1042", user: "apex-industries.com",  target: "10.0.0.1/24",    vulns: 4,  severity: "critical", time: "2m ago",  status: "complete" },
  { id: "SC-1041", user: "nexustech.io",          target: "172.16.0.0/16",  vulns: 11, severity: "high",     time: "14m ago", status: "complete" },
  { id: "SC-1040", user: "cloudpivot.co",         target: "34.122.88.9",    vulns: 2,  severity: "medium",   time: "1h ago",  status: "complete" },
  { id: "SC-1039", user: "finvault.com",           target: "192.168.1.0/24", vulns: 0,  severity: "info",     time: "2h ago",  status: "complete" },
  { id: "SC-1038", user: "driftworks.dev",         target: "10.10.10.0/24",  vulns: 7,  severity: "high",     time: "3h ago",  status: "complete" },
];

const socTickets = [
  { id: "SOC-088", user: "apex-industries.com",  issue: "Exposed RDP + SMB on public subnet",      priority: "critical", assignee: "Rafi A.", sla: "2h",  status: "in_progress" },
  { id: "SOC-087", user: "nexustech.io",          issue: "CVE-2024-3400 (PAN-OS) confirmed",         priority: "critical", assignee: "Imran H.", sla: "1h",  status: "in_progress" },
  { id: "SOC-086", user: "startupxyz.com",        issue: "Weak TLS 1.0 on payment gateway",          priority: "high",     assignee: "Sakib M.", sla: "4h",  status: "open" },
  { id: "SOC-085", user: "databridge.io",          issue: "MongoDB exposed to 0.0.0.0",               priority: "high",     assignee: "Nayeem R.", sla: "4h", status: "resolved" },
  { id: "SOC-084", user: "cloudpivot.co",         issue: "SSH root login enabled on prod server",    priority: "medium",   assignee: "Rafi A.", sla: "8h",  status: "resolved" },
];

const remediationFeed = [
  { user: "finvault.com",    action: "AI Auto-Fix",    desc: "Disabled Telnet on port 23",             credits: 1,  time: "4m ago",  ok: true  },
  { user: "nexustech.io",    action: "AI Auto-Fix",    desc: "Updated OpenSSL to 3.0.14",               credits: 1,  time: "22m ago", ok: true  },
  { user: "driftworks.dev",  action: "Sim Rejected",   desc: "Firewall rule would block port 443",      credits: 0,  time: "1h ago",  ok: false },
  { user: "startupxyz.com",  action: "SOC Escalation", desc: "TLS remediation — analyst assigned",      credits: 50, time: "2h ago",  ok: true  },
  { user: "apex-industries", action: "AI Auto-Fix",    desc: "Patched sudo privilege escalation path",  credits: 3,  time: "3h ago",  ok: true  },
];

// ─── Monthly revenue bar chart data ────────────────────────────
const revenueData = [
  { month: "Sep", value: 3200 },
  { month: "Oct", value: 4800 },
  { month: "Nov", value: 5100 },
  { month: "Dec", value: 4400 },
  { month: "Jan", value: 6700 },
  { month: "Feb", value: 8100 },
  { month: "Mar", value: 9840 },
];
const maxRevenue = Math.max(...revenueData.map((d) => d.value));

const severityColor: Record<string, string> = {
  critical: "#EF4444",
  high:     "#F59E0B",
  medium:   "#00D8FF",
  info:     "#64748B",
};

const priorityColor: Record<string, string> = {
  critical: "#EF4444",
  high:     "#F59E0B",
  medium:   "#8B5CF6",
  low:      "#10B981",
};

const statusColor: Record<string, string> = {
  in_progress: "#F59E0B",
  open:        "#00D8FF",
  resolved:    "#10B981",
};

// ─── Admin Dashboard ────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "soc" | "remediation">("overview");

  const handleSignOut = () => {
    localStorage.removeItem(SESSION_KEY);
    router.replace("/admin");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#030710", color: "#E2E8F0", fontFamily: "'Inter', sans-serif" }}>

      {/* ── Top Bar ── */}
      <div style={{
        height: 60, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 28px", background: "rgba(5,10,20,0.9)",
        borderBottom: "1px solid rgba(0,216,255,0.1)",
        position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #00D8FF, #8B5CF6)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Shield size={16} color="#030710" strokeWidth={2.5} />
          </div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1rem",
            background: "linear-gradient(135deg, #00D8FF, #8B5CF6)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            AEGIS
          </span>
          <span style={{ color: "#334155", margin: "0 4px" }}>/</span>
          <span style={{ fontSize: "0.85rem", color: "#64748B", fontWeight: 500 }}>Admin Panel</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Live badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px",
            borderRadius: 999, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10B981",
              animation: "pulse-glow 2s ease-in-out infinite" }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#10B981", letterSpacing: "0.06em" }}>
              LIVE
            </span>
          </div>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#64748B", padding: 4 }} aria-label="Refresh">
            <RefreshCw size={16} />
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#64748B", padding: 4 }} aria-label="Notifications">
            <Bell size={16} />
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "#64748B", padding: 4 }} aria-label="Settings">
            <Settings size={16} />
          </button>
          <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.08)" }} />
          <button onClick={handleSignOut} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", padding: 4,
            display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem" }} aria-label="Logout">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>

      {/* ── Sidebar + Content ── */}
      <div style={{ display: "flex" }}>

        {/* ── Sidebar ── */}
        <div style={{ width: 220, minHeight: "calc(100vh - 60px)", background: "rgba(5,10,20,0.6)",
          borderRight: "1px solid rgba(0,216,255,0.07)", padding: "24px 0", flexShrink: 0,
          position: "sticky", top: 60, alignSelf: "flex-start" }}>
          {[
            { key: "overview",    icon: Activity,      label: "Overview" },
            { key: "soc",         icon: HeartHandshake, label: "SOC Tickets" },
            { key: "remediation", icon: Zap,           label: "Remediation Log" },
          ].map(({ key, icon: Icon, label }) => (
            <button key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 12,
                padding: "11px 24px", background: activeTab === key ? "rgba(0,216,255,0.08)" : "none",
                borderLeft: activeTab === key ? "2px solid #00D8FF" : "2px solid transparent",
                border: "none", cursor: "pointer", textAlign: "left",
                fontFamily: "'Inter', sans-serif", fontWeight: activeTab === key ? 600 : 400,
                fontSize: "0.875rem", color: activeTab === key ? "#00D8FF" : "#64748B",
                transition: "all 0.2s ease",
              }}>
              <Icon size={16} />
              {label}
            </button>
          ))}

          <div style={{ margin: "20px 16px", height: 1, background: "rgba(255,255,255,0.05)" }} />

          {/* Region flags */}
          <div style={{ padding: "0 20px" }}>
            <p style={{ fontSize: "0.7rem", color: "#334155", textTransform: "uppercase",
              letterSpacing: "0.08em", marginBottom: 12, fontWeight: 600 }}>SOC Centers</p>
            {[
              { flag: "🇧🇩", name: "Dhaka, BD",     status: "online",  agents: 12 },
              { flag: "🇺🇸", name: "Minnetonka, US", status: "standby", agents: 2  },
            ].map((c) => (
              <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 8,
                marginBottom: 10 }}>
                <span style={{ fontSize: "1rem" }}>{c.flag}</span>
                <div>
                  <div style={{ fontSize: "0.78rem", color: "#94A3B8", fontWeight: 500 }}>{c.name}</div>
                  <div style={{ fontSize: "0.68rem", color: c.status === "online" ? "#10B981" : "#F59E0B" }}>
                    {c.status === "online" ? "●" : "◐"} {c.agents} analysts online
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Main Content ── */}
        <div style={{ flex: 1, padding: "28px 28px", maxWidth: "calc(100vw - 220px)" }}>

          {/* ── OVERVIEW TAB ── */}
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>

              <div style={{ marginBottom: 28 }}>
                <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1.5rem",
                  color: "#F1F5F9", marginBottom: 4 }}>Platform Overview</h1>
                <p style={{ fontSize: "0.85rem", color: "#64748B" }}>
                  Live metrics · Last refreshed: just now
                </p>
              </div>

              {/* KPI Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 16, marginBottom: 28 }}>
                {kpis.map((kpi, i) => {
                  const Icon = kpi.icon;
                  return (
                    <motion.div key={kpi.id}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      style={{ background: "rgba(11,17,32,0.7)", border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 16, padding: "20px 22px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10,
                          background: `${kpi.color}18`, border: `1px solid ${kpi.color}30`,
                          display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon size={18} color={kpi.color} />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4,
                          padding: "3px 8px", borderRadius: 999,
                          background: kpi.up ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                          border: `1px solid ${kpi.up ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}` }}>
                          {kpi.up ? <ChevronUp size={12} color="#10B981" /> : <ChevronDown size={12} color="#EF4444" />}
                          <span style={{ fontSize: "0.72rem", fontWeight: 600,
                            color: kpi.up ? "#10B981" : "#EF4444" }}>{kpi.delta}</span>
                        </div>
                      </div>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
                        fontSize: "1.75rem", color: kpi.color, marginBottom: 4 }}>{kpi.value}</div>
                      <div style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 500,
                        textTransform: "uppercase", letterSpacing: "0.06em" }}>{kpi.label}</div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Revenue Chart + Recent Scans */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 20, marginBottom: 28 }}>

                {/* Revenue Bar Chart */}
                <div style={{ background: "rgba(11,17,32,0.7)", borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.06)", padding: "24px 24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                    <div>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                        fontSize: "0.95rem", color: "#E2E8F0", marginBottom: 2 }}>Monthly Revenue</p>
                      <p style={{ fontSize: "0.75rem", color: "#64748B" }}>Credit sales · last 7 months</p>
                    </div>
                    <TrendingUp size={16} color="#10B981" />
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 120 }}>
                    {revenueData.map((d, i) => (
                      <div key={d.month} style={{ flex: 1, display: "flex", flexDirection: "column",
                        alignItems: "center", gap: 6, height: "100%" }}>
                        <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                          <motion.div
                            initial={{ height: 0 }} animate={{ height: `${(d.value / maxRevenue) * 100}%` }}
                            transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
                            style={{ width: "100%", borderRadius: "4px 4px 0 0",
                              background: i === revenueData.length - 1
                                ? "linear-gradient(180deg, #00D8FF, #8B5CF6)"
                                : "rgba(0,216,255,0.2)",
                              boxShadow: i === revenueData.length - 1 ? "0 0 12px rgba(0,216,255,0.3)" : "none" }}
                          />
                        </div>
                        <span style={{ fontSize: "0.65rem", color: "#64748B" }}>{d.month}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, padding: "12px 14px", borderRadius: 10,
                    background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                      fontSize: "1.25rem", color: "#10B981" }}>$9,840</span>
                    <span style={{ fontSize: "0.78rem", color: "#64748B", marginLeft: 8 }}>MRR · +21.3% vs last month</span>
                  </div>
                </div>

                {/* Recent Scans Table */}
                <div style={{ background: "rgba(11,17,32,0.7)", borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.06)", padding: "24px 24px", overflow: "hidden" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                      fontSize: "0.95rem", color: "#E2E8F0" }}>Recent Scans</p>
                    <button style={{ background: "none", border: "1px solid rgba(0,216,255,0.2)",
                      borderRadius: 8, padding: "5px 12px", cursor: "pointer",
                      color: "#00D8FF", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: 6 }}>
                      <Eye size={12} /> View All
                    </button>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        {["ID", "User", "Target", "Vulns", "Time"].map((h) => (
                          <th key={h} style={{ padding: "6px 10px 10px", textAlign: "left",
                            fontSize: "0.7rem", color: "#334155", fontWeight: 600,
                            textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {recentScans.map((s, i) => (
                        <motion.tr key={s.id}
                          initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.06 }}
                          style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                          <td style={{ padding: "10px 10px", fontSize: "0.78rem",
                            color: "#00D8FF", fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 600 }}>{s.id}</td>
                          <td style={{ padding: "10px 10px", fontSize: "0.8rem", color: "#94A3B8" }}>{s.user}</td>
                          <td style={{ padding: "10px 10px", fontSize: "0.75rem",
                            color: "#475569", fontFamily: "monospace" }}>{s.target}</td>
                          <td style={{ padding: "10px 10px" }}>
                            <span style={{ padding: "2px 8px", borderRadius: 6,
                              background: `${severityColor[s.severity]}18`,
                              color: severityColor[s.severity],
                              fontSize: "0.72rem", fontWeight: 600 }}>
                              {s.vulns > 0 ? `${s.vulns} ${s.severity}` : "clean"}
                            </span>
                          </td>
                          <td style={{ padding: "10px 10px", fontSize: "0.75rem", color: "#475569" }}>{s.time}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Vuln severity breakdown */}
              <div style={{ background: "rgba(11,17,32,0.7)", borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.06)", padding: "24px 24px" }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                  fontSize: "0.95rem", color: "#E2E8F0", marginBottom: 20 }}>
                  Open Vulnerability Breakdown
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { label: "Critical", count: 9,   pct: 12, color: "#EF4444" },
                    { label: "High",     count: 31,  pct: 42, color: "#F59E0B" },
                    { label: "Medium",   count: 28,  pct: 38, color: "#8B5CF6" },
                    { label: "Low",      count: 6,   pct: 8,  color: "#64748B" },
                  ].map((v) => (
                    <div key={v.label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span style={{ width: 60, fontSize: "0.8rem", color: "#94A3B8", flexShrink: 0 }}>{v.label}</span>
                      <div style={{ flex: 1, height: 8, borderRadius: 999,
                        background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${v.pct}%` }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          style={{ height: "100%", borderRadius: 999, background: v.color,
                            boxShadow: `0 0 8px ${v.color}60` }} />
                      </div>
                      <span style={{ width: 30, fontSize: "0.8rem", color: v.color,
                        fontWeight: 700, textAlign: "right", flexShrink: 0 }}>{v.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── SOC TICKETS TAB ── */}
          {activeTab === "soc" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div>
                  <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
                    fontSize: "1.5rem", color: "#F1F5F9", marginBottom: 4 }}>SOC Tickets</h1>
                  <p style={{ fontSize: "0.85rem", color: "#64748B" }}>Human escalation queue · Dhaka SOC</p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px",
                    borderRadius: 10, border: "1px solid rgba(0,216,255,0.2)", background: "none",
                    cursor: "pointer", color: "#00D8FF", fontSize: "0.8rem" }}>
                    <Download size={14} /> Export
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {socTickets.map((t, i) => (
                  <motion.div key={t.id}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    style={{ background: "rgba(11,17,32,0.7)", borderRadius: 14,
                      border: `1px solid ${t.status === "resolved" ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)"}`,
                      padding: "18px 22px", display: "grid",
                      gridTemplateColumns: "auto 1fr auto auto auto",
                      gap: 20, alignItems: "center" }}>
                    {/* Priority dot */}
                    <div style={{ width: 10, height: 10, borderRadius: "50%",
                      background: priorityColor[t.priority],
                      boxShadow: `0 0 6px ${priorityColor[t.priority]}` }} />
                    {/* Info */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                          fontSize: "0.85rem", color: "#00D8FF" }}>{t.id}</span>
                        <span style={{ fontSize: "0.78rem", color: "#64748B" }}>·</span>
                        <span style={{ fontSize: "0.78rem", color: "#94A3B8" }}>{t.user}</span>
                      </div>
                      <p style={{ fontSize: "0.88rem", color: "#E2E8F0", margin: 0 }}>{t.issue}</p>
                    </div>
                    {/* Assignee */}
                    <div style={{ textAlign: "center" }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%",
                        background: "linear-gradient(135deg, #00D8FF22, #8B5CF622)",
                        border: "1px solid rgba(0,216,255,0.2)", display: "flex",
                        alignItems: "center", justifyContent: "center",
                        fontSize: "0.7rem", color: "#00D8FF", fontWeight: 700 }}>
                        {t.assignee.split(" ")[0][0]}{t.assignee.split(" ")[1]?.[0] || ""}
                      </div>
                      <div style={{ fontSize: "0.65rem", color: "#475569", marginTop: 4 }}>{t.assignee}</div>
                    </div>
                    {/* SLA */}
                    <div style={{ display: "flex", alignItems: "center", gap: 5,
                      padding: "4px 10px", borderRadius: 8, background: "rgba(245,158,11,0.08)" }}>
                      <Clock size={12} color="#F59E0B" />
                      <span style={{ fontSize: "0.75rem", color: "#F59E0B", fontWeight: 600 }}>SLA {t.sla}</span>
                    </div>
                    {/* Status */}
                    <span style={{ padding: "5px 12px", borderRadius: 8,
                      background: `${statusColor[t.status]}15`,
                      color: statusColor[t.status],
                      fontSize: "0.75rem", fontWeight: 600, textTransform: "capitalize",
                      border: `1px solid ${statusColor[t.status]}30` }}>
                      {t.status.replace("_", " ")}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── REMEDIATION LOG TAB ── */}
          {activeTab === "remediation" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
                  fontSize: "1.5rem", color: "#F1F5F9", marginBottom: 4 }}>Remediation Log</h1>
                <p style={{ fontSize: "0.85rem", color: "#64748B" }}>
                  All AI fix attempts and SOC escalations · Zero-Breakage engine activity
                </p>
              </div>

              {/* Summary pills */}
              <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
                {[
                  { label: "AI Fixes Applied", val: "1,049", color: "#10B981" },
                  { label: "Sim Rejections", val: "38", color: "#EF4444" },
                  { label: "SOC Escalations", val: "88", color: "#F59E0B" },
                  { label: "Credits Consumed", val: "4,312", color: "#8B5CF6" },
                ].map((p) => (
                  <div key={p.label} style={{ padding: "10px 18px", borderRadius: 10,
                    background: `${p.color}10`, border: `1px solid ${p.color}25` }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800,
                      fontSize: "1.25rem", color: p.color }}>{p.val}</div>
                    <div style={{ fontSize: "0.72rem", color: "#64748B", marginTop: 2 }}>{p.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {remediationFeed.map((r, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    style={{ background: "rgba(11,17,32,0.7)", borderRadius: 12,
                      border: `1px solid ${r.ok ? "rgba(255,255,255,0.06)" : "rgba(239,68,68,0.15)"}`,
                      padding: "14px 20px", display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ flexShrink: 0 }}>
                      {r.ok
                        ? <CheckCircle2 size={18} color="#10B981" />
                        : <XCircle size={18} color="#EF4444" />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                          fontSize: "0.82rem", color: "#94A3B8" }}>{r.user}</span>
                        <span style={{ padding: "2px 8px", borderRadius: 6,
                          background: r.action === "SOC Escalation" ? "rgba(245,158,11,0.12)"
                            : r.action === "Sim Rejected" ? "rgba(239,68,68,0.12)"
                            : "rgba(0,216,255,0.12)",
                          color: r.action === "SOC Escalation" ? "#F59E0B"
                            : r.action === "Sim Rejected" ? "#EF4444" : "#00D8FF",
                          fontSize: "0.68rem", fontWeight: 600 }}>
                          {r.action}
                        </span>
                      </div>
                      <p style={{ fontSize: "0.85rem", color: "#E2E8F0", margin: 0 }}>{r.desc}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                      <Zap size={12} color="#8B5CF6" />
                      <span style={{ fontSize: "0.78rem", color: "#8B5CF6", fontWeight: 600 }}>
                        {r.credits} {r.credits === 1 ? "credit" : "credits"}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#475569", flexShrink: 0 }}>{r.time}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
