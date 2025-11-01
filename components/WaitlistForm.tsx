'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { track } from '@vercel/analytics/react'; // ✅ Analytics tracker

export default function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [msg, setMsg] = useState('');
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setMsg('');

    // 🐝 HONEYPOT: hidden "website" field for bot detection
    const website =
      (document.querySelector('input[name="website"]') as HTMLInputElement)
        ?.value || '';

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, source: 'landing', website }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed');

      // ✅ Track waitlist signup in analytics
      track('joined_waitlist', { email, name });

      // ✅ Redirect to Success Page (confetti + share modal)
      router.push('/success');
    } catch (err: any) {
      setStatus('err');
      setMsg(err?.message || 'Something went wrong');
    } finally {
      setStatus('idle');
      setName('');
      setEmail('');
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto w-full max-w-md space-y-3">
      <input
        className="border rounded-md px-3 py-2 w-full"
        placeholder="Your name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border rounded-md px-3 py-2 w-full"
        type="email"
        required
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* 🐝 HONEYPOT: hidden field for bots */}
      <input
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        name="website"
        aria-hidden="true"
        value=""
        onChange={() => {}}
      />

      <button
        className="w-full rounded-md bg-gradient-to-r from-green-400 to-emerald-500 text-white py-2 font-semibold disabled:opacity-60"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Joining…' : 'Join Waitlist'}
      </button>

      {msg && (
        <p
          className={`text-center ${
            status === 'err' ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {msg}
        </p>
      )}

      <p className="text-xs text-gray-600 text-center">
        By joining, you agree to our{' '}
        <a className="underline" href="/privacy">
          Privacy Policy
        </a>.
      </p>
    </form>
  );
}
