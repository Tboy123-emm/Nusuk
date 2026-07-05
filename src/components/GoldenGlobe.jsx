import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, ShieldCheck, Trophy, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export default function GoldenGlobe() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeCity, setActiveCity] = useState('Makkah');

  const cities = {
    Makkah: { coords: { lat: 21.4225, lon: 39.8262 }, name: 'Makkah', details: 'The Holy Sanctuary. Destination of Hajj & Umrah pilgrimages.' },
    Madinah: { coords: { lat: 24.4672, lon: 39.6111 }, name: 'Madinah', details: 'The Prophet’s City. Spiritual serene sanctuary and Ziyarah tours.' },
    London: { coords: { lat: 51.5074, lon: -0.1278 }, name: 'London Gateway', details: 'Primary UK premium charter flights departing weekly.' },
    Dubai: { coords: { lat: 25.2048, lon: 55.2708 }, name: 'Dubai Gateway', details: 'Elite stopovers, luxury lounge access & connection flights.' },
    Istanbul: { coords: { lat: 41.0082, lon: 28.9784 }, name: 'Istanbul Gateway', details: 'Islamic heritage tours, Ottoman historical site visits.' },
    Cairo: { coords: { lat: 30.0444, lon: 31.2357 }, name: 'Cairo Gateway', details: 'Ancient Islamic architecture tours & historical excursions.' },
  };

  useEffect(() => {
    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    
    // Transparent background to let the CSS gradients blend in
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0a1128, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xd4af37, 2.5, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x2563eb, 2.0, 50);
    pointLight2.position.set(-15, -10, -10);
    scene.add(pointLight2);

    // --- 3D GLOBE ASSEMBLY ---
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Inner Metallic Sphere
    const innerGeo = new THREE.SphereGeometry(5.0, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x071126,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.85,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    globeGroup.add(innerSphere);

    // Outer Wireframe Sphere (Golden Lattice)
    const outerGeo = new THREE.SphereGeometry(5.05, 32, 16);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const outerSphere = new THREE.Mesh(outerGeo, outerMat);
    globeGroup.add(outerSphere);

    // Procedural Dotted World Continent Landmass Generator
    const landHubs = [
      { lat: 45, lon: 30, r: 23 },     // Europe
      { lat: 55, lon: 95, r: 32 },     // Siberia / North Asia
      { lat: 28, lon: 78, r: 20 },     // India / Central Asia
      { lat: 35, lon: 110, r: 18 },    // East China
      { lat: 5, lon: 20, r: 24 },      // Central Africa
      { lat: 22, lon: 15, r: 18 },     // North Africa
      { lat: -20, lon: 25, r: 16 },    // South Africa
      { lat: 40, lon: -98, r: 22 },    // USA / North America
      { lat: 58, lon: -110, r: 26 },   // Canada
      { lat: -10, lon: -58, r: 22 },   // Brazil / South America
      { lat: -32, lon: -62, r: 16 },   // South South America
      { lat: -25, lon: 135, r: 20 },   // Australia
      { lat: 8, lon: 108, r: 14 },     // Southeast Asia
      { lat: 68, lon: -40, r: 12 },    // Greenland
    ];

    const isLand = (lat, lon) => {
      return landHubs.some(hub => {
        const dLat = lat - hub.lat;
        let dLon = lon - hub.lon;
        if (dLon > 180) dLon -= 360;
        if (dLon < -180) dLon += 360;
        const dist = Math.sqrt(dLat * dLat + dLon * dLon);
        return dist < hub.r;
      });
    };

    const landPositions = [];
    for (let lat = -80; lat <= 80; lat += 2.2) {
      for (let lon = -180; lon <= 180; lon += 2.2) {
        if (isLand(lat, lon)) {
          const phi = (90 - lat) * (Math.PI / 180);
          const theta = (lon + 180) * (Math.PI / 180);
          const x = -(5.04 * Math.sin(phi) * Math.sin(theta));
          const y = 5.04 * Math.cos(phi);
          const z = 5.04 * Math.sin(phi) * Math.cos(theta);
          landPositions.push(x, y, z);
        }
      }
    }

    const landGeometry = new THREE.BufferGeometry();
    landGeometry.setAttribute('position', new THREE.Float32BufferAttribute(landPositions, 3));
    
    const canvasPart = document.createElement('canvas');
    canvasPart.width = 16;
    canvasPart.height = 16;
    const ctxPart = canvasPart.getContext('2d');
    const grad = ctxPart.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255, 235, 170, 1)');
    grad.addColorStop(0.3, 'rgba(212, 175, 55, 0.8)');
    grad.addColorStop(1, 'rgba(212, 175, 55, 0)');
    ctxPart.fillStyle = grad;
    ctxPart.fillRect(0, 0, 16, 16);

    const landTexture = new THREE.CanvasTexture(canvasPart);
    const landMaterial = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.12,
      map: landTexture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const landPoints = new THREE.Points(landGeometry, landMaterial);
    globeGroup.add(landPoints);

    // Subtle Gold Aura Ring
    const ringGeo = new THREE.RingGeometry(5.3, 5.35, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    globeGroup.add(ring);

    // --- CONVERT LAT/LON TO 3D COORDINATES ---
    const latLonToVector3 = (lat, lon, radius) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);

      const x = -(radius * Math.sin(phi) * Math.sin(theta));
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.cos(theta);

      return new THREE.Vector3(x, y, z);
    };

    // --- DRAW MARKERS & PULSING RINGS ---
    const markers = [];
    const markerMat = new THREE.MeshBasicMaterial({ color: 0xffd700 });
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });

    Object.entries(cities).forEach(([key, city]) => {
      const pos = latLonToVector3(city.coords.lat, city.coords.lon, 5.08);
      
      // Marker Dot
      const dotGeo = new THREE.SphereGeometry(0.12, 8, 8);
      const dot = new THREE.Mesh(dotGeo, markerMat);
      dot.position.copy(pos);
      globeGroup.add(dot);

      // Pulsing Ring
      const pulseGeo = new THREE.RingGeometry(0.15, 0.2, 16);
      const pulseRing = new THREE.Mesh(pulseGeo, pulseMat.clone());
      pulseRing.position.copy(pos);
      pulseRing.lookAt(new THREE.Vector3(0, 0, 0));
      globeGroup.add(pulseRing);

      markers.push({
        name: key,
        mesh: dot,
        pulse: pulseRing,
        scale: 1,
      });
    });

    // --- DRAW CURVED FLIGHT PATHS & FLYING JETS ---
    const paths = [];
    const makkahPos = latLonToVector3(cities.Makkah.coords.lat, cities.Makkah.coords.lon, 5.08);
    const flightSpeed = 0.008;

    const drawCurve = (pos1, pos2) => {
      // Calculate mid point with altitude height
      const midPoint = new THREE.Vector3().addVectors(pos1, pos2).multiplyScalar(0.5);
      const dist = pos1.distanceTo(pos2);
      const altitude = dist * 0.22; // flight arc height
      midPoint.normalize().multiplyScalar(5.08 + altitude);

      // Create quadratic Bezier curve
      const curve = new THREE.QuadraticBezierCurve3(pos1, midPoint, pos2);
      const points = curve.getPoints(32);
      
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      
      // Beautiful glowing cyan/gold gradient route line
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xd4af37,
        transparent: true,
        opacity: 0.45,
      });
      
      const routeLine = new THREE.Line(lineGeo, lineMat);
      globeGroup.add(routeLine);

      // Flying jet light particle
      const jetGeo = new THREE.SphereGeometry(0.08, 4, 4);
      const jetMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8, // Cyan neon light
      });
      const jet = new THREE.Mesh(jetGeo, jetMat);
      globeGroup.add(jet);

      paths.push({
        curve: curve,
        jet: jet,
        t: Math.random(), // randomized progress
      });
    };

    // Draw curves from all gateway cities to Makkah
    const gatewayCities = ['London', 'Dubai', 'Istanbul', 'Cairo'];
    gatewayCities.forEach((cityKey) => {
      const fromPos = latLonToVector3(cities[cityKey].coords.lat, cities[cityKey].coords.lon, 5.08);
      drawCurve(fromPos, makkahPos);
    });

    // Also draw a flight path between Makkah and Madinah
    const madinahPos = latLonToVector3(cities.Madinah.coords.lat, cities.Madinah.coords.lon, 5.08);
    drawCurve(makkahPos, madinahPos);

    // --- INTERACTIVE DRAG GLOBE CONTROL ---
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    
    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      globeGroup.rotation.y += deltaX * 0.005;
      globeGroup.rotation.x += deltaY * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvasRef.current.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // --- ANIMATION LOOP ---
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Slow automatic rotation
      if (!isDragging) {
        globeGroup.rotation.y += 0.002;
        globeGroup.rotation.z = Math.sin(Date.now() * 0.0001) * 0.1;
      }

      // Update pulsing rings
      markers.forEach((m) => {
        m.scale += 0.015;
        if (m.scale > 3) {
          m.scale = 1;
        }
        m.pulse.scale.set(m.scale, m.scale, 1);
        m.pulse.material.opacity = (3 - m.scale) / 2 * 0.6;
      });

      // Update flying jet particles
      paths.forEach((p) => {
        p.t += flightSpeed;
        if (p.t > 1) p.t = 0;
        const pos = p.curve.getPointAt(p.t);
        p.jet.position.copy(pos);
      });

      renderer.render(scene, camera);
    };
    animate();

    // --- RESIZE ---
    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <section
      id="route-map"
      ref={containerRef}
      style={{
        background: 'radial-gradient(circle at 50% 50%, var(--royal-dark) 0%, var(--royal-bg) 100%)',
        borderTop: '1px solid rgba(212, 175, 55, 0.1)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center' }}>
        
        {/* WebGL Canvas holding the Globe */}
        <div
          style={{
            height: '600px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'grab',
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              height: '100%',
              zIndex: 2,
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        </div>

        {/* Global Connection Details */}
        <div style={{ zIndex: 10 }}>
          <span className="section-subtitle">Global Network</span>
          <h2 className="section-title">Seamless Sacred Flights Connecting the Globe</h2>
          <p className="section-desc" style={{ textAlign: 'left', marginLeft: 0, marginBottom: '2rem' }}>
            We charter premium luxury flights and handle express connections from world transit hubs straight to Jeddah/Makkah. Grab and rotate the 3D globe to trace our primary airways.
          </p>

          {/* Interactive Information Panel */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '2.5rem' }}>
            {Object.keys(cities).map((cityName) => (
              <button
                key={cityName}
                onClick={() => setActiveCity(cityName)}
                style={{
                  padding: '0.65rem 1.25rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)',
                  background: activeCity === cityName ? 'linear-gradient(135deg, var(--gold-dark), var(--gold))' : 'rgba(15, 23, 42, 0.4)',
                  color: activeCity === cityName ? 'var(--royal-bg)' : 'var(--text-light)',
                  border: activeCity === cityName ? '1px solid var(--gold)' : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: activeCity === cityName ? '0 5px 15px var(--gold-glow)' : 'none',
                }}
              >
                {cityName}
              </button>
            ))}
          </div>

          <div
            className="glass-panel-gold"
            style={{
              padding: '2rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  background: 'rgba(212, 175, 55, 0.1)',
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Compass color="var(--gold)" size={20} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.2rem', color: 'var(--white)', fontWeight: '700' }}>
                  {cities[activeCity].name}
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.1em', fontWeight: '500', textTransform: 'uppercase' }}>
                  Transit Coordinates: {cities[activeCity].coords.lat.toFixed(4)}°N, {cities[activeCity].coords.lon.toFixed(4)}°E
                </span>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              {cities[activeCity].details} Every passenger receives premium 5-star airport lounge check-ins, expedited fast-track visa custom queues, and fully guided air transit assistance.
            </p>
          </div>

          {/* Core Trust Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <ShieldCheck color="var(--gold)" size={22} />
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '600' }}>IATA Certified</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Approved secure flight systems</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Trophy color="var(--gold)" size={22} />
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '600' }}>Haramain Partners</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Exclusive ground clearances</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          #route-map .container {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          #route-map canvas {
            height: 400px !important;
          }
        }
      `}</style>
    </section>
  );
}
