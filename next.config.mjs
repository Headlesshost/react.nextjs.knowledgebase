/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["assets.headlesshost.com", "localhost"],
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOWALL", // or you can omit this header entirely
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://react-nextjs-knowledgebase-git-fac832-warren-cheethams-projects.vercel.app;", // Adjust as needed
          },
        ],
      },
    ];
  },
};

export default nextConfig;
