import { useState, useEffect } from 'react';
import { api } from '../../api';
import { cardStyle, h2Style, btnPrimary, btnDanger, btnSecondary, inputStyle, labelStyle } from './styles';

interface Service {
  id: string; title: string; description: string; icon: string; image: string; order: number; active: boolean;
}
const empty: Omit<Service, 'id'> = { title: '', description: '', icon: '', image: '', order: 0, active: true };

export default function TabServicios() {
  const [items, setItems] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<Omit<Service, 'id'>>(empty);
  const [msg, setMsg] = useState('');
  const [uploading, setUploading] = useState(false);

  const load = () => api.getServices().then((r: { success: boolean; data: Service[] }) => { if (r.success) setItems(r.data); });
  useEffect(() => { load(); }, []);

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const startEdit = (s: Service) => { setEditing(s); setForm({ title: s.title, description: s.description, icon: s.icon, image: s.image, order: s.order, active: s.active }); };
  const startNew  = () => { setEditing({ id: '' } as Service); setForm({ ...empty, order: items.length + 1 }); };
  const cancel    = () => setEditing(null);

  const save = async () => {
    const r = editing?.id ? await api.saveService(editing.id, form) : await api.createService(form);
    if (r.success) { flash('✅ Guardado'); setEditing(null); load(); }
    else flash('❌ Error al guardar');
  };

  const del = async (id: string) => {
    if (!confirm('¿Eliminar este servicio?')) return;
    const r = await api.deleteService(id);
    if (r.success) { flash('✅ Eliminado'); load(); }
    else flash('❌ Error al eliminar');
  };

  const uploadImg = async (file: File) => {
    setUploading(true);
    const r = await api.uploadFile(file);
    setUploading(false);
    if (r.success) setForm(f => ({ ...f, image: r.url }));
    else flash('❌ Error al subir imagen');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ ...h2Style, marginBottom: 0 }}>Servicios</h2>
        <button style={btnPrimary} onClick={startNew}>+ Nuevo servicio</button>
      </div>

      {msg && <div style={{ marginBottom: 16, fontSize: 14, color: msg.includes('✅') ? '#22c55e' : '#ef4444' }}>{msg}</div>}

      {editing !== null && (
        <div style={{ ...cardStyle, borderLeft: '4px solid #244B93' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#244B93', marginBottom: 20 }}>{editing.id ? 'Editar servicio' : 'Nuevo servicio'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Título</label>
              <input style={inputStyle} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div>
              <label style={labelStyle}>Ícono (emoji o texto)</label>
              <input style={inputStyle} value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} placeholder="⚓" />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Descripción</label>
              <textarea rows={4} style={{ ...inputStyle, resize: 'vertical' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            <div>
              <label style={labelStyle}>Orden</label>
              <input type="number" style={inputStyle} value={form.order} onChange={e => setForm(f => ({ ...f, order: +e.target.value }))} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 24 }}>
              <input type="checkbox" id="svc-active" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} />
              <label htmlFor="svc-active" style={{ fontSize: 14, fontWeight: 600 }}>Activo</label>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Imagen</label>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input style={{ ...inputStyle, flex: 1 }} value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="URL o sube un archivo" />
                <label style={{ ...btnSecondary, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  {uploading ? 'Subiendo...' : '📁 Subir'}
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && uploadImg(e.target.files[0])} />
                </label>
              </div>
              {form.image && <img src={form.image.startsWith('/') ? `http://localhost:3004${form.image}` : form.image} alt="" style={{ marginTop: 8, maxHeight: 100, borderRadius: 6, objectFit: 'cover' }} onError={e => (e.currentTarget.style.display = 'none')} />}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button style={btnPrimary} onClick={save}>Guardar</button>
            <button style={btnSecondary} onClick={cancel}>Cancelar</button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map(s => (
          <div key={s.id} style={{ ...cardStyle, marginBottom: 0, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, background: '#f1f5f9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{s.icon || '⚙️'}</div>
            {s.image && (
              <img src={s.image.startsWith('/') ? `http://localhost:3004${s.image}` : s.image} alt="" style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} onError={e => (e.currentTarget.style.display = 'none')} />
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#1a1a2e' }}>{s.title}</div>
              <div style={{ fontSize: 13, color: '#666', marginTop: 2, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', maxWidth: 400 }}>{s.description}</div>
              <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>Orden: {s.order} · {s.active ? <span style={{ color: '#22c55e' }}>Activo</span> : <span style={{ color: '#ef4444' }}>Inactivo</span>}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={btnSecondary} onClick={() => startEdit(s)}>Editar</button>
              <button style={btnDanger} onClick={() => del(s.id)}>Eliminar</button>
            </div>
          </div>
        ))}
        {items.length === 0 && !editing && (
          <div style={{ ...cardStyle, textAlign: 'center', color: '#999', fontSize: 14 }}>No hay servicios. Crea el primero.</div>
        )}
      </div>
    </div>
  );
}
