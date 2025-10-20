import './globals.css'
 import type { Metadata } from 'next'
 export const metadata: Metadata = {
 title: 'PlayPass — Earn your play. Enjoy your day.',
 description: 'Balance screen time. Unlock real life.'
 }
 export default function RootLayout({ children }: { children: React.ReactNode })
 {
 return (
 <html lang="en">
 <body className="min-h-screen text-navy">
 <header className="max-w-5xl mx-auto px-4 py-6 flex items-center 
justify-between">
 <a href="/" className="font-bold text-xl">PlayPass</a>
 <nav className="flex gap-6 text-sm">
 <a href="/how-it-works">How it works</a>
 <a href="/parents">For Parents</a>
<a href="/science">Science</a>
 </nav>
 </header>
 <main>{children}</main>
 <footer className="max-w-5xl mx-auto px-4 py-12 text-sm text-gray-600">
 <div className="flex flex-col sm:flex-row items-start sm:items-center 
justify-between gap-6">
 <p>© {new Date().getFullYear()} PlayPass</p>
 <div className="flex gap-6">
 <a href="/privacy">Privacy</a>
 <a href="/how-it-works">How it works</a>
 <a href="/science">Science</a>
 </div>
 </div>
 </footer>
 </body>
 </html>
 )
 }