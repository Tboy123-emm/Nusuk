import React from 'react';
import { 
  Compass, 
  Globe, 
  FileCheck, 
  Plane, 
  Building, 
  MapPin, 
  Car, 
  UserCheck 
} from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: 'Hajj Packages',
      desc: 'All-inclusive, fully-guided Hajj pilgrimages with five-star hotel stays, elite tent services in Mina, and seasoned theological scholars.',
      icon: <Compass size={28} color="var(--gold-dark)" />,
    },
    {
      title: 'Umrah Packages',
      desc: 'Affordable and VIP custom Umrah packages all year round. Includes close-to-Haram hotels, luxury transfers, and historical ziyarah guides.',
      icon: <Globe size={28} color="var(--gold-dark)" />,
    },
    {
      title: 'Visa Processing',
      desc: 'Visa Processing for: Umrah, Qatar Visit/Business/Medicals, UAE Visit/Business/Medicals, Egypt Visit/Business/Medicals.',
      icon: <FileCheck size={28} color="var(--gold-dark)" />,
    },
    {
      title: 'Flight Bookings',
      desc: 'Flight Bookings with premium and reliable partner airlines: Saudia, Egypt Air, Ethiopian, Qatar Airways, Emirates.',
      icon: <Plane size={28} color="var(--gold-dark)" />,
    },
    {
      title: 'Hotel Reservations',
      desc: 'Guaranteed comfortable and luxurious One-Five Star Hotel Reservations within Masjid Al-Haram (Makkah) and Masjid Al-Nabawi (Madina) vicinities, offering unparalleled views and access.',
      icon: <Building size={28} color="var(--gold-dark)" />,
    },
    {
      title: 'Ground Transportation',
      desc: 'Provision of standard package ground transportation services. We also offer, on request, Executive VIP Vehicles and Train Services to make you feel at home.',
      icon: <Car size={28} color="var(--gold-dark)" />,
    },
    {
      title: 'Tour Packages',
      desc: 'Explore rich culture in Dubai, Turkey, Egypt, Jordan, and European landmarks with curated family and historical sightseeing itineraries.',
      icon: <MapPin size={28} color="var(--gold-dark)" />,
    },
    {
      title: 'Travel Consultation',
      desc: 'One-on-one tailored itinerary planning, spiritual preparation guidance, and 24/7 dedicated support desk throughout your trip.',
      icon: <UserCheck size={28} color="var(--gold-dark)" />,
    },
  ];

  return (
    <section id="services" className="clean-white-section">
      {/* Decorative Elegant Arch Pattern */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'linear-gradient(to bottom, var(--royal-bg), transparent)',
          opacity: 0.05,
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        
        <div style={{ textAlign: 'center' }}>
          <span 
            className="section-subtitle" 
            style={{ 
              color: 'var(--gold-dark)', 
              fontWeight: '700' 
            }}
          >
            Our Elite Services
          </span>
          <h2 className="section-title">Crafting Exquisite Global & Sacred Travel Experiences</h2>
          <p className="section-desc">
            From spiritual pilgrimage packages to global elite vacations, we manage every single touchpoint of your journey with absolute care, premium refinement, and flawless execution.
          </p>
        </div>

        {/* 8-Card Grid Layout */}
        <div className="grid-4" style={{ marginTop: '2rem' }}>
          {services.map((svc, i) => (
            <div 
              key={svc.title}
              className="service-card"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(15, 23, 42, 0.06)',
                borderRadius: '8px',
                padding: '2.5rem 2rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Gold glowing accent corner */}
              <div 
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '30px',
                  height: '30px',
                  background: 'linear-gradient(135deg, transparent 50%, rgba(212, 175, 55, 0.1) 50%)',
                  borderTopRightRadius: '8px',
                  transition: 'var(--transition)'
                }}
                className="svc-corner"
              />

              {/* Icon Container */}
              <div 
                style={{
                  background: 'rgba(212, 175, 55, 0.08)',
                  width: '55px',
                  height: '55px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.75rem',
                  transition: 'var(--transition)'
                }}
                className="svc-icon-box"
              >
                {svc.icon}
              </div>

              {/* Service Headline */}
              <h3 
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: 'var(--text-dark)',
                  marginBottom: '0.85rem'
                }}
              >
                {svc.title}
              </h3>

              {/* Service Description */}
              <p 
                style={{
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  color: '#64748b'
                }}
              >
                {svc.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Embedded Component CSS */}
      <style>{`
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(11, 21, 40, 0.08) !important;
          border-color: rgba(212, 175, 55, 0.4) !important;
        }
        .service-card:hover .svc-icon-box {
          background: linear-gradient(135deg, var(--gold-dark), var(--gold)) !important;
          transform: scale(1.05);
        }
        .service-card:hover .svc-icon-box svg {
          stroke: var(--white) !important;
        }
        .service-card:hover .svc-corner {
          background: linear-gradient(135deg, transparent 50%, var(--gold) 50%) !important;
          opacity: 0.6;
        }
      `}</style>
    </section>
  );
}
