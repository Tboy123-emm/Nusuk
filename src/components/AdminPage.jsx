import React, { useState, useEffect } from 'react';
import AdminPanel from './AdminPanel';
import { defaultPackages } from '../data/packageData';
import { getPackagesApiUrl, getPackagesWithFallback, loadPackagesFromStorage, resolvePackagesForDisplay, savePackagesToStorage } from '../data/packageStorage';

export default function AdminPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [passwordAttempt, setPasswordAttempt] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'nusuk-admin';

  useEffect(() => {
    const fetchPackages = async () => {
      const storedPackages = loadPackagesFromStorage();
      const fallbackPackages = getPackagesWithFallback(defaultPackages);
      if (storedPackages) {
        setPackages(storedPackages);
      } else {
        setPackages(fallbackPackages);
      }

      try {
        const response = await fetch(getPackagesApiUrl('/packages'), { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        const packagesToUse = resolvePackagesForDisplay({
          storedPackages,
          backendPackages: data,
          fallbackPackages,
        });
        setPackages(packagesToUse);
        savePackagesToStorage(packagesToUse);
      } catch (err) {
        console.warn('Backend unavailable, using saved packages:', err);
        const packagesToUse = resolvePackagesForDisplay({
          storedPackages,
          fallbackPackages,
        });
        setPackages(packagesToUse);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordAttempt === adminPassword) {
      setIsAuthenticated(true);
      setPasswordError('');
      setPasswordAttempt('');
    } else {
      setPasswordError('Incorrect password.');
      setPasswordAttempt('');
    }
  };

  const handleSave = (newPackages) => {
    setPackages(newPackages);
    savePackagesToStorage(newPackages);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordAttempt('');
    setPasswordError('');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--white)' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Loading admin panel...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--charcoal)' }}>
        <div style={{ width: 'min(420px, 95%)', background: 'var(--white)', borderRadius: '12px', padding: '2.5rem', boxShadow: '0 24px 60px rgba(0,0,0,0.3)' }}>
          <h1 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)', fontWeight: '400' }}>Admin Access</h1>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>Enter your password to manage packages.</p>
          
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={passwordAttempt}
              onChange={(e) => setPasswordAttempt(e.target.value)}
              placeholder="Admin password"
              autoFocus
              style={{ width: '100%', padding: '0.85rem', marginBottom: '1rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' }}
            />
            {passwordError && <div style={{ color: 'crimson', marginBottom: '1rem', fontSize: '0.95rem' }}>{passwordError}</div>}
            <button type="submit" style={{ width: '100%', padding: '0.85rem', backgroundColor: 'var(--gold)', color: 'var(--charcoal)', borderRadius: '6px', border: 'none', fontSize: '1rem', fontWeight: '500', cursor: 'pointer' }}>
              Login
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <a href="/" style={{ color: 'var(--gold)', textDecoration: 'none' }}>← Back to site</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--white)' }}>
      <div style={{ backgroundColor: 'var(--charcoal)', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <h1 style={{ fontSize: '1.3rem', color: 'var(--white)', margin: 0, fontFamily: 'var(--font-serif)', fontWeight: '400' }}>Admin Dashboard</h1>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', backgroundColor: '#f56c6c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>
          Logout
        </button>
      </div>
      
      <AdminPanel initialData={packages} onSave={handleSave} onClose={() => {}} adminPassword={adminPassword} />
    </div>
  );
}
