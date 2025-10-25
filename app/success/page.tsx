'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ShareModal from '@/components/ShareModal';

export default function WaitlistSuccess() {
  const [showModal, setShowModal] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
          🎉 You’re on the list!
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto mb-8">
          Thanks for joining the <strong>BrainThrive</strong> waitlist!  
          We’ll notify you as soon as early access opens — stay tuned and get ready to  
          <strong> help your family thrive smarter, play better, and focus deeper.</strong>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-navy text-white px-6 py-3 rounded-md font-medium hover:bg-navy/90 transition"
          >
            Back to Home
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="border border-navy text-navy px-6 py-3 rounded-md font-medium hover:bg-navy hover:text-white transition"
          >
            Share BrainThrive
          </button>
        </div>
      </motion.div>

      {showModal && <ShareModal onClose={() => setShowModal(false)} />}
      <footer className="mt-16 text-sm text-gray-500">
        © {new Date().getFullYear()} BrainThrive. All rights reserved.
      </footer>
    </div>
  );
}
