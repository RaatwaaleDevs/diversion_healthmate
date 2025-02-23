/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};
module.exports = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
};


module.exports = nextConfig;