/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@supabase/supabase-js'],
  },
  // ✅ Mark app as dynamic
  output: 'standalone',
};

export default nextConfig;

console.log('🚀 BrainThrive configuration loaded successfully');
