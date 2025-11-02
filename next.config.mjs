/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@supabase/supabase-js'],
  },
  // ✅ Prevent static export on API routes
  output: 'standalone',
};

export default nextConfig;

console.log('🚀 BrainThrive configuration loaded successfully');
