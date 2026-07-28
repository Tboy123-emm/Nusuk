import React, { useEffect, useState } from 'react';
import { Check, ChevronRight, Sparkles } from 'lucide-react';
import { defaultPackages } from '../data/packageData';
import { getPackagesApiUrl, getPackagesWithFallback, getPlanForTier, loadPackagesFromStorage, resolvePackagesForDisplay, savePackagesToStorage } from '../data/packageStorage';

export default function FeaturedPackages({ onBookPackage }) {
  const packageContext = {
    id: 'featured-experience',
    title: 'Featured Experiences',
    tag: 'Pricing Plans',
  };

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      const storedPackages = loadPackagesFromStorage();
      const fallbackPackages = getPackagesWithFallback(defaultPackages);

      if (storedPackages) {
        setPackages(storedPackages);
      } else {
        setPackages(fallbackPackages);
      }

      try {
        const response = await fetch(getPackagesApiUrl('/packages'), { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        const packagesToUse = resolvePackagesForDisplay({
          storedPackages,
          backendPackages: data,
          fallbackPackages,
        });
        setPackages(packagesToUse);
        savePackagesToStorage(packagesToUse);
      } catch (err) {
        console.warn('Backend unavailable, using saved packages:', err);
        const packagesToUse = resolvePackagesForDisplay({
          storedPackages,
          fallbackPackages,
        });
        setPackages(packagesToUse);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <section id="packages" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container">
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Loading packages...</p>
        </div>
      </section>
    );
  }

  const tiers = [
    { name: 'Standard', price: getPlanForTier(packages, 'Standard')?.price || '4,800' },
    { name: 'Plus', price: getPlanForTier(packages, 'Plus')?.price || '6,450' },
    { name: 'Premium', price: getPlanForTier(packages, 'Premium')?.price || '8,900' },
  ];

  return (
    <section id="packages" style={{ backgroundColor: 'var(--white)', padding: '3rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ color: 'var(--charcoal)', fontWeight: '400' }}>
            Pricing Tiers
          </h2>
        </div>

        <div className="featured-plan-grid">
          {tiers.map((tier) => {
            const tierPlan = getPlanForTier(packages, tier.name);

            return (
            <article 
              key={tier.name} 
              className="featured-plan-card"
              style={{
                textAlign: 'center',
                padding: '2rem',
                background: '#f9f9f9',
                border: tier.name === 'Plus' ? '2px solid var(--gold)' : '1px solid #ddd',
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

              <h3 style={{ 
                fontSize: '1.5rem', 
                fontFamily: 'var(--font-serif)', 
                margin: '2rem 0',
                color: 'var(--charcoal)'
              }}>
                {tier.name}
              </h3>

              <p style={{ 
                color: 'var(--text-muted)', 
                fontSize: '0.9rem',
                marginBottom: '1.5rem'
              }}>
                Premium travel package
              </p>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onBookPackage(packages[0], tierPlan)}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  backgroundColor: tier.name === 'Plus' ? 'var(--gold)' : '#666',
                  color: 'var(--charcoal)',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  marginBottom: '1.5rem'
                }}
              >
                Choose {tier.name}
              </button>

              <div style={{ 
                borderTop: '1px solid #ddd',
                paddingTop: '1.5rem',
                textAlign: 'left'
              }}>
                <h4 style={{ 
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: 'var(--charcoal)'
                }}>
                  What's Included:
                </h4>
                <ul style={{ 
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'grid',
                  gap: '0.7rem'
                }}>
                  {tierPlan?.includes?.map((item, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      gap: '0.7rem',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)'
                    }}>
                      <span style={{ color: 'var(--gold)', fontWeight: 'bold' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
            );
          })}
        </div>
      </div>

      <style>{`
        .featured-plan-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.35rem;
          align-items: stretch;
        }
        .featured-plan-card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 455px;
          border: 1px solid rgba(26, 26, 26, 0.1);
          background: var(--white);
          padding: 1.75rem;
          transition: var(--transition-fast);
        }
        .featured-plan-card:hover {
          border-color: var(--gold);
          transform: translateY(-4px);
          box-shadow: 0 18px 45px rgba(26, 26, 26, 0.07);
        }
        .featured-plan-card.is-featured {
          border-color: var(--gold);
          padding-top: 3.9rem;
          box-shadow: 0 20px 55px rgba(201, 162, 39, 0.14);
        }
        .featured-plan-ribbon {
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          min-height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          background: var(--charcoal);
          color: var(--white);
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .featured-plan-top h3 {
          color: var(--charcoal);
          font-size: 1.85rem;
          margin-bottom: 0.8rem;
        }
        .featured-plan-top p {
          min-height: 54px;
          color: var(--text-secondary);
          font-size: 0.92rem;
          font-weight: 300;
          line-height: 1.55;
          margin-bottom: 1.5rem;
        }
        .featured-plan-price {
          margin-bottom: 1.25rem;
        }
        .featured-plan-price span,
        .featured-plan-price em {
          display: block;
          color: var(--text-muted);
          font-size: 0.68rem;
          font-style: normal;
          font-weight: 500;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }
        .featured-plan-price strong {
          display: block;
          color: var(--charcoal);
          font-family: var(--font-serif);
          font-size: 2.55rem;
          font-weight: 400;
          line-height: 1.1;
          margin: 0.2rem 0;
        }
        .featured-plan-btn {
          width: 100%;
          justify-content: center;
          min-height: 50px;
          padding: 0.95rem 1rem;
          font-size: 0.68rem;
          white-space: normal;
          text-align: center;
        }
        .featured-plan-divider {
          width: 100%;
          height: 1px;
          background: rgba(26, 26, 26, 0.08);
          margin: 1.5rem 0;
        }
        .featured-plan-features {
          display: grid;
          gap: 0.85rem;
          list-style: none;
        }
        .featured-plan-features li {
          display: grid;
          grid-template-columns: 18px 1fr;
          gap: 0.65rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.48;
        }
        .featured-plan-features svg {
          color: var(--gold);
          margin-top: 0.12rem;
        }
        @media (max-width: 1050px) {
          .featured-plan-grid {
            grid-template-columns: 1fr;
          }
          .featured-plan-card {
            min-height: auto;
          }
        }
        @media (max-width: 520px) {
          .featured-plan-card {
            padding: 1.25rem;
          }
          .featured-plan-card.is-featured {
            padding-top: 3.55rem;
          }
        }
      `}</style>
    </section>
  );
}
