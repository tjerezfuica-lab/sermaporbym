'use client';
import { useState, useEffect } from 'react';

const BLUE = '#244B93';
const RED  = '#E22F13';

interface Slide { id: string; title: string; subtitle?: string; image: string; }

const BUQUE_IMG = 'https://images.unsplash.com/photo-1504855012953-28b9baada3f6?w=1600&q=80';

export default function HeroSection({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade]       = useState(true);

  const displaySlides = slides.length > 0 ? slides : [
    { id: '1', title: 'Servicios Marítimos y Portuarios', subtitle: 'Vamos por más', image: BUQUE_IMG },
  ];

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => { setCurrent(c => (c + 1) % displaySlides.length); setFade(true); }, 400);
    }, 5500);
    return () => clearInterval(t);
  }, [displaySlides.length]);

  const slide = displaySlides[current];
  const BACKEND = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') ?? 'http://localhost:3004';
  const imgSrc = slide.image.startsWith('/uploads/')
    ? `${BACKEND}${slide.image}`
    : slide.image;

  return (
    <section id="inicio" style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden' }}>
      {/* Imagen de fondo */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        transition: 'opacity 0.5s ease',
        opacity: fade ? 1 : 0,
      }} />

      {/* Overlay gradiente */}
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, rgba(36,75,147,0.85) 0%, rgba(36,75,147,0.6) 50%, rgba(0,0,0,0.4) 100%)` }} />

      {/* Barra roja decorativa izquierda */}
      <div style={{ position: 'absolute', left: 0, top: '10%', bottom: '10%', width: 6, background: RED, borderRadius: '0 4px 4px 0' }} />

      {/* Contenido */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '0 80px', maxWidth: 900 }}>
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ height: 3, width: 48, background: RED, borderRadius: 2 }} />
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>
            Grupo B&M Agencia Marítima
          </span>
        </div>

        <h1 key={slide.id} style={{
          fontFamily: 'Garet, Open Sans, sans-serif', fontWeight: 800,
          fontSize: 'clamp(32px, 5vw, 62px)', color: '#fff', lineHeight: 1.1,
          marginBottom: 20, textShadow: '0 2px 20px rgba(0,0,0,0.3)',
          animation: 'fadeInUp 0.8s ease',
        }}>
          {slide.title}
        </h1>

        {slide.subtitle && (
          <p style={{ fontSize: 'clamp(16px, 2vw, 22px)', color: 'rgba(255,255,255,0.9)', marginBottom: 36, fontWeight: 300, letterSpacing: 0.5 }}>
            {slide.subtitle}
          </p>
        )}

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a href="#servicios" onClick={e => { e.preventDefault(); document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{ padding: '14px 32px', background: RED, color: '#fff', textDecoration: 'none', borderRadius: 4, fontWeight: 700, fontSize: 15, letterSpacing: 0.5, transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 15px rgba(226,47,19,0.4)', display: 'inline-block' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(226,47,19,0.5)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 15px rgba(226,47,19,0.4)'; }}
          >
            Nuestros Servicios
          </a>
          <a href="#contacto" onClick={e => { e.preventDefault(); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }); }}
            style={{ padding: '14px 32px', background: 'transparent', color: '#fff', textDecoration: 'none', borderRadius: 4, fontWeight: 700, fontSize: 15, border: '2px solid rgba(255,255,255,0.7)', letterSpacing: 0.5, transition: 'all 0.2s', display: 'inline-block' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            Contáctenos
          </a>
        </div>
      </div>

      {/* Indicadores de slides */}
      <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10, zIndex: 3 }}>
        {displaySlides.map((_, i) => (
          <button key={i} onClick={() => { setFade(false); setTimeout(() => { setCurrent(i); setFade(true); }, 400); }}
            style={{ width: i === current ? 32 : 10, height: 10, borderRadius: 5, background: i === current ? RED : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 36, right: 48, zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.7 }}>
        <span style={{ color: '#fff', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', writingMode: 'vertical-rl' }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.5)' }} />
      </div>

      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }`}</style>
    </section>
  );
}
