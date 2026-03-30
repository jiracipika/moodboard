/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@moodboard/core', '@moodboard/ui'],
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};
module.exports = nextConfig;
