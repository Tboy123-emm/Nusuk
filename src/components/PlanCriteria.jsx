import React from 'react';
import { Calendar, Users, Plane, Shield, Clock, Star } from 'lucide-react';

export default function PlanCriteria() {
  const criteria = [
    {
      icon: <Calendar size={24} color="var(--gold)" />,
      title: "365 Days",
      subtitle: "Valid Duration",
      description: "Valid for 365 days from the date of issuance"
    },
    {
      icon: <Clock size={24} color="var(--gold)" />,
      title: "90 Days",
      subtitle: "Maximum Stay",
      description: "Maximum total stay across all entries"
    },
    {
      icon: <Users size={24} color="var(--gold)" />,
      title: "Multiple Entries",
      subtitle: "Flexible Access",
      description: "Perform Umrah more than once during validity period"
    },
    {
      icon: <Shield size={24} color="var(--gold)" />,
      title: "Before Each Entry",
      subtitle: "Easy Process",
      description: "Select approved service package and obtain Umrah permit via Nusuk app"
    },
    {
      icon: <Plane size={24} color="var(--gold)" />,
      title: "After Each Departure",
      subtitle: "Auto Update",
      description: "Remaining stay is updated automatically"
    },
    {
      icon: <Star size={24} color="var(--gold)" />,
      title: "Premium Service",
      subtitle: "Full Support",
      description: "24/7 assistance and premium hospitality throughout your journey"
    }
  ];

  return (
    <section style={{ backgroundColor: 'var(--cream)', padding: '4rem 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="editorial-tag" style={{ color: 'var(--gold)' }}>
            Key Features
          </span>
          <h2 className="section-title" style={{ color: 'var(--charcoal)', fontWeight: '400', marginBottom: '1rem' }}>
            Umrah Travel Criteria
          </h2>
          <p className="section-desc" style={{ maxWidth: '600px', margin: '0 auto' }}>
            From single entry to multi entry - comprehensive visa services designed for your spiritual journey
          </p>
        </div>

        {/* Criteria Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}
        >
          {criteria.map((item, index) => (
            <div
              key={index}
              style={{
                background: 'var(--white)',
                padding: '2rem',
                borderRadius: '8px',
                border: '1px solid rgba(26, 26, 26, 0.08)',
                textAlign: 'center',
                transition: 'var(--transition)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)'
              }}
              className="criteria-card"
            >
              {/* Icon */}
              <div 
                style={{
                  width: '60px',
                  height: '60px',
                  background: 'rgba(201, 162, 39, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  border: '1px solid rgba(201, 162, 39, 0.2)'
                }}
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3 
                style={{
                  fontSize: '1.4rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--charcoal)',
                  fontWeight: '400',
                  marginBottom: '0.5rem'
                }}
              >
                {item.title}
              </h3>

              {/* Subtitle */}
              <p 
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--gold)',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '1rem'
                }}
              >
                {item.subtitle}
              </p>

              {/* Description */}
              <p 
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  fontWeight: '300'
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div 
          style={{
            textAlign: 'center',
            marginTop: '3rem',
            padding: '1.5rem',
            background: 'rgba(201, 162, 39, 0.05)',
            border: '1px solid rgba(201, 162, 39, 0.2)',
            borderRadius: '8px'
          }}
        >
          <p 
            style={{
              fontSize: '0.9rem',
              color: 'var(--text-secondary)',
              margin: 0,
              fontWeight: '400'
            }}
          >
            <strong style={{ color: 'var(--charcoal)' }}>Important:</strong> Not valid for entry during the Hajj season (1st Dhul-Qi'dah - 13th Dhul-al-Hijja)
          </p>
        </div>

      </div>

      <style>{`
        .criteria-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
          border-color: rgba(201, 162, 39, 0.3);
        }
      `}</style>
    </section>
  );
}