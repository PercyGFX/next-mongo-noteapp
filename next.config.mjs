// next.config.js
const nextConfig = {
  async headers() {
    return [
      // Disable Vercel Data Cache for all routes
      {
        source: "/(.*)",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;
