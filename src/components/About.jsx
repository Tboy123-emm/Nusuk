import React from 'react';

export default function About() {
  return (
    <section id="about" className="bg-cream">
      <div className="container">
        <div className="split-layout">
          {/* Left Side: Large Immersive Luxury Image */}
          <div
            style={{
              position: 'relative',
              borderRadius: '0px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.04)',
              border: '1px solid rgba(26, 26, 26, 0.05)',
            }}
          >
            <img
              src="/images/about_luxury.png"
              alt="Luxury hotel room opening directly to a serene view of the Holy Mosque in Makkah"
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '650px',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="about-image"
            />
            {/* Soft gold frame overlay */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                right: '20px',
                bottom: '20px',
                border: '1px solid rgba(201, 162, 39, 0.2)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Right Side: Minimalist Editorial Text */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
            
            <h2 
              className="section-title"
              style={{ 
                fontSize: 'clamp(2.25rem, 3.8vw, 2.75rem)',
                marginBottom: '2rem',
                color: 'var(--charcoal)',
                fontWeight: '400'
              }}
            >
              The Nusuk Tours Promise
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                fontWeight: '300',
                lineHeight: '1.85',
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
              }}
            >
              At Nusuk Tours, we believe that the sacred Hajj Pilgrimage and Umra should be undertaken with complete peace of mind. That is why we dedicate our time in curating high-end spiritual journeys, meticulously managing every logistical detail so that you can also dedicate your heart entirely to worship.
            </p>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                fontWeight: '300',
                lineHeight: '1.85',
                color: 'var(--text-secondary)',
                marginBottom: '3rem',
              }}
            >
              From direct-access five-star suites overlooking the Kaaba to private luxury transfers and VIP fast-track visa processing, our dedicated hospitality team ensures that your comfort remains absolute, from your doorstep to the Holy Sanctuary.
            </p>

            {/* Micro Stats */}
            <div 
              style={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                gap: '2.5rem', 
                borderTop: '1px solid rgba(26, 26, 26, 0.08)', 
                paddingTop: '2rem',
                width: '100%' 
              }}
            >
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--gold)' }}>100%</span>
                <span style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginTop: '4px' }}>Reliability</span>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--gold)' }}>5★</span>
                <span style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginTop: '4px' }}>Comfort</span>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--gold)' }}>24/7</span>
                <span style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginTop: '4px' }}>Friendly Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-image:hover {
          transform: scale(1.03);
        }
      `}</style>
    </section>
  );
}
