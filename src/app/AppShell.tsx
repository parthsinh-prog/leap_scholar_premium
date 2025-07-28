'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { openSidebar, closeSidebar } from '../store/uiSlice';
import Sidebar from '../components/Sidebar/Sidebar';
import Image from 'next/image';
import { Menu } from 'lucide-react';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);
  const dispatch = useDispatch();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow-2xl rounded-b-3xl border-b border-primary/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 md:py-6">
          <div className="flex items-center">
            <Image src="/leap_logo.png" alt="Leap Scholar Logo" width={160} height={40} />
          </div>
          <nav className="hidden lg:flex gap-8 text-base font-medium">
            <a href="#" className="text-gray-700 hover:text-primary transition-colors rounded-full px-4 py-2 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary">Study Abroad</a>
            <a href="#" className="text-gray-700 hover:text-primary transition-colors rounded-full px-4 py-2 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary">Exams</a>
            <a href="#" className="text-gray-700 hover:text-primary transition-colors rounded-full px-4 py-2 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary">Resources</a>
            <a href="#" className="text-gray-700 hover:text-primary transition-colors rounded-full px-4 py-2 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary">Blogs</a>
            <a href="#" className="text-gray-700 hover:text-primary transition-colors rounded-full px-4 py-2 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary">Events</a>
            <a href="#" className="text-gray-700 hover:text-primary transition-colors rounded-full px-4 py-2 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary">About Us</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="hidden lg:inline-block bg-primary text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-secondary hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary">Sign in</button>
            <button 
              onClick={() => dispatch(openSidebar())}
              className="lg:hidden p-2 rounded-full hover:bg-primary/10 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} onClose={() => dispatch(closeSidebar())} />
      <div className="max-w-[1440px] mx-auto px-2 md:px-6 pt-4 md:pt-8 pb-8 md:pb-16">{children}</div>
    </>
  );
} 