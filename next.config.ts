import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",      // generates /out folder — Netlify publish dir
  trailingSlash: true,
  images: {
    unoptimized: true,   // required for static export
  },
};

export default nextConfig;

