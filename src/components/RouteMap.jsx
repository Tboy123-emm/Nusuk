import React, { useState } from 'react';
import { Plane, Compass, Sparkles, MapPin } from 'lucide-react';

export default function RouteMap() {
  const [hoveredNode, setHoveredNode] = useState(null);

  const destinations = {
    makkah: {
      name: 'Makkah Al-Mukarramah',
      x: '62%', y: '61%',
      type: 'Holy Sanctuary',
      package: 'VIP Umrah & Hajj Premium',
      desc: 'The ultimate spiritual convergence. Features five-star Haram-facing luxury accommodations and scholars.',
    },
    madinah: {
      name: 'Madinah Al-Munawwarah',
      x: '61.5%', y: '58.5%',
      type: 'Prophet’s Sanctuary',
      package: 'Ziyarah Heritage Excursions',
      desc: 'Serene city of the Prophet (PBUH). Experience peace in Al-Masjid an-Nabawi and deep historical excursions.',
    },
    london: {
      name: 'London Terminal',
      x: '46%', y: '40%',
      type: 'Primary Gateway',
      package: 'UK VIP Charter Routes',
      desc: 'Elite departure terminals, luxury private lounges, and expedited fast-track check-ins.',
    },
    dubai: {
      name: 'Dubai Hub',
      x: '66.5%', y: '59%',
      type: 'Luxury Stopover',
      package: 'Emirates First Class Connection',
      desc: 'Elite stopovers featuring 5-star hotel transfers, private chauffeur services, and high-end shopping tours.',
    },
    istanbul: {
      name: 'Istanbul Heritage',
      x: '57%', y: '47%',
      type: 'Islamic History Tour',
      package: 'Ottoman Splendors Sightseeing',
      desc: 'Stunning cultural heritage extensions including Hagia Sophia, Blue Mosque tours, and Bosphorus cruises.',
    },
    cairo: {
      name: 'Cairo Excursion',
      x: '58%', y: '56%',
      type: 'Ancient Excursion',
      package: 'Nile Cruise & Islamic Relics',
      desc: 'Explore ancient Islamic architecture, rich history, and premium historical landmark tours.',
    }
  };

  return (
    <section id="interactive-map" style={{ background: 'var(--royal-dark)', borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>
      {/* Decorative backing grids */}
      <div 
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to bottom, rgba(3, 7, 18, 0.4), transparent), radial-gradient(circle at 10% 30%, rgba(37, 99, 235, 0.05) 0%, transparent 60%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        
        <div style={{ textAlign: 'center' }}>
          <span className="section-subtitle">Interactive Operations</span>
          <h2 className="section-title">Global Flight Network & Luxury Connections</h2>
          <p className="section-desc">
            Hover over our primary transit terminals and holy destinations to see active flight details and custom premium packages emerging in 3D.
          </p>
        </div>

        {/* High-End Interactive Vector Map Canvas */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            background: 'rgba(11, 21, 40, 0.45)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            border: '1px solid rgba(212, 175, 55, 0.15)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Subtle grid lines background overlay */}
          <div 
            style={{
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%',
              backgroundImage: 'radial-gradient(rgba(212, 175, 55, 0.15) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              opacity: 0.5,
              pointerEvents: 'none',
              zIndex: 1
            }}
          />

          {/* SVG Map Path Lines & Connections */}
          <svg 
            viewBox="0 0 1000 562" 
            style={{
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%',
              zIndex: 2,
              pointerEvents: 'none'
            }}
          >
            {/* Defining Glowing Filters */}
            <defs>
              <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Stylized Futuristic Continent Outlines */}
            {/* North America */}
            <path 
              d="M 80,100 C 140,80 220,70 290,110 C 340,140 330,220 290,260 C 260,290 200,280 150,280 C 100,280 70,200 80,100 Z" 
              fill="rgba(37, 99, 235, 0.015)" 
              stroke="rgba(212, 175, 55, 0.08)" 
              strokeWidth="1.5"
            />
            {/* South America */}
            <path 
              d="M 230,300 C 280,310 290,370 280,430 C 260,490 220,530 190,530 C 170,530 190,440 190,370 C 190,320 200,300 230,300 Z" 
              fill="rgba(37, 99, 235, 0.015)" 
              stroke="rgba(212, 175, 55, 0.08)" 
              strokeWidth="1.5"
            />
            {/* Africa */}
            <path 
              d="M 440,260 C 490,260 520,300 550,330 C 580,370 540,480 490,490 C 460,500 450,440 430,400 C 410,360 400,300 440,260 Z" 
              fill="rgba(37, 99, 235, 0.015)" 
              stroke="rgba(212, 175, 55, 0.08)" 
              strokeWidth="1.5"
            />
            {/* Eurasia (Europe + Asia) */}
            <path 
              d="M 370,160 C 440,110 520,90 620,80 C 720,70 820,90 880,120 C 920,150 900,240 850,280 C 800,320 710,310 660,340 C 600,380 540,340 480,300 C 440,260 380,220 370,160 Z" 
              fill="rgba(37, 99, 235, 0.015)" 
              stroke="rgba(212, 175, 55, 0.08)" 
              strokeWidth="1.5"
            />
            {/* Australia */}
            <path 
              d="M 760,390 C 800,390 840,410 840,440 C 840,470 790,490 750,470 C 730,450 730,400 760,390 Z" 
              fill="rgba(37, 99, 235, 0.015)" 
              stroke="rgba(212, 175, 55, 0.08)" 
              strokeWidth="1.5"
            />

            {/* Flight Path Lines (London to Makkah) */}
            <path 
              d="M 460,225 Q 540,240 620,342" 
              fill="none" 
              stroke="url(#routeGlow)" 
              strokeWidth="2.5" 
              strokeDasharray="8 6"
              className="animated-flight-line"
            />
            {/* Istanbul to Makkah */}
            <path 
              d="M 570,264 Q 595,290 620,342" 
              fill="none" 
              stroke="url(#routeGlow)" 
              strokeWidth="2" 
              strokeDasharray="6 4"
              className="animated-flight-line"
            />
            {/* Cairo to Makkah */}
            <path 
              d="M 580,314 Q 600,325 620,342" 
              fill="none" 
              stroke="url(#routeGlow)" 
              strokeWidth="2" 
              strokeDasharray="6 4"
              className="animated-flight-line"
            />
            {/* Dubai to Makkah */}
            <path 
              d="M 665,331 Q 642,336 620,342" 
              fill="none" 
              stroke="url(#routeGlow)" 
              strokeWidth="2.5" 
              strokeDasharray="8 6"
              className="animated-flight-line"
            />

            {/* Makkah to Madinah Shuttles */}
            <path 
              d="M 620,342 Q 617,335 615,328" 
              fill="none" 
              stroke="var(--gold)" 
              strokeWidth="1.5" 
              strokeDasharray="4 2"
              className="animated-flight-line"
            />

            {/* Neon Linear Gradients */}
            <linearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.8" />
            </linearGradient>
          </svg>

          {/* Render Target Node Hotspots */}
          {Object.entries(destinations).map(([key, dest]) => (
            <div 
              key={key}
              style={{
                position: 'absolute',
                left: dest.x,
                top: dest.y,
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                cursor: 'pointer',
                pointerEvents: 'auto'
              }}
              onMouseEnter={() => setHoveredNode(key)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Pulse Expander Ring */}
              <div 
                style={{
                  position: 'absolute',
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  border: key === 'makkah' || key === 'madinah' ? '2px solid var(--gold)' : '2px solid #38bdf8',
                  left: '-17.5px',
                  top: '-17.5px',
                  animation: 'pulse-slow 2.5s infinite ease-in-out',
                  pointerEvents: 'none'
                }}
              />

              {/* Central Solid Hub Dot */}
              <div 
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: key === 'makkah' || key === 'madinah' ? 'var(--gold)' : '#38bdf8',
                  boxShadow: key === 'makkah' || key === 'madinah' ? '0 0 10px var(--gold)' : '0 0 10px #38bdf8',
                  transition: 'transform 0.2s'
                }}
                className="target-node"
              />

              {/* 3D Emergent Detail Card on Hover */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '25px',
                  left: '50%',
                  transform: hoveredNode === key ? 'translateX(-50%) translateY(0) rotateX(0deg)' : 'translateX(-50%) translateY(20px) rotateX(-20deg)',
                  opacity: hoveredNode === key ? 1 : 0,
                  pointerEvents: hoveredNode === key ? 'auto' : 'none',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  width: '280px',
                  padding: '1.5rem',
                  background: 'rgba(3, 7, 18, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1.5px solid var(--gold)',
                  borderRadius: '8px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 25px rgba(212, 175, 55, 0.15)',
                  transformOrigin: 'bottom center',
                  zIndex: 20
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                  <MapPin size={14} color="var(--gold)" />
                  <span style={{ fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--gold)', letterSpacing: '0.1em' }}>
                    {dest.type}
                  </span>
                </div>
                <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: '700', color: 'var(--white)', marginBottom: '0.35rem' }}>
                  {dest.name}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '1rem' }}>
                  {dest.desc}
                </p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Featured Offer</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--white)', fontWeight: '600' }}>{dest.package}</span>
                  </div>
                  <Plane size={14} color="#38bdf8" />
                </div>
              </div>
            </div>
          ))}

          {/* Informational overlay label */}
          <div 
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '1.5rem',
              background: 'rgba(3, 7, 18, 0.65)',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '0.65rem 1.25rem',
              borderRadius: '4px',
              zIndex: 5,
              fontSize: '0.8rem',
              color: 'var(--text-muted)'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plane size={14} color="#38bdf8" className="animated-float" />
              Blue lines represent active international flight gateways
            </span>
          </div>
        </div>

      </div>

      {/* Map Keyframe Animations */}
      <style>{`
        .animated-flight-line {
          stroke-dashoffset: 100;
          animation: dash 12s linear infinite;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        .target-node:hover {
          transform: scale(1.5);
        }
      `}</style>
    </section>
  );
}
