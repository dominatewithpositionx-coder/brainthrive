'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';

export default function WaitlistForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, source: 'landing' }),
      });

      if (!res.ok) throw new Error('Signup failed');
      setStatus('ok');

      // 🎉 Trigger confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Redirect to success page (modal + share prompt)
      setTimeout(() => {
        router.push('/success');
      }, 800);
    } catch (err) {
      setStatus('err');
      alert('Something went wrong. Please try again.');
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

      <button
        className="w-full rounded-md bg-gradient-to-r from-green-400 to-green-500 text-white py-2 disabled:opacity-60"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Joining…' : 'Join Waitlist'}
      </button>

      <p className="text-xs text-gray-600 text-center">
        By joining, you agree to our{' '}
        <a className="underline" href="/privacy">
          Privacy Policy
        </a>.
      </p>
    </form>
  );
}
