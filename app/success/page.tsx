'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

export default function SuccessPage() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // 🎉 Confetti animation
    const duration = 2 * 1000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    // 💬 Open share modal after 2 seconds
    const timer = setTimeout(() => setShowModal(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-bold mb-4 text-navy drop-shadow-sm"
      >
        🎉 You’re on the list!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg text-gray-700 max-w-md mb-8"
      >
        Thanks for joining the <strong>BrainThrive</strong> waitlist!  
        We’ll notify you as soon as early access is open — stay tuned and get ready to{' '}
        <span className="font-semibold">earn your play and enjoy your day.</span>
      </motion.p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-md bg-black text-white hover:bg-gray-800 transition"
        >
          Back to Home
        </Link>
        <a
          href="https://twitter.com/intent/tweet?text=I%20just%20joined%20the%20BrainThrive%20waitlist!%20Earn%20your%20play.%20Enjoy%20your%20day.%20https://brainthrive-five.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-md border border-gray-400 hover:bg-gray-100 transition"
        >
          Share on Twitter
        </a>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="text-sm text-gray-500 mt-12"
      >
        © {new Date().getFullYear()} BrainThrive. All rights reserved.
      </motion.footer>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-3 text-navy">
                🚀 Share the excitement!
              </h2>
              <p className="text-gray-600 mb-6">
                Let your friends know you’re on the <strong>BrainThrive</strong> waitlist.  
                The more people that join, the faster we launch early access!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://twitter.com/intent/tweet?text=I%20just%20joined%20the%20BrainThrive%20waitlist!%20Earn%20your%20play.%20Enjoy%20your%20day.%20https://brainthrive-five.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-md bg-[#1DA1F2] text-white hover:bg-[#0d8ae0] transition"
                >
                  Twitter
                </a>
                <a
                  href="https://www.linkedin.com/sharing/share-offsite/?url=https://brainthrive-five.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-md bg-[#0077b5] text-white hover:bg-[#005f8c] transition"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:?subject=Join%20me%20on%20BrainThrive!&body=I%20just%20joined%20the%20BrainThrive%20waitlist%20-%20Earn%20your%20play%20and%20enjoy%20your%20day!%20https://brainthrive-five.vercel.app/"
                  className="px-5 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-800 transition"
                >
                  Email
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
