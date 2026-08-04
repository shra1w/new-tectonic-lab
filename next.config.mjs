/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Next.js image optimisation. Add any remote host you actually serve images
  // from here — everything else should live in /public and be imported.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
            { protocol: "https", hostname: "images.unsplash.com" },

    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },

  // CRIT-2 / SEO-09: one canonical URL shape. Kebab-case only, no underscores.
  async redirects() {
    return [
      { source: "/sap_course", destination: "/sap-course", permanent: true },
      { source: "/data_analytics_course", destination: "/data-analytics-course", permanent: true },
      { source: "/data_science_course", destination: "/data-science-course", permanent: true },
    ];
  },
};

export default nextConfig;
