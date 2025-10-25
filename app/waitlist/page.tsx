'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email.');
      return;
    }

    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, source: 'brainthrive-landing' }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success('You’re on the list! 🎉');
      setJoined(true);
      setName('');
      setEmail('');
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  }

  return (
    <div className="text-center mt-10">
      {!joined ? (
        <>
          <h1 className="text-4xl font-bold mb-4 text-navy">BrainThrive</h1>
          <p className="text-gray-600 mb-6">
            Balance screen time with real-world wins. Join the waitlist to get early access.
          </p>

          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col gap-3"
          >
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold py-2 rounded-md"
            >
              Join Waitlist
            </button>
          </form>
        </>
      ) : (
        <AnimatePresence>
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-12 bg-white shadow-md rounded-lg p-8 max-w-lg mx-auto"
          >
            <h2 className="text-2xl font-bold mb-3 text-navy">🎉 You’re on the list!</h2>
            <p className="text-gray-600 mb-6">
              Thanks for joining the <span className="font-semibold text-emerald-500">BrainThrive</span> waitlist!  
              We’ll notify you as soon as early access opens — stay tuned and get ready to thrive.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://twitter.com/intent/tweet?text=I%20just%20joined%20the%20BrainThrive%20waitlist!%20A%20new%20way%20to%20balance%20screen%20time%20and%20real-life%20focus!%20%F0%9F%9A%80%20https%3A%2F%2Fbrainthrive.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1DA1F2] text-white px-4 py-2 rounded-md hover:bg-[#0d8ae5]"
              >
                Share on Twitter
              </a>
              <a
                href="mailto:?subject=Check out BrainThrive&body=I just joined the BrainThrive waitlist — a new way to help families balance screen time and focus! https://brainthrive.vercel.app"
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Share via Email
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
