import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/portfolio-diego-suque",
  assetPrefix: "/portfolio-diego-suque/",
};

export default nextConfig;