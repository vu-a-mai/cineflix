import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { dev }) => {
    // Set cache type based on environment
    config.cache = dev
      ? {
          type: "memory", // Use memory cache in development
        }
      : {
          type: "filesystem", // Use filesystem cache in production
          buildDependencies: {
            config: [__filename],
          },
          cacheLocation: path.resolve(__dirname, "node_modules/.cache/webpack"),
          store: "pack",
          packOptions: {
            serialization: {
              useBuffer: true, // Optimize serialization
            },
          },
        };

    return config; // Return the modified Webpack config
  },
};

export default nextConfig;
