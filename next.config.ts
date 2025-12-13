import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Redirection to /posts
  async redirects() {
    return [
      {
        source: "/",
        destination: "/posts",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
