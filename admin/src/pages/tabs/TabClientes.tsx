import { useState, useEffect } from 'react';
import { api } from '../../api';
import { cardStyle, h2Style, btnPrimary, btnDanger, btnSecondary, inputStyle, labelStyle } from './styles';

interface Client {
  id: string; name: string; logo: string; sector: string; order: number; active: boolean;
}
const empty: Omit<Client, 'id'> = { name: '', logo: '', sector: '', order: 0, active: true };

export default function TabClientes() {
  const [items, setItems] = useState<Client[]>([]);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState<Omit<Client, 'id'>>(empty);
  const [msg, setMsg] = useState('');
  const [uploading, setUploading] = useState(false);

  const load = () => api.getClients().then((r: { success: boolean; data: Client[] }) => { if (r.success) setItems(r.data); });
  useEffect(() => { load(); }, []);

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const startEdit = (c: Client) => { setEditing(c); setForm({ name: c.name, logo: c.logo, sector: c.sector, order: c.order, active: c.active }); };
  const startNew  = () => { setEditing({ id: '' } as Client); setForm({ ...empty, order: items.length + 1 }); };
  const cancel    = () => setEditing(null);

  const save = async () => {
    const r = editing?.id ? await api.saveClient(editing.id, form) : await api.createClient(form);
    if (r.success) { flash('✅ Guardado'); setEditing(null); load(); }
    else flash('❌ Error al guardar');
  };

  const del = async (id: string) => {
    if (!confirm('¿Eliminar este cliente?')) return;
    const r = await api.deleteClient(id);
    if (r.success) { flash('✅ Eliminado'); load(); }
    else flash('❌ Error al eliminar');
  };

  const uploadLogo = async (file: File) => {
    setUploading(true);
    const r = await api.uploadFile(file);
    setUploading(false);
    if (r.success) setForm(f => ({ ...f, logo: r.url }));
    else flash('❌ Error al subir logo');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ ...h2Style, marginBottom: 0 }}>Clientes</h2>
        <button style={btnPrimary} onClick={startNew}>+ Nuevo cliente</button>
      </div>

      {msg && <div style={{ marginBottom: 16, fontSize: 14, color: msg.includes('✅') ? '#22c55e' : '#ef4444' }}>{msg}</div>}

      {editing !== null && (
        <div style={{ ...cardStyle, borderLeft: '4px solid #244B93' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#244B93', marginBottom: 20 }}>{editing.id ? 'Editar cliente' : 'Nuevo cliente'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Nombre</label>
              <input style={inputStyle} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label style={labelStyle}>Sector / Categoría</label>
              <input style={inputStyle} value={form.sector} onChange={e => setForm(f => ({ ...f, sector: e.target.value }))} placeholder="Naviero, Pesquero..." />
            </div>
            <div>
              <label style={labelStyle}>Orden</label>
              <input type="number" style={inputStyle} value={form.order} onChange={e => setForm(f => ({ ...f, order: +e.target.value }))} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 24 }}>
              <input type="checkbox" id="cli-active" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} />
              <label htmlFor="cli-active" style={{ fontSize: 14, fontWeight: 600 }}>Activo</label>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Logo</label>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input style={{ ...inputStyle, flex: 1 }} value={form.logo} onChange={e => setForm(f => ({ ...f, logo: e.target.value }))} placeholder="URL o sube un archivo" />
                <label style={{ ...btnSecondary, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  {uploading ? 'Subiendo...' : '📁 Subir logo'}
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && uploadLogo(e.target.files[0])} />
                </label>
              </div>
              {form.logo && (
                <div style={{ marginTop: 10, background: '#f8fafc', borderRadius: 8, padding: 12, display: 'inline-block' }}>
                  <img src={form.logo.startsWith('/') ? `http://localhost:3004${form.logo}` : form.logo} alt="" style={{ maxHeight: 60, maxWidth: 200, objectFit: 'contain' }} onError={e => (e.currentTarget.style.display = 'none')} />
                </div>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button style={btnPrimary} onClick={save}>Guardar</button>
            <button style={btnSecondary} onClick={cancel}>Cancelar</button>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
        {items.map(c => (
          <div key={c.id} style={{ ...cardStyle, marginBottom: 0 }}>
            <div style={{ background: '#f8fafc', borderRadius: 8, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              {c.logo
                ? <img src={c.logo.startsWith('/') ? `http://localhost:3004${c.logo}` : c.logo} alt={c.name} style={{ maxHeight: 60, maxWidth: 180, objectFit: 'contain' }} onError={e => (e.currentTarget.style.display = 'none')} />
                : <span style={{ fontSize: 13, color: '#aaa' }}>Sin logo</span>}
            </div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#1a1a2e' }}>{c.name}</div>
            {c.sector && <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{c.sector}</div>}
            <div style={{ fontSize: 11, color: '#aaa', marginTop: 4 }}>{c.active ? <span style={{ color: '#22c55e' }}>Activo</span> : <span style={{ color: '#ef4444' }}>Inactivo</span>} · Orden: {c.order}</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
              <button style={{ ...btnSecondary, padding: '6px 12px', fontSize: 12 }} onClick={() => startEdit(c)}>Editar</button>
              <button style={{ ...btnDanger, padding: '6px 12px', fontSize: 12 }} onClick={() => del(c.id)}>Eliminar</button>
            </div>
          </div>
        ))}
        {items.length === 0 && !editing && (
          <div style={{ ...cardStyle, gridColumn: '1/-1', textAlign: 'center', color: '#999', fontSize: 14 }}>No hay clientes. Agrega el primero.</div>
        )}
      </div>
    </div>
  );
}
