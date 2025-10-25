'use client';

import { User } from '@supabase/supabase-js';

export default function Header({ user }: { user: User }) {
  return (
    <header className="flex items-center justify-between bg-white border-b p-4 shadow-sm">
      <h1 className="text-xl font-semibold">Welcome, {user.email}</h1>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = '/';
        }}
        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
      >
        Log Out
      </button>
    </header>
  );
}
