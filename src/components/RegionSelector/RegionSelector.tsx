import React from 'react';

export interface RegionSelectorProps {
  selectedRegion?: string;
  onSelect: (region: 'europe' | 'usa') => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ selectedRegion, onSelect }) => {
  const [usaSubRegion, setUsaSubRegion] = React.useState<'ug' | 'mba' | 'ms' | null>(null);

  return (
    <div role="radiogroup" aria-label="Select Region" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', margin: '2rem 0' }}>
      <button
        className="cta focus:outline-none focus:ring-2 focus:ring-primary"
        tabIndex={0}
        style={{
          opacity: selectedRegion === 'europe' ? 1 : 0.7,
          border: selectedRegion === 'europe' ? '2px solid #5B5FE3' : '1px solid #E2E8F0',
          boxShadow: selectedRegion === 'europe' ? '0 0 0 2px #5B5FE333' : 'none',
        }}
        onClick={() => { onSelect('europe'); setUsaSubRegion(null); }}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { onSelect('europe'); setUsaSubRegion(null); } }}
      >
        <span style={{ fontSize: '1.5rem', marginRight: '0.5rem', verticalAlign: 'middle' }}>🇪🇺</span>Europe
      </button>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <button
          className="cta focus:outline-none focus:ring-2 focus:ring-primary"
          tabIndex={0}
          style={{
            opacity: selectedRegion === 'usa' ? 1 : 0.7,
            border: selectedRegion === 'usa' ? '2px solid #5B5FE3' : '1px solid #E2E8F0',
            boxShadow: selectedRegion === 'usa' ? '0 0 0 2px #5B5FE333' : 'none',
            marginBottom: '0.5rem',
          }}
          onClick={() => { onSelect('usa'); setUsaSubRegion(null); }}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { onSelect('usa'); setUsaSubRegion(null); } }}
        >
          <span style={{ fontSize: '1.5rem', marginRight: '0.5rem', verticalAlign: 'middle' }}>🇺🇸</span>USA
        </button>
        {selectedRegion === 'usa' && (
          <div role="radiogroup" aria-label="Select USA Program" style={{ display: 'flex', gap: '1rem' }}>
            <button
              className="cta focus:outline-none focus:ring-2 focus:ring-primary"
              tabIndex={0}
              style={{
                opacity: usaSubRegion === 'ug' ? 1 : 0.7,
                border: usaSubRegion === 'ug' ? '2px solid #FF6B35' : '1px solid #E2E8F0',
                boxShadow: usaSubRegion === 'ug' ? '0 0 0 2px #FF6B3533' : 'none',
              }}
              onClick={() => setUsaSubRegion('ug')}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setUsaSubRegion('ug'); }}
            >
              UG
            </button>
            <button
              className="cta focus:outline-none focus:ring-2 focus:ring-primary"
              tabIndex={0}
              style={{
                opacity: usaSubRegion === 'mba' ? 1 : 0.7,
                border: usaSubRegion === 'mba' ? '2px solid #FF6B35' : '1px solid #E2E8F0',
                boxShadow: usaSubRegion === 'mba' ? '0 0 0 2px #FF6B3533' : 'none',
              }}
              onClick={() => setUsaSubRegion('mba')}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setUsaSubRegion('mba'); }}
            >
              MBA
            </button>
            <button
              className="cta focus:outline-none focus:ring-2 focus:ring-primary"
              tabIndex={0}
              style={{
                opacity: usaSubRegion === 'ms' ? 1 : 0.7,
                border: usaSubRegion === 'ms' ? '2px solid #FF6B35' : '1px solid #E2E8F0',
                boxShadow: usaSubRegion === 'ms' ? '0 0 0 2px #FF6B3533' : 'none',
              }}
              onClick={() => setUsaSubRegion('ms')}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setUsaSubRegion('ms'); }}
            >
              MS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionSelector; 