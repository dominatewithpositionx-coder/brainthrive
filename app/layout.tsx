// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import Image from 'next/image';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: 'BrainThrive — Empowering Smarter Play and Focus',
  description:
    'BrainThrive helps families balance screen time, boost focus, and reward positive habits — because thriving brains grow through balance.',
  icons: {
    icon: '/brand/brainthrive/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="min-h-screen text-navy bg-white">
        {/* Header */}
        <header className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 font-bold text-xl">
            <Image
              src="/brand/brainthrive/BrainThrive_FullLogo_Gradient.png"
              alt="BrainThrive Logo"
              width={160}
              height={40}
              priority
            />
          </Link>
          <nav className="flex gap-6 text-sm text-gray-700">
            <Link href="/how-it-works">How it works</Link>
            <Link href="/parents">For Parents</Link>
            <Link href="/science">Science</Link>
          </nav>
        </header>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="max-w-5xl mx-auto px-4 py-12 text-sm text-gray-600">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p>© {new Date().getFullYear()} BrainThrive</p>
            <div className="flex gap-6">
              <Link href="/privacy">Privacy</Link>
              <Link href="/how-it-works">How it works</Link>
              <Link href="/science">Science</Link>
            </div>
          </div>
        </footer>

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#00e08a',
              color: '#fff',
              borderRadius: '8px',
              fontWeight: 500,
            },
          }}
        />

        {/* Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
