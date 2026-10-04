import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Make sure the OG image route can read the brand font and logo when deployed
  outputFileTracingIncludes: {
    "/api/og/generate": ["./src/resources/fonts/**", "./public/brand/**"],
  },
  async redirects() {
    return [
      // Short, shareable link to the application form
      { source: "/apply", destination: "/jobs/full-stack-web-developer#apply", permanent: false },
      { source: "/careers", destination: "/jobs", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default withMDX(nextConfig);
