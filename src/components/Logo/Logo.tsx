import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 32 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M16 2L6 8v12l10 6 10-6V8L16 2z" 
        fill="url(#logoGradient)" 
        stroke="url(#logoStroke)" 
        strokeWidth="1"
      />
      <path 
        d="M16 2v28M6 8l10 6M26 8l-10 6" 
        stroke="url(#logoAccent)" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="logoGradient" x1="6" y1="2" x2="26" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6F5ACC" />
          <stop offset="100%" stopColor="#A291FB" />
        </linearGradient>
        <linearGradient id="logoStroke" x1="6" y1="2" x2="26" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6F5ACC" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#A291FB" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="logoAccent" x1="6" y1="2" x2="26" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#E5E7EB" stopOpacity="0.7" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
