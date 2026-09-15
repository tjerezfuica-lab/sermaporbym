'use client';
import { useState } from 'react';

const BLUE = '#244B93';
const RED  = '#E22F13';

interface Section { key: string; title: string; content: string; }

export default function ContactoSection({ section, config }: { section: Section; config: Record<string, string> }) {
  const [form, setForm]   = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const body = `Nombre: ${form.name}\nEmail: ${form.email}\nTeléfono: ${form.phone}\nAsunto: ${form.subject}\nMensaje: ${form.message}`;
    window.location.href = `mailto:contacto@sermapor.cl?subject=${encodeURIComponent(form.subject || 'Consulta desde sermapor.cl')}&body=${encodeURIComponent(body)}`;
    setTimeout(() => { setStatus('ok'); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }, 500);
  };

  const field = (placeholder: string, key: keyof typeof form, type = 'text', required = false) => (
    <input type={type} placeholder={placeholder} required={required} value={form[key]}
      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
      style={{ width: '100%', padding: '14px 16px', border: '1.5px solid #dde3ef', borderRadius: 8, fontSize: 15, outline: 'none', fontFamily: 'Open Sans, sans-serif', background: '#fff', transition: 'border-color 0.2s' }}
      onFocus={e => (e.target as HTMLInputElement).style.borderColor = BLUE}
      onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#dde3ef'}
    />
  );

  return (
    <section id="contacto" style={{ padding: '96px 0', background: '#f7f9fc' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 48px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 4, background: RED, borderRadius: 2 }} />
            <span style={{ color: RED, fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>Escríbenos</span>
            <div style={{ width: 40, height: 4, background: RED, borderRadius: 2 }} />
          </div>
          <h2 style={{ fontFamily: 'Garet, Open Sans, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 3vw, 40px)', color: BLUE, marginBottom: 16 }}>
            {section.title || 'Contáctenos'}
          </h2>
          {section.content && <p style={{ fontSize: 16, color: '#666', maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>{section.content}</p>}
        </div>

        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start' }}>

          {/* Info de contacto */}
          <div style={{ flex: '1 1 280px' }}>
            <div style={{ background: BLUE, borderRadius: 16, padding: '40px 32px', color: '#fff' }}>
              <h3 style={{ fontFamily: 'Garet, sans-serif', fontWeight: 800, fontSize: 22, marginBottom: 32 }}>Información de contacto</h3>

              {[
                { icon: '📞', label: 'Teléfonos', lines: [config.phone_1 ?? '+56 9 92270853', config.phone_2 ?? '+56 9 85582924'] },
                { icon: '✉️', label: 'Email', lines: [config.email ?? 'contacto@sermapor.cl'] },
                { icon: '📍', label: 'Ubicación', lines: [config.address ?? 'Puerto Montt, Chile', '3 km de TMP · 600 m Ruta 5'] },
                { icon: '🌐', label: 'Sitio web', lines: [config.website ?? 'www.sermapor.cl'] },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
                  <div style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, opacity: 0.65, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>{item.label}</div>
                    {item.lines.map((l, j) => <div key={j} style={{ fontSize: 15, fontWeight: 500 }}>{l}</div>)}
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 8, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.2)', fontSize: 13, opacity: 0.7 }}>
                Grupo B&M Agencia Marítima S.A.<br />
                Empresa del sur de Chile desde 1997
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div style={{ flex: '2 1 380px' }}>
            <div style={{ background: '#fff', borderRadius: 16, padding: '40px 36px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}>
              {status === 'ok' ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
                  <h3 style={{ color: BLUE, fontWeight: 700, fontSize: 20, marginBottom: 8 }}>¡Mensaje enviado!</h3>
                  <p style={{ color: '#666', fontSize: 15 }}>Le responderemos a la brevedad.</p>
                  <button onClick={() => setStatus('idle')} style={{ marginTop: 20, padding: '10px 24px', background: BLUE, color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 180px' }}>{field('Nombre completo *', 'name', 'text', true)}</div>
                    <div style={{ flex: '1 1 180px' }}>{field('Correo electrónico *', 'email', 'email', true)}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 180px' }}>{field('Teléfono', 'phone')}</div>
                    <div style={{ flex: '1 1 180px' }}>{field('Asunto', 'subject')}</div>
                  </div>
                  <textarea placeholder="Mensaje *" required value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={5}
                    style={{ width: '100%', padding: '14px 16px', border: '1.5px solid #dde3ef', borderRadius: 8, fontSize: 15, resize: 'vertical', outline: 'none', fontFamily: 'Open Sans, sans-serif', transition: 'border-color 0.2s' }}
                    onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = BLUE}
                    onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = '#dde3ef'}
                  />
                  {status === 'error' && <p style={{ color: RED, fontSize: 13 }}>Error al enviar. Intente nuevamente.</p>}
                  <button type="submit" disabled={status === 'sending'} style={{
                    padding: '16px', background: status === 'sending' ? '#aaa' : RED, color: '#fff', border: 'none', borderRadius: 8,
                    fontWeight: 700, fontSize: 16, cursor: status === 'sending' ? 'not-allowed' : 'pointer', letterSpacing: 0.5,
                    transition: 'background 0.2s, transform 0.2s',
                  }}
                    onMouseEnter={e => { if (status !== 'sending') (e.currentTarget as HTMLElement).style.background = '#c4260f'; }}
                    onMouseLeave={e => { if (status !== 'sending') (e.currentTarget as HTMLElement).style.background = RED; }}
                  >
                    {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
