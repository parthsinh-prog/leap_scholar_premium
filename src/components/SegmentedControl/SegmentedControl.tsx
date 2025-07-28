'use client';
import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SegmentedControlProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, value, onChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const idx = options.findIndex(opt => opt.value === value);
    const btn = btnRefs.current[idx];
    if (btn && containerRef.current) {
      const { left: btnLeft, width } = btn.getBoundingClientRect();
      const { left: containerLeft } = containerRef.current.getBoundingClientRect();
      setIndicator({ left: btnLeft - containerLeft, width });
    }
  }, [options, value]);

  return (
    <div ref={containerRef} className="relative flex bg-gray-100 rounded-full p-1 w-full max-w-xl mx-auto shadow-inner">
      {/* Animated indicator */}
      <motion.div
        className="absolute top-0 bottom-0 rounded-full bg-primary z-0"
        initial={false}
        animate={{
          left: indicator.left,
          width: indicator.width,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        style={{ pointerEvents: 'none' }}
      />
      {options.map((opt, idx) => (
        <motion.button
          key={opt.value}
          ref={el => { btnRefs.current[idx] = el; return undefined; }}
          className={`relative flex-1 z-10 px-4 py-2 rounded-full font-semibold text-base focus:outline-none transition-colors`}
          style={{ zIndex: value === opt.value ? 20 : 10 }}
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
          animate={{ color: value === opt.value ? '#fff' : '#4A47FF' }}
          transition={{ duration: 0.2 }}
        >
          {opt.label}
        </motion.button>
      ))}
    </div>
  );
};

export default SegmentedControl; 