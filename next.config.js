/** @type {import('next').NextConfig} */
var path = require("path");
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias["__dirname"] = path.resolve("~");
    return config;
  },
};

module.exports = nextConfig;
