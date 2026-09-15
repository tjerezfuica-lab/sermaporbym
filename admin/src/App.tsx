import { useState, useEffect } from 'react';
import { api } from './api';
import LoginPage   from './pages/LoginPage';
import Dashboard   from './pages/Dashboard';

export default function App() {
  const [token, setToken]   = useState<string | null>(localStorage.getItem('smp_token'));
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!token) { setChecking(false); return; }
    api.me().then(r => {
      if (!r.success) { localStorage.removeItem('smp_token'); setToken(null); }
      setChecking(false);
    }).catch(() => { localStorage.removeItem('smp_token'); setToken(null); setChecking(false); });
  }, [token]);

  const onLogin = (t: string) => { localStorage.setItem('smp_token', t); setToken(t); };
  const onLogout = () => { localStorage.removeItem('smp_token'); setToken(null); };

  if (checking) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#244B93' }}>
      <div style={{ color: '#fff', fontSize: 16 }}>Verificando sesión...</div>
    </div>
  );

  if (!token) return <LoginPage onLogin={onLogin} />;
  return <Dashboard onLogout={onLogout} />;
}
