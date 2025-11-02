// lib/supabaseAdmin.ts
import { createClient } from '@supabase/supabase-js';

// 🧠 Ensure required environment variables are present
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  console.warn('⚠️ Missing NEXT_PUBLIC_SUPABASE_URL in environment variables.');
}
if (!serviceRoleKey) {
  console.warn('⚠️ Missing SUPABASE_SERVICE_ROLE_KEY in environment variables.');
}

// ✅ Create a single admin client instance (server-only)
export const supabaseAdmin = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', // fallback prevents build crash
  serviceRoleKey || 'service-role-placeholder'
);
