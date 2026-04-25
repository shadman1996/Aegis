import type { Metadata } from "next";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "Nexara — Hire AI Employees. Grow Without Limits.",
  description:
    "Nexara is the AI-as-Employee marketplace. Hire 30+ specialised AI agents who do real business jobs 24/7 — from lead generation to HR, finance to logistics. Inspector-certified compliance built in. 10× cheaper than hiring humans.",
  keywords:
    "AI employees, AI agents, AI workforce, AI CRM, AI HR, AI marketing, compliance AI, Bangladesh SaaS, AI ERP, hire AI, Nexara",
  openGraph: {
    title: "Nexara — Hire AI Employees. Grow Without Limits.",
    description:
      "30+ AI employees. Every business function. Inspector compliance built in. Start free.",
    type: "website",
    siteName: "Nexara by Bengal Bound",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexara — Hire AI Employees. Grow Without Limits.",
    description: "30+ AI employees. Every job. 24/7. Inspector-certified.",
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
      <body className="antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

