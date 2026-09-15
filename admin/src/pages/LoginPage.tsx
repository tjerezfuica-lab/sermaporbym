import { useState } from 'react';
import { api } from '../api';

const BLUE = '#244B93';
const RED  = '#E22F13';

export default function LoginPage({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    const res = await api.login(username, password);
    setLoading(false);
    if (res.success) onLogin(res.data.token);
    else setError('Usuario o contraseña incorrectos.');
  };

  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(135deg, ${BLUE} 0%, #1a3870 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ width: 64, height: 64, background: '#fff', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
            <span style={{ fontFamily: 'Garet, sans-serif', fontWeight: 800, fontSize: 20, color: BLUE, letterSpacing: 1 }}>SMP</span>
          </div>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: 24, marginBottom: 4, fontFamily: 'Open Sans, sans-serif' }}>SERMAPOR</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>Panel de Administración</p>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', borderRadius: 16, padding: '36px 32px', boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1a1a2e', marginBottom: 24, textAlign: 'center' }}>Iniciar sesión</h2>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#555', display: 'block', marginBottom: 6 }}>Usuario</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)} required
                placeholder="admin"
                style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #dde3ef', borderRadius: 8, fontSize: 15, outline: 'none' }}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = BLUE}
                onBlur={e =>  (e.target as HTMLInputElement).style.borderColor = '#dde3ef'}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#555', display: 'block', marginBottom: 6 }}>Contraseña</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••"
                style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #dde3ef', borderRadius: 8, fontSize: 15, outline: 'none' }}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = BLUE}
                onBlur={e =>  (e.target as HTMLInputElement).style.borderColor = '#dde3ef'}
              />
            </div>

            {error && <div style={{ background: '#fff5f5', border: '1px solid #fed7d7', borderRadius: 8, padding: '10px 14px', color: RED, fontSize: 13 }}>{error}</div>}

            <button type="submit" disabled={loading} style={{
              padding: '14px', background: loading ? '#aaa' : BLUE, color: '#fff', border: 'none',
              borderRadius: 8, fontWeight: 700, fontSize: 16, marginTop: 4, transition: 'background 0.2s',
            }}>
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', fontSize: 12, marginTop: 20 }}>
          SERMAPOR © {new Date().getFullYear()} — Panel Administrativo
        </p>
      </div>
    </div>
  );
}
