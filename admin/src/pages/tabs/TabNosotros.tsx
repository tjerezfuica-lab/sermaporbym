import { useState, useEffect } from 'react';
import { api } from '../../api';
import { cardStyle, h2Style, btnPrimary, inputStyle, labelStyle } from './styles';

export default function TabNosotros() {
  const [data, setData]   = useState({ title: '', content: '', image: '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg]     = useState('');

  useEffect(() => {
    api.getSections().then((r: { success: boolean; data: { key: string; title: string; content: string; image?: string }[] }) => {
      if (r.success) {
        const s = r.data.find((x: { key: string }) => x.key === 'nosotros');
        if (s) setData({ title: s.title, content: s.content, image: s.image ?? '' });
      }
    });
  }, []);

  const save = async () => {
    setSaving(true);
    const r = await api.saveSection('nosotros', data);
    setSaving(false);
    setMsg(r.success ? '✅ Guardado correctamente' : '❌ Error al guardar');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div>
      <h2 style={h2Style}>Sección Nosotros</h2>
      <div style={cardStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={labelStyle}>Título</label>
            <input style={inputStyle} value={data.title} onChange={e => setData(d => ({ ...d, title: e.target.value }))} />
          </div>
          <div>
            <label style={labelStyle}>Contenido</label>
            <textarea rows={8} style={{ ...inputStyle, resize: 'vertical' }} value={data.content} onChange={e => setData(d => ({ ...d, content: e.target.value }))} />
          </div>
          <div>
            <label style={labelStyle}>URL de imagen (opcional)</label>
            <input style={inputStyle} value={data.image} onChange={e => setData(d => ({ ...d, image: e.target.value }))} placeholder="https://... o /uploads/..." />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button style={btnPrimary} onClick={save} disabled={saving}>{saving ? 'Guardando...' : 'Guardar cambios'}</button>
            {msg && <span style={{ fontSize: 14, color: msg.includes('✅') ? '#22c55e' : '#ef4444' }}>{msg}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
