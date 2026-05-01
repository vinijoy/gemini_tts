import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.1.85"],
  devIndicators: false,
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
