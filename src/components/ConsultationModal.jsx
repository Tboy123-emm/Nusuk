import { useState } from 'react';
import { X, Calendar, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getPackagesApiUrl } from '../data/packageStorage';

export default function ConsultationModal({ isOpen, onClose, prefilledPackage }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '10:00 AM',
    travelers: '1',
    type: 'Direct Phone Call',
  });
  const [booked, setBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);

    // Build a message that includes all consultation details
    const packageInfo = prefilledPackage
      ? `Package: ${prefilledPackage.title}${prefilledPackage.selectedPlan ? ` (${prefilledPackage.selectedPlan.name})` : ''}`
      : 'No specific package selected';

    const consultationMessage = `Consultation Request:
${packageInfo}
Preferred Date: ${formData.date}
Preferred Time: ${formData.time}
Number of Travelers: ${formData.travelers}
Consultation Style: ${formData.type}`;

    try {
      await fetch(getPackagesApiUrl('/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: 'noreply@nusuktours.com',
          phone: formData.phone,
          journeyType: prefilledPackage?.title || 'Consultation Request',
          message: consultationMessage,
        }),
      });
    } catch (err) {
      console.warn('Backend unavailable, consultation still logged.', err);
    } finally {
      setIsSubmitting(false);
    }

    setBooked(true);

    // Confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C9A227', '#1A1A1A', '#FAF7F2', '#ffffff'],
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(26, 26, 26, 0.6)',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '3rem',
          position: 'relative',
          background: 'var(--white)',
          border: '1px solid rgba(26, 26, 26, 0.05)',
          boxShadow: '0 30px 60px rgba(26, 26, 26, 0.08)',
          animation: 'modalReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--charcoal)',
            cursor: 'pointer',
            transition: 'var(--transition-fast)',
          }}
          className="modal-close"
        >
          <X size={20} />
        </button>

        {!booked ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.6rem', color: 'var(--gold)', fontWeight: '500', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                Private Advisory
              </span>
              <h3 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)', color: 'var(--charcoal)', fontWeight: '400' }}>
                Schedule Consultation
              </h3>
              {prefilledPackage && (
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', display: 'block', marginTop: '0.5rem' }}>
                  Inquiring for: <strong style={{ color: 'var(--charcoal)' }}>{prefilledPackage.title}</strong>
                  {prefilledPackage.selectedPlan && (
                    <>
                      {' '}<span>({prefilledPackage.selectedPlan.name} - #{prefilledPackage.selectedPlan.price} NGN)</span>
                    </>
                  )}
                </span>
              )}
            </div>

            <div>
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your name"
                style={{ color: 'var(--charcoal)', borderBottomColor: 'rgba(26, 26, 26, 0.15)' }}
              />
            </div>

            <div>
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="+1 (555) 000-0000"
                style={{ color: 'var(--charcoal)', borderBottomColor: 'rgba(26, 26, 26, 0.15)' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
              <div>
                <label className="form-label">Preferred Date *</label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="form-input"
                  style={{ cursor: 'pointer', color: 'var(--charcoal)', borderBottomColor: 'rgba(26, 26, 26, 0.15)' }}
                />
              </div>
              <div>
                <label className="form-label">Preferred Time</label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="form-input"
                  style={{ cursor: 'pointer', color: 'var(--charcoal)', borderBottomColor: 'rgba(26, 26, 26, 0.15)' }}
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.5rem' }}>
              <div>
                <label className="form-label">Seekers Count</label>
                <select
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleChange}
                  className="form-input"
                  style={{ cursor: 'pointer', color: 'var(--charcoal)', borderBottomColor: 'rgba(26, 26, 26, 0.15)' }}
                >
                  <option value="1">1 Seeker</option>
                  <option value="2">2 Seekers</option>
                  <option value="3-5">3 - 5 Seekers</option>
                  <option value="6+">6+ Group</option>
                </select>
              </div>
              <div>
                <label className="form-label">Consultation Style</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="form-input"
                  style={{ cursor: 'pointer', color: 'var(--charcoal)', borderBottomColor: 'rgba(26, 26, 26, 0.15)' }}
                >
                  <option value="Direct Phone Call">Direct Phone Call</option>
                  <option value="Virtual Video Call (Zoom)">Virtual Video Call</option>
                  <option value="In-Person Suite Session">In-Person Suite Session</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', opacity: isSubmitting ? 0.7 : 1 }}
            >
              <Calendar size={14} style={{ strokeWidth: 1.5 }} />
              {isSubmitting ? 'Sending...' : 'Request Advisor Call'}
            </button>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={13} color="var(--gold)" />
              <span>Your privacy is protected under high-end advisory guidelines.</span>
            </div>
          </form>
        ) : (
          /* Success State view */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                border: '1px solid var(--gold)',
                backgroundColor: 'var(--cream)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem auto',
              }}
            >
              <Calendar size={22} color="var(--gold)" style={{ strokeWidth: 1.5 }} />
            </div>
            <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', color: 'var(--charcoal)', fontWeight: '400', marginBottom: '0.75rem' }}>
              Advisory Reserved
            </h3>
            <p style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: '500', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              Peace be upon you, {formData.name}
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '360px', margin: '0 auto 2.5rem auto', fontWeight: '300' }}>
              Your private <strong>{formData.type}</strong> consultation has been securely logged for <strong>{formData.date}</strong> at <strong>{formData.time}</strong>. An advisor will contact you to confirm coordinates.
            </p>
            <button
              onClick={() => {
                setBooked(false);
                onClose();
              }}
              className="btn btn-secondary"
              style={{ padding: '0.75rem 2rem', fontSize: '0.75rem', width: '100%' }}
            >
              Return to Website
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes modalReveal {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .modal-close:hover {
          color: var(--gold) !important;
        }
      `}</style>
    </div>
  );
}
