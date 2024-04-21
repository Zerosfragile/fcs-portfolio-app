/** @type {import('next').NextConfig} */

const { withContentlayer } = require("next-contentlayer");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = withContentlayer(nextConfig);
