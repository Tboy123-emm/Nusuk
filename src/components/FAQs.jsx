import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQs() {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      q: 'What is the core difference between Hajj and Umrah?',
      a: 'Hajj is an obligatory major pilgrimage performed once a year during specific Islamic dates (Dhu al-Hijjah), involving specific massive gatherings in Mina, Arafat, and Muzdalifah. Umrah is a voluntary, shorter minor pilgrimage that can be performed at any time of the year and takes only a few hours to complete in Makkah.',
    },
    {
      q: 'What exact luxury elements are included in the VIP Packages?',
      a: 'Our elite VIP packages cover first-class or business airline reservations, five-star executive suites directly facing the Holy Haram (such as Fairmont or Swissôtel), dedicated private GMC Yukon transport, fast-track electronic visa clearance, and private multi-lingual scholars accompanying you during rituals.',
    },
    {
      q: 'How long does the electronic Saudi Visa processing take?',
      a: 'Under ordinary conditions, our direct electronic console integrations with the Saudi Ministry of Hajj & Umrah enable us to clear standard Umrah e-visas within 24 to 48 hours. International tourism or transit visas are cleared almost instantly upon submission.',
    },
    {
      q: 'Do you offer flexible installment plans or booking protection?',
      a: 'Yes. We provide transparent installment plans where you can book with a 25% initial deposit, paying the remaining balance in flexible installments up to 30 days before departure. All payments are securely locked under our IATA bonding scheme for 100% financial safety.',
    },
    {
      q: 'What special assistance is provided for elderly or disabled pilgrims?',
      a: 'We specialize in multi-generational family comfort. We provide private wheelchair chaperones throughout the Tawaf and Sa’ee, dedicated low-floor VIP bus seating, and immediate on-call medical escorts. Simply let us know your requirements during booking.',
    },
  ];

  return (
    <section id="faq" style={{ background: 'var(--royal-bg)', overflow: 'hidden' }}>
      
      {/* Background glow backing */}
      <div 
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.04) 0%, transparent 60%)',
          top: '30%',
          left: '-10%',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ maxWidth: '850px' }}>
        
        <div style={{ textAlign: 'center' }}>
          <span className="section-subtitle">Clarify Inquiries</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-desc">
            Find answers to standard spiritual and administrative travel concerns. Have more questions? Connect with our guides anytime.
          </p>
        </div>

        {/* Accordion Group */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '2rem' }}>
          {faqs.map((faq, i) => {
            const isOpen = activeIndex === i;
            return (
              <div
                key={i}
                style={{
                  background: 'rgba(11, 21, 40, 0.55)',
                  backdropFilter: 'var(--glass-blur)',
                  WebkitBackdropFilter: 'var(--glass-blur)',
                  border: isOpen ? '1.5px solid var(--gold)' : '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: isOpen ? '0 10px 25px rgba(212, 175, 55, 0.08)' : 'none'
                }}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setActiveIndex(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    padding: '1.5rem 2rem',
                    background: 'transparent',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <HelpCircle size={18} color={isOpen ? 'var(--gold)' : 'var(--text-muted)'} />
                    <span 
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.05rem',
                        fontWeight: '600',
                        color: isOpen ? 'var(--white)' : 'var(--text-light)',
                        transition: 'var(--transition-fast)'
                      }}
                    >
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown 
                    size={18} 
                    color={isOpen ? 'var(--gold)' : 'var(--text-muted)'} 
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                </button>

                {/* Accordion Body */}
                <div
                  style={{
                    maxHeight: isOpen ? '300px' : '0px',
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    borderTop: isOpen ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid transparent'
                  }}
                >
                  <div 
                    style={{
                      padding: '1.5rem 2rem',
                      fontSize: '0.92rem',
                      lineHeight: '1.65',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
