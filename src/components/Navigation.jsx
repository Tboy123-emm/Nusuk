import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation({ onOpenConsultation }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Featured Packages', href: '#packages' },
    { name: 'Destinations', href: '#gallery' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Inquire', href: '#contact' },
  ];

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(26, 26, 26, 0.05)' : '1px solid transparent',
          padding: isScrolled ? '1rem 0' : '1.75rem 0',
          boxShadow: isScrolled ? '0 10px 30px rgba(26, 26, 26, 0.03)' : 'none',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Elegant Luxury Logo */}
          <a
            href="#"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Logo SVG Icon */}
              <svg viewBox="0 0 100 80" style={{ width: '42px', height: '34px', overflow: 'visible' }}>
                {/* Styled dark loop (cursive N/C) */}
                <path 
                  d="M 52,55 C 38,55 30,45 30,33 C 30,21 38,13 50,13 C 58,13 64,17 66,23 L 56,26 C 54,22 52,20 49,20 C 43,20 39,24 39,32 C 39,40 43,44 49,44 C 55,44 61,38 65,31 L 73,37 C 67,47 61,55 52,55 Z" 
                  fill={isScrolled ? "var(--charcoal)" : "var(--white)"}
                  style={{ transition: 'fill 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
                {/* Styled gold loop (cursive T/checkmark) */}
                <path 
                  d="M 46,38 L 53,45 L 78,17 C 84,11 90,15 90,22 C 90,29 82,35 74,38 L 60,38" 
                  stroke="var(--gold)" 
                  strokeWidth="5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  fill="none" 
                />
              </svg>
              {/* Branding Text */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.2rem',
                    fontWeight: '400',
                    color: isScrolled ? 'var(--charcoal)' : 'var(--white)',
                    letterSpacing: '0.15em',
                    transition: 'var(--transition-fast)',
                    lineHeight: 1.1,
                  }}
                >
                  NUSUK TOURS
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.52rem',
                    fontWeight: '500',
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
          </a>

          {/* Desktop Navigation Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
            }}
            className="desktop-menu"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                style={{
                  textDecoration: 'none',
                  color: isScrolled ? 'var(--charcoal)' : 'var(--white)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: '400',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  transition: 'var(--transition-fast)',
                  position: 'relative',
                  padding: '0.5rem 0',
                }}
                className="nav-item-link"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(link.href);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {link.name}
                <span className="nav-link-indicator"></span>
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
            }}
            className="desktop-menu"
          >
            <button
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn"
              style={{
                padding: '0.75rem 1.75rem',
                fontSize: '0.7rem',
                backgroundColor: isScrolled ? 'var(--charcoal)' : 'var(--white)',
                color: isScrolled ? 'var(--white)' : 'var(--charcoal)',
                borderColor: isScrolled ? 'var(--charcoal)' : 'var(--white)',
                borderStyle: 'solid',
                borderWidth: '1px',
              }}
            >
              Speak with an Advisor
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: isScrolled ? 'var(--charcoal)' : 'var(--white)',
              cursor: 'pointer',
              display: 'none',
              transition: 'var(--transition-fast)',
            }}
            className="mobile-toggle"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: mobileMenuOpen ? 0 : '-100%',
          width: '100%',
          maxWidth: '380px',
          height: '100vh',
          background: 'var(--white)',
          borderLeft: '1px solid var(--border-light)',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.05)',
          zIndex: 1001,
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: '3rem 2.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {/* Logo SVG Icon */}
              <svg viewBox="0 0 100 80" style={{ width: '32px', height: '26px', overflow: 'visible' }}>
                <path 
                  d="M 52,55 C 38,55 30,45 30,33 C 30,21 38,13 50,13 C 58,13 64,17 66,23 L 56,26 C 54,22 52,20 49,20 C 43,20 39,24 39,32 C 39,40 43,44 49,44 C 55,44 61,38 65,31 L 73,37 C 67,47 61,55 52,55 Z" 
                  fill="var(--charcoal)"
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
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', color: 'var(--charcoal)', fontWeight: '400', fontSize: '1.1rem', letterSpacing: '0.15em', lineHeight: 1.1, display: 'block' }}>
                  NUSUK TOURS
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', color: 'var(--gold)', fontWeight: '500', fontSize: '0.45rem', letterSpacing: '0.15em', display: 'block', marginTop: '2px', textTransform: 'uppercase' }}>
                  Simple & Seamless Travels
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{ background: 'transparent', border: 'none', color: 'var(--charcoal)', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  const target = document.querySelector(link.href);
                  if (target) {
                    setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 300);
                  }
                }}
                style={{
                  textDecoration: 'none',
                  color: 'var(--charcoal)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  fontWeight: '400',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid rgba(26, 26, 26, 0.05)',
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              const contactSection = document.querySelector('#contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Speak with an Advisor
          </button>
        </div>
      </div>

      {/* Global CSS for Navigation Actions */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
        .nav-item-link:hover {
          color: var(--gold) !important;
        }
        .nav-link-indicator {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 1px;
          background: var(--gold);
          transition: var(--transition-fast);
          transform: translateX(-50%);
        }
        .nav-item-link:hover .nav-link-indicator {
          width: 100%;
        }
      `}</style>
    </>
  );
}
