import { useState, useEffect } from 'react';
import { api } from '../../api';
import { cardStyle, h2Style, btnDanger, btnSecondary } from './styles';

interface Message {
  id: string; name: string; email: string; phone?: string; message: string; read: boolean; createdAt: string;
}

export default function TabMensajes() {
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [flash, setFlash] = useState('');

  const load = () => api.getMessages().then((r: { success: boolean; data: Message[] }) => { if (r.success) setMsgs(r.data); });
  useEffect(() => { load(); }, []);

  const showFlash = (m: string) => { setFlash(m); setTimeout(() => setFlash(''), 3000); };

  const open = async (msg: Message) => {
    setSelected(msg);
    if (!msg.read) {
      await api.markRead(msg.id);
      setMsgs(ms => ms.map(m => m.id === msg.id ? { ...m, read: true } : m));
    }
  };

  const del = async (id: string) => {
    if (!confirm('¿Eliminar este mensaje?')) return;
    const r = await api.deleteMessage(id);
    if (r.success) { showFlash('✅ Eliminado'); if (selected?.id === id) setSelected(null); load(); }
    else showFlash('❌ Error al eliminar');
  };

  const unread = msgs.filter(m => !m.read).length;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <h2 style={{ ...h2Style, marginBottom: 0 }}>Mensajes de Contacto</h2>
        {unread > 0 && (
          <span style={{ background: '#E22F13', color: '#fff', borderRadius: 20, padding: '2px 10px', fontSize: 12, fontWeight: 700 }}>{unread} nuevos</span>
        )}
      </div>

      {flash && <div style={{ marginBottom: 16, fontSize: 14, color: flash.includes('✅') ? '#22c55e' : '#ef4444' }}>{flash}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '340px 1fr' : '1fr', gap: 20 }}>
        {/* Lista */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {msgs.length === 0 && <div style={{ ...cardStyle, textAlign: 'center', color: '#999', fontSize: 14 }}>No hay mensajes.</div>}
          {msgs.map(m => (
            <div key={m.id} onClick={() => open(m)} style={{
              ...cardStyle, marginBottom: 0, cursor: 'pointer',
              borderLeft: `4px solid ${m.read ? '#e2e8f0' : '#244B93'}`,
              background: selected?.id === m.id ? '#f0f4ff' : '#fff',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: m.read ? 500 : 700, fontSize: 14, color: '#1a1a2e' }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{m.email}</div>
                </div>
                <div style={{ fontSize: 11, color: '#aaa', whiteSpace: 'nowrap', marginLeft: 8 }}>
                  {new Date(m.createdAt).toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                </div>
              </div>
              <div style={{ fontSize: 13, color: '#555', marginTop: 6, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{m.message}</div>
            </div>
          ))}
        </div>

        {/* Detalle */}
        {selected && (
          <div style={{ ...cardStyle, marginBottom: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#244B93', margin: 0 }}>Detalle del mensaje</h3>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={btnDanger} onClick={() => del(selected.id)}>Eliminar</button>
                <button style={btnSecondary} onClick={() => setSelected(null)}>Cerrar</button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#999', textTransform: 'uppercase', marginBottom: 4 }}>Nombre</div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{selected.name}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#999', textTransform: 'uppercase', marginBottom: 4 }}>Email</div>
                <a href={`mailto:${selected.email}`} style={{ fontSize: 15, color: '#244B93' }}>{selected.email}</a>
              </div>
              {selected.phone && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#999', textTransform: 'uppercase', marginBottom: 4 }}>Teléfono</div>
                  <a href={`tel:${selected.phone}`} style={{ fontSize: 15, color: '#244B93' }}>{selected.phone}</a>
                </div>
              )}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#999', textTransform: 'uppercase', marginBottom: 4 }}>Fecha</div>
                <div style={{ fontSize: 15 }}>{new Date(selected.createdAt).toLocaleString('es-CL')}</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#999', textTransform: 'uppercase', marginBottom: 8 }}>Mensaje</div>
              <div style={{ background: '#f8fafc', borderRadius: 8, padding: '16px 20px', fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{selected.message}</div>
            </div>
            <div style={{ marginTop: 20 }}>
              <a href={`mailto:${selected.email}?subject=RE: Consulta SERMAPOR`} style={{ ...btnSecondary, textDecoration: 'none', display: 'inline-block' }}>Responder por email</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
