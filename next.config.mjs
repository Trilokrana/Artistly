/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    appDir: true, 
  },
   images: {
    domains: ['images.unsplash.com','www.google.com'],
  },
};

export default nextConfig;
