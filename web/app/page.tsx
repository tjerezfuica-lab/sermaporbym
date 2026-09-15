'use client';
import { useEffect, useState } from 'react';
import Navbar           from './components/Navbar';
import HeroSection      from './components/HeroSection';
import StatsSection     from './components/StatsSection';
import NosotrosSection  from './components/NosotrosSection';
import ServiciosSection from './components/ServiciosSection';
import ClientesSection  from './components/ClientesSection';
import ContactoSection  from './components/ContactoSection';
import Footer           from './components/Footer';

export interface SiteData {
  hero:     { id: string; order: number; title: string; subtitle?: string; image: string }[];
  sections: { key: string; title: string; content: string; image?: string }[];
  services: { id: string; order: number; title: string; subtitle?: string; description: string; icon?: string; image?: string }[];
  clients:  { id: string; name: string; logo: string }[];
  config:   Record<string, string>;
}

export default function Home() {
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/site`)
      .then(r => r.json())
      .then(r => { setData(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const getSection = (key: string) =>
    data?.sections.find(s => s.key === key) ?? { key, title: '', content: '', image: undefined };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#244B93' }}>
      <div style={{ textAlign: 'center', color: '#fff' }}>
        <div style={{ width: 48, height: 48, border: '4px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ fontFamily: 'Open Sans, sans-serif', opacity: 0.8 }}>Cargando...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  return (
    <main>
      <Navbar config={data?.config ?? {}} />
      <HeroSection slides={data?.hero ?? []} />
      <StatsSection config={data?.config ?? {}} />
      <NosotrosSection section={getSection('nosotros')} />
      <ServiciosSection services={data?.services ?? []} section={getSection('servicios_intro')} />
      <ClientesSection clients={data?.clients ?? []} section={getSection('clientes_intro')} />
      <ContactoSection section={getSection('contacto_intro')} config={data?.config ?? {}} />
      <Footer config={data?.config ?? {}} />
    </main>
  );
}
