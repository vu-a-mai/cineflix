import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    // Set cache type to memory for all environments
    config.cache = {
      type: "memory",
    };
    return config; // Return the modified Webpack config
  },
};

export default nextConfig;
