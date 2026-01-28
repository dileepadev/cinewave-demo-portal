import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cinewavest001.blob.core.windows.net",
        port: "",
        pathname: "/public/movies/**",
      },
    ],
  },
};

export default nextConfig;
