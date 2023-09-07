/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "assets.bybusvenezuela.com",
        port: "",
        pathname: "/public/**",
      },
    ],
  },
};

module.exports = nextConfig;
