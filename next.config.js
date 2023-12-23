/** @type {import('next').NextConfig} */
const nextConfig = {};

// module.exports = nextConfig;

module.exports = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https", // or 'http' if necessary
        hostname: "basehub.earth",
        port: "", // you can specify the port if there is one
        pathname: "/**", // this is a wildcard pattern to match any path
      },
    ],
  },
};
