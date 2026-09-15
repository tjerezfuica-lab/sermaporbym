'use client';

const BLUE = '#244B93';
const RED  = '#E22F13';

const ICONS: Record<string, string> = { anchor: '⚓', warehouse: '🏭', ship: '🚢', default: '🔧' };

const FALLBACK_IMGS = [
  'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=80',
  'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=600&q=80',
  'https://images.unsplash.com/photo-1504855012953-28b9baada3f6?w=600&q=80',
];

interface Service { id: string; title: string; subtitle?: string; description: string; icon?: string; image?: string; }
interface Section  { key: string; title: string; content: string; }

export default function ServiciosSection({ services, section }: { services: Service[]; section: Section }) {
  const list = services.length > 0 ? services : [
    { id: '1', title: 'Muellaje y Estiba', subtitle: 'Servicios Portuarios Especializados', description: 'Operaciones eficientes para carga general y especializada con equipos y personal calificado para manejo seguro.', icon: 'anchor' },
    { id: '2', title: 'Almacenamiento y Manejo', subtitle: 'Logística y Almacenaje', description: 'Infraestructura especializada con bodegas de más de 28.000 m² en Puerto Montt para fertilizantes y granos.', icon: 'warehouse' },
    { id: '3', title: 'Servicios Portuarios', subtitle: 'Apoyo Logístico Completo', description: 'Amarradores, guardias de portalón y servicios de apoyo logístico para operaciones en puertos del sur de Chile.', icon: 'ship' },
  ];

  return (
    <section id="servicios" style={{ padding: '96px 0', background: '#f7f9fc' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 4, background: RED, borderRadius: 2 }} />
            <span style={{ color: RED, fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Lo que hacemos</span>
            <div style={{ width: 40, height: 4, background: RED, borderRadius: 2 }} />
          </div>
          <h2 style={{ fontFamily: 'Garet, Open Sans, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 3vw, 40px)', color: BLUE, marginBottom: 16 }}>
            {section.title || 'Nuestros Servicios'}
          </h2>
          {section.content && (
            <p style={{ fontSize: 16, color: '#666', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>{section.content}</p>
          )}
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
          {list.map((svc, i) => {
            const img = svc.image && !svc.image.includes('uploads') ? svc.image : FALLBACK_IMGS[i % 3];
            return (
              <div key={svc.id} style={{
                flex: '1 1 300px', maxWidth: 360, background: '#fff', borderRadius: 12,
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)', overflow: 'hidden',
                transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'default',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(36,75,147,0.15)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.08)'; }}
              >
                {/* Imagen */}
                <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                  <img src={img} alt={svc.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseEnter={e => (e.target as HTMLElement).style.transform = 'scale(1.05)'}
                    onMouseLeave={e => (e.target as HTMLElement).style.transform = 'none'}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(36,75,147,0.7), transparent)` }} />
                  <div style={{ position: 'absolute', bottom: 14, left: 16, fontSize: 28 }}>
                    {ICONS[svc.icon ?? 'default'] ?? '🔧'}
                  </div>
                </div>

                {/* Contenido */}
                <div style={{ padding: '24px' }}>
                  {svc.subtitle && <div style={{ fontSize: 11, color: RED, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>{svc.subtitle}</div>}
                  <h3 style={{ fontFamily: 'Garet, Open Sans, sans-serif', fontWeight: 800, fontSize: 18, color: BLUE, marginBottom: 12, lineHeight: 1.3 }}>{svc.title}</h3>
                  <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7 }}>{svc.description}</p>

                  <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 6, color: RED, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
                    onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}>
                    Consultar servicio
                    <span style={{ fontSize: 16 }}>→</span>
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
