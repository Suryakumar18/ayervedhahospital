/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;
