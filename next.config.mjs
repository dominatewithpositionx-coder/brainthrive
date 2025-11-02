/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@supabase/supabase-js'],
  },
  // ✅ Ensure API routes are treated as dynamic
  output: 'standalone',
};

export default nextConfig;

console.log('🚀 BrainThrive configuration loaded successfully');
