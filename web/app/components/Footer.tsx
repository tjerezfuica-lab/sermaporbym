'use client';

const BLUE = '#244B93';
const RED  = '#E22F13';

const links = [
  { label: 'Inicio',              href: '#inicio' },
  { label: 'Nosotros',            href: '#nosotros' },
  { label: 'Nuestros Servicios',  href: '#servicios' },
  { label: 'Nuestros Clientes',   href: '#clientes' },
  { label: 'Contacto',            href: '#contacto' },
];

export default function Footer({ config }: { config: Record<string, string> }) {
  const scroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#0d1a35', color: '#ccc' }}>
      <div style={{ height: 4, background: `linear-gradient(90deg, ${RED}, ${BLUE})` }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 48px 40px' }}>
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', marginBottom: 48 }}>

          {/* Brand */}
          <div style={{ flex: '2 1 280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, background: BLUE, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontFamily: 'Garet, sans-serif', fontWeight: 800, fontSize: 12, letterSpacing: 1 }}>SMP</span>
              </div>
              <span style={{ fontFamily: 'Garet, sans-serif', fontWeight: 800, fontSize: 18, color: '#fff', letterSpacing: 1 }}>SERMAPOR</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#8a9ab8', maxWidth: 300 }}>
              Servicios Marítimos y Portuarios — empresa del Grupo B&M Agencia Marítima S.A., operando en Chile desde 1997.
            </p>
            <p style={{ marginTop: 16, fontSize: 14, color: '#8a9ab8', fontStyle: 'italic' }}>"Vamos por más"</p>
          </div>

          {/* Links */}
          <div style={{ flex: '1 1 160px' }}>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 14, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 20 }}>Navegación</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={e => scroll(e, l.href)}
                  style={{ color: '#8a9ab8', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = '#fff'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = '#8a9ab8'}
                >{l.label}</a>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div style={{ flex: '1 1 220px' }}>
            <h4 style={{ color: '#fff', fontWeight: 700, fontSize: 14, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 20 }}>Contacto</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: '📞', text: config.phone_1 ?? '+56 9 92270853' },
                { icon: '📞', text: config.phone_2 ?? '+56 9 85582924' },
                { icon: '✉️', text: config.email   ?? 'contacto@sermapor.cl' },
                { icon: '📍', text: config.address  ?? 'Puerto Montt, Chile' },
                { icon: '🌐', text: config.website  ?? 'www.sermapor.cl' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 14, flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontSize: 13, color: '#8a9ab8', lineHeight: 1.5 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#5a6a85' }}>
            © {new Date().getFullYear()} SERMAPOR — Servicios Marítimos y Portuarios. Todos los derechos reservados.
          </span>
          <span style={{ fontSize: 12, color: '#5a6a85' }}>Grupo B&M Agencia Marítima S.A.</span>
        </div>
      </div>
    </footer>
  );
}
