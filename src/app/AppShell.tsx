'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { openSidebar, closeSidebar, openModal, closeModal } from '../store/uiSlice';
import Sidebar from '../components/Sidebar/Sidebar';
import GlassModal from '../components/GlassModal/GlassModal';
import Image from 'next/image';
import { Menu, MessageCircle } from 'lucide-react';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const isSidebarOpen = useSelector((state: RootState) => state.ui.isSidebarOpen);
  const isModalOpen = useSelector((state: RootState) => state.ui.isModalOpen);
  const dispatch = useDispatch();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow-2xl rounded-b-3xl border-b border-primary/10 transition-all duration-300 [.header-reduced-shadow_&]:shadow-lg [.header-reduced-shadow_&]:bg-white/60 w-full">
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
      {/* Floating Action Button (FAB) */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-primary text-white rounded-full shadow-lg p-5 flex items-center justify-center hover:bg-secondary hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
        onClick={() => dispatch(openModal())}
        aria-label="Contact Us"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
      {/* Glassmorphic Modal */}
      <GlassModal isOpen={isModalOpen} onClose={() => dispatch(closeModal())}>
        <h2 className="text-2xl font-bold mb-4 text-center font-heading">Contact Us</h2>
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Your Name" className="rounded-xl border border-primary/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary bg-white/70" />
          <input type="email" placeholder="Your Email" className="rounded-xl border border-primary/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary bg-white/70" />
          <textarea placeholder="How can we help you?" className="rounded-xl border border-primary/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary bg-white/70 resize-none min-h-[80px]" />
          <button type="submit" className="bg-primary text-white rounded-xl py-3 font-semibold shadow-md hover:bg-secondary transition-all duration-200">Send Message</button>
        </form>
      </GlassModal>
      {children}
    </>
  );
} 