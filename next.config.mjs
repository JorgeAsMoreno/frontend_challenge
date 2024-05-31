/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'localhost',
      'image.tmdb.org',
      'lh3.googleusercontent.com',
    ],
  },
};

export default nextConfig;
