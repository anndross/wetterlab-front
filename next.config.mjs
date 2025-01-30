import { resolve } from "path";
import pkg from "webpack";

const { ProvidePlugin } = pkg;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "production"
            ? "http://34.23.51.63/api/:path*"
            : "http://127.0.0.1:8000/api/:path*",
      },
    ];
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      buffer: resolve("buffer"),
    };
    config.plugins.push(
      new ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      })
    );
    return config;
  },
};

export default nextConfig;
