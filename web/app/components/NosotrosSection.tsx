'use client';

const BLUE = '#244B93';
const RED  = '#E22F13';
const FALLBACK = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80';

interface Section { key: string; title: string; content: string; image?: string; }

export default function NosotrosSection({ section }: { section: Section }) {
  const img = section.image && !section.image.includes('placeholder') ? section.image : FALLBACK;

  return (
    <section id="nosotros" style={{ padding: '96px 0', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px', display: 'flex', gap: 72, alignItems: 'center', flexWrap: 'wrap' }}>

        {/* Imagen */}
        <div style={{ flex: '1 1 380px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: -20, left: -20, width: 120, height: 120, background: RED, opacity: 0.15, borderRadius: 8, zIndex: 0 }} />
          <img src={img} alt="Operaciones portuarias SERMAPOR"
            style={{ width: '100%', height: 420, objectFit: 'cover', borderRadius: 8, position: 'relative', zIndex: 1, boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }} />
          <div style={{ position: 'absolute', bottom: -16, right: -16, background: BLUE, color: '#fff', padding: '16px 24px', borderRadius: 8, zIndex: 2, fontFamily: 'Garet, sans-serif', fontWeight: 800 }}>
            <div style={{ fontSize: 28 }}>1997</div>
            <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: 1 }}>FUNDACIÓN</div>
          </div>
        </div>

        {/* Texto */}
        <div style={{ flex: '1 1 380px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 4, background: RED, borderRadius: 2 }} />
            <span style={{ color: RED, fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Nuestra Historia</span>
          </div>

          <h2 style={{ fontFamily: 'Garet, Open Sans, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 3vw, 40px)', color: BLUE, lineHeight: 1.15, marginBottom: 24 }}>
            {section.title || 'Nuestra Historia'}
          </h2>

          <p style={{ fontSize: 16, lineHeight: 1.8, color: '#555', marginBottom: 28 }}>
            {section.content || 'Servicios Marítimos y Portuarios (SMP), empresa del Grupo B&M Agencia Marítima S.A., se crea el año 1997 en la ciudad de Concepción. Con más de 27 años de experiencia en el sector marítimo-portuario.'}
          </p>

          {/* Valores */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: '⚓', text: 'Experiencia de más de 27 años en el sector' },
              { icon: '🛡️', text: 'Personal calificado y equipamiento especializado' },
              { icon: '🏭', text: 'Centro logístico de 28.861 m² en Puerto Montt' },
            ].map((v, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, background: `${BLUE}15`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                  {v.icon}
                </div>
                <span style={{ fontSize: 15, color: '#444', fontWeight: 500 }}>{v.text}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, display: 'inline-block', padding: '8px 20px', background: `${BLUE}12`, borderLeft: `4px solid ${RED}`, borderRadius: '0 6px 6px 0' }}>
            <em style={{ color: BLUE, fontWeight: 700, fontSize: 16 }}>"Vamos por más"</em>
          </div>
        </div>
      </div>
    </section>
  );
}
