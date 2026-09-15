import { useState } from 'react';
import TabHero       from './tabs/TabHero';
import TabNosotros   from './tabs/TabNosotros';
import TabServicios  from './tabs/TabServicios';
import TabClientes   from './tabs/TabClientes';
import TabMensajes   from './tabs/TabMensajes';
import TabConfig     from './tabs/TabConfig';

const BLUE = '#244B93';
const RED  = '#E22F13';

const TABS = [
  { id: 'hero',      label: '🖼️ Hero',       component: TabHero },
  { id: 'nosotros',  label: '📖 Nosotros',   component: TabNosotros },
  { id: 'servicios', label: '⚓ Servicios',  component: TabServicios },
  { id: 'clientes',  label: '🤝 Clientes',   component: TabClientes },
  { id: 'mensajes',  label: '✉️ Mensajes',   component: TabMensajes },
  { id: 'config',    label: '⚙️ Configuración', component: TabConfig },
];

export default function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState('hero');
  const ActiveTab = TABS.find(t => t.id === tab)?.component ?? TabHero;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f0f4f8' }}>
      {/* Header */}
      <header style={{ background: BLUE, color: '#fff', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, background: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontWeight: 800, fontSize: 12, color: BLUE, letterSpacing: 1 }}>SMP</span>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: 0.5 }}>SERMAPOR</div>
            <div style={{ fontSize: 11, opacity: 0.65 }}>Panel Administrativo</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="http://localhost:3003" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', textDecoration: 'none', padding: '6px 12px', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 6 }}>
            🌐 Ver sitio
          </a>
          <button onClick={onLogout} style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <aside style={{ width: 220, background: '#fff', borderRight: '1px solid #e2e8f0', padding: '24px 0', flexShrink: 0, overflowY: 'auto' }}>
          <div style={{ padding: '0 16px 16px', fontSize: 11, fontWeight: 700, color: '#999', letterSpacing: 1, textTransform: 'uppercase' }}>
            Secciones
          </div>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                width: '100%', textAlign: 'left', padding: '12px 20px', border: 'none', background: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: tab === t.id ? 700 : 500,
                color: tab === t.id ? BLUE : '#555',
                borderLeft: tab === t.id ? `3px solid ${RED}` : '3px solid transparent',
                background: tab === t.id ? `${BLUE}08` : 'transparent',
                transition: 'all 0.15s',
              }}>
              {t.label}
            </button>
          ))}
        </aside>

        {/* Contenido */}
        <main style={{ flex: 1, overflow: 'auto', padding: '32px' }}>
          <ActiveTab />
        </main>
      </div>
    </div>
  );
}
