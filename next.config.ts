import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 defaults to pathname ** + empty search only (no ?query). Allow
    // `/layer/*?v=` cache-busting on hero assets while keeping other locals query-less.
    localPatterns: [
      { pathname: "/layer/**" },
      { pathname: "**", search: "" },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ],
  },
  // Allow three.js ecosystem packages to be external
  transpilePackages: [
    "@react-three/fiber",
    "@react-three/drei",
    "@react-three/html",
  ],
};

export default nextConfig;
