import React, { useState } from 'react';
import { Send, PhoneCall, Mail, MapPin } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    journeyType: 'umrah',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [fallbackLink, setFallbackLink] = useState('');

  const createMailtoLink = (data) => {
    const subject = encodeURIComponent('Private Advisor Inquiry');
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nJourney Type: ${data.journeyType}\n\nMessage:\n${data.message}`
    );
    return `mailto:alamuoyetoluwani@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setFallbackLink('');
    setIsSubmitting(true);

    try {
      // Try SMTP backend first
      const smtpResponse = await fetch('http://localhost:8000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (smtpResponse.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', journeyType: 'umrah', message: '' });
        setTimeout(() => {
          setSubmitted(false);
        }, 4000);
        setIsSubmitting(false);
        return;
      }
    } catch (smtpError) {
      console.warn('SMTP backend unavailable, trying EmailJS...', smtpError);
    }

    // Fallback to EmailJS if SMTP fails
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitError('Email service is not configured. Please try again later.');
      setFallbackLink(createMailtoLink(formData));
      setIsSubmitting(false);
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      journey_type: formData.journeyType,
      message: formData.message,
    };

    if (!window.emailjs || typeof window.emailjs.send !== 'function') {
      setSubmitError('EmailJS SDK is unavailable. Please try again later.');
      setFallbackLink(createMailtoLink(formData));
      setIsSubmitting(false);
      return;
    }
    window.emailjs.init(publicKey);

    try {
      const result = await window.emailjs.send(serviceId, templateId, templateParams, {
        publicKey,
      });

      if (result.status === 200) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', journeyType: 'umrah', message: '' });
        setTimeout(() => {
          setSubmitted(false);
        }, 4000);
      } else {
        throw new Error(`EmailJS returned unexpected status: ${result.status}`);
      }
    } catch (error) {
      const msg = error?.message ? `EmailJS error: ${error.message}` : 'Unable to send your inquiry.';
      setSubmitError(`${msg} Use the button below to email advisors@nusuk-tours.com directly.`);
      setFallbackLink(createMailtoLink(formData));
      console.error('Contact form submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-charcoal">
      <div className="container">
        <div className="split-layout" style={{ gap: '8rem' }}>
          
          {/* Left Column: Spacious Brand Statement */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span className="editorial-tag" style={{ color: 'var(--gold)' }}>Consultation Inquiry</span>
            <h2
              className="section-title"
              style={{
                fontSize: 'clamp(2.5rem, 4vw, 3.25rem)',
                lineHeight: '1.2',
                color: 'var(--white)',
                marginBottom: '2.5rem',
                fontWeight: '400',
              }}
            >
              Speak With A <br />
              <span style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>Private Advisor</span>
            </h2>
            
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                fontWeight: '300',
                lineHeight: '1.85',
                color: 'var(--text-muted)',
                marginBottom: '4rem',
                maxWidth: '480px',
              }}
            >
              Embark on a sacred journey tailored entirely to your personal expectations. Provide your contact details and our dedicated private travel coordinators will contact you within 24 hours to craft your custom pilgrimage itinerary.
            </p>

            {/* Direct Channels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ width: '40px', height: '40px', border: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
                  <PhoneCall size={16} color="var(--gold)" style={{ strokeWidth: 1.25 }} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Direct Advisors</span>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--white)' }}>09070261007</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ width: '40px', height: '40px', border: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}>
                  <Mail size={16} color="var(--gold)" style={{ strokeWidth: 1.25 }} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Inquiries Portal</span>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--white)' }}>reservation.nusuktours@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Simple Modern Luxury Form */}
          <div
            style={{
              background: 'transparent',
              padding: 0,
            }}
          >
            {submitted ? (
              <div
                style={{
                  padding: '4rem',
                  border: '1px solid var(--border-gold)',
                  backgroundColor: 'rgba(201, 162, 39, 0.02)',
                  textAlign: 'center',
                }}
              >
                <span className="editorial-tag" style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}>Submission Received</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--white)', marginBottom: '1rem', fontWeight: '400' }}>
                  Peace Be Upon You
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.7', fontWeight: '300' }}>
                  Our private advisor has received your request. We will review your requirements and reach out to you within 24 hours to begin mapping your sacred sanctuary path.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="grid-2" style={{ gap: '2.5rem', marginBottom: '0.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Sanctuary Journey Type</label>
                  <select
                    value={formData.journeyType}
                    onChange={(e) => setFormData({ ...formData, journeyType: e.target.value })}
                    className="form-input"
                    style={{
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="umrah" style={{ backgroundColor: 'var(--charcoal)', color: '#fff' }}>Bespoke Umrah Sanctuary</option>
                    <option value="hajj" style={{ backgroundColor: 'var(--charcoal)', color: '#fff' }}>Celestial Gateway Hajj</option>
                    <option value="custom" style={{ backgroundColor: 'var(--charcoal)', color: '#fff' }}>Custom Spiritual Journey</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '3.5rem' }}>
                  <label className="form-label">Personal Accommodations & Requests</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-textarea"
                    placeholder="Describe any private lodging requirements, mobility requests, or date choices..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    backgroundColor: 'var(--white)',
                    color: 'var(--charcoal)',
                    opacity: isSubmitting ? 0.7 : 1,
                    pointerEvents: isSubmitting ? 'none' : 'auto',
                  }}
                >
                  <Send size={14} style={{ strokeWidth: 1.5, marginRight: '0.5rem' }} />
                  {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                </button>
                {submitError && (
                  <>
                    <p style={{ color: '#F56C6C', marginTop: '1rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
                      {submitError}
                    </p>
                    {fallbackLink && (
                      <a
                        href={fallbackLink}
                        className="btn btn-secondary"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: '1rem',
                          width: '100%',
                          textDecoration: 'none',
                        }}
                      >
                        Open Email Client
                      </a>
                    )}
                  </>
                )}
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
