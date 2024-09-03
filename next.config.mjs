/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.headlesshost.com",
      },
    ],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
