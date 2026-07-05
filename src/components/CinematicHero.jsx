import React, { useEffect, useState } from 'react';
import { Compass, Phone } from 'lucide-react';

export default function CinematicHero({ onOpenConsultation }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      style={{
        height: '100vh',
        width: '100vw',
        padding: 0,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--charcoal)',
      }}
    >
      {/* Immersive Parallax Photographic Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '120%', // slightly taller for parallax movement
          backgroundImage: 'url("/images/hero_makkah.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          transform: `translateY(${scrollY * 0.4}px)`, // Parallax factor
          transition: 'transform 0.1s ease-out',
          zIndex: 1,
        }}
      />

      {/* Luxury Charcoal/Gold Linear Overlay for premium cinematic depth & readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(26, 26, 26, 0) 0%, rgba(26, 26, 26, 0.75) 80%, rgba(26, 26, 26, 0.95) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Golden Sunrise Glow Accent */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(201, 162, 39, 0.08) 0%, transparent 70%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Hero Content Overlay */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: '100%',
          marginTop: '2rem',
        }}
      >
        <div className="fade-up" style={{ maxWidth: '820px' }}>
          {/* Subtle Spiritual Premium Accent Tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              paddingBottom: '0.5rem',
              marginBottom: '2rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.65rem',
                fontWeight: '500',
                color: 'var(--gold)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
              }}
>
            </span>
          </div>

          {/* Majestic Serif Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.75rem, 5.5vw, 4.75rem)',
              lineHeight: '1.15',
              fontFamily: 'var(--font-serif)',
              fontWeight: '400',
              color: 'var(--white)',
              marginBottom: '2rem',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
            }}
          >
            Your Journey <br />
            <span
              style={{
                fontStyle: 'italic',
                fontFamily: 'var(--font-serif)',
                color: 'var(--gold-light)',
              }}
            >
              Begins Here
            </span>
          </h1>

          {/* Minimalist Spacious Subheadline */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
              fontWeight: '300',
              color: 'var(--white)',
              opacity: 0.9,
              marginBottom: '3.5rem',
              lineHeight: '1.7',
              maxWidth: '640px',
              letterSpacing: '0.01em',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            Premium Hajj and Umrah experiences designed for comfort, peace of mind, and spiritual fulfillment. Explore a pathway of exquisite devotion.
          </p>

          {/* Elegant Action Buttons */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <a
              href="#packages"
              className="btn btn-primary"
              style={{
                backgroundColor: 'var(--white)',
                color: 'var(--charcoal)',
                borderColor: 'var(--white)',
              }}
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector('#packages');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Compass size={15} style={{ strokeWidth: 1.5 }} />
              Explore Packages
            </a>

            <button
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn btn-secondary"
              style={{
                color: 'var(--white)',
                borderColor: 'var(--white)',
              }}
            >
              <Phone size={15} style={{ strokeWidth: 1.5 }} />
              Speak With An Advisor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
