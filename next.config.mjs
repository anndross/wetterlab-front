import { resolve } from "path";
import pkg from "webpack";

const { ProvidePlugin } = pkg;

const backendBasePath = "http://34.23.51.63/api/:path*";

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async rewrites() {
    return [
      {
        source: "/wetterlab/api/:path*",
        destination: backendBasePath,
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
