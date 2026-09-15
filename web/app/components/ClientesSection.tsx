'use client';

const BLUE = '#244B93';
const RED  = '#E22F13';

const PLACEHOLDER_CLIENTS = [
  'Copeval', 'Agencias Marítimas', 'Termoeléctricas', 'Industria Salmonera',
  'Industria Ganadera', 'Fertilizantes Chile', 'Puerto Montt', 'TMP Patagonia',
];

interface Client  { id: string; name: string; logo: string; }
interface Section { key: string; title: string; content: string; }

export default function ClientesSection({ clients, section }: { clients: Client[]; section: Section }) {
  return (
    <section id="clientes" style={{ padding: '96px 0', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 4, background: RED, borderRadius: 2 }} />
            <span style={{ color: RED, fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Confían en nosotros</span>
            <div style={{ width: 40, height: 4, background: RED, borderRadius: 2 }} />
          </div>
          <h2 style={{ fontFamily: 'Garet, Open Sans, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 3vw, 40px)', color: BLUE, marginBottom: 16 }}>
            {section.title || 'Nuestros Clientes'}
          </h2>
          {section.content && (
            <p style={{ fontSize: 16, color: '#666', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>{section.content}</p>
          )}
        </div>

        {/* Grid logos */}
        {clients.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
            {clients.map(c => (
              <div key={c.id} style={{
                width: 160, height: 90, borderRadius: 10, border: '1px solid #e8ecf3',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
                transition: 'all 0.2s', background: '#fff',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = BLUE; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px rgba(36,75,147,0.1)`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e8ecf3'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                <img src={c.logo} alt={c.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'grayscale(50%)', transition: 'filter 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.filter = 'none'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.filter = 'grayscale(50%)'}
                />
              </div>
            ))}
          </div>
        ) : (
          // Placeholders mientras no hay logos cargados
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
            {PLACEHOLDER_CLIENTS.map((name, i) => (
              <div key={i} style={{
                flex: '1 1 160px', maxWidth: 180, height: 80, borderRadius: 10,
                border: '2px solid #e8ecf3', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#fff', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = BLUE; (e.currentTarget as HTMLElement).style.background = `${BLUE}08`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e8ecf3'; (e.currentTarget as HTMLElement).style.background = '#fff'; }}
              >
                <span style={{ fontSize: 13, fontWeight: 700, color: '#999', textAlign: 'center', padding: '0 8px' }}>{name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Sectores */}
        <div style={{ marginTop: 64, display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { label: 'Industria Fertilizantes', icon: '🌱' },
            { label: 'Industria Alimentaria',   icon: '🐟' },
            { label: 'Termoeléctricas',          icon: '⚡' },
            { label: 'Agencias Marítimas',        icon: '⚓' },
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', borderRadius: 30, background: `${BLUE}08`, border: `1px solid ${BLUE}20` }}>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: BLUE }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
