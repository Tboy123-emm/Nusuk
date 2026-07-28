import React, { useState } from 'react';
import { Eye, X } from 'lucide-react';

export default function Gallery() {
  const [lightboxImg, setLightboxImg] = useState(null);

  const items = [
    {
      id: 1,
      title: 'Makkah Al-Mukarramah',
      tag: 'Sacred Sanctuary',
      desc: 'The spiritual heart of Islam, housing the holy Kaaba. A place of endless circumambulation, profound unity, and light.',
      img: '/images/gallery_makkah.png',
      gridClass: 'masonry-large',
    },
    {
      id: 2,
      title: 'Madinah Al-Munawwarah',
      tag: 'Prophetic Serenity',
      desc: 'The peaceful City of the Prophet. Home to Al-Masjid an-Nabawi, marked by its iconic Green Dome and giant folding white umbrellas.',
      img: '/images/gallery_madinah.png',
      gridClass: 'masonry-large',
    },
    {
      id: 3,
      title: 'Jeddah Coastal Gateway',
      tag: 'Red Sea Sanctuary',
      desc: 'The historic port city and modern gateway. Perfect for luxury Red Sea stopovers and coastal relaxation before or after your pilgrimage.',
      img: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=800&auto=format&fit=crop',
      gridClass: 'masonry-small',
    },
    {
      id: 4,
      title: 'Doha, Qatar',
      tag: 'Gulf Splendour',
      desc: 'A city where ancient heritage meets futuristic skyline. Explore the stunning Corniche, Museum of Islamic Art, and world-class hospitality.',
      img: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?q=80&w=800&auto=format&fit=crop',
      gridClass: 'masonry-small',
    },
    {
      id: 5,
      title: 'Dubai, UAE',
      tag: 'Luxury Capital',
      desc: 'The pinnacle of modern luxury. From the Burj Khalifa to desert safaris, Dubai offers an unmatched blend of opulence and adventure.',
      img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
      gridClass: 'masonry-small',
    },
    {
      id: 6,
      title: 'Cairo, Egypt',
      tag: 'Ancient Wonders',
      desc: 'Walk in the footsteps of prophets and pharaohs. The Great Pyramids of Giza, Al-Azhar Mosque, and the timeless Nile await your arrival.',
      img: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=800&auto=format&fit=crop',
      gridClass: 'masonry-small',
    },
  ];

  return (
    <section id="gallery" style={{ backgroundColor: 'var(--cream)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span className="editorial-tag">Territories of Faith</span>
          <h2 className="section-title" style={{ color: 'var(--charcoal)', fontWeight: '400' }}>
            Destinations
          </h2>
          <p className="section-desc">
            Explore the sacred centers and luxury gateways of your upcoming journey.
          </p>
        </div>

        {/* Masonry Grid (Editorial Layout) */}
        <div className="masonry-grid" style={{ marginTop: '2rem' }}>
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImg(item)}
              className={`masonry-item ${item.gridClass}`}
              style={{
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                background: 'var(--charcoal)',
                transition: 'var(--transition)',
              }}
            >
              {/* Immersive Image */}
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="masonry-img"
              />

              {/* Luxury Gold Frame Overlay (Visible on Hover) */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  right: '20px',
                  bottom: '20px',
                  border: '1px solid rgba(201, 162, 39, 0.3)',
                  opacity: 0,
                  transition: 'var(--transition-fast)',
                  pointerEvents: 'none',
                  zIndex: 3,
                }}
                className="masonry-frame"
              />

              {/* Editorial Text Overlay */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: '50%',
                  background: 'linear-gradient(to top, rgba(26, 26, 26, 0.95) 0%, rgba(26, 26, 26, 0.4) 60%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '2.5rem',
                  zIndex: 2,
                  transition: 'var(--transition-fast)',
                }}
                className="masonry-overlay"
              >
                {/* Quiet tag */}
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.55rem',
                    color: 'var(--gold)',
                    fontWeight: '500',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem',
                    transform: 'translateY(10px)',
                    opacity: 0.8,
                    transition: 'transform 0.4s ease, opacity 0.4s ease',
                  }}
                  className="masonry-overlay-tag"
                >
                  {item.tag}
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.65rem',
                    color: 'var(--white)',
                    fontWeight: '400',
                    marginBottom: '0.75rem',
                    transform: 'translateY(10px)',
                    transition: 'transform 0.4s ease',
                  }}
                  className="masonry-overlay-title"
                >
                  {item.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    fontWeight: '300',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.75)',
                    opacity: 0,
                    height: 0,
                    overflow: 'hidden',
                    transition: 'opacity 0.4s ease, height 0.4s ease',
                  }}
                  className="masonry-overlay-desc"
                >
                  {item.desc}
                </p>
              </div>

              {/* Centered Minimalist Eye Icon on Hover */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) scale(0.8)',
                  opacity: 0,
                  transition: 'var(--transition-fast)',
                  zIndex: 4,
                }}
                className="masonry-eye"
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Eye size={20} color="var(--white)" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Expanded Image View Overlay */}
      {lightboxImg && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(26, 26, 26, 0.98)',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
          onClick={() => setLightboxImg(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxImg(null)}
            style={{
              position: 'absolute',
              top: '2.5rem',
              right: '2.5rem',
              background: 'transparent',
              border: 'none',
              color: 'var(--white)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition-fast)',
            }}
            className="lightbox-close"
          >
            <X size={28} />
          </button>

          <div
            style={{
              maxWidth: '1000px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImg.img}
              alt={lightboxImg.title}
              style={{
                width: '100%',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '0px',
                border: '1px solid var(--gold)',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
              }}
            />
            <div style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                {lightboxImg.tag}
              </span>
              <h3 style={{ fontSize: '2rem', color: 'var(--white)', fontFamily: 'var(--font-serif)', fontWeight: '400', marginBottom: '1rem' }}>
                {lightboxImg.title}
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: '300', lineHeight: '1.7' }}>
                {lightboxImg.desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Masonry CSS Layout Grid */}
      <style>{`
        .masonry-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 250px;
          gap: 2rem;
          grid-template-areas:
            "makkah makkah madinah madinah"
            "makkah makkah madinah madinah"
            "jeddah doha dubai cairo";
        }
        
        .masonry-item {
          border-radius: 0px;
        }

        .masonry-item:nth-child(1) {
          grid-area: makkah;
        }

        .masonry-item:nth-child(2) {
          grid-area: madinah;
        }

        .masonry-item:nth-child(3) {
          grid-area: jeddah;
        }

        .masonry-item:nth-child(4) {
          grid-area: doha;
        }

        .masonry-item:nth-child(5) {
          grid-area: dubai;
        }

        .masonry-item:nth-child(6) {
          grid-area: cairo;
        }

        @media (max-width: 1024px) {
          .masonry-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 280px;
          }
          .masonry-large {
            grid-column: span 2;
            grid-row: span 2;
          }
          .masonry-medium, .masonry-small {
            grid-column: span 1;
            grid-row: span 1;
          }
        }

        @media (max-width: 640px) {
          .masonry-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 280px;
          }
          .masonry-large, .masonry-medium, .masonry-small {
            grid-column: span 1;
            grid-row: span 1;
          }
        }

        /* Hover Actions */
        .masonry-item:hover .masonry-img {
          transform: scale(1.05);
        }

        .masonry-item:hover .masonry-frame {
          opacity: 1 !important;
        }

        .masonry-item:hover .masonry-eye {
          opacity: 1 !important;
          transform: translate(-50%, -50%) scale(1) !important;
        }

        .masonry-item:hover .masonry-overlay {
          height: 60%;
          background: linear-gradient(to top, rgba(26, 26, 26, 0.98) 0%, rgba(26, 26, 26, 0.5) 70%, transparent 100%);
        }

        .masonry-item:hover .masonry-overlay-tag,
        .masonry-item:hover .masonry-overlay-title {
          transform: translateY(0) !important;
        }

        .masonry-item:hover .masonry-overlay-desc {
          opacity: 1 !important;
          height: auto !important;
          margin-top: 0.5rem;
        }

        .lightbox-close:hover {
          color: var(--gold) !important;
        }
      `}</style>
    </section>
  );
}
