import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false, // Remove trailing slashes to prevent duplicate content
  async redirects() {
    return [
      // Redirect any URL with trailing slash to the same URL without trailing slash
      {
        source: '/:path*/',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
