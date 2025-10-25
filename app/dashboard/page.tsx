'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    verifyAuth();
  }, []);

  async function verifyAuth() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login'); // 🔒 redirect unauthenticated users
    } else {
      setUser(user);
    }
  }

  if (!user) return <p>Checking login status...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome, {user.email}</h1>
      <p>Your personalized dashboard is ready!</p>
    </div>
  );
}
