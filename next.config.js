/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  // Enable SCSS support
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Handle static assets from original Vite structure
  async rewrites() {
    return [
      {
        source: '/img/:path*',
        destination: '/img/:path*',
      },
      {
        source: '/fav/:path*',
        destination: '/fav/:path*',
      },
    ]
  },
}

module.exports = nextConfig


