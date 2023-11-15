/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.react = path.resolve("./node_modules/react");
    config.node = { __dirname: true };
    return config;
  },
};

module.exports = nextConfig;
