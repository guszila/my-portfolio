import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow network development origins for cross-device mobile/local network testing
  allowedDevOrigins: ["localhost", "127.0.0.1", "26.57.189.104"],
};

export default nextConfig;
