import './globals.css';
import Image from 'next/image';
import React from 'react';
import { Menu } from 'lucide-react';

export const metadata = {
  title: 'Leap Scholar Premium',
  description: 'Premium plans for studying abroad',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gradient-to-b from-background to-white font-body min-h-screen">
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <Image src="/leap_logo.png" alt="Leap Scholar Logo" width={160} height={40} />
            </div>
            <nav className="hidden md:flex gap-8 text-base font-medium">
              <a href="#" className="text-gray-700 hover:text-primary transition-colors">Study Abroad</a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors">Exams</a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors">Resources</a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors">Blogs</a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors">Events</a>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors">About Us</a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="hidden md:inline-block bg-primary text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-secondary transition-colors">Sign in</button>
              <button className="md:hidden p-2 rounded hover:bg-gray-100">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>
        <div className="max-w-[1440px] mx-auto">{children}</div>
      </body>
    </html>
  );
}
