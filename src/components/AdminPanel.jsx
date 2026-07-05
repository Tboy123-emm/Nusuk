import React, { useState } from 'react';
import { getPackagesApiUrl, savePackagesToStorage } from '../data/packageStorage';

export default function AdminPanel({ initialData = [], onSave, onClose, adminPassword = '' }) {
  const [packages, setPackages] = useState(initialData);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');

      const savedLocally = savePackagesToStorage(packages);
      if (!savedLocally) {
        throw new Error('Local browser storage is unavailable.');
      }

      const response = await fetch(getPackagesApiUrl('/packages'), {
        cache: 'no-store',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packages, admin_password: adminPassword }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || `HTTP ${response.status}`);
      }

      onSave(packages);
      setSaving(false);
      alert('Packages saved successfully!');
    } catch (e) {
      setSaving(false);
      onSave(packages);
      setError(`${e.message || 'Failed to save'} — your changes were saved in this browser for now.`);
    }
  };

  // Get the 3 pricing tiers from first package
  const tiers = packages[0]?.plans || [];

  const updatePlanPrice = (tierIndex, price) => {
    setPackages(packages.map(pkg => ({
      ...pkg,
      plans: pkg.plans.map((plan, idx) => 
        idx === tierIndex ? { ...plan, price } : plan
      )
    })));
  };

  const updatePlanInclude = (tierIndex, includeIndex, value) => {
    setPackages(packages.map(pkg => ({
      ...pkg,
      plans: pkg.plans.map((plan, idx) => 
        idx === tierIndex 
          ? { 
              ...plan, 
              includes: plan.includes.map((inc, i) => i === includeIndex ? value : inc)
            }
          : plan
      )
    })));
  };

  const addPlanInclude = (tierIndex) => {
    setPackages(packages.map(pkg => ({
      ...pkg,
      plans: pkg.plans.map((plan, idx) => 
        idx === tierIndex 
          ? { ...plan, includes: [...(plan.includes || []), 'New benefit'] }
          : plan
      )
    })));
  };

  const removePlanInclude = (tierIndex, includeIndex) => {
    setPackages(packages.map(pkg => ({
      ...pkg,
      plans: pkg.plans.map((plan, idx) => 
        idx === tierIndex 
          ? { ...plan, includes: plan.includes.filter((_, i) => i !== includeIndex) }
          : plan
      )
    })));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', fontFamily: 'var(--font-serif)', fontWeight: '400' }}>Edit Pricing Tiers</h2>

      {error && (
        <div style={{ 
          background: '#ffe6e6', 
          color: 'crimson', 
          padding: '1rem', 
          borderRadius: '6px', 
          marginBottom: '1.5rem' 
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '2rem' }}>
        {tiers.map((tier, tierIdx) => (
          <div 
            key={tier.name}
            style={{ 
              background: '#f9f9f9', 
              border: tier.name === 'Plus' ? '2px solid var(--gold)' : '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '1.5rem',
              position: 'relative'
            }}
          >
            {tier.name === 'Plus' && (
              <div style={{
                position: 'absolute',
                top: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--gold)',
                color: 'var(--charcoal)',
                padding: '0.3rem 1rem',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                MOST POPULAR
              </div>
            )}

            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--charcoal)' }}>{tier.name}</h3>

            {/* Price */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>Price (Naira)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: '600' }}>#</span>
                <input
                  type="text"
                  value={tier.price}
                  onChange={(e) => updatePlanPrice(tierIdx, e.target.value)}
                  placeholder="e.g. 2,400,000"
                  style={{ 
                    flex: 1,
                    padding: '0.75rem', 
                    borderRadius: '6px', 
                    border: '1px solid #ccc',
                    fontFamily: 'monospace'
                  }}
                />
              </div>
            </div>

            {/* Includes/Benefits */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.8rem', display: 'block' }}>What's Included:</label>
              <div style={{ display: 'grid', gap: '0.7rem', marginBottom: '0.8rem' }}>
                {(tier.includes || []).map((include, idx) => (
                  <div 
                    key={idx}
                    style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}
                  >
                    <input
                      type="text"
                      value={include}
                      onChange={(e) => updatePlanInclude(tierIdx, idx, e.target.value)}
                      style={{ 
                        flex: 1,
                        padding: '0.6rem', 
                        borderRadius: '4px', 
                        border: '1px solid #ddd',
                        fontSize: '0.85rem'
                      }}
                    />
                    <button
                      onClick={() => removePlanInclude(tierIdx, idx)}
                      style={{
                        padding: '0.4rem 0.7rem',
                        backgroundColor: '#f56c6c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => addPlanInclude(tierIdx)}
                style={{
                  padding: '0.5rem 0.8rem',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}
              >
                + Add Benefit
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          onClick={handleSave} 
          disabled={saving}
          style={{
            padding: '0.85rem 2rem',
            backgroundColor: 'var(--gold)',
            color: 'var(--charcoal)',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.7 : 1
          }}
        >
          {saving ? 'Saving...' : '💾 Save All Changes'}
        </button>
        <button 
          onClick={onClose}
          style={{
            padding: '0.85rem 2rem',
            backgroundColor: '#f0f0f0',
            color: '#333',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
