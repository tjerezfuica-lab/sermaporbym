import { useState, useEffect } from 'react';
import { api } from '../../api';
import { cardStyle, h2Style, btnPrimary, inputStyle, labelStyle } from './styles';

interface ConfigEntry { key: string; value: string; label: string; type?: 'text' | 'textarea' | 'number'; }

const CONFIG_FIELDS: ConfigEntry[] = [
  { key: 'phone_main',    label: 'Teléfono principal',    value: '', type: 'text' },
  { key: 'phone_alt',     label: 'Teléfono alternativo',  value: '', type: 'text' },
  { key: 'email',         label: 'Email de contacto',     value: '', type: 'text' },
  { key: 'address',       label: 'Dirección',             value: '', type: 'text' },
  { key: 'stat_years',    label: 'Años de experiencia',   value: '', type: 'number' },
  { key: 'stat_clients',  label: 'Clientes atendidos',    value: '', type: 'number' },
  { key: 'stat_ports',    label: 'Puertos operados',      value: '', type: 'number' },
  { key: 'stat_ops',      label: 'Operaciones realizadas',value: '', type: 'number' },
  { key: 'footer_text',   label: 'Texto del footer',      value: '', type: 'textarea' },
  { key: 'meta_title',    label: 'Título SEO (meta title)',value: '', type: 'text' },
  { key: 'meta_desc',     label: 'Descripción SEO',       value: '', type: 'textarea' },
];

export default function TabConfig() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    api.getConfig().then((r: { success: boolean; data: { key: string; value: string }[] }) => {
      if (r.success) {
        const map: Record<string, string> = {};
        r.data.forEach((item: { key: string; value: string }) => { map[item.key] = item.value; });
        setValues(map);
      }
    });
  }, []);

  const save = async () => {
    setSaving(true);
    const r = await api.saveConfig(values);
    setSaving(false);
    setMsg(r.success ? '✅ Configuración guardada' : '❌ Error al guardar');
    setTimeout(() => setMsg(''), 3000);
  };

  const groups = [
    { title: 'Información de Contacto', keys: ['phone_main', 'phone_alt', 'email', 'address'] },
    { title: 'Estadísticas del Sitio',  keys: ['stat_years', 'stat_clients', 'stat_ports', 'stat_ops'] },
    { title: 'SEO y Footer',            keys: ['meta_title', 'meta_desc', 'footer_text'] },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ ...h2Style, marginBottom: 0 }}>Configuración del Sitio</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {msg && <span style={{ fontSize: 14, color: msg.includes('✅') ? '#22c55e' : '#ef4444' }}>{msg}</span>}
          <button style={btnPrimary} onClick={save} disabled={saving}>{saving ? 'Guardando...' : 'Guardar todo'}</button>
        </div>
      </div>

      {groups.map(group => (
        <div key={group.title} style={cardStyle}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#244B93', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid #f0f4f8' }}>{group.title}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {CONFIG_FIELDS.filter(f => group.keys.includes(f.key)).map(field => (
              <div key={field.key} style={field.type === 'textarea' ? { gridColumn: '1 / -1' } : {}}>
                <label style={labelStyle}>{field.label}</label>
                {field.type === 'textarea'
                  ? <textarea rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={values[field.key] ?? ''} onChange={e => setValues(v => ({ ...v, [field.key]: e.target.value }))} />
                  : <input type={field.type === 'number' ? 'number' : 'text'} style={inputStyle} value={values[field.key] ?? ''} onChange={e => setValues(v => ({ ...v, [field.key]: e.target.value }))} />
                }
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ ...cardStyle, background: '#fffbeb', border: '1px solid #fde68a' }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#92400e', marginBottom: 12 }}>Campos personalizados</h3>
        <p style={{ fontSize: 13, color: '#78350f', margin: 0 }}>
          Puedes agregar cualquier clave personalizada directamente desde la base de datos o solicitando nuevas funciones al desarrollador.
          Los campos definidos arriba corresponden a las claves reconocidas por el sitio público.
        </p>
      </div>
    </div>
  );
}
