'use client';
import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const GlassModal: React.FC<GlassModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Modal Sheet */}
          <motion.div
            className="fixed left-1/2 bottom-0 z-50 w-full max-w-md -translate-x-1/2 mb-8 bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-primary/10 p-6"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="pt-2 pb-2 px-2">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GlassModal; 