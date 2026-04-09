import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bengal Bound — Hire Your AI Workforce",
  description:
    "Bengal Bound is the AI staffing platform where businesses hire intelligent AI employees — from security analysts to voice receptionists — with no salary, no headcount, and instant deployment.",
  keywords:
    "AI employees, AI workforce, hire AI, AI receptionist, AI security analyst, SaaS, Bengal Bound",
  openGraph: {
    title: "Bengal Bound — Hire Your AI Workforce",
    description:
      "Skip the hiring process. Hire AI employees instantly. Subscribe monthly or pay per task.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
