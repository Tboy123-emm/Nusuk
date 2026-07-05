import React from 'react';

export default function Testimonials() {
  const stories = [
    {
      name: 'Dr. Tariq Mahmood & Family',
      origin: 'London, United Kingdom',
      package: 'Celestial Gateway Hajj',
      quote: 'An absolutely flawless spiritual journey. From the moment we landed in Jeddah, the Nusuk Tours team surrounded us with unparalleled care. Having private, direct Kaaba views from our suite allowed my elderly parents to perform their devotion with complete dignity and ease. Meticulous organization at every single step.',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    },
    {
      name: 'Amara & Youssef Ghanam',
      origin: 'Chicago, United States',
      package: 'Safa & Marwa Sanctuary Umrah',
      quote: 'Nusuk Tours transformed our expectations of what a pilgrimage could be. They handled the complex visa processing and flight connections with absolute expertise, leaving us entirely free to immerse ourselves in the spiritual serenity of the Prophet’s Mosque in Madinah. A truly peaceful, high-end experience.',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    },
  ];

  return (
    <section id="testimonials" className="bg-cream">
      <div className="container">
        
        {/* Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span className="editorial-tag">Authentic Pilgrimages</span>
          <h2 className="section-title" style={{ color: 'var(--charcoal)', fontWeight: '400' }}>
            Pilgrim Stories
          </h2>
          <p className="section-desc">
            Hear from our honored travelers who completed their sacred journeys in peaceful serenity and exquisite comfort.
          </p>
        </div>

        {/* Stories Split Row Layout */}
        <div className="grid-2" style={{ marginTop: '2rem' }}>
          {stories.map((story) => (
            <div
              key={story.name}
              style={{
                display: 'flex',
                background: 'var(--white)',
                border: '1px solid rgba(26, 26, 26, 0.05)',
                padding: '3rem 2.5rem',
                gap: '2rem',
                flexDirection: 'row',
                alignItems: 'flex-start',
                transition: 'var(--transition)',
              }}
              className="story-card"
            >
              {/* Customer Photo */}
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '1px solid rgba(201, 162, 39, 0.25)',
                }}
              >
                <img
                  src={story.img}
                  alt={story.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* Quote Content */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '3rem',
                    color: 'var(--gold)',
                    lineHeight: '0.1',
                    marginBottom: '1rem',
                  }}
                >
                  &ldquo;
                </span>
                
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.1rem',
                    fontStyle: 'italic',
                    lineHeight: '1.75',
                    color: 'var(--charcoal)',
                    marginBottom: '1.75rem',
                    fontWeight: '300',
                  }}
                >
                  {story.quote}
                </p>

                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    color: 'var(--charcoal)',
                    display: 'block',
                  }}
                >
                  {story.name}
                </span>
                
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginTop: '2px',
                  }}
                >
                  {story.origin} &bull; <span style={{ color: 'var(--gold)' }}>{story.package}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .story-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(26, 26, 26, 0.03);
          border-color: rgba(201, 162, 39, 0.25) !important;
        }
        
        @media (max-width: 640px) {
          .story-card {
            flex-direction: column !important;
            padding: 2rem !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
