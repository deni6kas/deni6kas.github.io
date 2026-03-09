/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Отключает Image Optimizer — устраняет GHSA-9g9p-9gw9-jx7f (DoS)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
