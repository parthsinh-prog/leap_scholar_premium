'use client';

import React from 'react';
import { X, Home, BookOpen, FileText, BookMarked, Calendar, Users, LogIn } from 'lucide-react';
import Image from 'next/image';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { icon: Home, label: 'Study Abroad', href: '#' },
    { icon: BookOpen, label: 'Exams', href: '#' },
    { icon: FileText, label: 'Resources', href: '#' },
    { icon: BookMarked, label: 'Blogs', href: '#' },
    { icon: Calendar, label: 'Events', href: '#' },
    { icon: Users, label: 'About Us', href: '#' },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-white/90 backdrop-blur-xl shadow-2xl border-l border-primary/10 z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
          <div className="flex items-center">
            <Image src="/leap_logo.png" alt="Leap Scholar Logo" width={120} height={30} />
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-6">
          <div className="space-y-2">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Sign In Button */}
        <div className="absolute bottom-6 left-6 right-6">
          <button className="w-full bg-primary text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-secondary hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-center gap-2">
            <LogIn className="w-5 h-5" />
            Sign In
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 