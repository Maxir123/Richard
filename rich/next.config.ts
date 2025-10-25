// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    // disable ESLint during production builds on CI so lint warnings/errors don't abort `next build`
    ignoreDuringBuilds: true,
  },
  // keep Typescript checks by default; set to true only if you must skip TS errors (not recommended)
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    // allow next/image to load from Cloudinary (fixes "hostname not configured" error)
    domains: ["res.cloudinary.com"],
  },
  // If your workspace root detection warning bothers you, optionally set outputFileTracingRoot
  // outputFileTracingRoot: __dirname,
};

module.exports = nextConfig;
