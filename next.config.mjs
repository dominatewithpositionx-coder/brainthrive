// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@supabase/supabase-js'],
  },
  images: {
    domains: ['brainthrive.vercel.app'],
  },
  env: {
    NEXT_PUBLIC_SITE_NAME: 'BrainThrive',
    NEXT_PUBLIC_SITE_URL: 'https://brainthrive.vercel.app',
  },
};

console.log('🚀 BrainThrive configuration loaded successfully');

export default nextConfig;
