import React from 'react';

export interface CountryOrProgramSelectorProps {
  options: { key: string; label: string }[];
  selectedKey?: string;
  onSelect: (key: string) => void;
}

const CountryOrProgramSelector: React.FC<CountryOrProgramSelectorProps> = ({ options, selectedKey, onSelect }) => {
  return (
    <div role="radiogroup" aria-label="Select Country or Program" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', margin: '2rem 0' }}>
      {options.map(option => (
        <button
          key={option.key}
          className="cta focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label={`Select ${option.label}`}
          tabIndex={0}
          style={{
            opacity: selectedKey === option.key ? 1 : 0.7,
            border: selectedKey === option.key ? '2px solid #5B5FE3' : '1px solid #E2E8F0',
            boxShadow: selectedKey === option.key ? '0 0 0 2px #5B5FE333' : 'none',
          }}
          onClick={() => onSelect(option.key)}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onSelect(option.key); }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default CountryOrProgramSelector; 