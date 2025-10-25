import { createClient } from '@supabase/supabase-js';

// ✅ Environment variables from your .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ✅ Export a single Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
