import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: 'var(--charcoal)',
        color: 'var(--text-white)',
        padding: '6rem 0 3.5rem 0',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <div className="container">
        
        {/* Top Branding & Main Link Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '3rem',
            paddingBottom: '4rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          {/* Logo Column */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {/* Logo SVG Icon */}
              <svg viewBox="0 0 100 80" style={{ width: '42px', height: '34px', overflow: 'visible' }}>
                <path 
                  d="M 52,55 C 38,55 30,45 30,33 C 30,21 38,13 50,13 C 58,13 64,17 66,23 L 56,26 C 54,22 52,20 49,20 C 43,20 39,24 39,32 C 39,40 43,44 49,44 C 55,44 61,38 65,31 L 73,37 C 67,47 61,55 52,55 Z" 
                  fill="var(--white)"
                />
                <path 
                  d="M 46,38 L 53,45 L 78,17 C 84,11 90,15 90,22 C 90,29 82,35 74,38 L 60,38" 
                  stroke="var(--gold)" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  fill="none" 
                />
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    color: 'var(--white)',
                    letterSpacing: '0.15em',
                    lineHeight: 1.1,
                  }}
                >
                  NUSUK TOURS
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.52rem',
                    color: 'var(--gold)',
                    letterSpacing: '0.2em',
                    display: 'block',
                    marginTop: '2px',
                    textTransform: 'uppercase',
                  }}
                >
                  Simple & Seamless Travels
                </span>
              </div>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: '300',
                color: 'var(--text-muted)',
                lineHeight: '1.6',
                maxWidth: '280px',
              }}
            >
              Crafting premium, spacious, and spiritually rich Hajj and Umrah journeys with immaculate logistical care.
            </p>
          </div>

          {/* Nav Links Column */}
          <div style={{ display: 'flex', gap: '5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-sans)', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                Sanctuary Paths
              </span>
              <a href="#packages" className="footer-link">Featured Packages</a>
              <a href="#gallery" className="footer-link">Destinations</a>
              <a href="#why-us" className="footer-link">Why Us</a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-sans)', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                The Agency
              </span>
              <a href="#about" className="footer-link">Our Promise</a>
              <a href="#testimonials" className="footer-link">Pilgrim Stories</a>
              <a href="#contact" className="footer-link">Private Consultation</a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-sans)', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                Advisors
              </span>
              <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontWeight: '300' }}>
                Mon - Fri: 9am - 6pm EST
              </span>
              <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontWeight: '300' }}>
                09070261007
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            paddingTop: '2.5rem',
          }}
        >
          <span
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-sans)',
              fontWeight: '300',
            }}
          >
            &copy; {currentYear} Nusuk Tours Ltd. All rights reserved.
          </span>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <a href="#" className="footer-legal-link">Privacy Policy</a>
            <a href="#" className="footer-legal-link">Terms of Service</a>
            <a href="#" className="footer-legal-link">Regulatory Compliance</a>
            <a href="/admin" className="footer-legal-link">Admin Access</a>
          </div>
        </div>

      </div>

      <style>{`
        .footer-link {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 300;
          color: var(--text-muted);
          text-decoration: none;
          transition: var(--transition-fast);
        }
        .footer-link:hover {
          color: var(--white);
          transform: translateX(3px);
        }
        .footer-legal-link {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 300;
          color: var(--text-muted);
          text-decoration: none;
          transition: var(--transition-fast);
        }
        .footer-legal-link:hover {
          color: var(--gold);
        }
      `}</style>
    </footer>
  );
}
