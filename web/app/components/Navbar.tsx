'use client';
import { useState, useEffect } from 'react';

const BLUE = '#244B93';
const RED  = '#E22F13';

const links = [
  { label: 'Inicio',           href: '#inicio' },
  { label: 'Nosotros',         href: '#nosotros' },
  { label: 'Nuestros Servicios', href: '#servicios' },
  { label: 'Nuestros Clientes', href: '#clientes' },
  { label: 'Contacto',         href: '#contacto' },
];

export default function Navbar({ config }: { config: Record<string, string> }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState('inicio');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const id = href.replace('#', '');
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? '#fff' : 'rgba(255,255,255,0.97)',
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.12)' : '0 1px 4px rgba(0,0,0,0.08)',
      transition: 'box-shadow 0.3s',
    }}>
      {/* Barra roja superior */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${RED}, ${BLUE})` }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        {/* Logo */}
        <a href="#inicio" onClick={e => handleNav(e, '#inicio')} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 44, height: 44, background: BLUE, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: '#fff', fontFamily: 'Garet, Open Sans, sans-serif', fontWeight: 800, fontSize: 14, letterSpacing: 1 }}>SMP</span>
          </div>
          <div>
            <div style={{ fontFamily: 'Garet, Open Sans, sans-serif', fontWeight: 800, fontSize: 18, color: BLUE, letterSpacing: 1, lineHeight: 1.1 }}>SERMAPOR</div>
            <div style={{ fontSize: 10, color: '#888', letterSpacing: 0.5, lineHeight: 1 }}>Serv. Marítimos y Portuarios</div>
          </div>
        </a>

        {/* Nav desktop */}
        <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="hidden md:flex">
          {links.map(l => {
            const id  = l.href.replace('#', '');
            const isActive = active === id;
            return (
              <a key={l.href} href={l.href} onClick={e => handleNav(e, l.href)}
                style={{
                  padding: '8px 14px', borderRadius: 6, textDecoration: 'none', fontSize: 14, fontWeight: 600,
                  color: isActive ? RED : '#333',
                  borderBottom: isActive ? `2px solid ${RED}` : '2px solid transparent',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if (!isActive) (e.target as HTMLElement).style.color = BLUE; }}
                onMouseLeave={e => { if (!isActive) (e.target as HTMLElement).style.color = '#333'; }}
              >{l.label}</a>
            );
          })}
        </nav>

        {/* Hamburger mobile */}
        <button
          onClick={() => setOpen(!open)}
          style={{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
          className="flex md:hidden"
          aria-label="Menú"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{ display: 'block', width: 24, height: 2, background: BLUE, borderRadius: 2, transition: 'all 0.3s',
              transform: open ? (i === 0 ? 'rotate(45deg) translateY(7px)' : i === 2 ? 'rotate(-45deg) translateY(-7px)' : 'scaleX(0)') : 'none',
            }} />
          ))}
        </button>
      </div>

      {/* Menú mobile */}
      {open && (
        <div style={{ background: '#fff', borderTop: `1px solid #eee`, padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={e => handleNav(e, l.href)}
              style={{ padding: '12px 0', color: '#333', textDecoration: 'none', fontWeight: 600, fontSize: 15, borderBottom: '1px solid #f0f0f0' }}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
