// lib/brand.ts
export const BRAND = {
  name: 'BrainThrive',
  tagline: 'Earn your play. Enjoy your day.',
  description: 'Tools to help families build better screen habits with rewards, tasks, and positive routines.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  logo: '/brand/brainthrive/brainthrive-logo.svg',     // header/wordmark
  mark: '/brand/brainthrive/brainthrive-mark.svg',     // favicon/square
  ogImage: '/brand/brainthrive/og-cover.png',
  twitter: '@brainthrive',
  color: {
    primary: '#22c55e', // Green 500
    primaryDark: '#16a34a',
    bg: '#0b1a27',      // if you keep a dark hero somewhere
  },
  font: {
    display: 'Poppins', // you selected Poppins Bold
  },
  emailFromName: 'BrainThrive',
  emailFromAddress: 'notifications@resend.dev', // update once you have your domain
};
