import React from 'react';
import { Landmark, Compass, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      title: 'Visa Assistance',
      desc: 'VIP fast-track electronic visa processing, handled entirely by our internal governmental liaison team to secure seamless, priority approvals.',
      icon: Landmark,
    },
    {
      title: 'Flight Booking',
      desc: 'Exclusive allocations on premier air carriers including Saudia, Emirates, and Qatar Airways, with priority lounge access and business class comfort.',
      icon: Compass,
    },
    {
      title: 'Hotel Reservations',
      desc: 'Guaranteed reservations in premier five-star luxury suites directly facing the Holy courtyard, offering unparalleled views and immediate access.',
      icon: Award,
    },
    {
      title: 'Ground Transport',
      desc: 'Private, air-conditioned GMC and luxury coach fleet transfers with experienced local chauffeurs, ensuring secure and seamless transits.',
      icon: ShieldCheck,
    },
    {
      title: 'Dedicated Support',
      desc: '24/7 on-the-ground support from our local hospitality team and esteemed Islamic scholars, offering logistical and spiritual escort care.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="why-us" style={{ backgroundColor: 'var(--white)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <span className="editorial-tag">Exquisite Service Standard</span>
          <h2 className="section-title" style={{ color: 'var(--charcoal)', fontWeight: '400', maxWidth: '600px' }}>
            Why Travel With Us
          </h2>
          <p className="section-desc" style={{ textAlign: 'center', marginBottom: '6rem' }}>
            Every logistical facet of your spiritual journey is curated with absolute precision, security, and exceptional comfort.
          </p>
        </div>

        {/* Features Row Layout */}
        <div className="grid-5" style={{ marginTop: '2rem' }}>
          {features.map((feat) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={feat.title}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  background: 'var(--cream)',
                  padding: '2.5rem 2rem',
                  border: '1px solid rgba(26, 26, 26, 0.05)',
                  transition: 'var(--transition)',
                }}
                className="why-us-card"
              >
                {/* Outlined Icon Container */}
                <div
                  style={{
                    width: '45px',
                    height: '45px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(201, 162, 39, 0.25)',
                    backgroundColor: 'rgba(201, 162, 39, 0.04)',
                    marginBottom: '2rem',
                    transition: 'var(--transition-fast)',
                  }}
                  className="why-us-icon-container"
                >
                  <IconComponent size={20} color="var(--gold)" style={{ strokeWidth: 1.25 }} />
                </div>

                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--charcoal)',
                    fontWeight: '400',
                    marginBottom: '1rem',
                  }}
                >
                  {feat.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    fontWeight: '300',
                    lineHeight: '1.6',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        .why-us-card:hover {
          background-color: var(--white) !important;
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(26, 26, 26, 0.04);
          border-color: rgba(201, 162, 39, 0.3) !important;
        }
        
        .why-us-card:hover .why-us-icon-container {
          background-color: var(--charcoal) !important;
          border-color: var(--charcoal) !important;
        }

        .why-us-card:hover .why-us-icon-container svg {
          color: var(--white) !important;
        }
      `}</style>
    </section>
  );
}
