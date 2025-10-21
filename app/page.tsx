// app/page.tsx
'use client';
import { useEffect } from 'react';
import { track } from '@vercel/analytics';
import WaitlistForm from '../components/WaitlistForm';

export default function Page() {
  // Track when someone views the homepage
  useEffect(() => {
    track('viewed_homepage');
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-extrabold tracking-tight mb-6">PlayPass</h1>
      <p className="text-lg text-gray-700 mb-10 max-w-2xl">
        Balance screen time with real-world wins. Join the waitlist to get early access.
      </p>
      <WaitlistForm />
    </main>
  );
}
