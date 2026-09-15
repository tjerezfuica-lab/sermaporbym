'use client';
import { useEffect, useRef, useState } from 'react';

const BLUE = '#244B93';
const RED  = '#E22F13';

function useCount(target: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    const steps  = 60;
    const step   = target / steps;
    const delay  = duration / steps;
    let current  = 0;
    const t = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(current));
    }, delay);
    return () => clearInterval(t);
  }, [target, duration, started]);
  return count;
}

function StatCard({ value, label, suffix = '', icon }: { value: number; label: string; suffix?: string; icon: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCount(value, 1800, started);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '32px 24px', flex: '1 1 200px' }}>
      <div style={{ fontSize: 36, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontFamily: 'Garet, Open Sans, sans-serif', fontWeight: 800, fontSize: 'clamp(36px, 5vw, 52px)', color: '#fff', lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, marginTop: 8, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
        {label}
      </div>
    </div>
  );
}

export default function StatsSection({ config }: { config: Record<string, string> }) {
  const stats = [
    { value: parseInt(config.stats_years  ?? '27'),  suffix: '',  label: 'Años de experiencia', icon: '📅' },
    { value: parseInt(config.stats_ports  ?? '10'),  suffix: '+', label: 'Puertos operados',     icon: '⚓' },
    { value: parseInt(config.stats_m2     ?? '28861'),suffix:'m²',label: 'Centro logístico',    icon: '🏭' },
    { value: parseInt(config.stats_clients ?? '50'), suffix: '+', label: 'Clientes activos',     icon: '🤝' },
  ];

  return (
    <section style={{ background: `linear-gradient(135deg, ${BLUE} 0%, #1a3870 100%)`, padding: '0' }}>
      {/* Barra roja decorativa */}
      <div style={{ height: 5, background: RED }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {stats.map((s, i) => (
          <StatCard key={i} value={s.value} label={s.label} suffix={s.suffix} icon={s.icon} />
        ))}
      </div>
    </section>
  );
}
