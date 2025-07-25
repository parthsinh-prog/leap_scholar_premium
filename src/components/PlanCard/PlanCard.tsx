import React from 'react';
import { Plan } from '../../constants/plans';

interface PlanCardProps {
  plan: Plan;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  return (
    <section
      role="region"
      aria-label={`Plan card for ${plan.tier}`}
      style={{
        border: '2px solid #5B5FE3',
        borderRadius: '16px',
        padding: '2rem',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(91,95,227,0.10)',
        minWidth: 320,
        maxWidth: 350,
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'box-shadow 0.2s',
      }}
      tabIndex={0}
    >
      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: '#5B5FE3' }}>{plan.tier}</h3>
      <div style={{ fontSize: '2rem', fontWeight: 800, color: '#5B5FE3', marginBottom: '1rem' }}>
        ₹{plan.priceRange[0].toLocaleString('en-IN')}
        <span style={{ textDecoration: 'line-through', color: '#A0AEC0', fontSize: '1.2rem', fontWeight: 500, marginLeft: '0.7rem' }}>
          ₹{plan.priceRange[1].toLocaleString('en-IN')}
        </span>
      </div>
      <ul style={{ textAlign: 'left', marginBottom: '1rem', padding: 0, listStyle: 'none' }}>
        <li><b>Applications:</b> {plan.applications}</li>
        <li><b>Counsellor:</b> {plan.counsellor}</li>
        <li><b>IELTS:</b> {plan.ielts}</li>
        <li><b>SOP/LOR Support:</b> {plan.sopLorSupport}</li>
        <li><b>Visa Support:</b> {plan.visaSupport}</li>
        <li><b>Scholarship Support:</b> {plan.scholarshipSupport}</li>
        <li><b>Accommodation Support:</b> {plan.accommodationSupport ? 'Yes' : 'No'}</li>
      </ul>
      <div style={{ color: '#FF6B35', fontWeight: 700, marginBottom: '0.5rem' }}>
        Credits Worth: ₹{plan.creditTotal.toLocaleString('en-IN')}
      </div>
      <ul style={{ color: '#718096', fontSize: '0.95rem', marginBottom: '1rem', padding: 0, listStyle: 'none' }}>
        {Object.entries(plan.creditBreakdown).map(([key, value]) =>
          value ? <li key={key}>{key.replace(/([A-Z])/g, ' $1')}: ₹{value.toLocaleString('en-IN')}</li> : null
        )}
      </ul>
      {plan.addOns && plan.addOns.length > 0 && (
        <div style={{ color: '#5B5FE3', fontWeight: 600, marginTop: '0.5rem' }}>
          Add-ons: {plan.addOns.join(', ')}
        </div>
      )}
    </section>
  );
};

export default PlanCard; 